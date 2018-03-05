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
                            datoTurnos.forEach(function (turno, indexT) {
                                var auxCursos = [];
                                datoCursos.forEach(function (curso) {

                                    if (curso.idTurno == turno.id) {
                                        auxCursos.push(curso)
                                    }

                                }, this);
                                // sails.log('tamaño', auxCursos.length)
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

                                // sails.log('indexT_1', indexT);
                                // sails.log('auxGradosLength', auxGrados.length);
                                // sails.log('auxGrados', auxGrados);
                                turno.grados = auxGrados;
                                todo[indexT] = turno;
                                todo[indexT].grados=[];
                                //sails.log('todo', todo)
                                // sails.log('TURNO', turno)

                                auxGrados.forEach(function (grado, indexG) {
                                    sails.log('grados index', indexG)
                                    var auxGrupos = [];
                                    datoGrupos.forEach(function (grupo) {
                                        auxCursos.some(function (curso) {
                                            if (grado.id == curso.idGrado && grupo.id == curso.idGrupo) {
                                                auxGrupos.push(grupo)
                                                return true;
                                            }

                                        }, this);
                                    }, this);
                                    // sails.log('auxGrupos', auxGrupos)
                                    grado.grupos = auxGrupos;
                                    //  sails.log('grado.grupos', grado.grupos)
                                    //  sails.log('gardo1', grado)
                                    // sails.log('indexT_2', indexT);

                                    todo[indexT].grados.push(grado);
                                    todo[indexT].grados[indexG].grupos=[];
                                //    sails.log('todo', todo)
                                    // sails.log('gardo2', grado)

                                    auxGrupos.forEach(function (grupo, indexGr) {
                                        sails.log('grupo index', indexGr)
                                        var auxParalelos = [];
                                        datoParalelos.forEach(function (paralelo) {
                                            auxCursos.some(function (curso) {
                                                if (grupo.id == curso.idGrupo && grado.id == curso.idGrado && paralelo.id == curso.idParalelo) {
                                                    sails.log('grupo', grupo);
                                                    auxParalelos.push(paralelo)
                                                    return true;
                                                }

                                            }, this);
                                        }, this);

                                        grupo.paralelos = auxParalelos;
                                        // sails.log('paralelos', grupo.paralelos.length)
                                        // sails.log('indexT_3', indexT);
                                        todo[indexT].grados[indexG].grupos.push(grupo);
                                        auxParalelos = [];

                                    }, this);

                                    auxGrupos = [];
                                }, this);
                                auxGrados = [];
                                auxCursos = [];

                                sails.log('****************')

                            }, this);

                            console.log('llego aqui')
                            res.send(todo)
                        })
                    })
                })

            })
        })

    }

};