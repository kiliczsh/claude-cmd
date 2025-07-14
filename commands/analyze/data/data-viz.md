---
allowed-tools: Read, Write, Edit, MultiEdit, Task, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Bash(wc:*)
name: "Data Viz"
description: "Generate interactive data visualizations and dashboards with intelligent chart selection and real-time updates"
author: "wcygan"
tags: ["analyze","data"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Data files: !`fd "\.(csv|json|xlsx|parquet|tsv|xml)$" --max-depth 3 | head -10 || echo "No data files found"`
- Database configs: !`fd "(knex|prisma|typeorm|sequelize|deno\.json|package\.json)" --max-depth 2 | head -5 || echo "No database configs found"`
- API endpoints: !`rg "/(api|data|metrics|analytics)/" --type js --type ts --type go --type rust | head -10 || echo "No API endpoints found"`
- Technology stack: !`fd "(deno\.json|package\.json|Cargo\.toml|go\.mod)" --max-depth 2 | head -5 || echo "No framework files detected"`
- Existing dashboards: !`rg "(dashboard|chart|visualization|d3|chartjs)" --type js --type ts | head -5 || echo "No existing dashboards found"`
- Analytics tools: !`fd "(grafana|kibana|metabase|analytics)" --type d | head -5 || echo "No analytics tools found"`
- Data volume estimate: !`fd "\.(csv|json|xlsx)$" --max-depth 3 -x wc -l {} \; 2>/dev/null | head -5 || echo "No data volume info"`

## Your Task

Generate interactive data visualizations and dashboards for: **$ARGUMENTS**

STEP 1: Session Initialization and State Management

- Initialize session state file: /tmp/data-viz-state-$SESSION_ID.json
- Create temporary workspace: /tmp/data-viz-workspace-$SESSION_ID/
- Set up analysis tracking and progress monitoring

```json
// /tmp/data-viz-state-$SESSION_ID.json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "target": "$ARGUMENTS",
  "phase": "initialization",
  "discovery": {
    "dataFiles": [],
    "apiEndpoints": [],
    "databaseSchemas": [],
    "existingDashboards": []
  },
  "analysis": {
    "dataTypes": {},
    "chartRecommendations": [],
    "frameworkChoice": null,
    "complexity": "simple|moderate|complex"
  },
  "generation": {
    "components": [],
    "assets": [],
    "configurations": []
  },
  "checkpoints": {
    "discovery_complete": false,
    "analysis_complete": false,
    "generation_complete": false,
    "validation_complete": false,
    "deployment_ready": false
  }
}
```

STEP 2: Data Discovery and Schema Analysis

IF $ARGUMENTS provided:

- Analyze specified data source (file, URL, or description)
- Skip comprehensive discovery and focus on target analysis
  ELSE:
- Execute comprehensive data source discovery

Think deeply about optimal data discovery strategies and visualization opportunities for this project.

Use parallel sub-agents for comprehensive data discovery:

- **Agent 1**: File Data Discovery and Schema Analysis
  - Analyze CSV, JSON, Excel files for structure and content
  - Determine data types, ranges, and relationships
  - Identify temporal patterns and categorical distributions
  - Extract sample data for chart recommendations

- **Agent 2**: API Data Discovery and Integration Analysis
  - Discover REST/GraphQL endpoints returning data
  - Test endpoint schemas and response formats
  - Analyze real-time data capabilities and update frequencies
  - Document authentication and access requirements

- **Agent 3**: Database Schema Analysis
  - Detect database configurations and connection strings
  - Analyze table schemas and relationship mappings
  - Identify time-series tables and aggregation opportunities
  - Evaluate query performance and optimization needs

- **Agent 4**: Existing Analytics Infrastructure Assessment
  - Find existing dashboards, charts, and visualization tools
  - Analyze current visualization libraries and frameworks
  - Identify integration opportunities and migration paths
  - Assess team preferences and technical constraints

TRY:

- Execute parallel data discovery across all available sources
- Consolidate findings into comprehensive data inventory
- Update state: discovery_complete = true, phase = "analysis"
  CATCH (no_data_sources_found):
- Generate sample datasets for demonstration purposes
- Create mock API endpoints for prototype development
- Document ideal data source requirements
- Update state with fallback data generation plan

STEP 3: Intelligent Chart Recommendation and Framework Selection

Think harder about visualization design principles and optimal chart selection strategies for the discovered data patterns.

PROCEDURE analyze_data_characteristics():

- FOR EACH discovered data source:
  - Classify data types: numerical, categorical, temporal, geographical, hierarchical
  - Calculate data volumes and update frequencies
  - Identify key relationships and correlation opportunities
  - Determine aggregation levels and drill-down possibilities

PROCEDURE recommend_visualizations():

- FOR EACH data characteristic pattern:

  **Temporal Data Patterns**:
  - IF time_series_data: RECOMMEND line charts, area charts, time heatmaps
  - IF seasonal_patterns: RECOMMEND calendar heatmaps, cycle plots
  - IF real_time_streams: RECOMMEND live updating dashboards

  **Categorical Data Patterns**:
  - IF few_categories (<=10): RECOMMEND bar charts, pie charts, treemaps
  - IF many_categories (>10): RECOMMEND horizontal bars, word clouds, sunburst
  - IF hierarchical_categories: RECOMMEND treemaps, sankey diagrams

  **Numerical Data Patterns**:
  - IF distributions: RECOMMEND histograms, box plots, violin plots
  - IF correlations: RECOMMEND scatter plots, correlation matrices
  - IF multi_dimensional: RECOMMEND parallel coordinates, radar charts

  **Geographical Data Patterns**:
  - IF coordinates: RECOMMEND scatter maps, choropleth maps
  - IF regions: RECOMMEND filled maps, symbol maps
  - IF movement: RECOMMEND flow maps, animated paths

PROCEDURE select_optimal_framework():

- Detect project technology stack from context
- Evaluate framework compatibility and capabilities
- Consider team expertise and maintenance requirements

CASE technology_stack:
WHEN "deno/fresh":

- PRIMARY: D3.js + Preact components + Islands architecture
- FALLBACK: Chart.js + vanilla JavaScript integration
- FEATURES: SSR visualization, interactive islands, real-time updates

WHEN "react/next":

- PRIMARY: Recharts + Chart.js + D3.js for complex visualizations
- FALLBACK: Victory charts for lightweight needs
- FEATURES: Component composition, server-side rendering, TypeScript support

WHEN "vue/nuxt":

- PRIMARY: Vue-ChartJS + Chart.js + D3.js integration
- FALLBACK: ApexCharts Vue wrapper
- FEATURES: Reactive data binding, component lifecycle hooks

WHEN "static_site":

- PRIMARY: Chart.js + D3.js + vanilla JavaScript
- FALLBACK: Plotly.js for scientific visualizations
- FEATURES: No build dependencies, direct HTML integration

DEFAULT:

- UNIVERSAL: Chart.js as foundation with D3.js for advanced needs
- APPROACH: Framework-agnostic web components
- DEPLOYMENT: Static assets with CDN integration

- Update state: analysis_complete = true, phase = "generation"

STEP 4: Dashboard Architecture and Component Generation

Think deeply about dashboard architecture patterns, user experience design, and progressive enhancement strategies.

PROCEDURE design_dashboard_architecture():

- Create responsive grid layout system
- Design component hierarchy and data flow
- Plan real-time update mechanisms and state management
- Implement progressive loading and error boundaries

PROCEDURE generate_core_components():

**1. Data Processing Pipeline**:

```typescript
// Generated data transformation engine
interface DataProcessor {
  transform(rawData: any[]): ProcessedData[];
  aggregate(data: ProcessedData[], method: string): AggregatedData;
  filter(data: ProcessedData[], criteria: FilterCriteria): ProcessedData[];
}

class UniversalDataProcessor implements DataProcessor {
  transform(rawData: any[]): ProcessedData[] {
    return rawData.map((row) => ({
      ...row,
      timestamp: this.parseTimestamp(row.timestamp || row.date || row.time),
      numerical: this.extractNumerical(row),
      categorical: this.extractCategorical(row),
    }));
  }
}
```

**2. Chart Component Factory**:

```typescript
// Generated chart component system
interface ChartComponent {
  type: string;
  render(container: string, data: any[], options?: any): void;
  update(newData: any[]): void;
  destroy(): void;
}

class ChartFactory {
  static create(type: string, framework: string): ChartComponent {
    switch (type) {
      case "line":
        return new LineChartComponent(framework);
      case "bar":
        return new BarChartComponent(framework);
      case "scatter":
        return new ScatterChartComponent(framework);
        // ... additional chart types
    }
  }
}
```

**3. Real-time Data Integration**:

```typescript
// Generated real-time data system
class RealTimeDataManager {
  private websocket?: WebSocket;
  private pollingInterval?: number;

  startRealTimeUpdates(endpoint: string, updateCallback: (data: any) => void): void {
    // WebSocket implementation for real-time data
    // Polling fallback for REST APIs
    // Error handling and reconnection logic
  }
}
```

TRY:

- Generate complete dashboard codebase with all components
- Create responsive CSS framework for cross-device compatibility
- Implement accessibility features (ARIA labels, keyboard navigation)
- Add export functionality (PDF, PNG, CSV, JSON)
- Update state: generation_complete = true

CATCH (complex_visualization_requirements):

- Use extended thinking to design sophisticated visualization strategies
- Break down complex requirements into manageable component hierarchy
- Implement progressive disclosure and drill-down capabilities
- Create modular architecture for future extensibility

CATCH (performance_optimization_needed):

- Implement virtual scrolling for large datasets
- Add data sampling and aggregation strategies
- Use web workers for heavy data processing
- Implement lazy loading and progressive rendering

STEP 5: Testing, Validation, and Quality Assurance

PROCEDURE validate_dashboard_functionality():

- Test responsive design across device sizes
- Validate data accuracy and chart rendering
- Test real-time updates and error handling
- Verify accessibility compliance (WCAG 2.1)
- Performance testing with large datasets

TRY:

- Execute comprehensive testing suite
- Validate cross-browser compatibility
- Test data source integrations and error scenarios
- Verify export functionality and data integrity
- Update state: validation_complete = true

CATCH (validation_failures):

- Document failing test cases and root causes
- Implement fixes for critical validation issues
- Create fallback options for non-critical failures
- Update testing strategy for edge cases

STEP 6: Deployment Configuration and Documentation

PROCEDURE generate_deployment_assets():

- Create production-ready build configuration
- Generate CI/CD pipeline for automated updates
- Set up monitoring and analytics for dashboard usage
- Create comprehensive documentation and user guides

FOR EACH deployment_target IN ["static", "serverless", "containerized"]:

- Generate appropriate deployment configuration
- Create environment-specific optimizations
- Document scaling and maintenance procedures
- Set up monitoring and alerting systems

TRY:

- Generate complete deployment package
- Create automated deployment scripts
- Set up performance monitoring and user analytics
- Generate comprehensive documentation
- Update state: deployment_ready = true, phase = "complete"

CATCH (deployment_complexity):

- Provide multiple deployment options
- Create simplified deployment for basic use cases
- Document manual deployment procedures
- Provide troubleshooting guides

STEP 7: Final Report Generation and Session Cleanup

```json
// /tmp/data-viz-final-report-$SESSION_ID.json
{
  "sessionId": "$SESSION_ID",
  "completionTime": "ISO_8601_TIMESTAMP",
  "target": "$ARGUMENTS",
  "summary": {
    "dataSourcesAnalyzed": "count",
    "chartsGenerated": "count",
    "dashboardsCreated": "count",
    "frameworkSelected": "framework_name",
    "deploymentReady": "boolean"
  },
  "generated_assets": {
    "components": [],
    "stylesheets": [],
    "configurations": [],
    "documentation": []
  },
  "performance_metrics": {
    "loadTime": "milliseconds",
    "renderTime": "milliseconds",
    "dataProcessingTime": "milliseconds",
    "memoryUsage": "mb"
  },
  "recommendations": {
    "optimization_opportunities": [],
    "scaling_considerations": [],
    "maintenance_schedule": [],
    "future_enhancements": []
  }
}
```

FINALLY:

- Archive session artifacts: /tmp/data-viz-archive-$SESSION_ID/
- Generate executive summary with key metrics
- Clean up temporary workspace files
- Provide next steps and maintenance recommendations
- Update session state: phase = "archived"

## Advanced Visualization Patterns

### For Complex Data Relationships:

- **Network Visualizations**: Node-link diagrams, force-directed layouts
- **Hierarchical Data**: Treemaps, sunburst charts, icicle plots
- **Multi-dimensional Analysis**: Parallel coordinates, radar charts, small multiples

### For Real-time Monitoring:

- **Live Dashboards**: WebSocket integration, streaming data processing
- **Alert Visualizations**: Threshold monitoring, anomaly detection
- **Historical Comparisons**: Time-shifted overlays, period-over-period analysis

### For Interactive Exploration:

- **Drill-down Capabilities**: Progressive disclosure, detail-on-demand
- **Cross-filtering**: Linked visualizations, brushing and linking
- **Dynamic Aggregation**: User-controlled grouping and summarization

## Integration Patterns

### Data Source Integration:

- **File-based**: CSV, JSON, Excel parsing with validation
- **API Integration**: REST, GraphQL, WebSocket real-time feeds
- **Database Connectivity**: SQL queries, NoSQL aggregations
- **Cloud Services**: AWS, GCP, Azure data lake integration

### Framework-Specific Implementations:

- **Fresh/Deno**: Islands architecture with SSR visualization
- **React/Next.js**: Component composition with server-side rendering
- **Vue/Nuxt**: Reactive data binding with composition API
- **Static Sites**: CDN-optimized assets with progressive enhancement

## Session State Schema

**State Files Created:**

- `/tmp/data-viz-state-$SESSION_ID.json` - Main session state
- `/tmp/data-viz-workspace-$SESSION_ID/` - Temporary workspace
- `/tmp/data-viz-final-report-$SESSION_ID.json` - Completion report
- `/tmp/data-viz-archive-$SESSION_ID/` - Archived artifacts

**Resumability Features:**

- Checkpoint-based progress tracking
- Partial generation recovery
- State validation and consistency checks
- Cross-session artifact preservation