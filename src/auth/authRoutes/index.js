const multer=require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDNINARY.KEY,
    api_secret:process.env.CLOUDINARY_SERCRET
})
const storage=new CloudinaryStorage({
    cloudinary,
    folder:'profileImages',
    allowedFormats:['jpeg','png','jpg']
});
const upload=multer({storage});

app.post(upload.single('image'),(req,res,next)=>{
   const file=req.file;//here is the file uploaded you can store the link in the database as profileImg
});