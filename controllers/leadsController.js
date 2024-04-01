const Lead=require("../models/Lead");
const fs = require('fs');
const nodemailer = require('nodemailer');
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

if(req.body.hasLandingPage){
    try {
    
        // Send email with attached PDF
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'danielroz12345@gmail.com',
                pass: 'ueuyqcbzlumqgcui'
            }
        });
    
        const mailOptions = {
          from: "danielroz12345@gmail.com",
          to: email,
          subject: 'מתנה חינמית דניאל רוזנבלט',
          text: "אני מאוד שמח שבחרת לקחת את המושכות לידיים והתעניינת בבניית דפי נחיתה וביצירת בידול עסקי ומקצועי שייצג אותך כראוי !",
          attachments: [
            {
              filename: 'משחקי מוחות.pdf',
              content: fs.createReadStream('./משחקי מוחות.pdf'),
            },
          ],
        };
    
        await transporter.sendMail(mailOptions);
        console.log('Email sent with attached PDF');
    
        return res.status(201).json({ message: "We got the info, email sent with PDF" });
      } catch (error) {
        console.error('Error saving lead or sending email:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
      }
    };
  return res.status(201).json({message:"we got the info"})
}