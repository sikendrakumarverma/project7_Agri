const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const organisationModel = require("../models/organisationModel");
const jwt = require("jsonwebtoken");

//Authentication of organisation.

const authentication = async (req, res, next) => {
    try {
        //let token = req.headers.authorization.split(" ")[1];
        let token = req.headers["x-api-key"]

        //Token present or not
        if (!token) {
            return res.status(400).send({ status: false, msg: "Please enter token" })
        }
        //Verify sekret key
        let decodedToken = jwt.verify(String(token), "secretKey123", { ignoreExpiration: true }, function (error, done) {
            if (error) {
                return res.status(401).send({ status: false, message: "Token is Invalid" });
            }
            return done;
        })

        if (decodedToken.exp < Date.now() / 1000) return res.status(400).send({ status: false, message: "Token is Expired, Please relogin" });        
        req.Id = decodedToken.organisationId;
        // return res.send(req.Id)
        next();

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}
//Authorization of user.

const authorization = async (req, res, next) => {
    try {
        let Id = req.Id;
         let data = req.params.organisationId// organisationId;
         if (!data) {
             return res.status(400).send({ status: false, msg: "Invalide params" })
         }
         if (mongoose.Types.ObjectId.isValid(data) == false) {
            return res.status(400).send({ status: false, message: "organisationId is not valid" });
         }
        let OrganisationState = await organisationModel.findOne({ _id: Id, isDeleted:false })
        let AgricultureState = await organisationModel.findOne({ _id: data, isDeleted:false }) 
        if (!AgricultureState) return res.status(404).send({ status: false, message: "agricultureData not found of param's student id" })
        if (OrganisationState.state !== AgricultureState.state) {
             return res.status(403).send({ status: false, message: `unauthorized access` });
         }
        req.OrganisationState = OrganisationState.state
        next()

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



module.exports = { authentication, authorization }

