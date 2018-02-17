/**
 * Usuario.js
 *
 * @description :: The Usuario table
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

const bcrypt = require('bcrypt-nodejs');

module.exports = {
  tableName: 'usuario',
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
    idPersona: {
      type: 'integer',
      required: true,
      index: true,
      size: 11,
      model: 'persona'
    },
    username: {
      type: 'string',
      required: true,
      size: 100
    },
    password: {
      type: 'string',
      required: true,
      size: 100
    },
    codigo_qr: {
      type: 'string',
      required: false,
      size: 250,
      defaultsTo: null
    },
    rol: {
      type: 'string',
      required: true,
      size: 25
    }

  },
  customToJSON: function () {
    return _.omit(this, ['password'])
  },
  beforeCreate: function (user, cb) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) return cb(err);
        user.password = hash;
        return cb();
      });
    });
  }

};