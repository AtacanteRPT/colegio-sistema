/**
 * PersonaController.js
 *
 * @description :: Server-side logic for managing subscriptions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var generatePassword = require('password-generator');
var user = [
    {
        id: 1,
        nombre: "Blanco"
    },
    {
        id: 2,
        nombre: "Verde"
    }

]

// id int AUTO_INCREMENT not null,
// email varchar(100),
// nombre varchar(100) not null,
// paterno varchar(100) not null,
// materno varchar(100) not null,
// telefono int,
// celular int,
// fechaNacimiento date,
// fechaAlta date,
// sexo varchar(20),
// primary key (id)
module.exports = {

    todo: function (req, res) {

        return res.send(user);
    }

    ,
    crear: function (req, res) {

        var nuevaPersona = {
            id: 0,
            identificacion: req.param('identificacion'),
            nombre: req.param('nombre'),
            email: req.param('email'),
            paterno: req.param('paterno'),
            materno: req.param('materno'),
            telefono: req.param('telefono'),
            celular: req.param('celular'),
            fechaNacimiento: req.param('fechaNacimiento'),
            cedula: req.param('cedula'),
            expedido: req.param('expedido'),
            sexo: req.param('sexo'),
            rol: req.param('rol'),
            nro:req.param('nro'),
            codigoFoto:req.param('codigoFoto')
        }

        var rol = req.param('rol');
        Persona.create(nuevaPersona).exec(function (err, datoPersona) {
            if (err) { return res.serverError(err) };

            sails.log(datoPersona);
            // console.log('persons : ' + datoPersona.nombre)
            switch (rol) {
                case 'alumno':
                    Alumno.create({ id: 0, idPersona: datoPersona.id }).exec(function (err, creado) { if (err) { return res.serverError(err); } })
                    break;
                case 'profesor':
                    Profesor.create({ id: 0, idPersona: datoPersona.id }).exec(function (err, creado) { if (err) { return res.serverError(err); } })
                    break;
                case 'tutor':
                    Tutor.create({ id: 0, idPersona: datoPersona.id }).exec(function (err, creado) { if (err) { return res.serverError(err); } })
                    break;
                case 'administrativo':
                    Administrador.create({ id: 0, idPersona: datoPersona.id, cargo: req.param('cargo') }).exec(function (err, creado) { if (err) { return res.serverError(err); } })
                    break;
                default:
                    break;
            }

            usuario =
                {
                    id: 0,
                    username: datoPersona.id + datoPersona.nombre,
                    password: datoPersona.id + datoPersona.nombre,
                    codigo_qr: datoPersona.nombre + " " + datoPersona.paterno + " " + datoPersona.materno,
                    rol: rol,
                    idPersona: datoPersona.id
                }

            Usuario.create(usuario).exec(function (err, creado) {
                if (err) { return res.serverError(err); }

            })

            res.send(datoPersona);
        });

    },
    traer: function (req, res) {
        var Id = req.param('id');

        Persona.findOne({ id: Id }).exec(function (err, datoPersona) {
            if (err) { return res.serverError(err); }

            Usuario.findOne({ idPersona: datoPersona.id }).exec(function (err, datoUsuario) {
                if (err) { return res.serverError(err); }

                var todoPersona = {
                    persona: datoPersona,
                    usuario: datoUsuario
                }

                res.send(todoPersona)
            });

        });
    }

    ,
    subir: function (req, res) {

        var idPersona = req.param('id');
        req.file('avatar').upload({
            // ~10MB
            dirname: require('path').resolve(sails.config.appPath, 'assets/avatars'),
            maxBytes: 10000000
        }, function whenDone(err, uploadedFiles) {

            if (err) {
                return res.negotiate(err);
            }

            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length === 0) {
                return res.badRequest('No file was uploaded');
            }

            console.log(sails.config.appUrl)

            var direccionBase = "http://localhost:1337"
            // var direccionBase = "http://192.241.152.146:1337"
            var url = direccionBase + "/avatars//" + (uploadedFiles[0].fd).substring(47);
            Persona.update({ id: idPersona }, {
                img: url,
            }).exec(function (err, datoPersona) {

                if (err) { console.log(err); return res.negotiate(err) };

                return res.send(datoPersona[0]);
            });

        });

    }
    ,
    informacion: function (req, res) {
        var codigoqr = req.param('codigoqr');
        var identificacion = codigoqr.split("$");
        console.log("idntificacion",identificacion[0])
        Persona.findOne({ identificacion: identificacion[0]}).exec(function (err, datoPersona) {
            if (err) { return res.serverError(err); }
            res.send(datoPersona);
        });
    }

};

