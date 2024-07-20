1. Install Dependencies
npm install

2. Configure the Database
Ensure PostgreSQL is installed and running.
Create a database for the project.
3. Set Up Environment Variables or Modify it in App.module(for postgres connection)

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_NAME=todo-app

4. Configuration
The application uses the typeorm configuration to connect to PostgreSQL. The connection settings are defined in src/app.module.ts.

5. Running the Application
 Start the Application
npm run start
 Running in Development Mode

npm run start:dev

This will start the application in development mode with hot-reloading enabled.


6. API Endpoints
6.1. POST /todos
Create a new Todo item.
Request:
http
Copy code
POST /todos
Content-Type: application/json

{
  "title": "Sample Todo",
  "description": "This is a sample todo item",
  "status": false
}

Response:
json
{
  "id": 1,
  "title": "Sample Todo",
  "description": "This is a sample todo item",
  "status": false,
  "createdAt": "2024-07-19T00:00:00.000Z",
  "updatedAt": "2024-07-19T00:00:00.000Z"
}

6.2. GET /todos
Retrieve a list of all Todo items with pagination, sorting, and filtering.
Request:
GET /todos?page=0&limit=10&sortBy=createdAt&order=DESC

Response:
{
  "data": [
    {
      "id": 1,
      "title": "Sample Todo",
      "description": "This is a sample todo item",
      "status": false,
      "createdAt": "2024-07-19T00:00:00.000Z",
      "updatedAt": "2024-07-19T00:00:00.000Z"
    }
  ],
  "total": 1
}

6.3. GET /todos/:id
Retrieve a specific Todo item by ID.
Request:
http

GET /todos/1

Response:
json
Copy code
{
  "id": 1,
  "title": "Sample Todo",
  "description": "This is a sample todo item",
  "status": false,
  "createdAt": "2024-07-19T00:00:00.000Z",
  "updatedAt": "2024-07-19T00:00:00.000Z"
}

6.4. PUT /todos/:id
Update an existing Todo item.
Request:
http
PUT /todos/1
Content-Type: application/json

{
  "title": "Updated Todo",
  "description": "This todo item has been updated",
  "status": true
}

Response:
json
Copy code
{
  "id": 1,
  "title": "Updated Todo",
  "description": "This todo item has been updated",
  "status": true,
  "createdAt": "2024-07-19T00:00:00.000Z",
  "updatedAt": "2024-07-19T01:00:00.000Z"
}

6.5. DELETE /todos/:id
Delete a Todo item.
Request:
http
Copy code
DELETE /todos/1

Response:
json
Copy code
{
  "message": "Todo item deleted successfully"
}

7. Additional Notes
Validation: Request payloads are validated using class-validator.
Error Handling: Errors are handled and returned with appropriate HTTP status codes.
API Documentation: API documentation is generated using Swagger and can be accessed at /api.
module.ts.

