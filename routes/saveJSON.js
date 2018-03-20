const fs = require("fs");

module.exports = function(app, finedb) {
    app.post('/save', (req, res) => {
        const link = req.body.link;
        const dataJSON = req.body.dataJSON;
        const deleteCheck = req.body.deleteCheck;
        const file = link + '.json';

        fs.writeFile(file, dataJSON);

        function size(file) {
            const stats = fs.statSync(file);
            const fileSize = stats.size;
            return fileSize;
        }

        finedb.collection('SavedJSON').findOne({link: link},(err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                if(item == null){
                    finedb.collection('SavedJSON').insert(
                        {link: link, data:dataJSON, deleteCheck: deleteCheck, size: size(file)}, (err) => {
                            if (err) {
                                res.send({ 'error': 'An error has occurred' });
                            }
                            else {
                                res.json({
                                    status: 'true', link: link
                                })
                                fs.unlink(file);
                            }
                        })}
                else{
                    finedb.collection('SavedJSON').update({link: link},
                        {link: link, data: dataJSON, deleteCheck: deleteCheck, size: size(file)},(err) => {
                            if (err) {
                                res.send({ 'error': 'An error has occurred' });
                            } else {
                                res.json({
                                    status: 'true', link: link
                                })
                                fs.unlink(file);
                            }
                        })}
            }
        });

    });

};
