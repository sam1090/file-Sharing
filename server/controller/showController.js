 const File = require('../model/fileModel');

 exports.downloadFile = async(req, res) =>{
  try {
    const {uuid} = req.params;
    const file = await File.findOne({uuid}); 
    if(!file){
    return res.render('download' ,{ error: "Link has expired "});

    }

    return res.render('download', {
      uuid: file.uuid,
      fileName: file.fileName,
      fileSize : file.size,
      downloadLink: `${process.env.APP_BASE_URL}/api/files/download/${file.uuid}`
    })
  } catch (error) {
    return res.render('download' ,{ error: "Something went wrong"});
  }
 }