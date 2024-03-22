# SkillSprint Backend

This repository contains the backend code for SkillSprint, an AI-powered developer support system designed to assist developers in getting unstuck and finding solutions to their coding problems. The backend leverages OpenAI's language models and APIs to provide intelligent responses, probing questions, and handoffs to human mentors when necessary.

## Features

- AI-generated initial responses to developer questions using OpenAI's Chat Completions API
- Probing questions to gather more context and guide developers towards a solution
- Intelligent handoff to human mentors when the AI is unable to provide a complete solution
- RESTful API endpoints for seamless integration with the frontend application
- Integration with MongoDB for storing conversation history, tickets, and user information
- Authentication and authorization using JSON Web Tokens (JWT)
- Error handling and logging for improved reliability and debugging

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose`
- OpenAI API
- JSON Web Tokens (JWT)
- Bcrypt.js

## Getting Started

To set up and run the SkillSprint backend locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/skillsprint-backend.git
   ```

2. Install the required dependencies:
   ```
   cd skillsprint-backend
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the project root and add the following variables:
     ```
     OPENAI_API_KEY=your-openai-api-key
     MONGODB_URI=your-mongodb-uri
     JWT_SECRET=your-jwt-secret
     ```
   - Replace `your-openai-api-key`, `your-mongodb-uri`, and `your-jwt-secret` with your actual values.

4. Start the backend server:
   ```
   npm start
   ```

5. The backend server should now be running on `http://localhost:3000`.

## API Endpoints

The SkillSprint backend exposes the following API endpoints:

- `POST /api/tickets`: Create a new ticket
- `GET /api/tickets/:id`: Get a specific ticket by ID
- `PUT /api/tickets/:id`: Update a ticket by ID
- `DELETE /api/tickets/:id`: Delete a ticket by ID
- `POST /api/users/signup`: User signup
- `POST /api/users/login`: User login
- `GET /api/users/:id`: Get a specific user by ID

For detailed information about request and response payloads, please refer to the API documentation.

## Folder Structure

The project follows a modular folder structure to keep the codebase organized and maintainable:

```
skillsprint-backend/
  ├── config/
  │   └── db.js
  ├── controllers/
  │   ├── ticketController.js
  │   └── userController.js
  ├── middlewares/
  │   └── authMiddleware.js
  ├── models/
  │   ├── ticketModel.js
  │   └── userModel.js
  ├── routes/
  │   ├── ticketRoutes.js
  │   └── userRoutes.js
  ├── utils/
  │   └── openaiUtils.js
  ├── .env
  ├── .gitignore
  ├── app.js
  ├── package.json
  └── README.md
```

## Contributing

Contributions to the SkillSprint backend are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository, clearly describing your changes and their benefits.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions, suggestions, or feedback, please feel free to contact us at [support@skillsprint.com](mailto:support@skillsprint.com).

We hope you find the SkillSprint backend helpful in building an AI-powered developer support system!