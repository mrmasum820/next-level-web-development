SELECT * FROM person2;

ALTER TABLE person2
ADD COLUMN email varchar(25) DEFAULT 'test@mail.com' not null;

INSERT INTO person2
VALUES (6, 'faisal', 30, 'faisal@gmail.com');

ALTER TABLE person2
    RENAME COLUMN age to user_age;

ALTER TABLE person2
    alter COLUMN user_age set NOT NULL;

ALTER TABLE person2
    alter COLUMN user_age DROP NOT NULL;

ALTER TABLE person2
    alter COLUMN full_name type VARCHAR(25);