


var fs = require('fs')
var path = require('path')
var conversion = require("phantom-html-to-pdf")();

module.exports = {

    asistenciaDia: function (req, res) {

        var dia = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
        var mes = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

        var fechaA = new Date('2/27/2018');
        var hoy = new Date();
        console.log('fecha', fechaA)
        Asistencia.find().populate('idPersona').exec((err, datoAsistencias) => {
            sails.log('datoAsistencias', datoAsistencias[0].fecha)
            datoAsistencias[0].fecha = fechaA.getDate() + ' de ' + mes[fechaA.getMonth()] + ' de ' + fechaA.getFullYear()
            res.view('asistenciaDia', { asistencia: datoAsistencias });
        });
    },

    generarReportePorDia: (req, res) => {

        var html = ''
        conversion({
            // html: "<h1>Hello World</h1>" 
            url: 'http://localhost:1337/report/asistenciaDia'
        }

            , function (err, pdf) {
                var output = fs.createWriteStream(path.join(__dirname, '../.././assets/reportes/output.pdf'))
                console.log(pdf.logs);

                console.log(pdf.numberOfPages);
                // since pdf.stream is a node.js stream you can use it
                // to save the pdf to a file (like in this example) or to
                // respond an http request.
                pdf.stream.pipe(output);
            });
        res.send('NADA')
    },
    generarReportePorMes: (req, res) => {

        var html = ''
        conversion({
            // html: "<h1>Hello World</h1>" 
            url: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
        }

            , function (err, pdf) {
                var output = fs.createWriteStream(path.join(__dirname, '../.././assets/reportes/output.pdf'))
                console.log(pdf.logs);
                console.log(pdf.numberOfPages);
                // since pdf.stream is a node.js stream you can use it
                // to save the pdf to a file (like in this example) or to
                // respond an http request.
                pdf.stream.pipe(output);
            });
        res.send('NADA')
    },
    mostrar: function (req, res) {

        res.send('NADA otra vez')
    },
    individual: function (req, res) {

        var curso = req.query;
        console.log('Curso', curso)
        var asistenciasCurso = []
        var alumnosCurso = []
        Curso.findOne(curso).exec(function (err, datoCurso) {

            sails.log("curso encontrado", datoCurso);
            Inscribe.find({ idCurso: datoCurso.id }).populate('idAlumno').exec(function (err, inscripciones) {

                var alumnosCurso = [];
                async.forEach(inscripciones, function (inscripcion, cb) {

                    var alumno = inscripcion.idAlumno;

                    Asistencia.find({ idPersona: alumno.idPersona }).exec(function (err, datosAsistencia) {
                        alumnosCurso.concat(datosAsistencia);
                        cb();
                    });

                }, function (error) {

                    if (error) return res.negotiate(error);
                    return res.send(alumnosCurso)

                });
            })
        })

    },
    generarReportePorGestion: (req, res) => {

        var html = ''
        conversion({
            // html: "<h1>Hello World</h1>" 
            url: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
        }

            , function (err, pdf) {
                var output = fs.createWriteStream(path.join(__dirname, '../.././assets/reportes/output.pdf'))
                console.log(pdf.logs);
                console.log(pdf.numberOfPages);
                // since pdf.stream is a node.js stream you can use it
                // to save the pdf to a file (like in this example) or to
                // respond an http request.
                pdf.stream.pipe(output);
            });
        res.send('NADA')
    },
    mostrar: function (req, res) {

        res.send('NADA otra vez')
    }

};