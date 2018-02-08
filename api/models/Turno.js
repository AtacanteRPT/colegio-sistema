/**
 * Turno.js
 *
 * @description :: The Turno table
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'turno',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    id: {
      type: 'integer',
      required: true,
      autoIncrement: true,
      primaryKey: true,
      size: 11
    },
    nombre: {
      type: 'string',
      required: false,
      size: 20,
      defaultsTo: null
    }
  }
};