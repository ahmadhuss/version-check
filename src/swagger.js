import swaggerJsDoc from 'swagger-jsdoc';

/**
 * Create a swagger documentation instance
 * @returns {Promise<*>}
 */
export const swaggerInstance = async function () {
  const BASE_URL = process.env.BASE_URL;

  // Swagger options
  const swaggerOptions = {
    definition: {
      openapi: '3.0.3',
      info: {
        title: 'Application APIs',
        version: '1.0.0',
        description: 'Controller for Application API Calls are defined here'
      },
      servers: [
        {
          url: BASE_URL
        }
      ]
    },
    apis: ['./src/routes/api/v1/*.js']
  };

  return swaggerJsDoc(swaggerOptions);
};
