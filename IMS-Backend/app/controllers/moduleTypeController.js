const ModuleType = require('../Models/moduleTypeModel')


const getAllModuleType = async(req,res)=>{
    const moduleTypes = await ModuleType.find().populate('moduleId')
    res.send(moduleTypes)
}


const getModuleTypeById = async(req,res)=>{
    const {id} = req.params;
    const moduleType = await ModuleType.findById(id).populate('moduleId');
    if(!moduleType){
        return res.status(404).json("not Found")
    }
    res.send(moduleType)

}

const addModuleType = async(req,res)=>{
    const data = req.body;
    const moduleType = await ModuleType.create(data);
    res.send(moduleType);

}

const updateModuleType = async(req,res)=>{
    const {id} = req.params;
    const data  = req.body;
    let {name,prefix} = req.body;

    //Add prefix From name
    if (name && !prefix) {
        prefix = name.replace(/\s/g, "").toLowerCase();
      }
    //Validation to Prefix Can not be Update
    // if (prefix) {
    //     return res.send("Prefix can not be modified")
    //   }
    
    const updated = await ModuleType.findByIdAndUpdate(id,{prefix, ...data},{new:true});
    if(!updated){
        return res.status(404).json({error:"Not Found"});
    }

    res.send(updated)

}

const deleteModuleType = async(req,res)=>{
    const {id} = req.params;
    const deleted = await ModuleType.findByIdAndDelete(id);
    if(!deleted){
        return res.status(404).send("Not Found");
    }
    res.send("successfully Deleted")

}



module.exports = {
    getAllModuleType,
    getModuleTypeById,
    addModuleType,
    updateModuleType,
    deleteModuleType
}