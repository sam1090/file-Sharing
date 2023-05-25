const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo modFilear 

const fileSchema = new mongoose.Schema({
    fileName:{
        type:String,
        required:true,
    },
    path:{
        type:String,
        required:true,
    },
    size:{
        type:Number,
        required:true,
    },
    uuid:{
        type:String,
        required:true,
    },
    sender:{
      type: String, 
      required: false,
    },
    reciever:{
      type:String ,
      required: false,
    }
}, {timestamps : true});

//Export the model
module.exports = mongoose.model('File', fileSchema);