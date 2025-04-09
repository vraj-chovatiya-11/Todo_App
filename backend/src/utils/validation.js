const EmailValidator = require("email-validator");

const validationRegisterInput = ( username, email, password ) => {
  const errors = {};

  // Username validation
  if (!username || typeof username !== "string" || username.trim() === "") {
    errors.username = "Username is required";
  } else if (username.length < 4) {
    errors.username = "Username must be at least 4 characters long";
  } else if (username.length > 30) {
    errors.username = "Username cannot exceed 30 characters";
  }

  // Email validation
  if (!email || typeof email !== "string" || email.trim() === "") {
    errors.email = "Email is required";
  } else if (!EmailValidator.validate(email)) {
    errors.email = "Please provide a valid email address";
  }

  // Password validation
  // if (!password || typeof password !== "string" || password.trim() === "") {
  //   errors.password = "Password is required";
  // } else if (password.length < 6) {
  //   errors.password = "Password must be at least 6 characters long";
  // }


  if (!password || password.trim() === "") {
    errors.password = "Password is required";
  } else {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    if (!strongPasswordRegex.test(password)) {
      errors.password =
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

const validationLoginInput = (email, password) => {
  const errors = {};

  // Email validation
  if (!email || email.trim() === "") {
    errors.email = "Email is required";
  } else if (!EmailValidator.validate(email)) {
    errors.email = "Please provide a valid email address";
  }
  // Password validation
  if (!password || typeof password !== "string" || password.trim() === "") {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = {
  validationRegisterInput,
  validationLoginInput,
};
