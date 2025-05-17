### **PSQL Commands**

### Topics

**Exploring PSQL and its default behavior, creating database**

```tsx
// if use cmd / powershell
psql
psql -U postgres  // for going to postgress default database
psql -U postgres -d test_db
\conninfo  // show the connected database
\l  // show all databases

\c template1  // switch databases
create database test_db;
```

**User, Role and Privilege management in postgres**

**granting and revoking privileges**

```tsx
\dn  // show schemas
\!cls  // clear commands
\du  // show database users
create user user1 with login encrypted password '123456';
create role role1 with login encrypted password '123456';

// postgres default user
create table test_table (name varchar(50));  // create table
\d  // show table
insert into test_table(name) values("masum");  // insert row into table
select * from test_table;  // see tables

// give permissions to user1 all privileges
grant all privileges on table test_table to user1;  // give permission read, write, update
insert into test_table(name) values("shawan");

create user user2 with encrypted password '123456';
grant select on table test_table to user2;  // give permission for read

revoke select on table test_table to user2;  // delete permission to user2
grant all privileges on all tables schema public to user2;  // give all permisson with schema

create user user3 with encrypted password '123456'
grant role1 to user3;

// roll permissions
create role role1;
\du
grand select on all tables in schema public to role1;  // select -> read

// user1
psql -U user1 -d postgres;
\conninfo  // connected with user1
select * from test_table;  // permission denied for table test_table

// user2
psql -U user2 -d postgres
select * from test_table;  // see the tables from postgres
insert into test_table(name) values('test');  // permission denied

```

**Structured Query Language(SQL)**

Query language(Declarative language) for communicating with database.

SELECT \* FROM test_table; // SQL statement / Query

**SQL Commands**

| DDL      | DML    | DCL    | TCL       | DQL    |
| -------- | ------ | ------ | --------- | ------ |
| CREATE   | INSERT | GRAND  | COMMIT    | SELECT |
| DROP     | UPDATE | REVOKE | ROLLBACK  |        |
| ALTER    | DELETE |        | SAVEPOINT |        |
| TRUNCATE |        |        |           |        |

**Exploring pgAdmin and Valentina Studio**

**Data types**

| id
(SERIAL) | employee_id
(INTEGER) | name
(VARCHAR(50)) | dob
(DATE) | is_active
(BOOLEAN) | salary
(NUMERIC(10, 2)) |
| --- | --- | --- | --- | --- | --- |
| 1 | 4500 | John | 1990-05-15 | true | 65000.00 |
| 2 | 8962 | Doe | 1985-02-11 | false | 45000.00 |

Other data types - **Boolean, Numbers**, Binary, **Date/Time**, Json, **Character, UUID**, Array, XML

**Boolean** - true, false, null

**Integers** - (INT, BIGINT, SMALLINT), (FLOAT4, FLOAT8), NUMERIC(3, 4), Serial

**Characters** - CHAR, VARCHAR, TEXT

**Date** - 20-Dec-1980, 1980-12-20, Dec-20-1980

**UUID** - Universally Unique Identifier(ex, 3c0ab34f-51f4-84ee-b197af61dcb3)

**Column Constraints - NOT NULL, UNIQUE, PRIMARY KEY, REFERENCES, DEFAULT, CHECK**

**Create, Update and Delete Database**

```tsx
create database test;  // create database
\l
\!cls
alter database test rename to test_db;  // rename database
drop database test_db;  // delete database

// create table with datatype
create table person (
	person_id SERIAL,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	age INTEGER,
	isActive BOOLEAN,
	dob DATE
);

alter table person rename to "user";  // rename table name
drop table "user";  // delete a table

// create table columns with constraints
create table person (
	id serial PRIMARY KEY,
	user_name VARCHAR(20) NOT NULL,
	age INTEGER CHECK (age >= 18)

	// PRIMARY KEY(id, user_name)
	// UNIQUE(user_name, age)
);
```

**Inserting data into a table and checking constraints**

```tsx
// single row insert
INSERT INTO table_name (column1, column2, column3) VALUES (value1, value2, value3);

// multi row insert
INSERT INTO table_name (column1, column2, column3)
VALUES
(value1_1, value2_1, value3_1),
(value1_2, value2_2, value3_2),

// alternate signature(has some drawbacks)
INSERT INTO table_name
VALUES (value1, value3, value3, ...);
```
