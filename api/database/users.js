import database from './firebase';

class Users {
  ref = database.ref('data/users');
  getUsers = () => {
    return this.ref.once('value').then(data => Object.values(data.val()||{}));
  };

  getUser = (id) => {
    return this.ref.child(id).once('value').then(user => user.val());
  };

  mapEmail = ({id, email}) => {
    const mapRef = database.ref('data/emails');
    const encodedEmail = encodeURIComponent(email).replace(/\./g, '%2E');
    return mapRef.child(encodedEmail).once('value').then(data => {
      if(data && data.val()){
        return data.val()
      }
      return mapRef.child(encodedEmail).set(id).then(() => {
        return this.mapEmail({id, email})
      });
    });
  };

  createUser = (user) => {
    return this.mapEmail({id: user.id, email: user.email}).then((id) => {
      return this.ref.child(id).set(user).then(() => ({...user, id}));
    });
  };

updateProfile = (profile) =>  {
  const { id, email} = profile;
  return this.mapEmail({ id, email }).then((uid) => {
    return this.ref.child(uid).update(profile).then(() => this.getUser(id))
  });
  }
}

export default Users;
