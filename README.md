### Table of Contents

- [Flight API Gateway](#flight-api-gateway)
  - [Description](#description)
  - [Key Functionalities](#key-functionalities)
    - [User Authentication and Role Management](#user-authentication-and-role-management)
    - [Rate Limiting](#rate-limiting)
    - [Proxy Middleware](#proxy-middleware)
  - [Technologies Used](#technologies-used)
  - [Setup](#setup)
  - [Related Microservices](#related-microservices)

# Flight API Gateway

## Description

The **Flight API Gateway** serves as the entry point for the Flight Booking Application, securing user authentication with JWT, encrypting passwords, validating requests, and implementing rate limiting. It plays a crucial role in providing robust security and efficient routing in a microservice architecture.

## Key Functionalities

### User Authentication and Role Management
- **Sign Up**: `POST /signup` - Registers a new user after validating the request.
- **Sign In**: `POST /signin` - Authenticates a user and generates a JWT token.
- **Assign Role**: `POST /role` - Adds a role to a user, requiring admin privileges.
- **Get User by ID**: `GET /:userId` - Retrieves user details by ID.

### Rate Limiting
- **Rate Limiting**: Limits each IP to 20 requests per 5 minutes to prevent abuse.

### Proxy Middleware
- **Flight Service Proxy**: Routes requests to the Flight Service.
- **Booking Service Proxy**: Routes requests to the Booking Service.

## Technologies Used

- **Node.js** - JavaScript runtime for building scalable network applications.
- **Express.js** - Web application framework for Node.js.
- **bcrypt** - Library to hash passwords.
- **jsonwebtoken** - JWT implementation for secure token-based authentication.
- **express-rate-limit** - Middleware to limit repeated requests.
- **http-proxy-middleware** - Middleware for creating a proxy to other services.
- **Sequelize** - ORM for database interaction.
- **dotenv** - Module to load environment variables from a `.env` file.
- **winston** - Logger for managing logs.

## Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/flight-api-gateway.git
   cd flight-api-gateway
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file**

   Copy the `.env.example` file to `.env` and add the necessary environment variables:
   **Example `.env` file:**

   ```env
    PORT=<Your_Port_Number>
    SALT_ROUNDS=<Number_of_Salt_Rounds>
    JWT_SECRET=<Your_JWT_Secret>
    JWT_EXPIRY=<JWT_Token_Expiry_Time>
    FLIGHT_SERVICE=<Flight_Service_URL>
    BOOKING_SERVICE=<Booking_Service_URL>
   ```

4. **Start the server**

   ```bash
   npm run dev
   ```

   The server will run on the port specified in the `.env` file.

---

## Related Microservices

Check out the other microservices in the Skybook Flight Ecosystem:

1. **Flight Services**: Manages airplanes, airports, cities, and flights.
   - [Flight Services Repository](https://github.com/ShubhamYv/flight-service)

2. **Flight Booking Service**: Handles flight bookings and seat management.
   - [Flight Booking Service Repository](https://github.com/ShubhamYv/flight-booking-service)

3. **Flight Notification Service**: Sends real-time flight updates and notifications.
   - [Flight Notification Service Repository](https://github.com/ShubhamYv/flight-notification-service)

Explore these services to see how they work together for a seamless flight booking experience!
