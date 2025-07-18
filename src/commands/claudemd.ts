import { select, confirm, editor } from '@inquirer/prompts';
import * as path from 'path';
import { colorize } from '../utils/colors';
import { FileSystemManager } from '../core/filesystem';
import { ClaudeMdAction } from '@/types';
import { MenuNavigator, NavigationUtils } from '../utils/navigation';

type ProjectType = 'nodejs' | 'react' | 'vue' | 'python' | 'go' | 'rust' | 'java' | 'dotnet' | 'generic';
type LocationType = 'current' | 'local' | 'home';

interface ProjectTypeChoice {
  name: string;
  value: ProjectType;
}

interface LocationChoice {
  name: string;
  value: LocationType;
}

export class ClaudeMdManager {
  private navigator: MenuNavigator;
  
  constructor(private fs: FileSystemManager) {
    this.navigator = new MenuNavigator();
  }

  async createClaudeMd(projectType: ProjectType | null = null): Promise<string> {
    console.log(`\n${colorize.highlight('🎯 CLAUDE.md Configuration Setup')}`);
    
    let detectedType = projectType;
    if (!detectedType) {
      detectedType = this.detectProjectType();
    }

    const projectInfo = await select<ProjectType>({
      message: 'What type of project is this?',
      choices: [
        { name: 'Node.js/JavaScript', value: 'nodejs' },
        { name: 'React', value: 'react' },
        { name: 'Vue.js', value: 'vue' },
        { name: 'Python', value: 'python' },
        { name: 'Go', value: 'go' },
        { name: 'Rust', value: 'rust' },
        { name: 'Java', value: 'java' },
        { name: 'C#/.NET', value: 'dotnet' },
        { name: 'Generic/Other', value: 'generic' }
      ] as ProjectTypeChoice[]
    });

    const template = this.getTemplate(projectInfo);
    
    const location = await select<LocationType>({
      message: 'Where should the CLAUDE.md file be created?',
      choices: [
        { name: 'Current directory (CLAUDE.md)', value: 'current' },
        { name: 'Current directory (CLAUDE.local.md - gitignored)', value: 'local' },
        { name: 'Home directory (~/.claude/CLAUDE.md)', value: 'home' }
      ] as LocationChoice[],
      default: 'current'
    });

    // Check if file already exists and warn user
    const filePath = this.getFilePath(location);
    if (this.fs.fileExists(filePath)) {
      console.log(colorize.warning(`⚠️  File already exists: ${filePath}`));
      const shouldOverwrite = await NavigationUtils.confirmAction(
        'Do you want to overwrite the existing file?',
        false
      );
      
      if (!shouldOverwrite) {
        console.log(colorize.info('Operation cancelled.'));
        return filePath;
      }
    }

    const customContent = await confirm({
      message: 'Would you like to add custom content to the template?',
      default: false
    });

    let finalContent = template;
    
    if (customContent) {
      const additionalContent = await editor({
        message: 'Add your custom content (will be appended to the template):',
        default: '\n# Custom Instructions\n\n'
      });
      
      finalContent += '\n' + additionalContent;
    }

    // Save the file
    this.fs.writeFile(filePath, finalContent);
    
    console.log(colorize.success(`CLAUDE.md created at: ${filePath}`));
    
    if (location === 'local') {
      console.log(colorize.info('Remember to add CLAUDE.local.md to your .gitignore file'));
    }

    return filePath;
  }

