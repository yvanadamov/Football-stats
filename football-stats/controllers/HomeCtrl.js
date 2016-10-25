module.exports = {
    renderHomePage: function(req, res, next) {
        res.render('index', { title: 'Express' });
    }
}