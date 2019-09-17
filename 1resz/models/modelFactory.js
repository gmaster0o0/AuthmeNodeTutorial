const mysqlConnection = require('../config/mysqlConnection');
/**
 * Töröl egy sort az adatbázisból
 * @param {Object} item Kulcs érték pár ami alapján megkeressük a törölni kíván element
 
 */
exports.deleteOne = item => {};
/**
 * Módosít egy sort az adatbázisba
 * @param {Object} item Kulcs érték pár ami alapján megkeressük a módosítani kíván element
 * @param {Object} newValues Kulcs érték párok, amibe a mező és az új értékek vannak
 * @returns
 */
exports.updateOne = (item, newValues) => {};
/**
 * Új sor létrehozása
 * @param {Object} item A létrehozandó sor adatait tartalmazó object
 * @returns
 */
exports.createOne = item => {};
/**
 * Egy sor lekérdezése az adatbázisból
 * @param {Object} item Kulcs érték pár ami alapján megkeressük az element
 * @param {Array} attributes Eredménybe szereplő értékek
 * @returns {Object} eredmény object attributes alapján szűrve
 */
exports.getOne = (item, attributes) => {};
/**
 * A összes elem lekérése az adatbázisból
 * @param {Array} attributes Eredménybe szereplő értékek
 * @returns {Array} eredmény tömb, ami sorokat tartalmazza kulcs érték pár formában
 */
exports.getAll = attributes => {};