  async editClaudeMd(): Promise<void> {
    const claudeMdFiles = this.fs.findClaudeMdFiles();
    
    if (claudeMdFiles.length === 0) {
      console.log(colorize.warning('No CLAUDE.md files found'));
      const create = await NavigationUtils.confirmAction(
        'Would you like to create a new CLAUDE.md file?',
        true
      );
      
      if (create) {
        await this.createClaudeMd();
      }
      return;
    }

    const selectedFile = await select<string>({
      message: 'Which CLAUDE.md file would you like to edit?',
      choices: claudeMdFiles.map(file => ({
        name: this.getDisplayName(file),
        value: file
      }))
    });

    const currentContent = this.fs.readFile(selectedFile);
    
    const newContent = await editor({
      message: 'Edit the CLAUDE.md content:',
      default: currentContent
    });

    this.fs.writeFile(selectedFile, newContent);
    console.log(colorize.success(`Updated ${selectedFile}`));
  }

  async validateClaudeMd(): Promise<void> {
    const claudeMdFiles = this.fs.findClaudeMdFiles();
    
    if (claudeMdFiles.length === 0) {
      console.log(colorize.warning('No CLAUDE.md files found to validate'));
      return;
    }

    console.log(`\n${colorize.highlight('🔍 Validating CLAUDE.md files...')}`);
    
    for (const file of claudeMdFiles) {
      console.log(`\n${colorize.bold(this.getDisplayName(file))}`);
      const content = this.fs.readFile(file);
      const issues = this.validateContent(content);
      
      if (issues.length === 0) {
        console.log(colorize.success('No issues found'));
      } else {
        issues.forEach(issue => {
          console.log(colorize.warning(issue));
        });
      }
    }
  }

  detectProjectType(): ProjectType {
    const cwd = process.cwd();
    
    if (this.fs.fileExists(path.join(cwd, 'package.json'))) {
      const pkg = JSON.parse(this.fs.readFile(path.join(cwd, 'package.json')));
      
      if (pkg.dependencies?.react || pkg.devDependencies?.react) return 'react';
      if (pkg.dependencies?.vue || pkg.devDependencies?.vue) return 'vue';
      return 'nodejs';
    }
    
    if (this.fs.fileExists(path.join(cwd, 'requirements.txt')) || 
        this.fs.fileExists(path.join(cwd, 'pyproject.toml'))) return 'python';
    
    if (this.fs.fileExists(path.join(cwd, 'go.mod'))) return 'go';
    if (this.fs.fileExists(path.join(cwd, 'Cargo.toml'))) return 'rust';
    if (this.fs.fileExists(path.join(cwd, 'pom.xml'))) return 'java';
    if (this.fs.fileExists(path.join(cwd, '*.csproj'))) return 'dotnet';
    
    return 'generic';
  }

