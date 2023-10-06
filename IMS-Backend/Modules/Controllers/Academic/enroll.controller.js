const Guardian = require("Modules/Models/Guardian.model")
const AcademicData = require("Modules/Models/academicData.model")
const Category = require("Modules/Models/category.model")
const Class = require("Modules/Models/class.model")
const Department = require("Modules/Models/department.model")
const Level = require("Modules/Models/level.model")
const Section = require("Modules/Models/section.model")
const Session = require("Modules/Models/session.model")
const Student = require("Modules/Models/student.model")




const getCategoryByBranch = async(req,res)=>{
const branch = req.params.branch;
const categories = await Category.find({branch,status:1})
res.send(categories)
}


const getSessionByBranch = async(req,res)=>{
    const branch = req.params.branch;
    const sessions = await Session.find({branch, status:1});
    res.send(sessions)

}

const getDepartmentByBranch = async(req,res)=>{
const branch = req.params.branch;
const branches = await Department.find({branch,status:1})
res.send(branches)
}


const getLevelByBranch = async(req,res)=>{
const branch = req.params.branch;
const levels = await Level.find({branch,status:1});
res.send(levels)
}

const getClassesByBranch = async(req,res)=>{
const branch = req.params.branch;
const classes = await Class.find({branch , status:1});
res.send(classes)
}

const getSectionByBranch = async(req,res)=>{
const branch = req.params.branch;
const sections = await Section.find({branch,status:1});
res.send(sections)
}

const getProgramsByLevel = async(req,res)=>{
   

}

const getCoursesByLevel = async(req,res)=>{

}

const AddAcademicData = async(req,res)=>{
const data = req.body;
const academicData = await AcademicData.create(data);
res.status(201).send(academicData);

}

const createGuardianInEnroll = async (req, res) => {
    const {student} = req.params;
    const guardian = await Guardian.create(req.body)
    const updatedStudent = await Student.findByIdAndUpdate(student,{guardian:guardian._id})
    console.log("updated Student....>>>>>>>>",updatedStudent)
    res.status(201).json(guardian);
  };

module.exports = {
    getCategoryByBranch,
    getSessionByBranch,
    getDepartmentByBranch,
    getLevelByBranch,
    getSectionByBranch,
    getClassesByBranch,
    AddAcademicData,
    createGuardianInEnroll
}