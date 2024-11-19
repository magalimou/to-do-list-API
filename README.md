# To-Do List API  

This is a RESTful API for managing a **to-do list**, allowing users to create, read, update, and delete tasks. It is built using **Node.js** and **Express**, and stores data in a **MongoDB** database.  

## Features  

- User Authentication (Registration & Login)  
- CRUD operations for tasks:  
  - Create new tasks  
  - Retrieve tasks (all or specific)  
  - Update existing tasks  
  - Delete tasks  
- Search tasks by title or description  
- Task status updates (e.g., completed or pending)  

---

## Installation  

### Prerequisites  
- Node.js (v16 or higher recommended)  
- MongoDB  

### Steps  

1. Clone the repository:  
   ```bash
   git clone https://github.com/magalimou/to-do-list-API.git
   cd to-do-list-API
   ```  

2. Install dependencies:  
   ```bash
   npm install
   ```  

3. Set up the environment variables:  
   - Create a `.env` file in the root directory.  
   - Add the following:  
     ```bash
     PORT=3000
     MONGO_URI=mongodb://localhost:27017/todolist
     JWT_SECRET=yourSecret
     ```  

4. Start the server:  
   ```bash
   npm start
   ```  

   The API will run on `http://localhost:3000`.  
