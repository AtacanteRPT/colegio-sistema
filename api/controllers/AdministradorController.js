/**
 * AdministradorController
 *
 * @description :: Server-side logic for managing Administradors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var csvjson = require('csvjson');
var fs = require('fs');
var path = require('path')

var rest = require('restler');

var qr = require('qr-image');

module.exports = {

    adicionarPersonas: function (res, res) {

        var csvFilePath = '../.././assets/cvs/todosFab.csv'

        var nuevasPersonas = [];
        var data = fs.readFileSync(path.join(__dirname, csvFilePath), { encoding: 'utf8' });
        var options = {
            delimiter: ';', // optional
            quote: '"' // optional
        };

        nuevasPersonas = csvjson.toObject(data, options);
        nuevasPersonas.forEach(function (persona) {

            if (persona.cedula.length > 0) {
                persona.identificacion = persona.cedula
            } else {
                persona.identificacion = persona.codigoFoto
                persona.cedula = 0;
            }

            if (persona.rol == 'profesor') {
                persona.rol = 'profesor'
            } else {
                persona.rol = 'administrativo'
            }

            rest.postJson('http://localhost:1337/api/persona', persona).on('complete', function (data, response) {
                // handle response
                console.log('Persona Creada', data)
            });
        }, this);

        res.send('NADA')
    },
    generarCodigosQr: function (req, res) {

        // Persona.find().exec((err, personas) => {

        //     var contador = 1 ; 

        //     personas.forEach(function (persona) {
        //         var codigoQr = persona.identificacion+'$2018@'+' Unidad Educativa TCNL.RAFAEL PABON FAB' 
        //         var code = qr.image(codigoQr, { type: 'svg' });
        //         var output = fs.createWriteStream(path.join(__dirname,'../.././assets/codigos/'+contador+'.svg'))
        //         code.pipe(output);
        //     }, this);
        //     res.send('NADA 2')
        // }); 

        var csvFilePath = '../.././assets/cvs/personalFab.csv'

        var nuevasPersonas = [];
        var data = fs.readFileSync(path.join(__dirname, csvFilePath), { encoding: 'utf8' });
        var options = {
            delimiter: ';', // optional
            quote: '"' // optional
        };

        nuevasPersonas = csvjson.toObject(data, options);

        var contador = 1;
        nuevasPersonas.forEach(function (persona) {

            if (persona.cedula.length > 0) {
                persona.identificacion = persona.cedula
            } else {
                persona.identificacion = persona.codigoFoto

            }

            var codigoQr = persona.identificacion + '$2018@' + ' Unidad Educativa TCNL.RAFAEL PABON FAB'
            var code = qr.image(codigoQr, { type: 'svg' });
            var output = fs.createWriteStream(path.join(__dirname, '../.././assets/codigos/' + persona.nro + '.svg'))
            console.log("contador : " + contador)
            contador++;
            code.pipe(output);

        }, this);

        res.send('nada')

    },
    cargarFotos: function (req, res) {

        req.file('avatar').upload({
            // ~10MB
            dirname: require('path').resolve(sails.config.appPath, 'assets/avatars'),
            maxBytes: 20000000
        }, function whenDone(err, uploadedFiles) {

            if (err) {
                return res.negotiate(err);
            }

            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length === 0) {
                return res.badRequest('No file was uploaded');
            }

            var csvFilePath = '../.././assets/cvs/personalFab.csv'

            var nuevasPersonas = [];
            var data = fs.readFileSync(path.join(__dirname, csvFilePath), { encoding: 'utf8' });
            var options = {
                delimiter: ';', // optional
                quote: '"' // optional
            };

            nuevasPersonas = csvjson.toObject(data, options);

            var contador = 1;
            nuevasPersonas.forEach(function (persona) {

                if (persona.cedula.length > 0) {
                    persona.identificacion = persona.cedula
                } else {
                    persona.identificacion = persona.codigoFoto
                }

                var direccionBase = "http://localhost:1337"
                // var direccionBase = "http://192.241.152.146:1337"

                uploadedFiles.forEach(function (file, i) {

                    var nombreFoto = file.filename.substring(4, 8);
                    sails.log('NOMBRE FOTO: ', nombreFoto)
                    sails.log('codigo FOTO: ', persona.codigoFoto)
                    if (nombreFoto == persona.codigoFoto) {
                        sails.log('++++++++++++++++++++++++++++++++++')
                        sails.log('IGUALES')

                        sails.log('Persona - Identificacion', "*" + persona.identificacion + "*")
                        var url = direccionBase + "/avatars//" + (uploadedFiles[i].fd).substring(47);
                        Persona.findOne({ identificacion: persona.identificacion }).exec(function (err, datoPersona) {
                            if (err) { console.log(err); return res.negotiate(err) };

                            console.log('ID PERSONA : ', datoPersona)

                            Persona.update({ id: datoPersona.id }, { img: url }).exec(function (err, per) {

                                if (err) { console.log(err); return res.negotiate(err) };

                                console.log('Se adicio Foto a : ', per.identificacion)
                            });
                        });
                    }

                }, this);

            }, this);

            //  var direccionBase = "http://localhost:1337"
            // var direccionBase = "http://192.241.152.146:1337"
            // var url = direccionBase + "/avatars//" + (uploadedFiles[0].fd).substring(47);
            // Persona.update({ id: idPersona }, {
            //     img: url,
            // }).exec(function (err,datoPersona) {

            //     if (err) { console.log(err); return res.negotiate(err) };

            //     return res.send(datoPersona[0]);
            // });
            return res.send(uploadedFiles);
        });

    },
    random: (req, res) => {

        Persona.findOne({ identificacion: '1730' }).exec(function (err, datoPersona) {
            if (err) { console.log(err); return res.negotiate(err) };

            console.log('ID PERSONA : ', datoPersona)
            Persona.update({ id: datoPersona.id }, { img: 'url' }).exec(function (err, per) {

                if (err) { console.log(err); return res.negotiate(err) };

                console.log('Se adicio Foto a : ', per.identificacion)

                res.send(per)
            });
        });
    }

};

