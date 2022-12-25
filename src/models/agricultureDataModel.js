const mongoose=require("mongoose")

const agricultureDataSchema= new mongoose.Schema({

    state: {
        type: String,
        required: true,
        trim: true
    },
    // organisationId:{
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    cropName: {
        type: String,
        required: true,
        trim: true
    },
    cropMonth: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    soilType: {
        type: String,
        required: true,
        trim: true
    },
    cropWeather:{
        type: String,
        required: true,
        trim: true  
    },
    cropCultivatedQuantity:{
        type: String,
        required: true,
        trim: true  
    },
    cropRate:{
        type: String,
        required: true,
        trim: true  
    },
    isDeleted:{
        type:Boolean,
        default: false
    }
},{ timestamps : true})

module.exports= mongoose.model("agricultureData",agricultureDataSchema)