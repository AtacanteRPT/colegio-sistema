/**
 * Gestionacademica.js
 *
 * @description :: The Gestionacademica table
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'gestionacademica',
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
    tipo: {
      type: 'string',
      required: false,
      size: 20,
      defaultsTo: null
    },
    fecha_inicio: {
      type: 'date',
      required: false,
      defaultsTo: null
    },
    fecha_fin: {
      type: 'date',
      required: false,
      defaultsTo: null
    },
    horaEntrada: {
      type: 'time',
      required: false,
      defaultsTo: null
    },
    horaSalida: {
      type: 'time',
      required: false,
      defaultsTo: null
    },
  }

};