import Users from "./database/users";

class Utils {
  static generateId = async () => {
    const db = new Users();
    const users = await db.getUsers();
    const userIds = users.map(e => e.id);
    let id = Math.floor( Math.random() * ( 40000000000000 - 1 + 1 ) ) + 1;
    while (userIds.includes(id)) {
      id = Math.floor( Math.random() * ( 40000000000000 - 1 + 1 ) ) + 1;
    }
    return id;
  };
}
export default Utils;
