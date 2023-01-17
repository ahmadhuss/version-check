import mongoose from 'mongoose';

/**
 * Create a MongoDB Connection
 * @returns {Promise<*>} - Return the resolved or rejected promise
 */
export const mongooseConnection = async function () {
  const USERNAME = process.env.DB_USERNAME || '';
  const PASSWORD = process.env.DB_PASSWORD || '';
  const HOST = process.env.DB_HOST || '';
  const PORT = process.env.DB_PORT || '';
  const DBNAME = process.env.DB_AUTH_NAME || '';

  console.log(USERNAME);
  console.log(PASSWORD);
  console.log(HOST);
  console.log(PORT);
  console.log(DBNAME);

  const mongoUri = `mongodb://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DBNAME}?authSource=admin`;
  const connection = await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

  return connection.connection.db;
};
