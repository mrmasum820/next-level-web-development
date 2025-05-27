select * from post;

SELECT * from post
    JOIN "user" on post.user_id = "user".id;

INSERT INTO post(id, title, user_id)
VALUES (5, "this is new post where user is null", NULL);

-- DELETE FROM "user"
-- 	WHERE id = 8;

SELECT * FROM post
    LEFT JOIN "user" on post.user_id = "user".id;

SELECT * FROM post
    RIGHT JOIN "user" on post.user_id = "user".id;