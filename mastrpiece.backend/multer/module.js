const multer = require('multer')
const {multerStorage, multerFilter} = require("./config");


const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
}).single('attachment');


module.exports = function (req, res) {
    return new Promise((resolve) => {
        upload(req, res, function (err) {
            if (err) {
                return resolve({ error: err })
            }
            resolve(req.file);
        })
    })
}
