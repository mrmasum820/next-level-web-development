## What is Database?

A database is a structured collection of related data that represents some real world entities and are organized for efficient retrieval storage, and management.

### What is data?

Data is facts that can be recorded in the form of ..

### What is information?

Information is processed and organized data that provides meaningful context, insight, or knowledge.

## DBMS - Database Management System

### Storing Data Using File System

- Unstructured data, multiple format (.txt, mp4, image etc.)
- Data redundancy
- Data inconsistency
- No concurrency protocol
- Security issue
- Access complication

### DBMS

1. Relational - MySQL, PostgreSQL, SQLite
2. Document - MongoDB, amazon DynamoDB
3. key value - Redis

## Topics

### Database Model(Relational)

### Table/Relation

### **Keys/Super Key**

A key is a relational database is a field or a combination of fields that uniquely identifies a record in a table.

1. **Super Key**
   1. Attribute or set of attribute by which we can identify each row uniquely
   2. Could be a single attribute or a set of attributes
   3. Could have null values in the set
   4. It actually a superset
   5. **Super key**: {u_id}, {u_id, name}, {u_id, email}, {u_id, name, email, gender, age}, {name, email}, {name, gender}
2. **Candidate key**
   1. Super key whose proper subset is not a super key
   2. Also called Minimal Super Key
   3. Potential Primary Key: From the candidate keys, one is chosen as the primary key. However, all candidate keys are potential choices for the primary key.
   4. **Candidate key**: {u_id}, {name, gender}
3. **Primary key**
   1. From the candidate keys, one key is chosen as the primary key for the table. The primary key is a specific candidate key that is selected as the main identifier for the records in that table.
   2. Should be unique, not null and stable.
   3. **primary key**: {u_id}
4. **Alternate key**
   1. Candidate keys which were not chosen as primary key.
   2. **alternate key**: {name, gender}
5. **Composite key**
   1. Candidate keys which were not chosen as primary key.
   2. composite key: {name, gender}
6. **Foreign key**
   1. One table primary key is set another table key and represents the table

### Design Database

**SDLC - Software Development Life Cycle**

1. Planning
2. Analysis
3. System Design(UI/UX, database design)
4. Building / Development
5. Testing
6. Deployment

**Purpose of Database Design**

Structured organization for efficient data management and retrieval.

**Techniques to design Databases**

1. Top-down
2. Hybrid Approaches
3. Bottom-up

**Entity-Relationship (ER) diagram**

An Entity-Relationship (ER) diagram is a virtual representation used in database design to illustrate the relationships between entities. It shows how different entities in a database related to each other through various types of relationships like one-to-one, one-to-many or many-to-many.

1. **Determining Entities**
   1. Place, Person or thing
   2. Properties or Attributes
   3. Unique identity
   4. Singular name
   5. Should contain more than one instance of data
2. **Determining Attributes**
   1. Should be related to the entity
   2. Should be atomic
   3. Should have keys
3. **Relationships Between Entities(Relationship Cardinality)**

   **Cardinality**

   Relationship cardinality in databases specifies how many instances of one entity are associated with how many instances of another entity.

   **One-to-One(1:1)** - A person has one passport and a passport belongs to only one person.

   **One-to-Many(1:N)** - A university department has multiple students, but each student belongs to only one department.

   **Many-to-One(N:1)** - Many employees work for one company, but each employees works for only one company.

   **Many-to-Many(N:N)** - Students enroll in multiple courses, and each courses has multiple enrolled students.

   **Optional One-to-One(0..1:0..1)** - A person may or may not have a driver’s license, and a driver’s license may or may not be associated with a person.

   **Optional One-to-Many(0..1:N)** - A department may or may not have employees, but and employee belong to a department.
