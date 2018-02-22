/**
 * Turno_paralelo_grado_grupo.js
 *
 * @description :: The Turno_paralelo_grado_grupo table
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'curso',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
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
    idGrupo: {
      type: 'integer',
      required: false,
      index: true,
      size: 11,
      defaultsTo: null,
      model: 'grupo'
    }
  }
};