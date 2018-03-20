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

        // var csvFilePath = '../.././assets/cvs/administrativo.csv'

        // var nuevasPersonas = [];
        // var data = fs.readFileSync(path.join(__dirname, csvFilePath), { encoding: 'utf8' });
        // var options = {
        //     delimiter: ';', // optional
        //     quote: '"' // optional
        // };

        // nuevasPersonas = csvjson.toObject(data, options);
        // nuevasPersonas.forEach(function (persona) {

        //     persona.identificacion = persona.cedula
        //     persona.rol = 'administrativo'
        //     rest.postJson('http://localhost:1337/api/persona', persona).on('complete', function (data, response) {
        //         // handle response
        //         console.log('Persona Creada', data)
        //     });
        // }, this);

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

        // var csvFilePath = '../.././assets/cvs/administrativo.csv'

        // var nuevasPersonas = [];
        // var data = fs.readFileSync(path.join(__dirname, csvFilePath), { encoding: 'utf8' });
        // var options = {
        //     delimiter: ';', // optional
        //     quote: '"' // optional
        // };

        // nuevasPersonas = csvjson.toObject(data, options);

        // var contador = 1;
        // nuevasPersonas.forEach(function (persona) {

        //     persona.identificacion = persona.cedula

        //     var codigoQr = persona.identificacion + '$2018@' + ' Unidad Educativa TCNL.RAFAEL PABON FAB'
        //     var code = qr.image(codigoQr, { type: 'svg' });
        //     var output = fs.createWriteStream(path.join(__dirname, '../.././assets/codigos/' + contador + '.svg'))
        //     console.log("contador : " + contador)
        //     contador++;
        //     code.pipe(output);

        // }, this);

        // res.send('nada')

    }

};

