export const checkValidSignUp = (email, password, name) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );
  //name-no spaces are included
  const isNameValid = /^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(name);

  if (!isEmailValid) return "Please enter valid Email";
  if (!isPasswordValid) return "Please enter valid password";
  if (!isNameValid) return "Name is not valid";

  return null;
};

export const checkValidSignIn = (email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );

  if (!isEmailValid) return "Please enter valid Email";
  if (!isPasswordValid) return "Please enter valid password";
  return null;
};
