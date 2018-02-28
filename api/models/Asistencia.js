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
    fecha: {
      type: 'date',
      required: false,
      defaultsTo: null,
    },
    estado: {
      type: 'string',
      required: false,
      size: 50,
      defaultsTo: null
    },
    hora_llegada: {
      type: 'string',
      size: 50,
      required: false,
      defaultsTo: null
    },
    hora_salida: {
      type: 'string',
      required: false,
      size: 50,
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