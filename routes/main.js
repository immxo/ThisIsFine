module.exports = function(app) {
    app.get('/', (req, res) => {
        res.render('index', {title: 'This is Fine'});
    });
};