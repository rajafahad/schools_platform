const ModuleType = require('../Models/moduleTypeModel')
const Permission  = require('../Models/permissionModel')


const getAllPermission = async(req,res)=>{
    const Permission = await Permission.find().populate(['roleId','moduleTypeId'])
    res.send(Permission)
}

const addPermission = async(req,res)=>{
    const data = req.body;
    const newPermission = await Permission.create(data);
    res.send(newPermission)
}

const updatePermission = async(req,res)=>{
    const {id} = req.params;
    const data = req.body;
    const updated = await Permission.findByIdAndUpdate(id,data,{new:true});

    if(!updated){
        return res.status(404).send("not Found Permission")
    }

    res.send(updated)
}

const deletePermission = async(req,res)=>{
    const {id} = req.params;
    const deleted = await Permission.findByIdAndDelete(id);

    if(!deleted){
        return res.status(404).send("Not Found")
    }

    res.send("Successfully Deleted")
}


//*-------------------------------------------------------------------------------------//
//@ Get All Permission By Role
//*-------------------------------------------------------------------------------------//
const getPermissionByRole = async(req,res)=>{
const {role} = req.params;
const permission = await Permission.find({role},{ isView: 1, isAdd:1, isEdit:1, isDelete:1, _id:0})
  .populate({
    path: 'moduleType',
    select: 'name prefix -_id'
  })




if(!permission){
    return res.status(404).send("Not Found")
}
res.send(permission)



}



module.exports = {
    getAllPermission,
    addPermission,
    updatePermission,
    deletePermission,
    getPermissionByRole
}