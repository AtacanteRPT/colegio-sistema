/**
 * Asignatura.js
 *
 * @description :: The Asignatura table
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'asignatura',
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
    sigla: {
      type: 'string',
      required: false,
      size: 50,
      defaultsTo: null
    },
    nombre: {
      type: 'string',
      required: false,
      size: 50,
      defaultsTo: null
    }
  }
};