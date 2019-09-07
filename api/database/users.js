import database from './firebase';

class Users {
  database = `api/database/users.json`;
  ref = database.ref('data/users');
  getUsers = () => {
    return this.ref.once('value').then(data => Object.values(data.val()));
  };

  getUser = (id) => {
    return this.ref.child(id).once('value').then(user => user.val());
  };

  createUser = (user) => {
    return this.ref.child(user.id).set(user).then(() => user);
  }
}

export default Users;
