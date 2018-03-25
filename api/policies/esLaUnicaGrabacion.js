/**
 * recordIsUnique
 *
 * @module      :: Policy
 * @description :: Simple policy to check that a record is unique
 *               
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function (req, res, next) {

    Curso.findOne({
        idParalelo: req.param('idParalelo'),
        idTurno: req.param('idTurno'),
        idGrado: req.param('idGrado'),
        idGrupo: req.param('idGrupo')
    }).done(function (err, curso) {
        if (curso) {
            res.send(409);
        } else {
            next();
        }

    });

};