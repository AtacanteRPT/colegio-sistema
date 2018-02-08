/**
 * Historial_asistencia.js
 *
 * @description :: The Historial_asistencia table
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'historial_asistencia',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    cantidad_faltas: {
      type: 'integer',
      required: false,
      size: 11,
      defaultsTo: null
    },
    cantidad_asistencia: {
      type: 'integer',
      required: false,
      size: 11,
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