const organisationModel = require("../models/organisationModel");
const adminModel = require("../models/adminModel");
const dataValidation = require("../validations/dataValidation");
const bcrypt = require('bcryptjs');
const jwt= require("jsonwebtoken")

const createOrganisation = async function (req, res) {
    try {

        let data = req.body

        if (!dataValidation.isValidRequestBody(data)) return res.status(400).send({ status: false, message: "data must be present" });

        // using destructuring of body data
        const { state, organisationId, email,password } = data;

        if(!dataValidation.isValidState(state)) return res.status(400).send({ status: false, message: "state should be string" });

        const isValidOrganisationId= await adminModel.findOne({isDeleted:false})
        let orgState=isValidOrganisationId.state
        let orgId=isValidOrganisationId.organisationId
        
        if(!dataValidation.isValidId(organisationId)) return res.status(400).send({ status: false, message: "organisationId should be string" });

        if(orgState.indexOf(state)!==orgId.indexOf(organisationId)) {
            return res.status(400).send({ status: false, message: "state should be string" });
        }
        const isOrganisationIdUnique = await organisationModel.findOne({ organisationId });
        if (isOrganisationIdUnique) {
            return res.status(400).send({ status: false, message: `organisationId: ${organisationId} already exist` });
        }
        const validEmail= dataValidation.isValidEmail(email)
        if(validEmail) return res.status(400).send({ status: false, message: validEmail });

        const isEmailUnique = await organisationModel.findOne({ email });
        if (isEmailUnique) {
            return res.status(400).send({ status: false, message: `email: ${email} already exist` });
        }
        const validPass= dataValidation.isValidpass(password)
        if(validPass) return res.status(400).send({ status: false, message: validPass });
        //password bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        //Create organisation data after format => email, password
        const organisationData = {
            state: state,organisationId: organisationId, email: email,
            password: hashpassword
        };

        const createOrganisation = await organisationModel.create(organisationData);
        return res.status(201).send({ status: true, message: "organisation created successfully", data: createOrganisation })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}

//.............................................Organisation Login................................................................

const organisationLogin = async (req, res) => {
    try {
        // using destructuring of body data.
        const data = req.body
        const { organisationId,email, password } = data;

        //Input data validation
        let pass=""
        if(email){
        const validEmail= dataValidation.isValidEmail(email)
        if(validEmail) return res.status(400).send({ status: false, message: validEmail });
        const isEmailPresent= await organisationModel.findOne({ email });
        if (!isEmailPresent) {
            return res.status(400).send({ status: false, message: "this email is not registered " });
        }
        pass=isEmailPresent.password
        } else {
        if(!dataValidation.isValidId(organisationId)) return res.status(400).send({ status: false, message: "organisationId should be string" });
        const organisationIdPresent= await organisationModel.findOne({ adminId });
        if (!organisationIdPresent) {
            return res.status(400).send({ status: false, message: "this adminId is not registered " });
        }
        pass=organisationIdPresent.password
       }
        const validPass= dataValidation.isValidpass(password)
        if(validPass) return res.status(400).send({ status: false, message: validPass });

        //Input data verify
        let Password = await bcrypt.compare(password, pass)
        if (!Password) {
            return res.status(400).send({ status: false, message: "invalid login credentials" });
        }

        // creating JWT
        const token = jwt.sign({ organisationId: isEmailPresent._id }, "secretKey123", { expiresIn: "1h" });

        //Format of data.
        let Data = {
            token: token
        }
         //res.headers.x-api-key = token;
         //res.setHeader('Authorization', 'Bearer '+ token);
        return res.status(200).send({ status: true, message: "login successfully", data: Data });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createOrganisation,organisationLogin}