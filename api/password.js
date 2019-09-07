import bcrypt from 'bcrypt';
import Users from "./database/users";
import database from "./database/firebase";

class Password {
  salt = 10;
  constructor(password){
    this.password = password;
  }

  createPassword(){
    return new Promise((resolve, reject) => {
      return bcrypt.hash(this.password, this.salt, (err, hash) => {
        if (err) {
          return reject(err);
        }
        return resolve(hash)
      });
    });
  }

  validatePassword(email){
    const db = new Users();
    const mapRef = database.ref('data/emails');
    const encodedEmail = encodeURIComponent(email).replace(/\./g, '%2E');
    return mapRef.child(encodedEmail).once('value').then(data => {
      if (data && data.val()) {
        return db.getUser(data.val()).then(user => {
          if (!user) {
            return false
          }
          return bcrypt.compare(this.password, user.password)
            .then((res) => {
              if (res) return {...user, id: data.val()};
              return false;
            })
        });
      }
      return false;
    });
  }
}

export default Password;
