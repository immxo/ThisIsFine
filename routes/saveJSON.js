module.exports = function(app, finedb) {
    app.post('/save', (req, res) => {
        const link = req.body.link;
        const dataJSON = req.body.dataJSON;
        const deleteCheck = req.body.deleteCheck;
        finedb.collection('SavedJSON').findOne({link: link},(err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                if(item == null){
                    finedb.collection('SavedJSON').insert(
                        {link: link, data:dataJSON, deleteCheck: deleteCheck}, (err, result) => {
                            if (err) {
                                res.send({ 'error': 'An error has occurred' });
                            }
                            else {
                                res.json({
                                    status: 'true', link: link
                                })
                            }
                        })}
                else{
                    finedb.collection('SavedJSON').update({link: link},
                        {link: link,
                            data: dataJSON},(err, result) => {
                            if (err) {
                                res.send({ 'error': 'An error has occurred' });
                            } else {
                                res.json({
                                    status: 'true', link: link
                                })

                            }
                        })}
            }
        });

    });

};
