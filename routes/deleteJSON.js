module.exports = function(app, finedb) {
    app.delete('/delete', (req, res) => {
        const link = req.body.link;

        finedb.collection('SavedJSON').remove({link:link},(err) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            }
            else{
                res.render('index');
            }
        });

    });
};