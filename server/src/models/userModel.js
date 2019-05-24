export default class User {
  constructor(id, email, firstName, lastName, password, address, isAdmin = false) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.address = address;
    this.isAdmin = isAdmin;
  }
}
