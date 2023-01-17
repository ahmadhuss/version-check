import dotenv from 'dotenv';
dotenv.config();

export const COOKIE_CONFIGS = {
  // If we comment maxAge, the cookie will not expire automatically
  // maxAge: 1000 * 60 * 60, // time span of the cookie,
  secure: getSecureFlagValue(process.env.ENVIRONMENT), // for development and production set to true for https only access
  httpOnly: true // true means no access from javascript
};

function getSecureFlagValue(value) {
  if (value === 'local') {
    return false;
  } else {
    return true;
  }
}
