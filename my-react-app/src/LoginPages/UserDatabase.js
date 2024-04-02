let userDatabase = [];

export const addUser = (userData) => {
  userDatabase.push(userData);
};

export const getUserDatabase = () => {
  return userDatabase;
};