  private getTemplate(projectType: ProjectType): string {
    const templates: Record<ProjectType, string> = {
      nodejs: `# Claude Configuration for Node.js Project

## Bash Commands
- npm install: Install dependencies
- npm run dev: Start development server
- npm run build: Build the project
- npm test: Run tests
- npm run lint: Run linter

## Code Style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')
- Use async/await instead of callbacks
- Follow ESLint configuration

## Testing
- Use Jest for unit tests
- Place tests in __tests__ directories or *.test.js files
- Run single tests for performance: npm test -- --testNamePattern="test name"

## Workflow
- Always run tests after making changes
- Check linting before committing
- Use meaningful commit messages`,

      react: `# Claude Configuration for React Project

## Bash Commands
- npm start: Start development server
- npm run build: Build for production
- npm test: Run tests
- npm run lint: Run ESLint
- npm run type-check: Run TypeScript type checking (if using TypeScript)

## Code Style
- Use functional components with hooks
- Destructure props and state
- Use TypeScript for better type safety
- Follow React best practices for performance

## Component Guidelines
- Place components in src/components/
- Use PascalCase for component names
- Export components as default exports
- Use React.memo() for performance optimization when needed

## Testing
- Use React Testing Library
- Test user interactions, not implementation details
- Place tests alongside components

## Workflow
- Run type checking when done making changes
- Test components after modifications
- Use React DevTools for debugging`,

      vue: `# Claude Configuration for Vue.js Project

## Bash Commands
- npm run serve: Start development server
- npm run build: Build for production
- npm test: Run tests
- npm run lint: Run ESLint
- npm run type-check: Run TypeScript type checking (if using TypeScript)

## Code Style
- Use Composition API for new components
- Use TypeScript for better type safety
- Follow Vue style guide
- Use single-file components (.vue files)

## Component Guidelines
- Place components in src/components/
- Use PascalCase for component names
- Use kebab-case for custom events
- Prefer props and emit over direct parent access

## Testing
- Use Vue Test Utils
- Test component behavior, not implementation
- Mock external dependencies
- Test computed properties and watchers

## Workflow
- Use Vue DevTools for debugging
- Check console for warnings
- Validate props with proper types`,

      python: `# Claude Configuration for Python Project

## Bash Commands
- python -m venv venv: Create virtual environment
- source venv/bin/activate: Activate virtual environment (Unix)
- pip install -r requirements.txt: Install dependencies
- python -m pytest: Run tests
- python -m black .: Format code
- python -m flake8: Run linter

## Code Style
- Follow PEP 8 style guidelines
- Use type hints for function signatures
- Use docstrings for functions and classes
- Use Black for code formatting

## Project Structure
- Place modules in appropriate packages
- Use __init__.py files for packages
- Separate tests in tests/ directory

## Testing
- Use pytest for testing
- Write unit tests for all functions
- Use fixtures for test data
- Aim for high test coverage

## Environment
- Always use virtual environments
- Pin dependency versions in requirements.txt
- Use .env files for environment variables`,

      go: `# Claude Configuration for Go Project

## Bash Commands
- go mod init: Initialize module
- go mod tidy: Clean up dependencies
- go build: Build the project
- go test ./...: Run all tests
- go fmt ./...: Format code
- go vet ./...: Run static analysis

## Code Style
- Follow Go conventions and idioms
- Use gofmt for formatting
- Prefer composition over inheritance
- Handle errors explicitly

## Project Structure
- cmd/ for main applications
- pkg/ for public packages
- internal/ for private packages
- Keep packages small and focused

## Testing
- Write table-driven tests
- Use testify for assertions
- Mock external dependencies
- Benchmark critical paths`,

      rust: `# Claude Configuration for Rust Project

## Bash Commands
- cargo build: Build the project
- cargo run: Run the project
- cargo test: Run tests
- cargo fmt: Format code
- cargo clippy: Run linter
- cargo doc: Generate documentation

## Code Style
- Follow Rust naming conventions
- Use rustfmt for formatting
- Prefer borrowing over ownership transfer
- Handle errors with Result type

## Project Structure
- src/lib.rs for library code
- src/main.rs for binary
- tests/ for integration tests
- benches/ for benchmarks

## Testing
- Unit tests in same file as code
- Integration tests in tests/
- Use #[cfg(test)] for test modules
- Property-based testing with proptest`,

      java: `# Claude Configuration for Java Project

## Bash Commands
- mvn clean install: Build project
- mvn test: Run tests
- mvn compile: Compile source
- mvn package: Create JAR/WAR
- mvn spring-boot:run: Run Spring Boot app

## Code Style
- Follow Java naming conventions
- Use Google Java Style Guide
- Prefer composition over inheritance
- Use Optional for nullable returns

## Project Structure
- src/main/java for source code
- src/test/java for tests
- src/main/resources for resources
- Follow package naming conventions

## Testing
- Use JUnit 5 for unit tests
- Mockito for mocking
- Integration tests separate from unit tests
- Aim for 80%+ code coverage`,

      dotnet: `# Claude Configuration for .NET Project

## Bash Commands
- dotnet build: Build the project
- dotnet run: Run the project
- dotnet test: Run tests
- dotnet publish: Publish for deployment
- dotnet format: Format code

## Code Style
- Follow C# naming conventions
- Use var for obvious types
- Prefer async/await for I/O
- Use LINQ for collections

## Project Structure
- Controllers/ for API controllers
- Services/ for business logic
- Models/ for data models
- Tests/ for unit tests

## Testing
- Use xUnit for testing
- Moq for mocking
- FluentAssertions for assertions
- Separate unit and integration tests`,

      generic: `# Claude Configuration

## Bash Commands
- List your common commands here
- Example: make build
- Example: ./scripts/test.sh

## Code Style
- Define your coding standards
- Specify formatting rules
- List naming conventions

## Testing Instructions
- How to run tests
- Testing framework used
- Coverage requirements

## Workflow
- Development process
- Code review guidelines
- Deployment procedures

## Project-Specific Notes
- Add any special considerations
- Environment setup requirements
- Known issues or workarounds`
    };

    return templates[projectType] || templates.generic;
  }

