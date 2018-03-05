/**
 * InscribeController.js
 *
 * @description :: Server-side logic for managing subscriptions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    inscribir:function(req,res){

        var id = req.param('id')
        var idCurso = req.param('idCurso')
        var idGestionAcademica = req.param('idGestionAcademica')
        Alumno.findOne({idPersona:id}).exec((err,datoPersona)=>{
             if (err) { return res.serverError(err); }

             Inscribe.create({idAlumno:datoPersona.id, idCurso: idCurso, idGestionAcademica:idGestionAcademica}).exec((err,datoInscribe))
             res.send(datoInscribe)
        })  

    }

};