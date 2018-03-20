const fs = require('fs');

module.exports = function(app, finedb) {
    app.get('/:link', (req, res) => {
        const link = req.params.link;
        const file = link + '.json';
        finedb.collection('SavedJSON').findOne({link: link}, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                if (item) {
                    fs.writeFile(file, item.data, function () {
                        res.download(file , function () {
                            fs.unlink(file);
                        });
                    });
                }
            }
        });


    });
}