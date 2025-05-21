# Todo App Frontend

A React.js frontend for a simple Todo application, designed to work with the Express.js backend and be deployed on Vercel.

## Features

- Create, read, update, and delete Todo items
- Filter todos by status (all, active, completed)
- Responsive design with Tailwind CSS
- React Query for data fetching and state management
- Formik for form handling
- TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   # or
   pnpm install
   ```
3. Create a `.env` file in the root directory with the following content:
   ```
   VITE_API_URL=http://localhost:3000
   ```
   For production, set this to your deployed backend URL.

### Development

Start the development server:

```
npm run dev
# or
pnpm dev
```

The app will be available at `http://localhost:5173`

## Connecting to the Backend

The frontend is configured to connect to the backend API using Axios. The API URL is set in the `.env` file with the `VITE_API_URL` variable.

The API service is located in `src/services/api.ts` and handles all the communication with the backend.

## Deployment to Vercel

1. Make sure you have the Vercel CLI installed:

   ```
   npm install -g vercel
   ```

2. Deploy to Vercel:

   ```
   vercel
   ```

3. For production deployment:

   ```
   vercel --prod
   ```

4. Set the environment variable `VITE_API_URL` in your Vercel project settings to point to your deployed backend URL.

## Project Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable components
│   ├── context/         # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main App component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── .env.example         # Example environment variables
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── vercel.json          # Vercel deployment configuration
```
