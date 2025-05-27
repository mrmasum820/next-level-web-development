1. **Exploring subqueries**

### Subquery

A subquery is a nested query within another SQL statement.

```tsx
// sub.sql
create table employees(
	employee_id SERIAL PRIMARY KEY,
	employee_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(50),
	salary DECIMAL(10, 2),
	hire_date DATE
)

INSERT INTO employees(employee_name, department_name, salary, hire_date)
VALUES
('john doe', 'HR', 60000.00, '2022-01-10'),
('john smith', 'Marketing', 50000.00, '2022-05-10');

// SELECT * FROM employees;
// DROP TABLE employees;

// Retrieve all employess whose salary is greater than the highest salary of HR department
SELECT * FROM employees
WHERE
salary > (SELECT max(salary) FROM employees WHERE department_name = 'HR');
```

1. **Utilizing subqueries in different clauses**

```tsx
// can return a single value
SELECT *, (SELECT sum(salary) from employees) FROM employees;

SELECT * FROM
(SELECT department_name, sum(salary) FROM employees GROUP BY department_name) as sum_dept_salary;

// can return a multiple rows
SELECT employeename, salary, department_name
FROM employees
WHERE department_name in
(SELECT department_name FROM employees WHERE department_name LIKE '%R%');

// can return a single column
```

1. **exploring views in Postgres**

### View

Views are virtual tables generated from the result of a SQL query.

**Purpose of SQL views:**

- Simplifying complex queries
- Improved security
- Enhanced data abstraction

```tsx
// views.sql
// SELECT * FROM employees;

CREATE View dept_avg_salary
AS
SELECT department_name, avg(salary) FROM employees GROUP BY department_name;

SELECT * FROM dept_avg_salary;

// use in subquery
CREATE View test_view
AS
SELECT employeename, salary, department_name
FROM employees
WHERE department_name in
(SELECT department_name FROM employees WHERE department_name LIKE '%R%');

SELECT * from test_view;
```

1. **Functions in PostgreSQL**

```tsx
// funtionsProcedures.sql
// SELECT * from employees;

// count function using employee table
CREATE Function count_emp()
RETURNS INT
LANGUAGE SQL
as
$$
	SELECT count(*) FROM employees;
$$

// SELECT emp_count();

// delete function using employee table
CREATE or replace Function delete_emp()
RETURNS void
LANGUAGE SQL
as
$$
	DELETE FROM employees WHERE employee_id = 12;
$$

// using parameter
CREATE or replace Function delete_emp_by_id(p_emp_id int)
RETURNS void
LANGUAGE SQL
as
$$
	DELETE FROM employees WHERE employee_id = p_emp_id;
$$

// calling function
SELECT delete_emp_by_id(11);
```

1. **Procedure in PostgreSQL**

```tsx
// didn't return anything
CREATE Procedure remove_emp()
LANGUAGE plpgsl
as
$$
	DECLARE
		test_var INT
	BEGIN
		SELECT employee_id INTO test_var FROM employees WHERE employee_id = 8;
		DELETE FROM employees WHERE employee_id = test_var;
	END
$$

// calling function
call remove_emp();

// using parameter
CREATE Procedure remove_emp_var(p_emp_id int)
LANGUAGE plpgsl
as
$$
	DECLARE
		test_var INT
	BEGIN
		SELECT employee_id INTO test_var FROM employees WHERE employee_id = p_emp_id;
		DELETE FROM employees WHERE employee_id = test_var;
		RAISE NOTICE 'Employee Removed successfully!';
	END
$$

call remove_emp_var(7);

SELECT * FROM employees;  // 7 id employee removed
```

1. **Implementation triggers in PostgreSQL**

### Trigger

A Trigger is a database object in PostgreSQL (and other database management systems) that automatically executes a specified set of actions in response to certain database events or conditions.

```tsx
// trigger.sql

CREATE TABLE my_users(
	user_name VARCHAR(50),
	email VARCHAR(100)
);
INSERT INTO my_users VALUES('Masum', 'masum@gmail.com'), ('Shawan', 'shawan@gmail.com');
// SELECT * FROM my_users;

CREATE TABLE deleted_user_audit(
	deleted_user_name VARCHAR(50),
	deletedAt TIMESTAMP;
);
// SELECT * FROM deleted_user_audit;

// create trigger function
CREATE or REPLACE Function save_deleted_user()
RETURNS TRIGGER
LANGUAGE plpgsql
as
$$
	BEGIN
		INSERT INTO deleted_users_audit VALUES(OLD.user_name, now());
		RAISE NOTICE 'Deleted User audit log created!';
		RETURN OLD;
	END
$$

CREATE or REPLACE Trigger save_deleted_user_trigger
BEFORE DELETE
on my_users
FOR EACH ROW
EXECUTE FUNCTION save_deleted_user();

DELETE FROM my_users WHERE user_name = 'Shawan';
```

1. **Indexing techniques in PostgreSQL**

### Indexing

A database index is a strategically designed data structure that enhances the speed of data retrieval activities in a database table.

```tsx
// index.sql

// SELECT * FROM employees;

// before indexing in 30000 datas
EXPLAIN ANALYSE  // show execution time
SELECT * FROM employees WHERE last_name = 'Doe';

CREATE INDEX idx_employees_last_name
on employees (last_name);

// after indexing - 0.828ms
EXPLAIN ANALYSE
SELECT * FROM employees WHERE last_name = 'Doe';

SHOW data_directory;  // data stored in locally
```

### Indexing Algo

- B-TREE(Default)
- HASH
- GIN
- GIST

```tsx
CREATE INDEX idx_employees_last_name
on employees USING HASH (last_name);
```
