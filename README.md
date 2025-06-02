BookSearch Engine
📚 A GraphQL-Powered Book Discovery Platform
Refactored from REST to GraphQL for Enhanced Performance & Flexibility

📝 Description
BookSearch Engine is a modernized MERN stack application that allows avid readers to:

🔍 Search for books using the Google Books API
📂 Save favorite books to a personal collection
🔐 Secure user accounts with JWT authentication

Originally built with a RESTful API, this project has been refactored to use GraphQL with Apollo Server for more efficient data fetching and real-time updates.

✨ Key Features
✅ GraphQL API – Faster, more flexible queries with Apollo Server
✅ User Authentication – Secure login/signup with JWT
✅ Book Search – Find titles, authors, and descriptions via Google Books API
✅ Personal Library – Save and manage your favorite books
✅ Modern MERN Stack – MongoDB, Express, React, and Node.js

🛠 Technologies Used
Category	Tech Stack
Frontend	React, Apollo Client
Backend	Node.js, Express.js, Apollo Server
Database	MongoDB (via MongoDB Atlas)
API	GraphQL (Queries & Mutations)
Authentication	JSON Web Tokens (JWT)

🚀 Getting Started

📥 Installation

Clone the repository

bash
git clone https://github.com/Vader24-LT/Book-Search
cd booksearch-engine
Install dependencies

bash
npm install
cd client && npm install
Set up environment variables

Create a .env file in the root directory

bash

npm run develop

(Starts both server and client concurrently)

🔗 GraphQL API Endpoints

Queries

getMe – Retrieve logged-in user's data

searchBooks(query: String!) – Search for books via Google Books API

savedBooks – Fetch a user's saved books

Mutations

login(email: String!, password: String!) – Authenticate user

addUser(username: String!, email: String!, password: String!) – Register new user

saveBook(bookData: BookInput!) – Add a book to user's collection

removeBook(bookId: ID!) – Delete a book from saved list


Link: https://book-search-6g1j.onrender.com/

Video: 

https://app.screencastify.com/v2/watch/RPwubIEJCH4DXtS9R496

https://drive.google.com/file/d/1JzAZTuj1CpWpjxbYtPIJE4uerd4n6mTH/view?usp=sharing

📜 License

This project is licensed under the MIT License.

📬 Contact & Contributions

GitHub: github.com/VaderLT-24

Email: Luis322009@hotmail.com
