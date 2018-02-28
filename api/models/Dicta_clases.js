/**
 * Dicta_clases.js
 *
 * @description :: The Dicta_clases table
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'dicta_clases',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    idProfesor: {
      type: 'integer',
      required: false,
      index: true,
      size: 11,
      defaultsTo: null,
      model: 'profesor'
    },
    idAsignatura: {
      type: 'integer',
      required: false,
      index: true,
      size: 11,
      defaultsTo: null,
      model: 'asignatura'
    }

  }

};