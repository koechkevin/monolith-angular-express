import database from "./database/firebase";
import jwt from 'jsonwebtoken';

export const validateNewUser = async (req, res, next) => {
  const mapRef = database.ref('data/emails');
  const encodedEmail = encodeURIComponent(req.body.email).replace(/\./g, '%2E');
  const ref = await  mapRef.child(encodedEmail).once('value');
  if (ref && ref.val()) {
    return res.status(409).json({error: 'Such user already exists'});
  }
  next();
};

export const validateToken = async (token) => {
  return new Promise((resolve, reject) => {
    return jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if(err) return reject(err);
      return resolve(decoded);
    });
  });
};

export const authenticate = async (req, res, next) => {
  try {
    const { headers: {token}} = req;
    const decoded = await validateToken(token);
    req.user = decoded.data;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token invalid'});
  }
};
