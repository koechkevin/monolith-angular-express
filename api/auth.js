import Users from "./database/users";
import Utils from "./utils";
import Password from "./password";

export const register = async (req, res) => {
  const db = new Users();
  const id = await Utils.generateId();
  const passwordObject = new Password(req.body.password);
  const password = await passwordObject.createPassword();
  const newUser = {...req.body, id, password};
  const user = await db.createUser(newUser);
  delete user.password;
  res.status(200).json(user);
};

export const listUsers = async (req, res) => {
  const db = new Users();
  const users = await db.getUsers();
  res.status(200).json(users);
};
