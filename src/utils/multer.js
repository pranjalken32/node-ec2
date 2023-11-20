const multer = require("multer")

// Set up storage for Multer
const storage = multer.memoryStorage()
const allowedFileTypes = ["image/jpeg", "image/png"]

// Multer configuration
const multerConfig = {
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Invalid file type. Only JPEG and PNG are allowed."))
    }
  },
}

// Create a Multer instance with the specified configuration
const upload = multer(multerConfig)

// Multer single file upload middleware
const singleFileUpload = (fieldName) => {
  return upload.single(fieldName)
}

// Multer multiple file upload middleware
const multipleFileUpload = (fieldName, maxCount) => {
  return upload.array(fieldName, maxCount)
}

module.exports = { singleFileUpload, multipleFileUpload }
