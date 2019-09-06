import bcrypt from 'bcrypt';

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
}

export default Password;
