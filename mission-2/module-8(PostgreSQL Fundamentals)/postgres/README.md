### Alter

1. Rename a table
2. Modify data type of a column
3. Add / Drop column
4. Setting default value for a column
5. Rename a column
6. Add / Drop constraint for a column

**Expanding on the alter keyword for table modification:**

```tsx
ALTER TABLE table_name
action;

SELECT * from person2;
// ADD COLUMN
ALTER TABLE person2
	ADD COLUMN email VARCHAR(25) DEFAULT 'default@gmail.com' NOT NULL;

INSERT INTO person2 values(7, 'test1', 45, 'test@gmail.com')

// Delete column
ALTER TABLE person2
	DROP COLUMN email;

// Rename column
ALTER TABLE person2
	RENAME COLUMN age to user_age;

// Add column type
ALTER TABLE person2
	ALTER COLUMN user_age set NOT NULL;

// column type change
ALTER TABLE person2
	ALTER COLUMN user_name TYPE VARCHAR(50);

// delete existing column type
ALTER TABLE person2
	ALTER COLUMN user_age DROP NOT NULL;
```

**Different methods to alter tables**

```tsx
ALTER TABLE person2
	ADD constraint unique_person2_user_age UNIQUE(user_age);

ALTER TABLE person2
	DROP constraint unique_person2_user_age UNIQUE(user_age);

TRUNCATE TABLE person2;  // table structure will be remain but data will gone
```

### Select

The **SELECT** statement is used to retrieve data from one or more tables and can be customized with conditions, sorting, and other clauses.

**SELECT:** Retrieves data from one or more tables.

**FROM:** Specifies the table from which to retrieve data.

**WHERE:** Filters data based on specified columns.

**ORDER:** Sorts the result set based on specified columns.

**GROUP BY:** Groups rows that have the same values in specified columns.

**HAVING:** Filters the results of a GROUP BY clause based on specified conditions.

**JOIN:** Combines rows from two or more tables based on a related column.

**DISTINCT:** Returns unique values in the result set.

**LIMIT:** Specifies the maximum number of rows to return.

**OFFSET:** Specifies the number of rows to skip before starting to return rows.

```tsx
CREATE TABLE students (
	student_id SERIAL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	age INT,
	grade CHAR(2),
	course VARCHAR(50),
	email VARCHAR(100),
	dob DATE,
	blood_group VARCHAR(5),
	country VARCHAR(50)
)

INSERT INTO students (first_name, last_name, age, grade, course,  email, dob, blood_group, country)
VALUES
('Alice', 'Johnson', 20, 'A', 'Computer Science', 'alice.johnson@example.com', '2005-03-15', 'A+', 'USA'),
('Bob', 'Smith', 22, 'B', 'Mathematics', 'bob.smith@example.com', '2003-07-08', 'B+', 'Canada'),
('Charlie', 'Brown', 19, 'A', 'Physics', 'charlie.brown@example.com', '2006-11-20', 'O-', 'UK'),
('Diana', 'Martinez', 21, 'C', 'Biology', 'diana.martinez@example.com', '2004-05-03', 'AB+', 'Mexico'),
('Ethan', 'Wang', 20, 'B', 'Chemistry', 'ethan.wang@example.com', '2005-09-12', 'A-', 'China'),
('Fiona', 'Singh', 18, 'A', 'Economics', 'fiona.singh@example.com', '2007-02-28', 'B-', 'India'),
('George', 'Nguyen', 23, 'C', 'Engineering', 'george.nguyen@example.com', '2002-12-14', 'O+', 'Vietnam'),
('Hannah', 'Lee', 20, 'B', 'Literature', 'hannah.lee@example.com', '2005-06-25', 'A+', 'South Korea'),
('Isaac', 'Garcia', 21, 'A', 'History', 'isaac.garcia@example.com', '2004-08-18', 'AB-', 'Spain'),
('Julia', 'Kowalski', 22, 'B', 'Philosophy', 'julia.kowalski@example.com', '2003-01-09', 'B+', 'Poland'),
('Kevin', 'O’Brien', 19, 'A', 'Political Science', 'kevin.obrien@example.com', '2006-04-22', 'O-', 'Ireland'),
('Luna', 'Silva', 18, 'A', 'Art', 'luna.silva@example.com', '2007-10-01', 'A+', 'Brazil');

SELECT * FROM students;
SELECT email, age, blood_group FROM students;
SELECT email as "Student Email" FROM students;
SELECT * FROM students ORDER BY first_name ASC;
SELECT * FROM students ORDER BY first_name DESC;
SELECT * FROM students ORDER BY age ASC;
SELECT * FROM students ORDER BY dob DESC;
```

