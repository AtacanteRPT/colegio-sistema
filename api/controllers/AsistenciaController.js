
// var SerialPort = require('serialport');
// var moment = require('moment')
// var baseidentificacion = '0'
// var actualIdentificacion = '0'

// var auxAlumno = {
//     identificacion: 0,
//     materno: 'materno',
//     paterno: 'paterno',
//     nombre: 'nombre',
//     curso: 'predeterminado',
//     turno: 'predeterminado',
//     img: "",
// }

// var port = new SerialPort('COM10', {
//     baudRate: 57600
// });
// var horaActual = ''
// var maxHoraLlegada = 9;
// var minsLlegada = 0;
// var minHoraSalida = 12;
// var minsSalida = 0;
// var hoy = new Date();
// port.on('data', function (data) {
//     var hoy = new Date()
//     console.log(data.toString())
//     if (data.toString().length < 9) {
//         baseidentificacion = data.toString();
//     }

// })

// var sw = 0;

// module.exports = {

//     mostrar: function (req, res) {

//         var fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate()
//         horaActual = moment().format('LTS')   //07:46:55.000Z
//         // console.log("moment hora : ",moment().hour())
//         console.log('horaActual', hoy.getHours() + ' : '+ hoy.getMinutes())
//         if (hoy.getHours() >= maxHoraLlegada && hoy.getMinutes() >= minsSalida && sw == 0) {
//             actualIdentificacion = '0';
//             sw = 1;
//         }

//         console.log('fecha', fecha)
//         if (baseidentificacion != actualIdentificacion) {
//             if (actualIdentificacion == '0') { sw == 1 }

//             actualIdentificacion = baseidentificacion;
//             console.log('paso 1', actualIdentificacion)
//             var consulta = "SELECT p.nombre as paralelo, t.nombre as turno, g.nombre as grupo, tmpCurso.nombre , tmpCurso.paterno ,tmpCurso.materno,tmpCurso.img, tmpCurso.id as idAlumno ,tmpCurso.idCurso, tmpCurso.idPersona from paralelo p, turno t, grupo g , (SELECT c.idParalelo, c.idTurno,c.idGrupo, tmpInscribe.nombre, tmpInscribe.img, tmpInscribe.paterno,tmpInscribe.materno, tmpInscribe.idPersona, tmpInscribe.id, tmpInscribe.idCurso from curso c , (SELECT i.idCurso, tmpAlumno.nombre, tmpAlumno.paterno,tmpAlumno.materno, tmpAlumno.img, tmpAlumno.id, tmpAlumno.idPersona from inscribe i , (select p.nombre , p.paterno, p.materno , p.img, p.id as idPersona, a.id from persona p, alumno a where p.identificacion = ? and p.id = a.idPersona) tmpAlumno where i.idAlumno = tmpAlumno.id) tmpInscribe where c.id = tmpInscribe.idCurso)tmpCurso WHERE p.id = tmpCUrso.idParalelo and t.id = tmpCurso.idTurno and g.id = tmpCurso.idGrupo"
//             Persona.query(consulta, [actualIdentificacion], function (err, consulta) {
//                 if (err) { return res.serverError(err); }

//                 console.log('consulta', consulta[0])
//                 Asistencia.findOne({ idPersona: consulta[0].idPersona, fecha: fecha }).exec((err, datoAsistencia) => {
//                     // console.log('fechaAsistencia', datoAsistencia)

//                     if (datoAsistencia == null) {
//                         console.log('paso 2 creando nuevo')
//                         Asistencia.create(
//                             {
//                                 fecha: fecha,
//                                 estado: 'asistió',
//                                 hora_llegada: horaActual,
//                                 hora_salida: horaActual,
//                                 idGestionAcademica: 1,
//                                 idPersona: consulta[0].idPersona
//                             }

//                         ).exec((err, datoAsistencia) => {
//                             if (err) { return res.serverError(err); }

//                             auxAlumno = {
//                                 identificacion: actualIdentificacion,
//                                 materno: consulta[0].materno,
//                                 paterno: consulta[0].paterno,
//                                 nombre: consulta[0].nombre,
//                                 curso: consulta[0].grupo + " " + consulta[0].paralelo,
//                                 turno: consulta[0].turno,
//                                 img: consulta[0].img
//                                                   }

//                             if (hoy.getHours() >= minHoraSalida && hoy.getMinutes() >= minsSalida) {

//                                 auxAlumno.hora_llegada = moment().format('LTS') + ' no marco entrada'
//                                 auxAlumno.hora_salida = moment().format('LTS') 

//                             } else {
//                                 auxAlumno.hora_llegada = moment().format('LTS')
//                                 auxAlumno.hora_salida = moment().format('LTS') + '(no registrado)'

//                             }

//                             console.log("nuevo", auxAlumno)
//                             return res.send(auxAlumno);

//                         });
//                     }

