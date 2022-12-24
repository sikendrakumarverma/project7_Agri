const soilsModel = require("../models/soilsModel");
const dataValidation = require("../validations/dataValidation");

const createSoil = async function (req, res) {
    try {

        let data = req.body
        if (Object.values(data).length == 0) return res.status(400).send({ status: false, message: "data must be present" });

        // using destructuring of body data.
        const { soilTepe,soilElements, soilWeather } = data;

        if (!dataValidation.isValidState(soilTepe)) return res.status(400).send({ status: false, message: "soilTepe should be string" });
        if (!dataValidation.isValidState(soilElements)) return res.status(400).send({ status: false, message: "soilElements should be string" });
        if (!dataValidation.isValidState(soilWeather)) return res.status(400).send({ status: false, message: "soilWeather should be string" });
       

        //Create admin data after formating data 
        const soilData = {
            soilTepe: soilTepe, soilElements:soilElements, soilWeather: soilWeather 
        };

        const createData = await soilsModel.create(soilData);
        return res.status(201).send({ status: true, message: "soil created successfully", data: createData })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports={createSoil}