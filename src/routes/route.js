const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController");
const organisationController = require("../controllers/organisationController");
const agricultureDataController = require("../controllers/agricultureDataController")
const cropsController = require("../controllers/cropsController")
const soilsController = require("../controllers/soilsController")
const Auth = require("../midlleware/auth")


router.get("/test-me", function(req,res){
    res.send("Hi i am running")
})

//  ................................Admin's API'S ..................................................................
router.post("/registerAdmin",adminController.createAdmin)

router.post("/adminLogin",adminController.adminLogin)

//  ................................Organisation's API'S ..................................................................
router.post("/registerOrganisation",organisationController.createOrganisation)

router.post("/organisationLogin",organisationController.organisationLogin)

//  ................................AgricultureData's API'S ..................................................................
router.post("/addAgricultureData",agricultureDataController.createAgricultureData)

router.post("/addAgricultureDataByOrg",Auth.authentication,agricultureDataController.createAgricultureDataByOrganisation)

router.get("/getAgricultureData" ,agricultureDataController.getAgricultureData)

router.put("/updateAgricultureData/:agricultureId",Auth.authentication, Auth.authorization,agricultureDataController.updateAgricultureData)

//router.put("/updateAgricultureDataByOrg/:agriculturId",agricultureDataController.updateAgricultureDataByOrganisation)

router.put("/deleteAgricultureData/:agricultureId",agricultureDataController.deleteAgricultureData)

//  ................................Crop's API'S .............................................................
router.post("/addCrop",cropsController.createCrop)

//  ................................Soil's API'S .............................................................
router.post("/addSoil",soilsController.createSoil)

router.all("/**", function(req,res){
    res.status(400).send("Invlaid endPoint")
})

module.exports=router