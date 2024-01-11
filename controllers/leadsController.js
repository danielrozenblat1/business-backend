const Lead=require("../models/Lead")
exports.gettingLead=async(req,res,next)=>{

if(!req.body.name){
    const error=new Error("משהו השתבש, בדוק את האינטרנט שלך");
    error.statusCode=401;
throw error;
}
if(!req.body.phone){
    const error=new Error("משהו השתבש, בדוק את האינטרנט שלך");
    error.statusCode=401;
throw error;
}


const name=req.body.name;
const phone=req.body.phone;
const email=req.body.email
const landing =req.body.hasLandingPage


const lead = new Lead({
    name: name,
    phone: phone,
    email: email,
    hasLandingPage:landing ? landing : "ליד רגיל"
  });
  await lead.save()
  console.log("saved")
  return res.status(201).json({message:"we got the info"})
}