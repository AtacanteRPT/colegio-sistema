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
    idCurso: {
      type: 'integer',
      required: false,
      index: true,
      size: 11,
      defaultsTo: null,
      model: 'curso'
    },
    idGestionAcademica: {
      type: 'integer',
      required: false,
      index: true,
      size: 11,
      defaultsTo: null,
      model: 'gestionacademica'
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