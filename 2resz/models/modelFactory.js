const mysqlConnection = require('../config/mysqlConnection');

let connection;

const extractAttributes = attributes => {
  if (!attributes || attributes.length === 0) {
    return '*';
  }
  return attributes.join(',');
};
/**
 * Töröl egy sort az adatbázisból
 * @param {Object} item Kulcs érték pár ami alapján megkeressük a törölni kíván element
 */
const deleteOne = async (item, table) => {
  try {
    const queryString = `DELETE FROM ${table} WHERE ${Object.keys(item)} = '${Object.values(item)}'`;
    connection = await mysqlConnection.connect();
    const [rows] = await connection.execute(queryString);

    return rows;
  } catch (error) {
    return new Error(error);
  } finally {
    if (connection) connection.close();
  }
};

/**
 * Módosít egy sort az adatbázisba
 * @param {Object} item Kulcs érték pár ami alapján megkeressük a módosítani kíván element
 * @param {Object} newValues Kulcs érték párok, amibe a mező és az új értékek vannak
 * @returns
 */
const updateOne = async (item, newValues, table) => {
  try {
    connection = await mysqlConnection.connect();
    const queryString = `UPDATE ${table} SET ${Object.keys(item)} = '${newValues}' WHERE ${Object.keys(
      item
    )} = '${Object.values(item)}'`;

    const [rows] = await connection.execute(queryString);

    return rows;
  } catch (error) {
    return new Error(error);
  } finally {
    if (connection) connection.close();
  }
};
/**
 * Új sor létrehozása
 * @param {Object} item A létrehozandó sor adatait tartalmazó object
 * @returns
 */
const createOne = async (item, table) => {
  try {
    connection = await mysqlConnection.connect();
    let keys = Object.keys(item);
    const count = keys.length;
    const questionMark = new Array(count).fill('?');
    keys = keys.join(',');
    const values = Object.values(item);

    const queryString = `INSERT into ${table} ( ${keys} ) VALUES (${questionMark})`;
    return await connection.query(queryString, values);
  } catch (error) {
    return new Error(error);
  } finally {
    if (connection) connection.close();
  }
};
/**
 * Egy sor lekérdezése az adatbázisból
 * @param {Object} item Kulcs érték pár ami alapján megkeressük az element
 * @param {Array} attributes Eredménybe szereplő értékek
 * @returns {Object} eredmény object attributes alapján szűrve
 */
const getOne = async (item, attributes, table) => {
  try {
    const queryString = `SELECT ${extractAttributes(attributes)} FROM ${table} WHERE ${Object.keys(
      item
    )} = '${Object.values(item)}'`;
    connection = await mysqlConnection.connect();
    const [rows] = await connection.execute(queryString);

    return rows;
  } catch (error) {
    return new Error(error);
  } finally {
    if (connection) connection.close();
  }
};
/**
 * A összes elem lekérése az adatbázisból
 * @param {Array} attributes Eredménybe szereplő értékek
 */
const getAll = async (table, attributes) => {
  try {
    const queryString = `SELECT ${extractAttributes(attributes)} FROM ${table}`;
    connection = await mysqlConnection.connect();
    return await connection.execute(queryString);
  } catch (error) {
    return new Error(error);
  } finally {
    if (connection) connection.close();
  }
};

exports.createModel = table => {
  return {
    connection: async () => await mysqlConnection.connect(),
    getAll: attribures => getAll(table, attribures),
    deleteOne: item => deleteOne(item, table),
    updateOne: (item, newValue) => updateOne(item, newValue),
    createOne: item => createOne(item, table),
    getOne: (item, attributes) => getOne(item, attributes, table)
  };
};
