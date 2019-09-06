import fs from "fs";

class Users {
  database = `api/database/users.json`;
  getUsers = () => {
    return new Promise((resolve, reject) => {
      return fs.readFile(this.database, 'utf8',(error, response) => {
      if (error) {
        if (error.code === 'ENOENT') {
         return resolve([]);
        }
        return reject(error);
      }
      return resolve(JSON.parse(response).users)
    })}
    )
  };

  createUser = (user) => {
    return new Promise((resolve, reject) => {
      return this.getUsers().then(users => {
        users.push(user);
        return fs.writeFile(this.database, JSON.stringify({users}), (error) => {
          if(error){
            return reject(error)
          }
         return resolve(user);
        });
      });
    });
  }
}

export default Users;
