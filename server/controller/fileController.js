const multer = require('multer');
const path = require('path');
const File = require('../model/fileModel');
const { v4: uuid } = require('uuid');
const {sendMail } = require('../services/emailService');
const emailTemplate = require('../services/emailTemplate');

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniquename = `${Date.now()}-${Math.round(
      Math.random() * 1e9,
    )}${path.extname(file.originalname)}`;
    cb(null, uniquename);
  },
});

let upload = multer({
  storage,
  limit: { fileSize: 1000000 * 100 },
}).single('myfile');

exports.uploadFile = async (req, res) => {
  //store file

  upload(req, res, async (err) => {
    //validate response

    if (!req.file) {
      return res.json({ error: 'All fields are requires!' });
    }

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
    return res.json({
      file: `${process.env.APP_BASE_URL}/api/files/${response.uuid}`,
    });
  });

  //response->link
};

exports.downloadFile = async (req, res) => {
  const file = await File.findOne({ uuid: req.params.uuid });

  if (!file) {
    return res.render('download', { error: ' Link has been expired! ' });
  }
  const filePath = `${__dirname}/../${file.path}`;
  res.download(filePath);
};

exports.sendEmail = async (req, res) => {
  const { uuid, emailTo, emailFrom } = req.body;

  if (!uuid || !emailTo || !emailFrom) {
    return res.status(422).send({ error: 'All fields are required .' });
  }

  // Get data from database
  const file = await File.findOne({ uuid });

  if(file.sender ){
    return res.send({ error : 'Email already sent '})
  }

  file.sender = emailFrom;
  file.reciever = emailTo;
  const response = await file.save();

  //send email 
sendMail({
  from: emailFrom,
  to: emailTo,
  subject : 'Inshare File Sharing ',
  text : `${emailFrom} shared a file with you ..`,
  html: emailTemplate({
    emailFrom,
    downloadLink:  `${process.env.APP_BASE_URL}/api/files/${uuid}`,
    size: parseInt(file.size/1000) + ' KB',
    expires: '24 hours'
  })
})

};
