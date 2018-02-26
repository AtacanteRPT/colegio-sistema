
var SerialPort = require('serialport');
var moment = require('moment')
var baseidentificacion = '0'
var actualIdentificacion = '0'

var auxAlumno = {
    identificacion: 0,
    materno: 'materno',
    paterno: 'paterno',
    nombre: 'nombre',
    curso: 'predeterminado',
    turno: 'predeterminado',
    img: "",
}

var port = new SerialPort('COM10', {
    baudRate: 57600
});
var horaActual = ''
var maxHoraLlegada = 9;
var minHoraSalida = 12;
port.on('data', function (data) {
    var hoy = new Date()
    console.log(data.toString())
    baseidentificacion = data.toString();
    if (hoy.getHours() >= minHoraSalida) {
        actualIdentificacion = 0;
    }

})

module.exports = {

    mostrar: function (req, res) {
        var hoy = new Date();
        var fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate()
        horaActual = moment().format();   //07:46:55.000Z
        console.log('horaActual', horaActual)
        console.log('fecha', fecha)
        if (baseidentificacion != actualIdentificacion) {

            actualIdentificacion = baseidentificacion;
            console.log('paso 1', actualIdentificacion)
            var consulta = "SELECT p.nombre as paralelo, t.nombre as turno, g.nombre as grupo, tmpCurso.nombre , tmpCurso.paterno ,tmpCurso.materno,tmpCurso.img, tmpCurso.id as idAlumno ,tmpCurso.idCurso, tmpCurso.idPersona from paralelo p, turno t, grupo g , (SELECT c.idParalelo, c.idTurno,c.idGrupo, tmpInscribe.nombre, tmpInscribe.img, tmpInscribe.paterno,tmpInscribe.materno, tmpInscribe.idPersona, tmpInscribe.id, tmpInscribe.idCurso from curso c , (SELECT i.idCurso, tmpAlumno.nombre, tmpAlumno.paterno,tmpAlumno.materno, tmpAlumno.img, tmpAlumno.id, tmpAlumno.idPersona from inscribe i , (select p.nombre , p.paterno, p.materno , p.img, p.id as idPersona, a.id from persona p, alumno a where p.identificacion = ? and p.id = a.idPersona) tmpAlumno where i.idAlumno = tmpAlumno.id) tmpInscribe where c.id = tmpInscribe.idCurso)tmpCurso WHERE p.id = tmpCUrso.idParalelo and t.id = tmpCurso.idTurno and g.id = tmpCurso.idGrupo"
            Persona.query(consulta, [actualIdentificacion], function (err, consulta) {
                if (err) { return res.serverError(err); }

                console.log('consulta',consulta[0])
                Asistencia.findOne({ idPersona: consulta[0].idPersona, fecha: fecha }).exec((err, datoAsistencia) => {
                    console.log('fechaAsistencia', datoAsistencia)

                    if (datoAsistencia == null) {
                        console.log('paso 2 creando nuevo')
                        Asistencia.create(
                            {
                                fecha: fecha,
                                estado: 'asistió',
                                hora_llegada: horaActual,
                                hora_salida: horaActual,
                                idGestionAcademica: 1,
                                idPersona: consulta[0].idPersona
                            }

                        ).exec((err, datoAsistencia) => {
                            if (err) { return res.serverError(err); }

                            auxAlumno = {
                                identificacion: actualIdentificacion,
                                materno: consulta[0].materno,
                                paterno: consulta[0].paterno,
                                nombre: consulta[0].nombre,
                                curso: consulta[0].grupo + " " + consulta[0].paralelo,
                                turno: consulta[0].turno,
                                img: consulta[0].img,
                                hora_llegada: moment().format('LTS'),
                                hora_salida: moment().format('LTS')
                            }

                            console.log("nuevo", auxAlumno)
                            return res.send(auxAlumno);

                        })
                    }

                    // if (hoy.getHours() < maxHoraLlegada) {
                    //     console.log('paso 3 actualizando lleada')

                    //     Asistencia.update({ idPersona: consulta[0].idPersona, fecha: fecha }, { idPersona: consulta[0].idPersona },
                    //         {
                    //             hora_llegada: horaActual
                    //         }).exec((err, datoAsistencia) => { })

                    // }

                    if (hoy.getHours() >= minHoraSalida) {
                        console.log('paso 4 actualizando salida')

                        Asistencia.update({ idPersona: consulta[0].idPersona, fecha: fecha }, { idPersona: consulta[0].idPersona },
                            {
                                hora_salida: horaActual
                            }).exec((err, datoAsistencia) => {

                                auxAlumno = {
                                    identificacion: actualIdentificacion,
                                    materno: consulta[0].materno,
                                    paterno: consulta[0].paterno,
                                    nombre: consulta[0].nombre,
                                    curso: consulta[0].grupo + " " + consulta[0].paralelo,
                                    turno: consulta[0].turno,
                                    img: consulta[0].img,
                                    hora_llegada: datoAsistencia.hora_llegada,
                                    hora_salida: moment().format('LTS')
                                }

                                return res.send(auxAlumno);

                            })
                    }

                    else if (auxAlumno.identificacion == 0 && datoAsistencia!= null) {
                        console.log('cambio')
                        auxAlumno = {
                            identificacion: actualIdentificacion,
                            materno: consulta[0].materno,
                            paterno: consulta[0].paterno,
                            nombre: consulta[0].nombre,
                            curso: consulta[0].grupo + " " + consulta[0].paralelo,
                            turno: consulta[0].turno,
                            img: consulta[0].img,
                            hora_llegada: datoAsistencia.hora_llegada,
                            hora_salida: moment().format('LTS')
                        }

                        res.send(auxAlumno)

                    }

                    else if(datoAsistencia != null) {
                        auxAlumno = {
                            identificacion: actualIdentificacion,
                            materno: consulta[0].materno,
                            paterno: consulta[0].paterno,
                            nombre: consulta[0].nombre,
                            curso: consulta[0].grupo + " " + consulta[0].paralelo,
                            turno: consulta[0].turno,
                            img: consulta[0].img,
                            hora_llegada: datoAsistencia.hora_llegada,
                            hora_salida: moment().format('LTS')
                        }

                        res.send(auxAlumno)
                    }

                })

            })
        } else {

            res.send(auxAlumno)
        }

    },
    get: function (req, res) {

        var consulta = "SELECT p.nombre as paralelo, t.nombre as turno, g.nombre as grupo, tmpCurso.nombre , tmpCurso.paterno ,tmpCurso.materno,tmpCurso.img, tmpCurso.id as idAlumno ,tmpCurso.idCurso from paralelo p, turno t, grupo g , (SELECT c.idParalelo, c.idTurno,c.idGrupo, tmpInscribe.nombre, tmpInscribe.img, tmpInscribe.paterno,tmpInscribe.materno, tmpInscribe.id, tmpInscribe.idCurso from curso c , (SELECT i.idCurso, tmpAlumno.nombre, tmpAlumno.paterno,tmpAlumno.materno, tmpAlumno.img, tmpAlumno.id from inscribe i , (select p.nombre , p.paterno, p.materno , p.img, a.id from persona p, alumno a where p.identificacion = ? and p.id = a.idPersona) tmpAlumno where i.idAlumno = tmpAlumno.id) tmpInscribe where c.id = tmpInscribe.idCurso)tmpCurso WHERE p.id = tmpCUrso.idParalelo and t.id = tmpCurso.idTurno and g.id = tmpCurso.idGrupo"
        Persona.query(consulta, ['28970'], function (err, consulta) {
            if (err) { return res.serverError(err); }

            res.send(consulta)
        })
    }

}; 