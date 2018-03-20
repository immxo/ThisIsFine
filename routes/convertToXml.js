const fs = require('fs');
const json2xml = require('json2xml');

module.exports = function(app, finedb) {
    app.post('/convertToXml', (req, res) => {
        const data = req.body.dataJSON;
        let dataXml = json2xml(JSON.parse(data));
        if(dataXml){
            res.json({
                status: 'true', dataXml: dataXml
            })
        }

    });
};