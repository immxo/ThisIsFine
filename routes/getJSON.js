module.exports = function(app, finedb) {
    app.get('/getJSON/:link', (req, res) => {
        const link = req.params.link;
        finedb.collection('SavedJSON').findOne({link: link}, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                if (item) {
                    res.render('getJSON', {dataJSON: item.data, link: link, size: item.size});
                    if(item.deleteCheck == 'true'){
                        function deleteJSON() {
                            finedb.collection('SavedJSON').remove({link:link});
                        }

                        setTimeout(deleteJSON, 2000);
                    }
                }
            }
        });
    });
}