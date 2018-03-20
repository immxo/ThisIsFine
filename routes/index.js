const main = require('./main');
const saveJSON = require('./saveJSON');
const getJSON = require('./getJSON');
const getAllJson = require('./getAllJson');
const convertToXml = require('./convertToXml');
const download = require('./download');


module.exports = function(app, finedb) {
    main(app, finedb);
    saveJSON(app, finedb);
    getJSON(app, finedb);
    getAllJson(app, finedb);
    convertToXml(app);
    download(app, finedb);
};