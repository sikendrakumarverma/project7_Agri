const agricultureDataModel = require("../models/agricultureDataModel")
const cropsModel = require("../models/cropsModel")
const soilsModel = require("../models/soilsModel")
const dataValidation = require("../validations/dataValidation");

const createAgricultureData = async function (req, res) {
    try {

        let data = req.body
        if (Object.values(data).length == 0) return res.status(400).send({ status: false, message: "data must be present" });

        // using destructuring of body data.
        const { state, cropName, cropMonth, soilType, cropWeather, cropCultivatedQuantity, cropRate } = data;

        if (!dataValidation.isValidState(state)) return res.status(400).send({ status: false, message: "state should be string" });

        //if(!dataValidation.isValidId(organisationId)) return res.status(400).send({ status: false, message: "organisationId should be string" });

        if (!dataValidation.isValidState(cropName)) return res.status(400).send({ status: false, message: "cropName should be string" });
        if (!dataValidation.isValidState(cropMonth)) return res.status(400).send({ status: false, message: "cropMonth should be string" });
        if (!dataValidation.isValidState(soilType)) return res.status(400).send({ status: false, message: "soilType should be string" });
        if (!dataValidation.isValidState(cropWeather)) return res.status(400).send({ status: false, message: "cropWeather should be string" });
        if (!dataValidation.isValidState(cropCultivatedQuantity)) return res.status(400).send({ status: false, message: "cropCultivatedQuantity should be string" });
        if (!dataValidation.isValidState(cropRate)) return res.status(400).send({ status: false, message: "cropRate should be string" });


        //Create admin data after format =>fname, lname, email, password
        const agricultureData = {
            state: state, cropName: cropName, cropMonth: cropMonth,
            soilType: soilType, cropWeather: cropWeather, cropCultivatedQuantity: cropCultivatedQuantity, cropRate: cropRate
        };

        const createAgriData = await agricultureDataModel.create(agricultureData);
        return res.status(201).send({ status: true, message: "admin created successfully", data:createAgriData  })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//................................................
const createAgricultureDataByOrganisation = async function (req, res) {
    try {
        let Id = req.Id
        //let stateName = req.stateName
        let data = req.body
        if (Object.values(data).length == 0) return res.status(400).send({ status: false, message: "data must be present" });

        // using destructuring of body data.
        let stateN = ""
        const { state, cropName, cropMonth, soilType, cropWeather, cropCultivatedQuantity, cropRate } = data;

        let findOrganisationState = await organisationModel.findOne({ _id: Id, isDeleted:false })
        if (state) {
            if (!dataValidation.isValidState(state)) return res.status(400).send({ status: false, message: "state should be string" });
            if(findOrganisationState.state!== state) return res.status(400).send({ status: false, message: "Not authorise for this state" });
            
            stateN = findOrganisationState.state 
        } else {
            stateN = findOrganisationState.state
        }
        //if(!dataValidation.isValidId(organisationId)) return res.status(400).send({ status: false, message: "organisationId should be string" });

        if (!dataValidation.isValidState(cropName)) return res.status(400).send({ status: false, message: "cropName should be string" });
        if (!dataValidation.isValidState(cropMonth)) return res.status(400).send({ status: false, message: "cropMonth should be string" });
        if (!dataValidation.isValidState(soilType)) return res.status(400).send({ status: false, message: "soilType should be string" });
        if (!dataValidation.isValidState(cropWeather)) return res.status(400).send({ status: false, message: "cropWeather should be string" });
        if (!dataValidation.isValidState(cropCultivatedQuantity)) return res.status(400).send({ status: false, message: "cropCultivatedQuantity should be string" });
        if (!dataValidation.isValidState(cropRate)) return res.status(400).send({ status: false, message: "cropRate should be string" });


        //Create admin data after format =>fname, lname, email, password
        const agricultureData = {
            state: stateN, cropName: cropName, cropMonth: cropMonth,
            soilType: soilType, cropWeather: cropWeather, cropCultivatedQuantity: cropCultivatedQuantity, cropRate: cropRate
        };

        const createAdmin = await agricultureDataModel.create(agricultureData);
        return res.status(201).send({ status: true, message: "admin created successfully", data: agricultureData })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

// ...........................Fetch agriculture data ...........................................................

const getAgricultureData = async function (req, res) {
    try {
        // let Id = req.Id
        let query = req.query

        const { state, organisationId, cropName, cropMonth, soilTepe, cropWeather, cropCultivatedQuantity, cropRate } = query

        const data = {}
        if (state) {
            data.state = state
        }
        if (organisationId) {
            data.organisationId = organisationId
        }
        if (cropName) {
            data.cropName = cropName
        }
        if (cropMonth) {
            data.cropMonth = cropMonth
        }
        if (soilType) {
            data.soilType = soilType
        }
        if (cropWeather) {
            data.cropWeather = cropWeather
        }
        if (cropCultivatedQuantity) {
            data.cropCultivatedQuantity = cropCultivatedQuantity
        }
        if (cropRate) {
            data.cropRate = cropRate
        }
        const studentData = await agricultureDataModel.find(data);
        return res.status(200).send({ status: true, message: "All Student Data", data: studentData });

        //         else{
        //             const studentData = await studentModel.find();
        //         return res.status(200).send({ status: true, message: "All Student Data", data: studentData });
        //         }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

// ............................update agriculture data..............................................................

const updateAgricultureData = async function (req, res) {
    try {
        let eligibleState = req.OrganisationState
        let body = req.body

        const { cropName, cropMonth, soilType, cropWeather, cropCultivatedQuantity, cropRate } = body

        const data = {}
        if (state) {
            data.state = eligibleState
         }
        if (cropName) {
            // verify that crop property by searching in cropmodel
            // if not exist that crop than we add new crop with that's crop property

            const checkCrop= await cropsModel.findOne( {cropName:cropName} )
             if(!checkCrop){
                // Create new crop
                const createCrop= await cropsModel.create(cropName)
                data.cropName = cropName
             }else{
                // verfing and add
                data.cropName = cropName
             }
        }
        if (cropMonth) {
            data.cropMonth = cropMonth
        }
        if (soilType) {
            // verify that soil property by searching in soilmodel
            // if not exist that soil than we add new soil with that's soil property

            const checkSoil= await soilsModel.findOne( soilType )
             if(!checkSoil){
                // Create new soil
                const createSoil= await soilsModel.create(soilType)
                data.soilType = soilType
             }else{
                // verfing and add
                data.soilType = soilType
             }
        }
        if (cropWeather) {
            data.cropWeather = cropWeather
        }
        if (cropCultivatedQuantity) {
            data.cropCultivatedQuantity = cropCultivatedQuantity
        }
        if (cropRate) {
            data.cropRate = cropRate
        }
        const updateData = await agricultureDataModel.findByIdAndUpdate({ _id: agricultureData._id.toString() }, data, { new: true })
        return res.status(200).send({ status: true, message: "agriculture data updateded successfully", data: updateData });
        //         else{
        //             const studentData = await studentModel.find();
        //         return res.status(200).send({ status: true, message: "All Student Data", data: studentData });
        //         }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}

// ............................delete agriculture data..............................................................

const deleteAgricultureData = async function (req, res) {
    try {
        let Id = req.agricultureId

        const deleteData = await agricultureDataModel.findByIdAndUpdate({ _id: Id }, { $set: { isDeleted: true } }, { new: true })
        return res.status(200).send({ status: true, message: "agriculture data deleted successfully" });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

// ............................delete agriculture data by organisation........................................................

const deleteAgricultureDataByOrganisation = async function (req, res) {
    try {
        let Id = req.agricultureData._id.toString()

        const deleteData = await agricultureDataModel.findByIdAndUpdate({ _id: Id }, { $set: { isDeleted: true } }, { new: true })
        return res.status(200).send({ status: true, message: "agriculture data deleted successfully" });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createAgricultureData, createAgricultureDataByOrganisation, getAgricultureData, updateAgricultureData,
     deleteAgricultureData, deleteAgricultureDataByOrganisation };

