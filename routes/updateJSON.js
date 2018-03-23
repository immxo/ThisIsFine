const fs = require("fs");

module.exports = function(app, finedb) {
    app.post('/update', (req, res) => {
        const link = req.body.link;
        const fileName = req.body.fileName;
        const dataJSON = req.body.dataJSON;
        const deleteCheck = req.body.deleteCheck;
        const tokenCheck = req.body.tokenCheck;
        const token = req.body.token;
        const file = fileName + '.json';
        fs.writeFileSync(file, dataJSON);
        const stats = fs.statSync(file);
        const size = stats.size;
        fs.unlinkSync(file);

        finedb.collection('SavedJSON').update({link: link},
            {link: link, data: dataJSON, deleteCheck: deleteCheck, size: size, fileName: fileName,tokenCheck: tokenCheck,
            token: token}, function(err){
                if (err) {
                    res.send({'error': 'An error has occurred'});
                } else {
                    res.json({
                        link: link, fileName: fileName, tokenCheck: tokenCheck
                    });
                }
            })
});

};