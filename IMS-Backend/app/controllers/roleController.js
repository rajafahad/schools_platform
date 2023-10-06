const Role = require('../Models/roleModel');


const getAllRoles = async(req,res)=>{
    const roles = await Role.find();
    res.send(roles);
}

const getRoleById = async(req,res)=>{
    const {id} = req.params;
    const role = await Role.findById(id);
    if(!role){
       return res.status(404).json("Not Found")
    }
    res.send(role)
}


const addRole = async(req,res)=>{
    const data = req.body;
    const role = await Role.create(data);
    res.status(201).send(role);
}

const updateRole = async(req,res)=>{
    const {id} = req.params;
    const data = req.body;
    let {name,prefix} = data;

    //Add prefix From name
    if (name && !prefix) {
        prefix = name.replace(/\s/g, "").toLowerCase();
      }
    //Validation to Prefix Can not be Update
    // if(prefix) {
    //     return res.send("Prefix can not be modified")
    //   }
    
      const updated = await Role.findByIdAndUpdate(id,{prefix, ...data},{new:true})
      if(!updated){
        return res.status(404).json("Not Found")
      }

      res.send(updated);
}

const deleteRole = async(req,res)=>{
    const {id} = req.params;
    const deleted = await Role.findByIdAndDelete(id);

    if(!deleted){
        return res.status(404).json("Not Found")
    }

    res.json("successFully Deleted")
}

module.exports = {
    getAllRoles,
    getRoleById,
    addRole,
    updateRole,
    deleteRole
}