//                     // if (hoy.getHours() < maxHoraLlegada) {
//                     //     console.log('paso 3 actualizando lleada')

//                     //     Asistencia.update({ idPersona: consulta[0].idPersona, fecha: fecha }, { idPersona: consulta[0].idPersona },
//                     //         {
//                     //             hora_llegada: horaActual
//                     //         }).exec((err, datoAsistencia) => { })

//                     // }

//                     if (hoy.getHours() >= minHoraSalida && hoy.getMinutes() >= minsSalida && datoAsistencia != null) {
//                         console.log('paso 4 actualizando salida')

//                         Asistencia.update({ idPersona: consulta[0].idPersona, fecha: fecha },
//                             {
//                                 hora_salida: horaActual
//                             }).exec((err, datoAsistencia) => {
//                                 console.log('actualizado', datoAsistencia)

//                                 auxAlumno = {
//                                     identificacion: actualIdentificacion,
//                                     materno: consulta[0].materno,
//                                     paterno: consulta[0].paterno,
//                                     nombre: consulta[0].nombre,
//                                     curso: consulta[0].grupo + " " + consulta[0].paralelo,
//                                     turno: consulta[0].turno,
//                                     img: consulta[0].img,
//                                     hora_llegada: datoAsistencia[0].hora_llegada,
//                                     hora_salida: datoAsistencia[0].hora_salida
//                                 }

//                                 return res.send(auxAlumno);

//                             })
//                     }

//                     // else if (auxAlumno.identificacion == 0 && datoAsistencia != null) {
//                     //     console.log('cambio')
//                     //     auxAlumno = {
//                     //         identificacion: actualIdentificacion,
//                     //         materno: consulta[0].materno,
//                     //         paterno: consulta[0].paterno,
//                     //         nombre: consulta[0].nombre,
//                     //         curso: consulta[0].grupo + " " + consulta[0].paralelo,
//                     //         turno: consulta[0].turno,
//                     //         img: consulta[0].img,
//                     //         hora_llegada: datoAsistencia.hora_llegada,
//                     //         hora_salida: moment().format('LTS') 
//                     //     }

//                     //     res.send(auxAlumno)

//                     // }

//                     else if (datoAsistencia != null) {
//                         console.log('mostrando sin cambios')
//                         auxAlumno = {
//                             identificacion: actualIdentificacion,
//                             materno: consulta[0].materno,
//                             paterno: consulta[0].paterno,
//                             nombre: consulta[0].nombre,
//                             curso: consulta[0].grupo + " " + consulta[0].paralelo,
//                             turno: consulta[0].turno,
//                             img: consulta[0].img,
//                             hora_llegada: datoAsistencia.hora_llegada,
//                             hora_salida: moment().format('LTS') + ' (momentanea)'
//                         }

//                         res.send(auxAlumno)
//                     }

//                 })

//             });
//         } else {
//             console.log('actualIdentifiacion', actualIdentificacion);
//             console.log('baseIdentificacion', baseidentificacion);

//             console.log('repedito')
//             res.send(auxAlumno)
//         }

//     },
//     get: function (req, res) {

//         var consulta = "SELECT p.nombre as paralelo, t.nombre as turno, g.nombre as grupo, tmpCurso.nombre , tmpCurso.paterno ,tmpCurso.materno,tmpCurso.img, tmpCurso.id as idAlumno ,tmpCurso.idCurso from paralelo p, turno t, grupo g , (SELECT c.idParalelo, c.idTurno,c.idGrupo, tmpInscribe.nombre, tmpInscribe.img, tmpInscribe.paterno,tmpInscribe.materno, tmpInscribe.id, tmpInscribe.idCurso from curso c , (SELECT i.idCurso, tmpAlumno.nombre, tmpAlumno.paterno,tmpAlumno.materno, tmpAlumno.img, tmpAlumno.id from inscribe i , (select p.nombre , p.paterno, p.materno , p.img, a.id from persona p, alumno a where p.identificacion = ? and p.id = a.idPersona) tmpAlumno where i.idAlumno = tmpAlumno.id) tmpInscribe where c.id = tmpInscribe.idCurso)tmpCurso WHERE p.id = tmpCUrso.idParalelo and t.id = tmpCurso.idTurno and g.id = tmpCurso.idGrupo"
//         Persona.query(consulta, ['28970'], function (err, consulta) {
//             if (err) { return res.serverError(err); }

//             res.send(consulta)
//         })
//     },
//     cambioHora: function (req, res) {

//         minHoraSalida = parseInt((req.body.minHoraSalida).substring(0, 2))
//         minsSalida = parseInt((req.body.minHoraSalida).substring(3, 5))
//         console.log('minHoraSalida', minHoraSalida)
//         console.log('minsSalida', minsSalida)
//         res.json('ajuste horario cambiado')

//     }

// }; 

module.exports = {}