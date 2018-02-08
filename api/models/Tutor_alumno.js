/**
 * Tutor_alumno.js
 *
 * @description :: The Tutor_alumno table
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'tutor_alumno',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    idAlumno: {
      type: 'integer',
      required: false,
      index: true,
      size: 11,
      defaultsTo: null,
      model: 'alumno'
    },
    idTutor: {
      type: 'integer',
      required: false,
      index: true,
      size: 11,
      defaultsTo: null,
      model: 'tutor'
    }
  }
};