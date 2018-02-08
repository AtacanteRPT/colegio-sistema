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
            nombre: req.param('nombre'),
            email: req.param('email'),
            paterno: req.param('paterno'),
            materno: req.param('materno'),
            telefono: req.param('telefono'),
            celular: req.param('celular'),
            fechaNacimiento: req.param('fechaNacimiento'),
            cedula: req.param('cedula'),
            expedido: req.param('expedido'),
            sexo: req.param('sexo')
        }

        console.log('persona : ' + nuevaPersona.email);

        console.log('pass : ' + generatePassword());

        var rol = req.param('rol');
        Persona.create(nuevaPersona).exec(function (err, datoPersona) {
            if (err) { return res.serverError(err) };

            sails.log(datoPersona);
            console.log('persons : ' + datoPersona.nombre)
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

                default:
                    break;
            }

            usuario =
                {
                    id: 0,
                    username: datoPersona.id + datoPersona.nombre,
                    password: generatePassword(),
                    codigo_qr: generatePassword(12, false, /\d/),
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

};

