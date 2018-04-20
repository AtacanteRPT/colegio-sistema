/**
 * AlumnoController.js
 *
 * @description :: Server-side logic for managing subscriptions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    alumno_tutor: function (req, res) {
        var tutores = [];
        console.log(req.param('id'))
        Alumno.findOne({
            idPersona: req.param('id')

        }).exec(function (err, datoAlumno) {

            if (err) { return res.serverError(err); }

            console.log("datoAlumno:", datoAlumno);
            Tutor_alumno.find({
                where: { idAlumno: datoAlumno.id }

            }).exec(function (err, datoTutor_alumno) {
                if (err) { return res.serverError(err); }

                async.forEach(datoTutor_alumno, function (auxTutor, cb) {
                    Tutor.findOne({ id: auxTutor.idTutor }).populate('idPersona').exec(function (err, datoTutor) {
                        if (err) { return res.serverError(err); }

                        console.log(datoTutor)
                        tutores.push(datoTutor);
                        sails.log('1:', tutores.length)
                        cb();
                    });

                }, function (error) {
                    sails.log('2:', tutores.length)
                    if (error) return res.negotiate(error);

                    return res.send(tutores)
                });

            })

        });

    },

    actualizar:function(req,res){

        var id = req.param('id')

        var identificacion = req.param('identificacion')
        Persona.update(id).set({identificacion : identificacion}).exec(function(err,datoPersona){
            sails.log('ACTUALIZADO : ',datoPersona)
            res.send(datoPersona)
        })
    },
    adicionar_tutor: function (req, res) {

        Alumno.findOne({ idPersona: req.param('idAlumno') }).exec(function (err, datoAlumno) {
            if (err) { return res.serverError(err); }

            Tutor.findOne({ idPersona: req.param('idTutor') }).exec(function (err, datoTutor) {
                if (err) { return res.serverError(err); }

                if (datoTutor) {
                    sails.log("AlumnoController", datoTutor);
                    Tutor_alumno.create({ id: 0, idAlumno: datoAlumno.id, idTutor: datoTutor.id }).exec(function (err, creado) {
                        if (err) { return res.serverError(err); }

                        console.log('******************************')
                        return res.redirect('/alumno/tutores/' + req.param('idAlumno'));

                    });
                }else{
                    res.send('NO ADICIONADO')
                }

            })

        });

    }

};