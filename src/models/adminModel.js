const mongoose =require("mongoose")

const adminSchema= new mongoose.Schema({

    state: {
        type: [ String],
        required: true,
        trim: true
    },
    organisationId: {
        type: [ String],
        required: true,
        trim: true
    },
    adminId:{
        type: String,
        required: true,
        unique: true,
        trim: true
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

},{ timestamps : true})

module.exports= mongoose.model("Admin",adminSchema)