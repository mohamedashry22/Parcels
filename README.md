## Docker Setup (in backend configured to be in debug mode)

## Frontend Environment Variables
- NEXT_PUBLIC_API_URL: http://localhost:6500

## Backend Environment Variables
- JWT_SECRET: Demo_PARCEL (used for JWT authentication)
- MONGO_URI: mongodb://ashry:ashry@mongo/parcelDB?authSource=admin
- useMongoDB: true (to use MongoDB), false (to use faker data)
- PORT: 6500
- FRONTEND_URL: http://localhost:3000 (used to enable CORS)

Explanation:
JWT_SECRET: Used for JWT authentication.
useMongoDB: Set to true to use MongoDB, and false to use faker data.
MONGO_URI: MongoDB connection URL. In Docker, it refers to the MongoDB image.
FRONTEND_URL: Used to enable CORS.
These environment variables are crucial for configuring the Docker setup of the Parcels project. They define connection details, authentication secrets, and toggle between using MongoDB and faker data. Adjust these variables as needed for your environment.