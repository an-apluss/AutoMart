/**
 *
 *
 * @export User
 * @class User
 */
export default class User {
  /**
   *Creates an instance of User.
   * @param {Integer} id
   * @param {String} email
   * @param {String} firstName
   * @param {String} lastName
   * @param {String} password
   * @param {String} address
   * @param {boolean} [isAdmin=false]
   * @memberof User
   */
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
