var route = {};

routes_path = process.cwd() + '/routes';

fs.readdirSync(routes_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        route[file.split('.')[0]] = require(routes_path + '/' + file)
    }
});

router.get('/user/login', route.user.login);

module.exports = router;
