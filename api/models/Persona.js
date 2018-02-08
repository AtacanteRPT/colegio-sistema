/**
 * Persona.js
 *
 * @description :: The Persona table
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'persona',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    id: {
      type: 'integer',
      required: true,
      autoIncrement: true,
      primaryKey: true,
      size: 11
    },
    email: {
      type: 'string',
      required: false,
      size: 100,
      defaultsTo: null
    },
    nombre: {
      type: 'string',
      required: true,
      size: 100
    },
    paterno: {
      type: 'string',
      required: true,
      size: 100
    },
    materno: {
      type: 'string',
      required: true,
      size: 100
    },
    telefono: {
      type: 'integer',
      required: false,
      size: 11,
      defaultsTo: null
    },
    celular: {
      type: 'integer',
      required: false,
      size: 11,
      defaultsTo: null
    },
     cedula: {
      type: 'integer',
      required: false,
      size: 11,
      defaultsTo: null
    },
     expedido: {
      type: 'string',
      required: false,
      size: 11,
      defaultsTo: null
    },
    fechaNacimiento: {
      type: 'date',
      required: false,
      defaultsTo: null
    },
    fechaAlta: {
      type: 'date',
      required: false,
      defaultsTo: null
    },
    sexo: {
      type: 'string',
      required: false,
      size: 20,
      defaultsTo: null
    }

  }

};