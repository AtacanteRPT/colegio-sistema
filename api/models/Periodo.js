/**
 * Periodo.js
 *
 * @description :: The Periodo table
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'periodo',
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
    hora_ini: {
      type: 'time',
      required: false,
      defaultsTo: null
    },
    hora_fin: {
      type: 'time',
      required: false,
      defaultsTo: null
    }
  }
};