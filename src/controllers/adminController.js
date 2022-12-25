const adminModel = require("../models/adminModel");
const dataValidation = require("../validations/dataValidation");
const bcrypt = require('bcryptjs');
const jwt= require("jsonwebtoken")

const createAdmin = async function (req, res) {
    try {

        let data = req.body
        if(Object.values(data).length==0) return res.status(400).send({ status: false, message: "data must be present" });

        // using destructuring of body data.
        const { state,organisationId,adminId, email, password } = data;

        if(!dataValidation.isValidId(Object.values(state)[0])) return res.status(400).send({ status: false, message: "state should be string" });
        if(!dataValidation.isValidId(Object.values(organisationId)[0])) return res.status(400).send({ status: false, message: "organisationId should be string" });

        if(!dataValidation.isValidId(adminId)) return res.status(400).send({ status: false, message: "adminId should be string" });

        const isadminIdUnique = await adminModel.findOne({ adminId });
        if (isadminIdUnique) {
        const isadminIdUnique = await adminModel.findOne({ adminId });
            return res.status(400).send({ status: false, message: `adminId: ${adminId} already exist` });
        }
        const validEmail= dataValidation.isValidEmail(email)
        if(validEmail) return res.status(400).send({ status: false, message: validEmail });

        const isEmailUnique = await adminModel.findOne({ email });
        if (isEmailUnique) {
            return res.status(400).send({ status: false, message: `email: ${email} already exist` });
        }
        const validPass= dataValidation.isValidpass(password)
        if(validPass) return res.status(400).send({ status: false, message: validPass });
        //password bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        //Create admin data after format => email, password
        const adminData = {
            organisationId: organisationId, adminId: adminId, email: email,
            password: hashpassword
        };

        const createAdmin = await adminModel.create(adminData);
        return res.status(201).send({ status: true, message: "admin created successfully", data: createAdmin })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

// ...........................Admin Login...............................................................

const adminLogin = async (req, res) => {
    try {
        // using destructuring of body data.
        const data = req.body
        const { adminId,email, password } = data;

        //Input data validation
        let pass=""
        let Id=""
        if(email){
        const validEmail= dataValidation.isValidEmail(email)
        if(validEmail) return res.status(400).send({ status: false, message: validEmail });
        const isEmailPresent= await adminModel.findOne({ email });
        if (!isEmailPresent) {
            return res.status(400).send({ status: false, message: "this email is not registered " });
        }
        pass=isEmailPresent.password
        Id=isEmailPresent._id
        } else {
        if(!dataValidation.isValidId(adminId)) return res.status(400).send({ status: false, message: "adminId should be string" });
        const adminIdPresent= await adminModel.findOne({ adminId });
        if (!adminIdPresent) {
            return res.status(400).send({ status: false, message: "this adminId is not registered " });
        }
        pass=adminIdPresent.password
        Id=adminIdPresent._id
       }
        
        const validPass= dataValidation.isValidpass(password)
        if(validPass) return res.status(400).send({ status: false, message: validPass });

        //Input data verify
        let Password = await bcrypt.compare(password,pass )
        if (!Password) {
            return res.status(400).send({ status: false, message: "invalid login credentials" });
        }

        // creating JWT
        const token = jwt.sign({ organisationId: isEmailPresent._id }, "secretKey123", { expiresIn: "1h" });

        //Format of data.
        let Data = {
            adminId: Id,
            token: token
        }
         //res.headers.x-api-key = token;
         //res.setHeader('Authorization', 'Bearer '+ token);
        return res.status(200).send({ status: true, message: "login successfully", data: Data });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createAdmin,adminLogin};