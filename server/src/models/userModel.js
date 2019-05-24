export default class User {
  constructor(id, email, firstName, lastName, password, address, isAdmin = false) {
    this.id = id;
    this.email = email;
    this.first_name = firstName;
    this.last_name = lastName;
    this.password = password;
    this.address = address;
    this.isAdmin = isAdmin;
  }
}
