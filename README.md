<h1 align="center">Mini Task Board</h1>

<p align="center">
  A simple full-stack task management application built with Next.js, TypeScript, React, Node.js API routes, and MySQL.
</p>

<p align="center">
  The application allows users to create, view, update, and delete tasks while managing their task status.
</p>

<hr />


<h2>Tech Stack</h2>

<ul>
  <li>Next.js</li>
  <li>React</li>
  <li>TypeScript</li>
  <li>Node.js</li>
  <li>MySQL</li>
  <li>mysql2</li>
  <li>Tailwind CSS</li>
  <li>Font Awesome</li>
</ul>

<h2>Architecture</h2>

<p>
  The application uses <strong>Next.js API routes</strong> for the backend instead of a separate Express server.
</p>

<p>
  Since this is a small application, keeping the frontend and backend in the same Next.js project
  keeps the project simple and easy to maintain.
</p>

<pre>
Frontend
   ↓
Next.js API Routes
   ↓
MySQL Database
</pre>

<h2>Project Structure</h2>

<pre>
task-board/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── tasks/
│   │   │       ├── route.ts
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   │
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── database/
│   │   └── schema.sql
│   │
│   ├── lib/
│   │   └── db.ts
│   │
│   └── types/
│       └── task.ts
│
├── public/
│
├── .env.local
├── eslint.config.mjs
├── .gitignore
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
</pre>

<h2>Prerequisites</h2>

<p>Before running the project, make sure you have:</p>

<ul>
  <li>Node.js installed</li>
  <li>MySQL installed and running</li>
  <li>npm installed</li>
</ul>

<h2>Installation</h2>

<p>Clone the repository:</p>

<pre>
git clone https://github.com/ishaNegi1/mini-task-board.git
</pre>

<p>Navigate into the project directory:</p>

<pre>
cd task-board
</pre>

<p>Install the dependencies:</p>

<pre>
npm install
</pre>

<h2>Database Setup</h2>

<p>
  The project uses MySQL for data persistence.
</p>

<p>
  The database schema and seed data are available in:
</p>

<pre>
database/schema.sql
</pre>

<p>
  The schema creates a database named <strong>task_board</strong>
  and a <strong>tasks</strong> table containing:
</p>

<ul>
  <li>id</li>
  <li>title</li>
  <li>status</li>
  <li>created_at</li>
</ul>

<h3>Using MySQL Workbench</h3>

<ol>
  <li>Open MySQL Workbench.</li>
  <li>Connect to your MySQL server.</li>
  <li>Open <code>database/schema.sql</code>.</li>
  <li>Execute the SQL script.</li>
  <li>Verify that the <code>task_board</code> database and <code>tasks</code> table have been created.</li>
</ol>

<p>You can verify the data with:</p>

<pre>
USE task_board;

SELECT * FROM tasks;
</pre>

<h2>Environment Variables</h2>

<p>
  Create a <code>.env.local</code> file in the root of the project.
</p>

<p>Add the following:</p>

<pre>
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=task_board
DB_PORT=3306
</pre>

<p>
  Replace <code>YOUR_MYSQL_PASSWORD</code> with your local MySQL password.
</p>

<h3>Important</h3>

<p>
  Do not commit <code>.env.local</code> to GitHub because it contains database credentials.
</p>

<h2>Running the Application</h2>

<p>Start the development server:</p>

<pre>
npm run dev
</pre>

<p>Open the application in your browser:</p>

<pre>
http://localhost:3000
</pre>

<h2>API Endpoints</h2>

<h3>Get All Tasks</h3>

<pre>
GET /api/tasks
</pre>

<p>Returns all tasks from the database.</p>

<h3>Create a Task</h3>

<pre>
POST /api/tasks
</pre>

<p>Request body:</p>

<pre>
{
  "title": "Learn TypeScript",
  "status": "todo"
}
</pre>

<p>Supported statuses:</p>

<ul>
  <li><code>todo</code></li>
  <li><code>in-progress</code></li>
  <li><code>done</code></li>
</ul>

<h3>Update a Task</h3>

<pre>
PATCH /api/tasks/:id
</pre>

<p>For example:</p>

<pre>
PATCH /api/tasks/1
</pre>

<p>Request body:</p>

<pre>
{
  "status": "done"
}
</pre>

<h3>Delete a Task</h3>

<pre>
DELETE /api/tasks/:id
</pre>

<p>For example:</p>

<pre>
DELETE /api/tasks/1
</pre>

<h2>CRUD Operations</h2>

<table>
  <thead>
    <tr>
      <th>Operation</th>
      <th>Method</th>
      <th>Endpoint</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Create</td>
      <td>POST</td>
      <td><code>/api/tasks</code></td>
    </tr>
    <tr>
      <td>Read</td>
      <td>GET</td>
      <td><code>/api/tasks</code></td>
    </tr>
    <tr>
      <td>Update</td>
      <td>PATCH</td>
      <td><code>/api/tasks/:id</code></td>
    </tr>
    <tr>
      <td>Delete</td>
      <td>DELETE</td>
      <td><code>/api/tasks/:id</code></td>
    </tr>
  </tbody>
</table>