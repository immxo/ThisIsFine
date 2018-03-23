const fs = require("fs");
const useragent = require('useragent');
const jwt = require('jsonwebtoken');
useragent(true);

module.exports = function(app, finedb) {
    app.post('/save', (req, res) => {
        const link = req.body.link;
        const fileName = req.body.fileName;
        const dataJSON = req.body.dataJSON;
        const deleteCheck = req.body.deleteCheck;
        const tokenCheck = req.body.tokenCheck;
        const file = fileName + '.json';
        fs.writeFileSync(file, dataJSON);
        const stats = fs.statSync(file);
        const size = stats.size;
        fs.unlinkSync(file);
        const agent = useragent.parse(req.headers['user-agent']);
        const payload = agent.source;
        const secret = new Buffer('FineIsThis','base64');
        var userToken = '';
        jwt.sign(payload, secret, function(err, token){
            userToken = token;
            finedb.collection('SavedJSON').insert(
                {link: link, data:dataJSON, deleteCheck: deleteCheck, tokenCheck: tokenCheck,  size: size,
                    fileName: fileName, token: userToken}, (err) => {
                    if (err) {
                        res.send({ 'error': 'An error has occurred' });
                    }
                    else {
                        res.json({
                            fileName: fileName, token: userToken, tokenCheck: tokenCheck
                        });
                    }
                })
        });
    });
};

