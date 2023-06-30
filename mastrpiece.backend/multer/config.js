const multer = require('multer')
const upload = multer({dest: "public/files"});

// Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});

// Multer Filter
const multerFilter = (req, file, cb) => {
    const type = file.mimetype.split("/")[1];
    if (type === "png" || type === "jpg") {
        cb(null, true);
    } else {
        cb("please upload image", false);
    }
};

module.exports = {
    multerStorage,
    multerFilter
}
