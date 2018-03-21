const fs = require("fs");

module.exports = function(app, finedb) {
    app.post('/update', (req, res) => {
        const link = req.body.link;
        const fileName = req.body.fileName;
        const dataJSON = req.body.dataJSON;
        const deleteCheck = req.body.deleteCheck;
        const file = fileName + '.json';
        fs.writeFileSync(file, dataJSON);
        const stats = fs.statSync(file);
        const size = stats.size;

        finedb.collection('SavedJSON').update({link: link},
            {link: link, data: dataJSON, deleteCheck: deleteCheck, size: size, fileName: fileName}, (err) => {
                if (err) {
                    res.send({'error': 'An error has occurred'});
                } else {
                    res.json({
                        link: link, fileName: fileName
                    });
                    fs.unlink(file);
                }
            })
});

};