


var fs = require('fs')
var path = require('path')
var conversion = require("phantom-html-to-pdf")();

module.exports = {

    generarReporte: (req, res) => {

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