  private getFilePath(location: LocationType): string {
    switch (location) {
      case 'current':
        return path.join(process.cwd(), 'CLAUDE.md');
      case 'local':
        return path.join(process.cwd(), 'CLAUDE.local.md');
      case 'home':
        return path.join(this.fs.claudeDir, 'CLAUDE.md');
      default:
        return path.join(process.cwd(), 'CLAUDE.md');
    }
  }

  getDisplayName(filePath: string): string {
    const home = require('os').homedir();
    const cwd = process.cwd();
    
    if (filePath.startsWith(home)) {
      return filePath.replace(home, '~');
    }
    if (filePath.startsWith(cwd)) {
      return path.relative(cwd, filePath);
    }
    return filePath;
  }

  async handleClaudeMdMenu(): Promise<void> {
    this.navigator.enterMenu('CLAUDE.md Management');
    
    while (true) {
      const action = await NavigationUtils.enhancedSelect<ClaudeMdAction>({
        message: 'CLAUDE.md Management:',
        choices: [
          { name: '📄 Create new CLAUDE.md', value: 'create' },
          { name: '✏️  Edit existing CLAUDE.md', value: 'edit' },
          { name: '🔍 Validate CLAUDE.md files', value: 'validate' },
          { name: '📋 List all CLAUDE.md files', value: 'list' },
          { name: this.navigator.getBackButtonText(), value: 'back' }
        ],
        allowEscBack: true
      });

      switch (action) {
        case 'create':
          await this.createClaudeMd();
          break;
        case 'edit':
          await this.editClaudeMd();
          break;
        case 'validate':
          await this.validateClaudeMd();
          break;
        case 'list':
          const files = this.fs.findClaudeMdFiles();
          if (files.length === 0) {
            console.log(colorize.warning('No CLAUDE.md files found'));
          } else {
            console.log(`\n${colorize.highlight('📋 CLAUDE.md Files:')}`);
            files.forEach((file, index) => {
              console.log(`${colorize.success(`${index + 1}.`)} ${this.getDisplayName(file)}`);
            });
          }
          break;
        case 'back':
          this.navigator.exitMenu();
          return;
      }
    }
  }

  private validateContent(content: string): string[] {
    const issues: string[] = [];
    
    // Check for basic structure
    if (!content.includes('#')) {
      issues.push('No headers found - consider adding sections with # headers');
    }
    
    // Check for common sections
    const requiredSections = ['bash', 'command', 'style', 'test', 'workflow'];
    const hasRequiredSection = requiredSections.some(section => 
      content.toLowerCase().includes(section)
    );
    
    if (!hasRequiredSection) {
      issues.push('Consider adding sections for commands, code style, testing, or workflow');
    }
    
    // Check length
    if (content.length < 100) {
      issues.push('Content seems quite short - consider adding more detail');
    }
    
    if (content.length > 5000) {
      issues.push('Content is very long - consider being more concise for better Claude performance');
    }
    
    // Check for placeholders
    if (content.includes('TODO') || content.includes('FIXME')) {
      issues.push('Contains TODO/FIXME placeholders that should be completed');
    }
    
    return issues;
  }
} 