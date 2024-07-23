# All about this Project

## The stack

We’ll be building medium in the following stack

1.  **React** in the frontend

2.  **Cloudflare workers** in the backend 

3.  **Zod** as the validation library, type inference for the frontend types

4.  **Typescript** as the language

5.  **Prisma** as the **ORM**, with **connection pooling**

6.  **Postgres** as the database

7.  **jwt** for authentication


## Routes 
1.  POST /api/v1/user/signup

2.  POST /api/v1/user/signin

3.  POST /api/v1/blog

4.  PUT /api/v1/blog

5.  GET /api/v1/blog/:id

6.  GET /api/v1/blog/bulk


## Features

-   **User Authentication**: Users can sign up and sign in to their accounts. Authentication is handled securely using JWT.
-   **Blog Management**: Users can create, update, view, and manage blog posts. Each post includes a title, content, and publishing status.
-   **Scalable Architecture**: The application is built with Cloudflare Workers, ensuring scalability and high performance.
-   **Type Safety**: The use of TypeScript and Zod guarantees type safety and validation throughout the application.
-   **Modern UI**: The frontend is designed with React and styled using Tailwind CSS, providing a modern and responsive user interface.
- **Frontend**: React - A popular library for building user interfaces, ensuring a dynamic and responsive user experience.
-   **Backend**: Cloudflare Workers with Hono - Serverless functions providing efficient and scalable backend services.
-   **Validation**: Zod - A TypeScript-first schema validation library, ensuring data integrity and type safety.
-   **Language**: TypeScript - A statically typed language enhancing development productivity and reducing errors.
-   **ORM**: Prisma - An advanced ORM for seamless interaction with the PostgreSQL database.
-   **Database**: PostgreSQL - A powerful and reliable relational database management system.
-   **Authentication**: JWT - Secure authentication mechanism to protect user data and sessions.

## Project Structure

-   **Frontend**: Contains the React application, including components for user authentication and blog management.
-   **Backend**: Hosted on Cloudflare Workers, implementing API routes for user and blog management.
-   **Common**: A shared library for type definitions and validation schemas, used by both frontend and backend.

## Getting Started

1.  **Clone the Repository**
 
    
       ```
     git clone https://github.com/your-username/medium.git
    cd medium
       ``` 
    
    
2.  **Set Up the Backend**
    
    -   Navigate to the `backend` directory.
    -   Install dependencies and initialize Prisma.
    -   Set up your database and environment variables.
3.  **Set Up the Frontend**
    
    -   Navigate to the `frontend` directory.
    -   Install dependencies and configure Tailwind CSS.
    -   Run the React development server.
4.  **Deploy the Application**
    
    -   Deploy the backend using Cloudflare CLI.
    -   Ensure all environment variables are set correctly in the Cloudflare dashboard.

## Usage

-   **Sign Up/Sign In**: Users can create an account or log in to access their dashboard.
-   **Manage Blogs**: Authenticated users can create, update, and view their blog posts.
-   **View Blogs**: Browse and read blog posts published by users.

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request. For any issues or feature requests, open an issue in the repository.

## Contact

For more information, please contact me at prakharsingh2208@gmail.com.
