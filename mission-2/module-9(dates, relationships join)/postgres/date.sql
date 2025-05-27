-- Active: 1748110225737@@127.0.0.1@5432@ph@public
-- SHOW timezone;

create table timeZ (ts TIMESTAMP without time zone, tsz TIMESTAMP with time zone);

INSERT INTO timez VALUES('2000-01-01 00:00:00', '2000-01-01 00:00:00');

SELECT * FROM timez;

-- SELECT now();
-- SELECT now()::DATE;
SELECT now()::time;

-- SELECT to_char(now(), 'yyyy/mm/dd');
-- SELECT to_char(now(), 'dd/mm/yyyy');
SELECT to_char(now(), 'Month');

SELECT CURRENT_DATE;
SELECT CURRENT_DATE - INTERVAL '1 year';
SELECT CURRENT_DATE - INTERVAL '1 month';
SELECT CURRENT_DATE - INTERVAL '27 day';

SELECT age(CURRENT_DATE, '1994-02-15');

SELECT *, age(CURRENT_DATE, dob) FROM students;

-- SELECT extract(year from '2025-01-01'::date);

SELECT * from students;
-- SELECT country, count(*) from students
--     GROUP BY country;
SELECT country, count(*), avg(age) from students
    GROUP BY country;

SELECT country, avg(age) from students
    GROUP BY country
    HAVING avg(age) > 20;

SELECT extract(year from dob) as birth_year, count(*) from students
    GROUP BY birth_year;

CREATE Table "user"(
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL
)

CREATE Table post(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    user_id INTEGER REFERENCES "user"(id)
)

ALTER TABLE post
alter column user_id SET NOT NULL;

INSERT INTO "user" (username) VALUES ('bob'), ('joe'), ('sally'), ('adam');

SELECT * FROM "user";

INSERT INTO post (title, user_id) VALUES ('test', 1);

SELECT * FROM post;
