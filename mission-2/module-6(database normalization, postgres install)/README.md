## Anomalies

Anomalies in databases refer to inconsistencies or unexpected issues that can occur during data manipulation or retrieval.

There are three main types of anomalies:

1. Update anomalies
2. Delete anomalies
3. Insert anomalies

## Normalization

### 1. Functional Dependency

Functional dependency in simple terms means that the value of one attribute (or set of attributes) uniquely determines the value of another attribute(s) in a database table.

X —> Y

t1.x = t2.x

then, t1.y = t2.y

### 2. Normal Form

A series of guidelines that help to ensure that the design of a database is efficient, organized and free from data anomalies.

**1NF:**

- Atomic values
- Unique column names
- Positional dependency of data
- Column should contain data that are of the same type
- Determine primary key

**2NF:**

- Must be in 1NF
- Must not contain any non-prime / non-key attribute that is functionally dependent on a proper subset of any candidate key of the relation.

**3NF:**

- Must be in 2NF
- Must not contain **transitive** dependency

## PostgreSQL

The world’ most advanced Open Source Relational Database Management System.

1. Open Source
2. RDBMS
3. Modern
4. ACID Compliance
5. Advanced Data Types
6. Scalability
7. Indexing
8. Community Support
