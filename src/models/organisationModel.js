const mongoose=require("mongoose")
//const ObjectId = mongoose.Schema.Types.ObjectId

const organisationSchema= new mongoose.Schema({

    state: {
        type: String,
        required: true,
        enum: ["jharkhand", "bihar", "uttar pradesh","madha pradesh","west bangal"],
        trim: true
    },
    organisationId: {        
        type : String,
        required : [true, "organisationId must be provided"],
        unique: true,
        enum: ["JH12345", "BR12345", "UP12345","MP12345","WB12345"],
        trim     : true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    isDeleted:{
        type:Boolean,
        default: false
    }
   
},{ timestamps: true })


module.exports = mongoose.model("Organisation", organisationSchema)