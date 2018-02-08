/**
 * Asistencia.js
 *
 * @description :: The Asistencia table
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'asistencia',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    idDia: {
      type: 'integer',
      required: false,
      index: true,
      size: 11,
      defaultsTo: null,
      model: 'dia'
    },
    estado: {
      type: 'string',
      required: false,
      size: 50,
      defaultsTo: null
    },
    hora_llegada: {
      type: 'time',
      required: false,
      defaultsTo: null
    },
    hora_salida: {
      type: 'time',
      required: false,
      defaultsTo: null
    },
    idGestionAcademica: {
      type: 'integer',
      required: false,
      index: true,
      size: 11,
      defaultsTo: null,
      model: 'gestionacademica'
    },
    idPersona: {
      type: 'integer',
      required: false,
      index: true,
      size: 11,
      defaultsTo: null,
      model: 'persona'
    }
  }
};