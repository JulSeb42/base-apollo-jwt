# React Apollo

A boilerplate for fullstack projects using TypeScript, React, GraphQL and Apollo server

## Install project

Create a `.env` file at the root of the project, and add:

```
PORT=5005
MONGODB_URI=mongodb://localhost/name-of-db
ORIGIN=http://localhost:3000

TOKEN_SECRET=T0kEnSEcr3t

EMAIL=your@email.com
WORD=<your password>

SERVER_SMTP=<smtp server for your email service>
PORT_SMTP=<smtp port for your email>
```

Then run `npm install` at the root of the project. Since we're using [Concurrently](https://www.npmjs.com/package/concurrently) this will install packages for backend and frontend.

## Run project

Run `npm run dev` at the root of the project. Once again, thanks to Concurrently, backend and frontend will run at the same time.

## Packages

### Backend

-   [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
-   [GraphQL](https://graphql.org/)
-   [JSON web token](https://jwt.io/)
-   [Bcrypt js](https://www.npmjs.com/package/bcryptjs)
-   [Mongoose](https://mongoosejs.com/)
-   [Nodemailer](https://nodemailer.com/about/)
-   [TS Node dev](https://www.npmjs.com/package/ts-node-dev)
-   [TS utils](https://www.npmjs.com/package/ts-utils-julseb): own package, with basic functions written in JavaScript

### Frontend

-   [React](https://reactjs.org/)
-   [React router dom](https://reactrouter.com/en/v6.3.0/getting-started/overview)
-   [Apollo client](https://www.apollographql.com/docs/react/)
-   [GraphQL](https://graphql.org/)
-   [Styled components](https://styled-components.com/)
-   [Babel plugin styled components](https://styled-components.com/docs/tooling)
-   [TSX library](https://documentation-components-react.vercel.app/): own package, with basic React UI components

## Backend

### API

All the functions can be found in the `server` folder.

### Models

All the models can be found in `server/models` folder.

### Create data

Find an example for adding bulk data inside a database in `server/db/seed.js`.

## Frontend

### GraphQL

All GraphQL functions for the client can be found at `client/src/graphql`.

### Add pages

Create your pages in `client/src/pages`. Then, go to `client/src/routes/routes.ts` and add them in the array `const routes`.

### Styling

Most of components come from `TSX library` package. If you need new components, you can add them in `client/src/components`.
