/**
 * Inscribe.js
 *
 * @description :: The Inscribe table
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'inscribe',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    idGrupo: {
      type: 'integer',
      required: false,
      index: true,
      size: 11,
      defaultsTo: null,
      model: 'grupo'
    },
    idParalelo: {
      type: 'integer',
      required: false,
      index: true,
      size: 11,
      defaultsTo: null,
      model: 'paralelo'
    },
    idTurno: {
      type: 'integer',
      required: false,
      index: true,
      size: 11,
      defaultsTo: null,
      model: 'turno'
    },
    idGrado: {
      type: 'integer',
      required: false,
      index: true,
      size: 11,
      defaultsTo: null,
      model: 'grado'
    },
    idGestionAcademica: {
      type: 'integer',
      required: false,
      index: true,
      size: 11,
      defaultsTo: null,
      model: 'gestionacademica'
    },
    idTutor: {
      type: 'integer',
      required: false,
      index: true,
      size: 11,
      defaultsTo: null,
      model: 'tutor'
    },
    idAlumno: {
      type: 'integer',
      required: false,
      index: true,
      size: 11,
      defaultsTo: null,
      model: 'alumno'
    }
  }
};