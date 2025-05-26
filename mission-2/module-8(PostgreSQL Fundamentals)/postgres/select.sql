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
);

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


-- SELECT email, age, blood_group from students;
-- SELECT * FROM students ORDER BY first_name ASC;
-- SELECT * FROM students ORDER BY first_name DESC;
-- SELECT * FROM students ORDER BY dob ASC;

-- SELECT DISTINCT country from students;
-- SELECT * FROM students
--     WHERE country = 'Brazil';

-- SELECT * FROM students
--     WHERE grade = 'A' AND course = 'Physics';

-- SELECT * FROM students
--     WHERE blood_group = 'A+';

-- SELECT * FROM students
--     WHERE country = 'USA' OR country = 'Canada';

-- SELECT * FROM students
--     WHERE (grade = 'A' OR grade = 'B') AND (course = 'Mathematics' OR course = 'Physics');

-- SELECT * FROM students
--     WHERE age != 20;

/** 
    @scalar functions
    upper()
    lower()
    concat()
    length()

    @aggregate functions
    avg()
    count()
    max()
    min()
    sum()
*/

-- SELECT upper(first_name) as first_name_in_uppercase, * FROM students;
-- select concat(first_name, ' ', last_name) FROM students;

-- select avg(age) from students;
-- SELECT max(age) FROM students;
-- SELECT min(age) FROM students;
-- SELECT sum(age) FROM students;
-- SELECT count(age) FROM students;

-- SELECT max(length(first_name)) FROM students;

-- SELECT * FROM students
--     WHERE NOT country = 'USA';

-- SELECT * FROM students
--     WHERE email IS NULL;

-- SELECT COALESCE(email, 'email not provided') as "Email", blood_group, first_name FROM students;

-- select NULL + 1;

SELECT * FROM students;

-- SELECT * FROM students WHERE country = 'USA' OR country = 'UK' OR country = 'China';
-- SELECT * FROM students 
--     WHERE country NOT IN('USA', 'UK', 'China');

-- SELECT * FROM students
--     WHERE age BETWEEN 19 and 23;

-- SELECT * FROM students
--     WHERE first_name LIKE 'A%';

-- SELECT * FROM students
--     WHERE first_name LIKE '___a%_';

-- SELECT * FROM students
--     WHERE first_name ILIKE 'a%';

SELECT * FROM students;
-- SELECT * FROM students LIMIT 5;

-- SELECT * FROM students
--     WHERE country IN('USA', 'UK', 'China') LIMIT 2;

-- SELECT * from students LIMIT 5 OFFSET 2;
-- SELECT * from students LIMIT 5 OFFSET 5 * 0;
SELECT * from students LIMIT 5 OFFSET 5 * 2;

UPDATE students
    SET first_name = 'Faisal', last_name = 'Ahmed', age = 30
    WHERE student_id = 3;

UPDATE students
set email = "default@mail.com"
WHERE student_id = 8;