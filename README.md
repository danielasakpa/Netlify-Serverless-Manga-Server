# Manga Website Serverless Backend

## Description

This project is a Node.js and Express.js server designed to handle user authentication using JSON web tokens and Passport-Google-OAuth20, manage user data, and perform reading list operations. It is deployed as serverless functions on Netlify.

### Problem Statement

The project aims to address the challenge of efficiently managing user authentication, data storage, and reading list functionalities for a manga website. By leveraging serverless architecture, it seeks to minimize cold start times and enhance scalability, ensuring a seamless user experience.

1. **Cold Start Time:** Initially, a proxy server was set up using Node.js and Express.js hosted on Render. However, the free tier of Render had a cold start time of about 20 seconds, resulting in a significant delay before responding to user requests.

### Solution

To address the aforementioned challenges, the following solutions were implemented:

1. **Netlify Serverless Functions:** Netlify's serverless functions were chosen as they provided a more efficient and scalable solution compared to the previous hosting provider. Serverless functions offered a more flexible architecture.

## Environmental Variables

To use this project, you need to set the following environmental variables:

- `MONGO_URI`: MongoDB connection URI.
- `JWT_SECRET`: Secret key for JSON web token.
- `GOOGLE_CLIENT_ID`: Google OAuth2 client ID.
- `GOOGLE_CLIENT_SECRET`: Google OAuth2 client secret.
- `CLIENT_URL`: URL of the client application.
- `SERVER_URL`: URL of the server.
- `SESSION_SECRET`: Secret key for session management.

## Getting Started

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

### Additional Steps

4. Set up the required environmental variables by creating a `.env` file in the root directory of the project and filling in the necessary values for `MONGO_URI`, `JWT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `CLIENT_URL`, `SERVER_URL`, and `SESSION_SECRET`.
5. Run the server locally using `npm start` if you have a development environment setup.
6. Once the server is running, you can access the provided endpoints for user authentication, user data management, and reading list operations. Ensure that you have appropriate client-side code to interact with these endpoints.
7. Test the endpoints using tools like Postman or by integrating them into your client-side application.
9. If you encounter any issues or have questions about the server's functionalities, refer to the project's issue tracker or reach out to the project maintainers for assistance.

By following these steps, you should be able to effectively use the functionalities provided by the server and integrate them into your applications.

## Deployment

After testing locally, consider deploying the server to a production environment using Netlify to make it accessible to users. Ensure that you update environmental variables and configurations accordingly for the production environment.
 
### Deploying on Netlify:

1. Ensure you have a Netlify account and the Netlify CLI installed.
2. Navigate to the project directory.
3. Run `netlify login` to authenticate with your Netlify account.
4. Run `netlify init` to initialize your project on Netlify.
5. Follow the prompts to link your repository and set up the deployment settings.
6. Once configured, run `npm run build` to deploy your project to Netlify.
