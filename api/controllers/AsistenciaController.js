/**
 * AsistenciaController.js
 *
 * @description :: Server-side logic for managing subscriptions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var HID = require('node-hid');
var devices = HID.devices();

var usuario="nada";
console.log('++++++++++++++++++++++++++++++++')
//console.log(devices)
// var device = new HID.HID('0c2e','0be1');
var device = new HID.HID("\\\\?\\hid#vid_0c2e&pid_0be1&mi_02#7&7547f85&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}");

//var device = new HID.HID("\\\\?\\hid#vid_0c2e&pid_0be1&mi_01#7&1c82be3d&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}");

//var device = new HID.HID("\\\\?\\hid#vid_0c2e&pid_0be1&mi_00#7&4bf31f8&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}");

//console.log(device.getFeatureReport());
device.on("data", function (data) {

    console.log("lll" + data)
});

device.read(function (err, data) {
    usuario = data;
    sails.log("codigoQR",data)
})
module.exports = {

    mostrar:function(req,res){
        console.log(usuario)
        res.view('asistencia',{usuario: usuario});

    }

};