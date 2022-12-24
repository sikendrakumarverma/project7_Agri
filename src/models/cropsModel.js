const mongoose=require("mongoose")

const cropSchema= new mongoose.Schema({

    cropName: {
        type: String,
        required: true,
        trim: true
    },
    soilType: {
        type: String,
        required: true,
        trim: true
    },
    cropWeather: {
        type: String,
        required: true,
        trim: true
    },
    cropMonth: {
        type: String,
        required: true,
        trim: true
    },
    cropCultivatedQuantity: {
        type: String,
        required: true,
        trim: true
    },
    isDeleted:{
        type:Boolean,
        default: false
    }
   
},{ timestamps: true })


module.exports = mongoose.model("Crop", cropSchema)