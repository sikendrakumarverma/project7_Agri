const cropsModel = require("../models/cropsModel");
const dataValidation = require("../validations/dataValidation");

const createCrop = async function (req, res) {
    try {

        let data = req.body
        if (Object.values(data).length == 0) return res.status(400).send({ status: false, message: "data must be present" });

        // using destructuring of body data.
        const { cropName, cropMonth, soilTepe, cropWeather, cropCultivatedQuantity } = data;

        if (!dataValidation.isValidState(cropName)) return res.status(400).send({ status: false, message: "cropName should be string" });
        if (!dataValidation.isValidState(cropMonth)) return res.status(400).send({ status: false, message: "cropMonth should be string" });
        if (!dataValidation.isValidState(soilTepe)) return res.status(400).send({ status: false, message: "soilTepe should be string" });
        if (!dataValidation.isValidState(cropWeather)) return res.status(400).send({ status: false, message: "cropWeather should be string" });
        if (!dataValidation.isValidState(cropCultivatedQuantity)) return res.status(400).send({ status: false, message: "cropCultivatedQuantity should be string" });


        //Create crop data after formating data
        const cropData = {
            cropName: cropName, cropMonth: cropMonth,
            soilTepe: soilTepe, cropWeather: cropWeather, cropCultivatedQuantity: cropCultivatedQuantity
        };

        const createCrop = await cropsModel.create(cropData);
        return res.status(201).send({ status: true, message: "crop created successfully", data: createCrop })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports={createCrop}