//const mysqlthis.connection = require('../config/mysqlthis.connection');
const mysql = require('mysql2');
const AppError = require('../utils/error');

module.exports = class Model {
  constructor(table) {
    this.table = table;
    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_DATABASE,
      password: process.env.MYSQL_PASSWORD
    });
    this.connection = this.pool.promise();
    this.connection
      .query('SELECT 1')
      .then(() => {
        console.log(`Adatbázis kapcsolat létrejött:${process.env.MYSQL_HOST}`);
      })
      .catch(console.log);
  }

  /**
   * Töröl egy sort az adatbázisból
   * @param {Object} item Kulcs érték pár ami alapján megkeressük a törölni kíván element
   */
  async deleteOne(item) {
    try {
      const queryString = `DELETE FROM ${this.table} WHERE ${Object.keys(item)} = '${Object.values(item)}'`;
      const [rows] = await this.connection.execute(queryString);

      return rows;
    } catch (error) {
      return new AppError(error, 500);
    } finally {
      if (this.connection) this.pool.end();
    }
  }

  /**
   * Módosít egy sort az adatbázisba
   * @param {Object} item Kulcs érték pár ami alapján megkeressük a módosítani kíván element
   * @param {Object} newValues Kulcs érték párok, amibe a mező és az új értékek vannak
   * @returns {Object} modositott elem
   */
  async updateOne(item, newValues) {
    try {
      const queryString = `UPDATE ${this.table} SET ${Object.keys(item)} = '${newValues}' WHERE ${Object.keys(
        item
      )} = '${Object.values(item)}'`;

      const [row] = await this.connection.execute(queryString);

      return row;
    } catch (error) {
      return new AppError(error, 500);
    } finally {
      if (this.connection) this.pool.end();
    }
  }

  /**
   * Új sor létrehozása
   * @param {Object} item A létrehozandó sor adatait tartalmazó object
   * @returns
   */
  async createOne(item) {
    try {
      let keys = Object.keys(item);
      const count = keys.length;
      const questionMark = new Array(count).fill('?');
      keys = keys.join(',');
      const values = Object.values(item);

      const queryString = `INSERT into ${this.table} ( ${keys} ) VALUES (${questionMark})`;
      const res = await this.connection.query(queryString, values);
      return res;
    } catch (error) {
      return new AppError(error, 500);
    } finally {
      if (this.connection) this.pool.end();
    }
  }

  /**
   * Egy sor lekérdezése az adatbázisból
   * @param {Object} item Kulcs érték pár ami alapján megkeressük az element
   * @param {Array} attributes Eredménybe szereplő értékek
   * @returns {Object} eredmény object attributes alapján szűrve
   */
  async getOne(item, attributes) {
    try {
      const queryString = `SELECT ${this.extractAttributes(attributes)} FROM ${this.table} WHERE ${Object.keys(
        item
      )} = '${Object.values(item)}'`;

      const [rows] = await this.connection.execute(queryString);

      return rows;
    } catch (error) {
      return new AppError(error, 500);
    } finally {
      if (this.connection) this.pool.end();
    }
  }

  /**
   * A összes elem lekérése az adatbázisból
   * @param {Array} attributes Eredménybe szereplő értékek
   */
  async getAll(attributes) {
    try {
      const queryString = `SELECT ${this.extractAttributes(attributes)} FROM ${this.table}`;

      return await this.connection.execute(queryString);
    } catch (error) {
      return new AppError(error, 500);
    } finally {
      if (this.connection) this.pool.end();
    }
  }
  //connect = await mysqlthis.connection.connect();

  extractAttributes(attributes) {
    if (!attributes || attributes.length === 0) {
      return '*';
    }
    return attributes.join(',');
  }
};
