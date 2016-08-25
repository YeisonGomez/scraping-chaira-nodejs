var cheerio = require('cheerio');

module.exports.schedule = function(client, html, callback) {
    console.log("Parseando...");
    $ = cheerio.load(html);

    var listDocent = [];
    var longDocents = $('.x-grid3-col-PEGE_DOCUMENTOIDENTIDAD').find('div').prevObject.length;
    for (var i = 0; i < longDocents; i++) {
        listDocent.push({
            id: $('.x-grid3-col-PEGE_DOCUMENTOIDENTIDAD').find('div').prevObject[i].children[0].data,
            name: $('.x-grid3-col-NOMBRE').find('div').prevObject[i].children[0].data
        });
    }

    //Horario
    var days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

    var longSubjects = $('.x-grid3-col-MATE_CODIGOMATERIA').find('div').prevObject.length;
    var schedule = [];
    for (var i = 0; i < longSubjects; i++) {
        var horary = {
            id: $('.x-grid3-col-MATE_CODIGOMATERIA').find('div').prevObject[i].children[0].data,
            group: $('.x-grid3-col-MATE_CODIGOMATERIA').find('div').prevObject[i].children[3].next.data,
            name: $('.x-grid3-col-MATE_CODIGOMATERIA').find('div').prevObject[i].children[3].prev.data,
            resource: []
        };
        for (var j = 0; j < days.length; j++) {
            if ($('.x-grid3-col-' + days[j]).find('div').prevObject[i].children[0].data.length > 1) {
                horary.resource.push({
                    day: days[j],
                    hour: $('.x-grid3-col-' + days[j]).find('div').prevObject[i].children[0].data,
                    teacher: $('.x-grid3-col-' + days[j]).find('div').prevObject[i].children[3].next.data,
                    resource: $('.x-grid3-col-' + days[j]).find('div').prevObject[i].children[3].prev.data
                });
            }
        }
        schedule.push(horary);
    }

    var informationSchedule = {
        nameStudent: $('#estudiante').html(), //Nombre Estudiante
        codeStudent: $('#codigo').html(),
        program: $('#programa').html(),
        period: $('#periodo').html(),
        listTeachers : listDocent,
        schedule: schedule
    };
    callback(informationSchedule);
}
