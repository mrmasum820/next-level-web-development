1. **Handling date and date functions in postgres**

```tsx
SHOW timezone;

// timestamp - combine date, time and timezone
SELECT now();

create table timeZ (ts TIMESTAMP without time zone, tsz TIMESTAMP with time zone);
insert into timeZ VALUES('2024-01-12 10:45:00', '2024-01-12 10:45:00');
SELECT * FROM timeZ;

SELECT now()::date;  // type custing
SELECT now()::time;

SELECT to_char(now(), 'yyyy/mm/dd');
SELECT to_char(now(), 'dd/mm/yyyy');
SELECT to_char(now(), 'Month');

SELECT CURRENT_DATE; // 2024-01-21
SELECT CURRENT_DATE - INTERVAL '1 year';  // 1 month

SELECT age(CURRENT_DATE, '1995-07-29');  // FROM current date to 1995-07-29
SELECT *, age(CURRENT_DATE, dob) from students;

SELECT extract(year from '2024-01-25'::date);
```

1. **GROUP BY and HAVING**

```tsx
SELECT country from students
	GROUP BY country;

SELECT country, count(*) from students
	GROUP BY country;

SELECT country, count(*), avg(age) from students
	GROUP BY country;

// filter groups using having to show only countries with average age above 20
SELECT country, avg(age) from students
	GROUP BY country
	HAVING avg(age) > 20;

// count students born in each year
SELECT extract(year from dob) as birth_year, count(*) FROM students
	GROUP BY birth_year;
```

1. **Relationships with Foreign key constraints**

```tsx
CREATE TABLE "user"(
	id SERIAL PRIMARY KEY,
	username VARCHAR(25) NOT NULL
)

CREATE TABLE post(
	id SERIAL PRIMARY KEY,
	title TEST NOT NULL,
	user_id INTEGER REFERENCES "user"(id)
)
```

1. **Referential Integrity behavior during data insertion**

```tsx
INSERT INTO "user" (username)
VALUES
('akash'), ('batash'), ('sagor'), ('nodi');

SELECT * FROM "user";

INSERT INTO post (title, user_id)
VALUES
('Enjoying a sunny day with akash', 2),
('Batash just shared amazing recipe', 1),
('Exploring adventure with sagor', 4),
('Nodi''s wisdom always leaves me inspired.', 4);

SELECT * FROM post;

// set existing column constraints
ALTER TABLE post
	ALTER COLUMN user_id set NOT NULL;
```

1. **Referential Integrity behavior during data deletion**

```tsx
// after drop insert data in the table
DROP TABLE "user";
DROP TABLE post;

// INSERT data in "user" and post table
// see data

// Restrict deletion -> on delete no action
// Setting Null
// On delete set default
CREATE TABLE post(
	id SERIAL PRIMARY KEY,
	title TEST NOT NULL,
	user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE
	// ON DELETE SET NULL
	// ON DELETE SET DEFAULT
)

DELETE FROM "user"
	WHERE id = 4;
```

**Joining table with INNER JOIN**

```tsx
SELECT title, username FROM post
	JOIN "user" on post.user_id = "user".id;

SELECT * FROM post
	JOIN "user" on post.user_id = "user".id;

// see specific table id
SELECT "user".id FROM post
	INNER JOIN "user" on post.user_id = "user".id;

SELECT * FROM post as p
	INNER JOIN "user" as u on p.user_id = u.id;
```

**Understanding LEFT JOIN and RIGHT JOIN**

```tsx
SELECT * FROM post
	JOIN "user" on post.user_id = "user".id;

INSERT INTO post (id, title, user_id)
VALUES
(5, 'This is new post where user is null', NULL);

// left join - if user null this user table field will be null
SELECT * FROM post
	LEFT OUTER JOIN "user" on post.user_id = "user".id;

// right join - priority right table first
SELECT * FROM post
	RIGHT OUTER JOIN "user" on post.user_id = "user".id;
```

**FULL JOIN, Cross and Natural joins**

```tsx
// Full join - add all tables data
SELECT * FROM post
	FULL OUTER JOIN "user" on post.user_id = "user".id;

CREATE TABLE employees(
emp_id SERIAL PRIMARY KEY,
emp_name VARCHAR(50),
dept_id INTEGER REFERENCES departments(dept_id),
salary DECIMAL(10, 2),
hire_date DATE
);

CREATE TABLE departments(
dept_id SERIAL PRIMARY KEY,
dept_name VARCHAR(50)
);

INSERT INTO employees(emp_name, dept_id, salary, hire_date)
VALUES('JOHN DOE', 1, 60000, '2022-01-10'),
(2, 'JANE Smith', 2, 50000, '2023-01-10'),
(2, 'DAVID Lee', 2, 70000, '2025-05-10');

INSERT INTO departments(dept_name)
VALUES('HR'), ('Marketing'), ('Finance');

// Cross join - num of rows * num of rows(2 * 2 = 4)
SELECT * FROM employees
	CROSS JOIN departments;

// Natural join - combine same values in one column
SELECT * FROM employees
	NATURAL JOIN departments;
```

### Problems

```tsx
// problem 1
// JOIN examples
SELECT * FROM employees
	JOIN departments ON employees.dept_id = departments.dept_id;

// JOIN using shorend method
SELECT * FROM employees
	JOIN departments USING(dept_id);

// problem 2
// Show departments with average salary
SELECT dept_name, round(avg(salary)) as avg_salary FROM employees
	JOIN departments USING(dept_id)
	GROUP BY dept_name;

// problem 3
// count employees in each department
SELECT dept_name, count(emp_id) FROM employees
	JOIN departments USING(dept_id)
	GROUP BY dept_name;

// problem 4
// find the department name with highest average salary
SELECT dept_name, round(avg(salary)) as avg_salary FROM employees
	JOIN departments USING(dept_id)
	GROUP BY dept_name
	ORDER BY avg_salary DESC
	LIMIT 1;

// problem 5
// count employees hire each year
SELECT extract(YEAR FROM hire_date) as hire_year, count(*) from employees
GROUP BY hire_year;
```
