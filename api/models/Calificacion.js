/**
 * Calificacion.js
 *
 * @description :: The Calificacion table
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'calificacion',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    examen_a: {
      type: 'integer',
      required: false,
      size: 11,
      defaultsTo: null
    },
    examen_b: {
      type: 'integer',
      required: false,
      size: 11,
      defaultsTo: null
    },
    examen_c: {
      type: 'integer',
      required: false,
      size: 11,
      defaultsTo: null
    },
    dps: {
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
    idAsignatura: {
      type: 'integer',
      required: false,
      index: true,
      size: 11,
      defaultsTo: null,
      model: 'asignatura'
    },
    idProfesor: {
      type: 'integer',
      required: false,
      index: true,
      size: 11,
      defaultsTo: null,
      model: 'profesor'
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