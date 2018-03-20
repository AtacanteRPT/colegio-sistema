/**
 * Turno_paralelo_grado_grupoController.js
 *
 * @description :: Server-side logic for managing subscriptions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    hola: function (req, res) {
        res.send('HOLAAAAAAAAAA')
    }

    ,
    todos: (req, res) => {
        var todosLosCursos = []

        Curso.find().exec((err, datoCursos) => {
            if (err) { return res.serverError(err); }

            Turno.find().exec((err, datoTurnos) => {
                if (err) { return res.serverError(err); }

                // async.forEach(datoTurnos, function (datoTurno, cb) {
                //     Curso.find({ idTurno: datoTurno.id }).exec(function (err, datoCursos) {
                //         if (err) { return res.serverError(err); }

                //         Grado.find().exec((err,datoGrado)=>{

                //         })

                //         datoTurno.grados = grados
                //         todosLosCursos.push(datoTurno)

                //         cb();
                //     });

                // }, function (error) {

                //     if (error) return res.negotiate(error);

                //     return res.send(todosLosCursos)
                // });

                Grado.find().exec((err, datoGrados) => {
                    if (err) { return res.serverError(err); }

                    Grupo.find().exec((err, datoGrupos) => {
                        if (err) { return res.serverError(err); }

                        Paralelo.find().exec((err, datoParalelos) => {
                            if (err) { return res.serverError(err); }

                            var todo = [];
                            var turno = {};

                            datoTurnos.forEach(function (turno, indexT) {
                                // sails.log('turno : ', datoTurnos[indexT])
                                var auxCursos = [];
                                datoCursos.forEach(function (curso) {

                                    if (curso.idTurno == turno.id) {
                                        auxCursos.push(curso)
                                    }

                                }, this);
                                sails.log('tamaño Cursos', auxCursos.length)
                                // sails.log('auxCurso', auxCursos)

                                var auxGrados = [];
                                datoGrados.forEach(function (grado) {
                                    auxCursos.some(function (curso) {
                                        if (curso.idGrado == grado.id) {
                                            auxGrados.push(grado)
                                            return true;
                                        }

                                    }, this);

                                }, this);
                                turno.grados = []
                                // sails.log('indexT_1', indexT);
                                // sails.log('auxGradosLength', auxGrados.length);
                                // sails.log('auxGrados', auxGrados);
                                turno.grados = auxGrados;
                                // todo[indexT] = turno;
                                // todo[indexT].grados = auxGrados;
                                sails.log('turno : ', turno)
                                // todo.push(datoTurnos[indexT])
                                // todo.splice(indexT, 0, turno);

                                // if (indexT == 1) {
                                //     todo[1].grados[1].oso = "ricardo"
                                //     res.send(todo)
                                // }

                                // sails.log('todo', todo)
                                // todo[indexT].grados = []
                                auxGrados.forEach(function (grado, indexG) {
                                    // sails.log('grados index', indexG)
                                    var auxGrupos = [];
                                    datoGrupos.forEach(function (grupo) {
                                        auxCursos.some(function (curso) {
                                            if (grado.id == curso.idGrado && grupo.id == curso.idGrupo) {
                                                // sails.log('grupo', grupo)
                                                auxGrupos.push(grupo)
                                                return true;
                                            }

                                        }, this);
                                    }, this);
                                    // sails.log('auxGrupos', auxGrupos)
                                    grado.grupos = auxGrupos;
                                    //  sails.log('grado.grupos', grado.grupos)
                                    //  sails.log('gardo1', grado)

                                    sails.log('indexT_1', indexT);
                                    sails.log('indexG :', indexG);
                                    // todo[indexT].grados.push(grado)

                                    // todo[indexT].grados.splice(indexG, 0, "Lene");

                                    turno.grados[indexG].grupos = [];
                                    turno.grados[indexG].grupos = auxGrupos;
                                    // console.log('grupos++ ', todo[indexT].grados[indexG].grupos)

                                    // sails.log('TODO : ',todo[indexT].grados[indexG])
                                    // todo[indexT].grados[indexG].grupos = [];
                                    //    sails.log('todo', todo)
                                    // sails.log('gardo2', grado)

                                    // auxGrupos.forEach(function (grupo, indexGr) {
                                    //     sails.log('grupo index', indexGr)
                                    //     var auxParalelos = [];
                                    //     datoParalelos.forEach(function (paralelo) {
                                    //         auxCursos.some(function (curso) {
                                    //             if (grupo.id == curso.idGrupo && grado.id == curso.idGrado && paralelo.id == curso.idParalelo) {
                                    //                 sails.log('paralelo: ', paralelo);
                                    //                 auxParalelos.push(paralelo)
                                    //                 return true;
                                    //             }

                                    //         }, this);
                                    //     }, this);

                                    //     grupo.paralelos = auxParalelos;
                                    //     // sails.log('paralelos', grupo.paralelos.length)
                                    //     // sails.log('indexT_3', indexT);
                                    //     todo[indexT].grados[indexG].grupos[indexGr].paralelos = [];
                                    //     todo[indexT].grados[indexG].grupos[indexGr].paralelos = auxParalelos;
                                    //     auxParalelos = [];

                                    // }, this);

                                }, this);

                                todo.push(turno)
                                turno = null;

                                sails.log('****************')

                            }, this);

                            console.log('llego aqui')
                            res.send(todo)
                        })
                    })
                })

            })
        })

    },

    mostrar_turno: (req, res) => {
        var todosLosCursos = []

        Curso.find().exec((err, datoCursos) => {
            if (err) { return res.serverError(err); }

            Turno.findOne(req.param('id')).exec((err, turno) => {
                if (err) { return res.serverError(err); }

                Grado.find().exec((err, datoGrados) => {
                    if (err) { return res.serverError(err); }

                    Grupo.find().exec((err, datoGrupos) => {
                        if (err) { return res.serverError(err); }

                        Paralelo.find().exec((err, datoParalelos) => {
                            if (err) { return res.serverError(err); }

                            var auxCursos = [];
                            datoCursos.forEach(function (curso) {

                                if (curso.idTurno == turno.id) {
                                    auxCursos.push(curso)
                                }

                            }, this);
                            sails.log('tamaño Cursos', auxCursos.length)
                            // sails.log('auxCurso', auxCursos)

                            var auxGrados = [];
                            datoGrados.forEach(function (grado) {
                                auxCursos.some(function (curso) {
                                    if (curso.idGrado == grado.id) {
                                        auxGrados.push(grado)
                                        return true;
                                    }

                                }, this);

                            }, this);
                            turno.grados = []
                            turno.grados = auxGrados;
                            auxGrados.forEach(function (grado, indexG) {
                                // sails.log('grados index', indexG)
                                var auxGrupos = [];
                                datoGrupos.forEach(function (grupo) {
                                    auxCursos.some(function (curso) {
                                        if (grado.id == curso.idGrado && grupo.id == curso.idGrupo) {
                                            // sails.log('grupo', grupo)
                                            auxGrupos.push(grupo)
                                            return true;
                                        }

                                    }, this);
                                }, this);
                                grado.grupos = auxGrupos;
                                turno.grados[indexG].grupos = [];
                                turno.grados[indexG].grupos = auxGrupos;

                                auxGrupos.forEach(function (grupo, indexGr) {
                                    sails.log('grupo index', indexGr)
                                    var auxParalelos = [];
                                    datoParalelos.forEach(function (paralelo) {
                                        auxCursos.some(function (curso) {
                                            if (grupo.id == curso.idGrupo && grado.id == curso.idGrado && paralelo.id == curso.idParalelo) {
                                                sails.log('paralelo: ', paralelo);
                                                auxParalelos.push(paralelo)
                                                return true;
                                            }

                                        }, this);
                                    }, this);

                                    grupo.paralelos = auxParalelos;
                                    // sails.log('paralelos', grupo.paralelos.length)
                                    // sails.log('indexT_3', indexT);
                                    turno.grados[indexG].grupos[indexGr].paralelos = [];
                                    turno.grados[indexG].grupos[indexGr].paralelos = auxParalelos;

                                }, this);

                            }, this);

                            sails.log('****************')

                            console.log('llego aqui')
                            res.send(turno)
                        })
                    })
                })

            })
        })

    },

    completo: function (req, res) {

        Curso.find({ where: {} }).exec((err, datoCursos) => {
            if (err) { return res.serverError(err); }

        })

    }

};