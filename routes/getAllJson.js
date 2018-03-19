module.exports = function(app, finedb) {
    app.get('/getAllJson', (req, res) => {
        finedb.collection('SavedJSON').find({}).toArray(function(err, item) {
            if (err) throw err;
            res.json({item:item})
        });
    });
}