---
allowed-tools: Read, Write, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(git:*), Task
name: "Data Flow"
description: "Analyze and design data processing pipelines with automatic source detection and transformation logic"
author: "wcygan"
tags: ["analyze","data"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Project structure: !`fd . -t d -d 3 | head -20`
- Data-related files: !`fd -e json -e csv -e sql -e py -e rs -e go -e java . | rg "(data|etl|pipeline|stream|batch)" | head -10 || echo "No data processing files detected"`
- Configuration files: !`fd "(config|\.env|docker-compose)" . -t f | head -5 || echo "No config files found"`
- Database connections: !`rg -i "(database_url|db_host|mongodb|postgres|mysql|redis)" . | head -5 || echo "No database configs found"`
- Git status: !`git status --porcelain | head -5 || echo "Not a git repository"`

## Your Task

Think deeply about the optimal data flow analysis approach for this project. Consider performance, scalability, and architectural patterns.

STEP 1: Initialize analysis session

- CREATE session state file: `/tmp/data-flow-analysis-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "phase": "discovery",
    "timestamp": "$CURRENT_TIME",
    "sources": [],
    "destinations": [],
    "transformations": [],
    "recommendations": []
  }
  ```

STEP 2: Determine analysis scope

IF $ARGUMENTS contains specific source/destination:

- FOCUS on targeted pipeline analysis
- SET scope to "targeted"
  ELSE IF project size > 1000 files:
- USE sub-agent delegation for parallel discovery
- SET scope to "comprehensive"
  ELSE:
- PERFORM sequential analysis
- SET scope to "standard"

STEP 3: Data source discovery

FOR comprehensive scope:

- DELEGATE to 5 parallel sub-agents:
  1. **Database Discovery Agent**: Analyze all database connections and schemas
  2. **File Source Agent**: Catalog structured data files (CSV, JSON, Parquet, XML)
  3. **API Source Agent**: Discover REST/GraphQL endpoints and streaming APIs
  4. **Log Analysis Agent**: Identify log files and extraction patterns
  5. **Stream Source Agent**: Find message queues and real-time data streams

FOR standard scope:

- EXECUTE sequential discovery:
  - Scan database configuration files
  - Inventory structured data files
  - Check for API endpoint definitions
  - Identify log file patterns

STEP 4: Pipeline pattern analysis

- ANALYZE existing data processing code:
  - ETL vs ELT patterns
  - Batch vs stream processing
  - Error handling strategies
  - Monitoring and observability

- IDENTIFY transformation requirements:
  - Data quality validation
  - Schema transformation needs
  - Aggregation patterns
  - Business rule applications

STEP 5: Architecture recommendations

- EVALUATE current tech stack compatibility
- SUGGEST optimal pipeline architecture:
  - Processing framework recommendations
  - Destination storage strategies
  - Monitoring and alerting setup
  - Scalability considerations

STEP 6: Generate implementation artifacts

TRY:

- CREATE pipeline design document
- GENERATE sample transformation code
- PRODUCE monitoring configuration
- BUILD deployment scripts
  CATCH (missing dependencies):
- DOCUMENT required framework installations
- SUGGEST alternative implementations
- PROVIDE fallback strategies

STEP 7: State management and cleanup

- UPDATE session state with final results
- SAVE analysis artifacts to project directory
- CHECKPOINT final recommendations
- CLEAN UP temporary session files

## Sub-Agent Delegation Pattern

FOR large-scale codebases (>1000 files), delegate to parallel agents:

### Database Discovery Agent

- Scan for database connection strings and configurations
- Analyze table schemas and relationships
- Identify data volume and update patterns
- Map existing database-to-database flows

### File Source Agent

- Catalog all structured data files by type and location
- Sample file contents for schema inference
- Identify file naming patterns and partitioning schemes
- Assess data quality and completeness

### API Source Agent

- Discover REST endpoints through OpenAPI specs or code analysis
- Analyze GraphQL schemas and query patterns
- Identify authentication and rate limiting requirements
- Map API data models and response structures

### Log Analysis Agent

- Find application and system log files
- Identify log formats and parsing requirements
- Analyze log volume and retention patterns
- Suggest structured logging improvements

### Stream Source Agent

- Discover message queue configurations (Kafka, RabbitMQ, etc.)
- Analyze stream schemas and partitioning strategies
- Identify real-time processing requirements
- Map event-driven architecture patterns

## Data Source Discovery Patterns

### Database Sources

**Relational Database Analysis**

```sql
-- PostgreSQL/MySQL schema discovery
SELECT 
    table_name, 
    column_name, 
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;

-- Table size and row count analysis
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
    pg_stat_user_tables.n_tup_ins + pg_stat_user_tables.n_tup_upd + pg_stat_user_tables.n_tup_del as total_changes
FROM pg_tables 
JOIN pg_stat_user_tables ON pg_tables.tablename = pg_stat_user_tables.relname;
```

**NoSQL Database Analysis**

```javascript
// MongoDB collection analysis
db.runCommand("listCollections").cursor.firstBatch.forEach(
  function (collection) {
    print("Collection: " + collection.name);
    var sample = db[collection.name].findOne();
    if (sample) {
      print("Sample document schema:");
      printjson(Object.keys(sample));
    }
  },
);

// Redis key pattern analysis
const redis = require("redis");
const client = redis.createClient();
client.keys("*", (err, keys) => {
  const patterns = {};
  keys.forEach((key) => {
    const pattern = key.split(":")[0] || "unstructured";
    patterns[pattern] = (patterns[pattern] || 0) + 1;
  });
  console.log("Key patterns:", patterns);
});
```

### File-Based Sources

**Structured File Analysis**

- CSV/TSV: Column analysis, data type inference, delimiter detection
- JSON/JSONL: Schema extraction, nested structure flattening
- Parquet/Avro: Metadata inspection, compression analysis
- XML: XPath mapping, namespace handling

**Log File Processing**

- Application logs: Pattern recognition, field extraction
- Web server logs: Access pattern analysis, error categorization
- System logs: Event correlation, performance metrics
- Custom formats: Regex development, parsing validation

### Stream Processing Patterns

**Real-time Data Flows**

```python
# Kafka stream processing example
from kafka import KafkaConsumer, KafkaProducer
import json

def process_stream_data():
    consumer = KafkaConsumer(
        'input-topic',
        bootstrap_servers=['localhost:9092'],
        value_deserializer=lambda x: json.loads(x.decode('utf-8'))
    )
    
    producer = KafkaProducer(
        bootstrap_servers=['localhost:9092'],
        value_serializer=lambda x: json.dumps(x).encode('utf-8')
    )
    
    for message in consumer:
        # Transform data
        transformed = {
            'timestamp': message.value.get('timestamp'),
            'processed_at': time.time(),
            'data': clean_and_validate(message.value)
        }
        
        # Send to output topic
        producer.send('processed-topic', transformed)
```

**Micro-batch Processing**

```python
# Structured Streaming with checkpoints
from pyspark.sql import SparkSession
from pyspark.sql.functions import *

spark = SparkSession.builder.appName("DataFlowAnalysis").getOrCreate()

# Read streaming data
stream_df = spark \
    .readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:9092") \
    .option("subscribe", "input-topic") \
    .load()

# Transform and aggregate
processed_df = stream_df \
    .select(from_json(col("value").cast("string"), schema).alias("data")) \
    .select("data.*") \
    .withWatermark("timestamp", "10 minutes") \
    .groupBy(window(col("timestamp"), "5 minutes"), col("category")) \
    .count()

# Output with checkpointing
query = processed_df \
    .writeStream \
    .outputMode("append") \
    .format("console") \
    .option("checkpointLocation", "/tmp/checkpoint") \
    .start()
```

## Pipeline Architecture Patterns

### ETL vs ELT Decision Matrix

**Use ETL when:**

- Source systems have limited compute capacity
- Data requires complex transformations before loading
- Target system has strict schema requirements
- Processing logic is stable and well-defined

**Use ELT when:**

- Target system has powerful compute capabilities
- Schema-on-read flexibility is required
- Rapid prototyping and iteration needed
- Multiple downstream consumers with different requirements

### Monitoring and Observability

**Data Quality Metrics**

```python
def calculate_data_quality_metrics(df):
    """Calculate comprehensive data quality scores"""
    total_records = df.count()
    
    metrics = {
        'completeness': {
            'total_records': total_records,
            'null_percentage': df.select([
                (count(when(col(c).isNull(), c))/total_records).alias(c) 
                for c in df.columns
            ]).collect()[0].asDict()
        },
        'uniqueness': {
            'duplicate_count': total_records - df.dropDuplicates().count(),
            'unique_percentage': df.dropDuplicates().count() / total_records
        },
        'consistency': {
            'schema_compliance': validate_schema_compliance(df),
            'business_rule_violations': check_business_rules(df)
        },
        'freshness': {
            'latest_timestamp': df.agg(max('timestamp')).collect()[0][0],
            'processing_lag': calculate_processing_lag(df)
        }
    }
    
    return metrics
```

**Performance Monitoring**

```python
# Pipeline performance tracking
import time
from functools import wraps

def monitor_performance(operation_name):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            start_time = time.time()
            try:
                result = func(*args, **kwargs)
                execution_time = time.time() - start_time
                
                # Log metrics
                log_metric({
                    'operation': operation_name,
                    'execution_time': execution_time,
                    'status': 'success',
                    'timestamp': time.time()
                })
                
                return result
            except Exception as e:
                execution_time = time.time() - start_time
                log_metric({
                    'operation': operation_name,
                    'execution_time': execution_time,
                    'status': 'error',
                    'error_message': str(e),
                    'timestamp': time.time()
                })
                raise
        return wrapper
    return decorator
```

## Framework-Specific Implementations

### Python Ecosystem

**Apache Airflow DAG**

```python
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.operators.bash_operator import BashOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'data-engineering',
    'depends_on_past': False,
    'start_date': datetime(2024, 1, 1),
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 2,
    'retry_delay': timedelta(minutes=5)
}

dag = DAG(
    'data_pipeline',
    default_args=default_args,
    description='Data processing pipeline',
    schedule_interval='@daily',
    catchup=False
)

extract_task = PythonOperator(
    task_id='extract_data',
    python_callable=extract_from_sources,
    dag=dag
)

validate_task = PythonOperator(
    task_id='validate_data',
    python_callable=validate_data_quality,
    dag=dag
)

transform_task = PythonOperator(
    task_id='transform_data', 
    python_callable=apply_transformations,
    dag=dag
)

load_task = PythonOperator(
    task_id='load_data',
    python_callable=load_to_warehouse,
    dag=dag
)

extract_task >> validate_task >> transform_task >> load_task
```

### JVM Ecosystem

**Apache Spark Pipeline**

```scala
import org.apache.spark.sql.{SparkSession, DataFrame}
import org.apache.spark.sql.functions._

object DataPipeline {
  def main(args: Array[String]): Unit = {
    val spark = SparkSession.builder()
      .appName("DataFlowAnalysis")
      .config("spark.sql.adaptive.enabled", "true")
      .config("spark.sql.adaptive.coalescePartitions.enabled", "true")
      .getOrCreate()

    // Extract from multiple sources
    val sources = Map(
      "customers" -> spark.read.parquet("s3://data-lake/customers/"),
      "orders" -> spark.read.parquet("s3://data-lake/orders/"),
      "products" -> spark.read.parquet("s3://data-lake/products/")
    )

    // Transform and enrich
    val enriched_orders = sources("orders")
      .join(sources("customers"), "customer_id")
      .join(sources("products"), "product_id")
      .withColumn("order_value", col("quantity") * col("unit_price"))
      .withColumn("processing_date", current_date())

    // Aggregate and summarize
    val daily_summary = enriched_orders
      .groupBy(col("processing_date"), col("product_category"))
      .agg(
        sum("order_value").alias("total_revenue"),
        count("order_id").alias("order_count"),
        countDistinct("customer_id").alias("unique_customers")
      )

    // Load to destinations
    daily_summary.write
      .mode("overwrite")
      .partitionBy("processing_date")
      .parquet("s3://data-warehouse/daily-summary/")

    spark.stop()
  }
}
```

### Rust/Go High-Performance Processing

**Rust Data Processing**

```rust
use polars::prelude::*;
use tokio::fs::File;
use std::error::Error;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    // Read from multiple sources concurrently
    let (df1, df2) = tokio::try_join!(
        read_parquet_async("data/source1.parquet"),
        read_csv_async("data/source2.csv")
    )?;

    // Transform and join
    let result = df1
        .lazy()
        .join(
            df2.lazy(),
            [col("id")],
            [col("id")], 
            JoinArgs::new(JoinType::Inner)
        )
        .with_columns([
            (col("amount") * col("rate")).alias("calculated_value"),
            lit(chrono::Utc::now().timestamp()).alias("processed_at")
        ])
        .filter(col("status").eq(lit("active")))
        .groupby([col("category")])
        .agg([
            col("calculated_value").sum().alias("total_value"),
            col("id").count().alias("record_count")
        ])
        .collect()?;

    // Write to destination
    let mut file = File::create("output/processed_data.parquet").await?;
    result.write_parquet(&mut file, CompressionOptions::Snappy)?;

    Ok(())
}
```

## Output Artifacts

GENERATE the following artifacts based on analysis:

**1. Pipeline Design Document** (`/pipeline-design-$SESSION_ID.md`)

- Source system specifications and connection details
- Transformation logic and business rule definitions
- Destination configuration and schema mappings
- Performance optimization recommendations
- Monitoring and alerting strategy

**2. Implementation Code** (`/pipeline-implementation-$SESSION_ID/`)

- Framework-specific pipeline code (Airflow, Spark, etc.)
- Configuration files and environment variables
- Data validation and quality check functions
- Error handling and retry logic
- Unit and integration test suites

**3. Operational Runbook** (`/operations-runbook-$SESSION_ID.md`)

- Deployment procedures and infrastructure requirements
- Monitoring dashboard configurations
- Alert threshold definitions and escalation procedures
- Troubleshooting guides and common issue resolution
- Performance tuning guidelines and capacity planning

**4. Data Quality Framework** (`/data-quality-$SESSION_ID.json`)

- Schema validation rules and constraints
- Business rule definitions and validation logic
- Data profiling results and baseline metrics
- Anomaly detection thresholds and alerting rules

The analysis adapts recommendations based on detected data sources, existing infrastructure, performance requirements, and scalability needs, providing a comprehensive data flow solution tailored to the specific environment and use case.