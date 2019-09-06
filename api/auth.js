import Users from "./database/users";
import Utils from "./utils";
import Password from "./password";
import jwt from 'jsonwebtoken';

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
  const usersFromDb = await db.getUsers();
  const users = usersFromDb.map(user => ({...user, password: '[Hidden]'}));
  res.status(200).json(users);
};

export const login = async (req, res) => {
  const { body: {email, password }} = req;
  const passwordObject = new Password(password);
  const user = await passwordObject.validatePassword(email);
  delete user.password;
  if (!user) {
    return res.status(401).json({ error: 'invalid credentials'})
  }
  const token = jwt.sign({data: user}, 'private', { expiresIn: '12h'});
  return res.status(200).json({ token });
};
