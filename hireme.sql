CREATE TABLE graduates_user (
    id SERIAL PRIMARY KEY,
    github_username VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    repos_number INT,
    profile_pic_link VARCHAR(255),
    github_url VARCHAR(255),
    followers INT ,
    following INT
);

CREATE TABLE skills (
    user_id INT,
    languages VARCHAR(255) [],
    CONSTRAINT fk_user_id_languages FOREIGN KEY (user_id) REFERENCES graduates_user(id),
    UNIQUE (user_id)
);

CREATE TABLE readme (
    id SERIAL PRIMARY KEY,
    user_id INT,
    cv_link VARCHAR(255),
    linkedin VARCHAR(255),
    readme_content TEXT,
    CONSTRAINT fk_user_id_readme FOREIGN KEY (user_id) REFERENCES graduates_user (id),
    UNIQUE (user_id)
);

CREATE TABLE github_stats (
    id SERIAL PRIMARY KEY,
    user_id INT,
    commit_date date,
    num_commits INT,
    CONSTRAINT fk_user_id_languages FOREIGN KEY (user_id) REFERENCES graduates_user(id),
    UNIQUE (user_id)
)