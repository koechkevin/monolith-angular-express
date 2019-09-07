import database from "./database/firebase";

export const validateNewUser = async (req, res, next) => {
  const mapRef = database.ref('data/emails');
  const encodedEmail = encodeURIComponent(req.body.email).replace(/\./g, '%2E');
  const ref = await  mapRef.child(encodedEmail).once('value');
  if (ref && ref.val()) {
    return res.status(409).json({error: 'Such user already exists'});
  }
  next();
};
