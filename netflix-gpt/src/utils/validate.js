export const checkValidData = (email, password) => {
  // we are using regex
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password); // this return true or false

  if (!isEmailValid) {
    return "Email id is not valid";
  }
  if (!isPasswordValid) {
    return "Password is not valid";
  }
  return null; // means no error
};
