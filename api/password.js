import bcrypt from 'bcrypt';
import Users from "./database/users";

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
    return db.getUsers().then(users => {
      const user = users.find(e => e.email === email);
      if (!user) {
        return false
      }
      return bcrypt.compare(this.password, user.password)
        .then((res) => {
          if (res) return user;
          return false;
        })
    })
  }
}

export default Password;
