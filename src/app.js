import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import cookieParser from 'cookie-parser'; // In order to read cookie sent from client req.cookies

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

// Miscellaneous imports
import { mongooseConnection } from './connection.js';
import { swaggerInstance } from './swagger.js';

// Routes
import versionRouter from './routes/api/v1/version.js';

/**
 * Main Application bootstrap function
 * @returns {Promise<void>}
 */
async function application() {
  // MongoDB Connection Initialization
  await mongooseConnection();
  console.info('MongoDB Initialized');

  // Swagger Documentation Initialization
  const specs = await swaggerInstance();
  console.info('Swagger APIs Docs Initialized');

  // defining the Express appServer
  const app = express();

  // Middlewares
  app.use(cookieParser());
  app.use(helmet()); // adding Helmet to enhance API's security
  // app.use(
  //   cors({
  //     // Note: WildCard * during credential is not supported, When you provide origin
  //    // credentials: true it will automatically set the cookie in client side too
  //     origin: 'http://localhost:3000', // Frontend app
  //     methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  //     credentials: true
  //   })
  // );
  app.use(cors('*')); // enabling CORS for all requests
  app.use(morgan('combined')); // adding morgan to log HTTP requests
  app.use(compression()); // compress all HTTP responses
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // V1:

  // Version Routes
  app.use('/api/v1/version', versionRouter);

  // Swagger Documentation Route
  app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(specs));

  // *
  app.use('*', function (req, res) {
    return res
      .status(404)
      .json({ status: 'error', message: `It doesn't exist.` });
  });

  app.listen(process.env.PORT || 5544, function () {
    console.log('Server started successfully.');
  });
}

// Bootstrap application
await application();
