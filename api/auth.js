import Users from "./database/users";
import Utils from "./utils";
import Password from "./password";
import jwt from 'jsonwebtoken';
import {config} from 'dotenv';

config();

export const register = async (req, res) => {
  const db = new Users();
  const id = await Utils.generateId();
  const passwordObject = new Password(req.body.password);
  const password = await passwordObject.createPassword();
  const newUser = {...req.body, id, password};
  const user = await db.createUser(newUser);
  user.password = '[Hidden]';
  res.status(200).json(user);
};

export const listUsers = async (req, res) => {
  const db = new Users();
  const usersFromDb = await db.getUsers();
  const users = usersFromDb.map(user => ({...user, password: '[Hidden]'}));
  res.status(200).json(users);
};

export const login = async (req, res) => {
  const secret = process.env.SECRET_KEY;
  const { body: {email, password }} = req;
  const passwordObject = new Password(password);
  const user = await passwordObject.validatePassword(email);
  delete user.password;
  if (!user) {
    return res.status(401).json({ error: 'invalid credentials'})
  }
  const token = jwt.sign({data: user}, secret, { expiresIn: '12h'});
  return res.status(200).json({ token });
};

export const profile = async (req, res)  => {
  const db = new Users();
  const { user: {id} } = req;
  const profile = await db.getUser(id);
  res.status(200).json({ profile: {...profile, id} });
};

export const updateProfile = async (req, res) => {
  const { body, user: { id } } = req;
  const profileToUpdate = {...body, id};
  delete profileToUpdate.password;
  const db = new Users();
  const profile = await db.updateProfile(profileToUpdate);
  res.status(200).json({ profile: {...profile, password: '[Hidden]'} })
};
