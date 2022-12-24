const mongoose=require("mongoose")

const soilSchema= new mongoose.Schema({

    soilType: {
        type: String,
        required: true,
        trim: true
    },
    soilElements: {
        type: [ String],
        required: true,
        trim: true
    },
    soilWeather: {
        type: String,
        required: true,
        trim: true
    },
    isDeleted:{
        type:Boolean,
        default: false
    }
   
},{ timestamps: true })


module.exports = mongoose.model("Soil", soilSchema)