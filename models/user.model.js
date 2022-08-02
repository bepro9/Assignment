const db = require("../utils/database");

module.exports = class User {
  constructor(
    id,
    uid,
    first_name,
    last_name,
    email,
    password,
    mobile,
    role,
    status
  ) {
    this.id = id;
    this.uid = uid;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.mobile = mobile;
    this.role = role;
    this.status = status;
  }

  save() {
    return db.execute(
      `INSERT INTO users (uid, first_name, last_name, email, password, mobile, role, status) VALUES (?,?,?,?,?,?,?,?)`,
      [
        this.uid,
        this.first_name,
        this.last_name,
        this.email,
        this.password,
        this.mobile,
        this.role,
        this.status,
      ]
    );
  }

  static fetchAll() {
    return db.execute(
      "SELECT first_name, last_name, email, mobile, status, role FROM users"
    );
  }

  static findByEmail(email, role) {
    return db.execute(
      "SELECT uid, email, password, role FROM users where email = ? AND role = ?",
      [email, role]
    );
  }
  static findUser(email) {
    return db.execute("SELECT * FROM users where email = ?", [email]);
  }
};
