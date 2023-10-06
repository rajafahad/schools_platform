const Module  = require('../Models/ModuleModel')


const addModule = async(req,res)=>{
    const data = req.body;
    const newModule = await Module.create(data);
    res.status(201).send(newModule);

}

const getAllModule = async(req,res)=>{
    
    const modules = await Module.find();
    res.send(modules);

}


const getModuleById = async(req,res)=>{
    const {id} = req.params;

    const module = await Module.findById(id);
    res.send(module);

}




const updateModule = async(req,res)=>{
    const data = req.body;
    const id = req.params.id;
    let {name,prefix} = req.body;

    //Add prefix From name
    if (name && !prefix) {
        prefix = name.replace(/\s/g, "").toLowerCase();
      }
    //Validation to Prefix Can not be Update
    if (prefix) {
        return res.send("Prefix can not be modified")
      }
    
    const updatedModule  = await Module.findByIdAndUpdate(id,{prefix, ...data},{new:true});
    if(!updatedModule){
        return res.status(404).json({error:"Module Not Found"})
    }
    res.send(updatedModule);

}

const deleteModule = async(req,res)=>{
    const id = req.params.id;
    const deletedModule = await Module.findByIdAndDelete(id);
    if(!deletedModule){
        return res.status(404).json({message:'Module Not Exist'})
    }

    res.json({message:'Successfully Deleted'});
}

module.exports = {
    getAllModule,
    getModuleById,
    updateModule,
    addModule,
    deleteModule
}