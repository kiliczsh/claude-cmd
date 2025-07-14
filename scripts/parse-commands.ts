/**
 * Command Parser Script
 * 
 * Generates commands.json from markdown files in the commands/ directory.
 * 
 * Key Features:
 * - Optimized for package size: stores filePath instead of content
 * - Reduces commands.json from 2.4MB to 76kB (30x smaller)
 * - Supports YAML frontmatter for metadata
 * - Recursively scans subdirectories
 * - Ignores template and example files
 * 
 * Usage: npm run parse-commands
 */
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

interface ParsedCommand {
  id: string;
  name: string;
  description: string;
  filePath: string;
  author: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

function parseMarkdownFile(filePath: string, relativePath: string): ParsedCommand | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath, '.md');
    
    // Check for YAML front matter
    const yamlMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    
    let name = fileName;
    let description = '';
    let author = 'claude-command';
    let tags: string[] = [];
    let created_at: string | null = null;
    let updated_at: string | null = null;
    
    if (yamlMatch) {
      // Parse YAML front matter
      try {
        const yamlContent = yamlMatch[1];
        const metadata = yaml.load(yamlContent) as any;
        
        name = metadata.name || fileName;
        description = metadata.description || '';
        author = metadata.author || 'claude-command';
        tags = Array.isArray(metadata.tags) ? metadata.tags : [];
        created_at = metadata.created_at || null;
        updated_at = metadata.updated_at || null;
      } catch (yamlError) {
        console.error(`Error parsing YAML in ${filePath}:`, yamlError);
      }
    } else {
      // Fallback to simple parsing if no YAML front matter
      const lines = content.split('\n');
      for (const line of lines) {
        if (line.startsWith('# ') && !name) {
          name = line.substring(2).trim();
        }
        if (!description && line.trim() && !line.startsWith('#')) {
          description = line.trim();
        }
      }
    }
    
    // Use file stats for dates if not provided
    const stats = fs.statSync(filePath);
    
    // Use relative path for ID to support nested structure
    const commandId = relativePath.replace(/\\/g, '/').replace('.md', '');
    
    return {
      id: commandId,
      name: name || fileName,
      description: description || `Command for ${fileName}`,
      filePath: relativePath,
      author,
      tags: tags.length > 0 ? tags : ['general'],
      created_at: created_at || stats.birthtime.toISOString(),
      updated_at: updated_at || stats.mtime.toISOString()
    };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return null;
  }
}

function getAllMarkdownFiles(dir: string, baseDir: string): { filePath: string; relativePath: string }[] {
  const results: { filePath: string; relativePath: string }[] = [];
  const items = fs.readdirSync(dir);

  // Files to ignore during parsing
  const ignoredFiles = [
    'TEMPLATE.md',
    'README.md',
    'template.md',
    'example.md',
    '.template.md'
  ];

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      // Recursively scan subdirectories
      results.push(...getAllMarkdownFiles(fullPath, baseDir));
    } else if (item.endsWith('.md') && !ignoredFiles.includes(item)) {
      // Calculate relative path from base commands directory
      const relativePath = path.relative(baseDir, fullPath);
      results.push({ filePath: fullPath, relativePath });
    }
  }

  return results;
}

async function main() {
  const commandsDir = path.join(process.cwd(), 'commands');
  const outputDir = commandsDir;
  
  // Read all markdown files recursively
  const markdownFiles = getAllMarkdownFiles(commandsDir, commandsDir);
  
  // Parse all commands
  const commands: ParsedCommand[] = [];
  for (const { filePath, relativePath } of markdownFiles) {
    const parsed = parseMarkdownFile(filePath, relativePath);
    if (parsed) {
      commands.push(parsed);
    }
  }
  
  // Sort commands by ID (which includes path)
  commands.sort((a, b) => a.id.localeCompare(b.id));
  
  // Generate JSON
  const jsonPath = path.join(outputDir, 'commands.json');
  fs.writeFileSync(jsonPath, JSON.stringify(commands, null, 2));
  console.log(`Generated ${jsonPath}`);
  console.log(`\nParsed ${commands.length} commands successfully!`);
  
  // Display found commands with their structure
  console.log('\nFound commands:');
  commands.forEach(cmd => {
    console.log(`  ${cmd.id} - ${cmd.name}`);
  });
}

main().catch(console.error);