const multer = require('multer')


const storage = multer.diskStorage({
    filename: function(req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({storage})

// For brand/category (single image upload)
const uploadSingle = upload.single('image');
const uploadMultiple  = upload.fields([{ name: 'image1', maxCount: 1 },{ name: 'image2', maxCount: 1 },{ name: 'image3', maxCount: 1 },{ name: 'image4', maxCount: 1 },])

module.exports ={ uploadSingle, uploadMultiple }