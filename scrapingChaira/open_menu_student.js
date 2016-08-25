module.exports.openMenu = function (client, menu, callback) {
    client.pause(1).then(function () {
        console.log("Inicio...");

        clickSubMenu("Inicio", "button", function (res1) {
            if (res1 == "Bien") {
                console.log(menu.menu1[0] + "...");
                clickSubMenu(menu.menu1[0], menu.menu1[1], function (res2) {
                    if (res2 == "Bien") {
                        console.log(menu.menu2[0] + "...");
                        clickSubMenu(menu.menu2[0], menu.menu2[1], function (res3) {
                            if (res3 == "Bien") {
                                console.log(menu.menu3[0] + "...");
                                clickSubMenu(menu.menu3[0], menu.menu3[1], function (res4) {
                                    if (res4 == "Bien") {
                                        client.waitForExist('//iframe[contains(@src,"' + menu.menu3[0] + '.aspx")]', 10000)
                                            .then(function () {
                                                //Encontro el elemento
                                                client.getAttribute('//iframe[contains(@src,"' + menu.menu3[0] + '.aspx")]', 'src')
                                                    .then(function (att) {
                                                        client.newWindow(att, "Iframe")
                                                            .pause(2000)
                                                            .getAttribute('#form1', 'innerHTML').then(function (html) { //iframe
                                                                console.log("Open iframe");
                                                                callback("Open iframe", html, client);
                                                            })
                                                            .close();
                                                    });
                                            }).catch(function () {
                                                console.log("time exceeded, wait iframe");
                                                callback("time exceeded, wait iframe");
                                            });
                                    } else {
                                        callback(res4);
                                    }
                                });
                            } else {
                                callback(res3);
                            }
                        });
                    } else {
                        callback(res2);
                    }
                });
            } else {
                callback(res1);
            }
        });
    });

    //PROPIAS
    var clickSubMenu = function (menu, element, callback) {
        client
            .waitForExist('//' + element + '[text()="' + menu + '"]', 10000).then(function (inicio) {
                client.elements('//' + element + '[text()="' + menu + '"]').then(function (button) {
                    client.elementIdClick(button.value[0].ELEMENT).then(function () {
                        callback("Bien");
                    });
                });
            }).catch(function () {
                callback("La conexión con el servidor ha superado el tiempo de espera máximo.");
            });
    };
};
