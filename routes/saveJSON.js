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
        const privateCheck = req.body.privateCheck;
        const file = fileName + '.json';
        fs.writeFileSync(file, dataJSON);
        const stats = fs.statSync(file);
        const size = stats.size;

        if(privateCheck){
            var tokenCheck = true;
        }
        else{
            var tokenCheck = false;
        }

        const agent = useragent.parse(req.headers['user-agent']);
        const payload = agent.source;
        const secret = new Buffer('FineIsThis','base64');
        var userToken = '';
        jwt.sign(payload, secret, function(err, token){
            userToken = token;
            finedb.collection('SavedJSON').insert(
                {link: link, data:dataJSON, deleteCheck: deleteCheck, privateCheck: privateCheck,  size: size,
                    fileName: fileName, tokenCheck:tokenCheck, token: userToken}, (err) => {
                    if (err) {
                        res.send({ 'error': 'An error has occurred' });
                    }
                    else {
                        res.json({
                            link: link, fileName: fileName, token: userToken, tokenCheck: tokenCheck
                        });
                        fs.unlink(file);
                    }
                })
        });
    });
};

