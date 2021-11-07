const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        var ext = path.extname(file.originalname)
        cb(null, new Date().valueOf() + ext);
    }
});

//file check
const fileFilter = function(req, file, callback) {
    var ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(null, false)
    }
    callback(null, true)
}

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limit: {fileSize: 5 * 1024 * 1024},
});