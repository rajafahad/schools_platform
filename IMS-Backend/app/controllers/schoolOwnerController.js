const SchoolOwner = require('../Models/SchoolOwnerModel');
const addAdminDetail = async (req,res)=>{
    const { userId } = req.user;
    const data = req.body;
    const owner = await SchoolOwner.create({user:userId, ...data})
    res.status(201).json(admin);
}

const updateAdminDetail = async (req,res)=>{
    const {userId} = req.user;
    const id  = userId;
    const data = req.body;
   
    const updatedOwner = await SchoolOwner.findByIdAndUpdate(id, data ,{new:true})
    console.log(updatedOwner)
    if(!updatedOwner){
        return res.status(404).json({message:"Not Found"})
    }

    res.status(200).send("Successfully Added")


   
}


module.exports ={
    addAdminDetail,
    updateAdminDetail
}