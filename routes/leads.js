const express=require("express")
const leadController=require("../controllers/leadsController")
const router=express.Router()
router.post("/newLead",leadController.gettingLead)

module.exports=router