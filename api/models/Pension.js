/**
 * Pension.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'pension',
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
    gestion: {
      type: 'string',
      required: false,
      size: 20,
      defaultsTo: null
    },
    enero: {
      type: 'boolean',
      required: false,
      size: 20,
      defaultsTo: null
    },
    febrero: {
      type: 'boolean',
      required: false,
      size: 20,
      defaultsTo: null
    },
    marzo: {
      type: 'boolean',
      required: false,
      size: 20,
      defaultsTo: null
    },
    abril: {
      type: 'boolean',
      required: false,
      size: 20,
      defaultsTo: null
    },
    mayo: {
      type: 'boolean',
      required: false,
      size: 20,
      defaultsTo: null
    },
    junio: {
      type: 'boolean',
      required: false,
      size: 20,
      defaultsTo: null
    },
    julio: {
      type: 'boolean',
      required: false,
      size: 20,
      defaultsTo: null
    },
    agosto: {
      type: 'boolean',
      required: false,
      size: 20,
      defaultsTo: null
    },
    septiembre: {
      type: 'boolean',
      required: false,
      size: 20,
      defaultsTo: null
    },
    octubre: {
      type: 'boolean',
      required: false,
      size: 20,
      defaultsTo: null
    },
    noviembre: {
      type: 'boolean',
      required: false,
      size: 20,
      defaultsTo: null
    },
    diciembre: {
      type: 'boolean',
      required: false,
      size: 20,
      defaultsTo: null
    }

  }

};

