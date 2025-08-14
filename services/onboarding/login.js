const validator = require('@app-core/validator');
// const { throwAppError } = require('@app-core/errors');

// Spec for login service
const loginSpec = `root {
  username string
  email string<isEmail>
  password string
}`;

// Parse the spec outside the service function
const parsedLoginSpec = validator.parse(loginSpec);

async function login(serviceData) {
  // Validate incoming data
  const validatedData = validator.validate(serviceData, parsedLoginSpec);

  return validatedData;
}

module.exports = login;
