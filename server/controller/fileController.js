const multer = require("multer");
const path = require("path");
const File = require("../model/fileModel");
const { v4: uuid } = require("uuid");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniquename = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniquename);
  },
});

let upload = multer({
  storage,
  limit: { fileSize: 1000000 * 100 },
}).single("myfile");

exports.uploadFile = async (req, res) => {
  //store file

  upload(req, res, async (err) => {
    //validate response

    if (!req.file) {
      return res.json({ error: "All fields are requires!" });
    }
    // console.log( req.file.filename);

    if (err) {
      return res.status(500).send({ error: err.message });
    }
    //store into database
    const fileModel = new File({
      fileName: req.file.filename,
      uuid: uuid(),
      path: req.file.path,
      size: req.file.size,
    });

    const response = await fileModel.save();
    console.log(response);
    return res.json({
      file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    });
  });

  //response->link
};