**Data filtering, Where clause, Logical operators and comparison operators**

```tsx
// data filtering
SELECT DISTINCT country from students;
SELECT DISTINCT blood_group from students;

// select students from the usa
SELECT * FROM students
	WHERE country = 'USA';

// select students with 'A' grade in Physics
SELECT * FROM students
	WHERE grade = 'A' AND course = 'Physics';

// select students with blood_group 'A+'
SELECT * FROM students
	WHERE blood_group = 'A+';

// select students from the USA or from Australia
SELECT * FROM students
	WHERE country = 'USA' OR country = 'Australia';

// select students from the USA or from the Australia and the age is 20
SELECT * FROM students
	WHERE (country = 'USA' OR country = 'Australia') AND age = 20;

// select students with a grade of 'A' or 'B' in the Math or Physics
SELECT * FROM students
	WHERE (grade = 'A' OR grade = 'B') OR (course = 'Math' OR course = 'Physics');

// show data from students age not equall 20
SELECT * FROM students
	WHERE age != 20;
```

**Scalar and Aggregate Functions in PostgreSQL**

### 1. Scalar

Scalar functions operate on a single value and return a single value. They perform an operation on each row’s data indepently.

UPPER() converts a string to uppercase.

LOWER() converts a string to lowercase.

CONCAT() concatenates two or more strings.

LENGTH() returns the number of characters in a string.

### 2. Aggregate

Aggregate functions operate on a set of values and return a single value summarizing that set. They perform an operation across multiple rows, often used with the GROUP BY clause.

AVG() calculate the average of a set of values.

MAX() returns the max value in a set.

MIN() returns the minimum value in a set.

SUM() calculates the sum of values in a set.

COUNT() counts the number of rows in a set.

```tsx
// scalar functions
SELECT upper(first_name) FROM students;
SELECT upper(first_name), * FROM students;
SELECT upper(first_name) as first_name_in_upper_case, * FROM students;

SELECT concat(first_name, last_name) FROM students;
SELECT concat(first_name, ' ', last_name) FROM students;
SELECT length(first_name) FROM students;

// aggregate functions
SELECT avg(age) from students;
SELECT max(age) from students;
SELECT min(age) from students;
SELECT sum(age) from students;  // add
SELECT count(age) from students;  // row count

SELECT max(length(first_name)) from students;
```

**Logical NOT, NULL and the Null-Coalescing Operator**

```tsx
SELECT * FROM students
	WHERE NOT country = 'USA';

SELECT * FROM students
	WHERE email IS NULL;
SELECT * FROM students
	WHERE email IS NOT NULL;

SELECT COALESCE(email, 'Email not provided') FROM students;
SELECT COALESCE(email, 'Email not provided') as "Email", blood_grou, first_name FROM students;
```

**IN, BETWEEN, LIKE and ILIKE operators**

```tsx
SELECT * FROM students WHERE country = 'USA' OR country = 'UK' OR country = 'Canada';
SELECT * FROM students WHERE country IN('USA', 'UK', 'Canada');
SELECT * FROM students
	WHERE country NOT IN('USA', 'UK', 'Canada');

SELECT * FROM students
	WHERE age BETWEEN 19 and 23;
SELECT * FROM students
	WHERE dob BETWEEN '2000-01-01' and '2004-01-01' ORDER BY dob;

SELECT * FROM students
	WHERE first_name LIKE '%am';  // last words include 'am'
SELECT * FROM students
	WHERE first_name LIKE 'A%';  // first Letter starts A
SELECT * FROM students
	WHERE first_name LIKE '___a%';  // _ _ _ first 3 letters will be anything then a

SELECT * FROM students
	WHERE first_name ILIKE 'a%';  // case insensitive
```

**Pagination with limit offset and data deletion**

```tsx
SELECT * FROM students LIMIT 5;

SELECT * FROM students
	WHERE country IN('USA', 'UK', 'Canada') LIMIT 5;

SELECT * FROM students LIMIT 5 OFFSET 2;  // SKIP 2 DATAS
SELECT * FROM students LIMIT 5 OFFSET 5 * 0;
SELECT * FROM students LIMIT 5 OFFSET 5 * 1;  // 6 to 10

DELETE FROM students
	WHERE grade = 'B';
DELETE FROM students
	WHERE grade = 'C' AND country = 'USA';  // got C and from USA
```

**Update Operator in postgreSQL**

```tsx
UPDATE students
	set email = 'default@mail.com'
	WHERE student_id = 45;

// update multiple columns from specific id
UPDATE students
	set email = 'default@mail.com', age = 30
	WHERE student_id = 45;
```
