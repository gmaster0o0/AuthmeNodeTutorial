const crypto = require('crypto');

exports.createHash = input =>
  crypto
    .createHash('sha256')
    .update(input)
    .digest('hex');

exports.generateSalt = (saltLength = 16) => {
  const chars = '0123456789abcde';
  let salt = '';
  for (let index = 0; index < saltLength; index += 1) {
    salt += chars.charAt(Math.random() * 16);
  }
  return salt;
};

exports.computeHash = (password, salt) => {
  return `$SHA$${salt}$${this.createHash(this.createHash(password) + salt)}`;
};

exports.verifyPassword = (storedPassword, password) => {
  const parts = storedPassword.split('$');
  const salt = parts[2];
  const inputHash = this.computeHash(password, salt);

  return parts.length === 4 && inputHash === storedPassword;
};
