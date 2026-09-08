CREATE DATABASE IF NOT EXISTS task_board;

USE task_board;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status ENUM('todo', 'in-progress', 'done') NOT NULL DEFAULT 'todo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, status)
VALUES
    ('Learn TypeScript', 'in-progress'),
    ('Build pipeline', 'todo'),
    ('Complete the task board', 'done');

    