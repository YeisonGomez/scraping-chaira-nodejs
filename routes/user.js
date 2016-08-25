var chaira = require('../scrapingChaira/login.js');
var menu = require('../scrapingChaira/open_menu_student.js');
var parser = require('../scrapingChaira/parser/parser_schedule.js');
var params = {
    phantomjs: require('phantomjs-prebuilt'),
    webdriverio: require('webdriverio'),
    wdOpts: {
        desiredCapabilities: {
            browserName: 'phantomjs',
            'phantomjs.page.settings.loadImages': false
        }
    }
};

exports.login = function(req, res) {
    var credentials = [req.query.user, req.query.password];

    console.log(credentials);
    chaira.loginChaira(params, credentials[0], credentials[1], function(data, client, program) {
        if (data == "user valid") {
            var menuHorario = {
                menu1: ["Estudiante", "span"],
                menu2: ["Información académica", "span"],
                menu3: ["Horario", "span"]
            };
            menu.openMenu(client, menuHorario, function(resMenu, html, client2) { //Open Iframe
                program.kill(); //close Phantomjs
                if (resMenu == "Open iframe") {
                    parser.schedule(client2, html, function(dataParser) { //Parseo
                        console.log("finish\n===========================");
                        res.status(200).send(dataParser);
                    });
                } else {
                    res.status(200).send(resMenu);
                }
            });
        } else {
            program.kill();
            res.status(200).send(data);
        }

    });
};
