const Guardian = require("Modules/Models/Guardian.model");
const Student = require("Modules/Models/student.model");



//........................................................./
//@ Method: POST */
//........................................................./
/**
 *$ Type: Controller
 ** Endpoint: guardian/createguardian
 ** Description: Create New Record
 */
const createGuardian = async (req, res) => {
  const guardian = new Guardian(req.body);
  await guardian.save();
  res.status(201).json(guardian);
};




//........................................................./
//@ Method: GET -------------------------------------------/
//........................................................./
/**
 *$ Type: Controller
 ** Endpoint: guardian/getall
 ** Description:Get All Data
 */
const getGuardians = async (req, res) => {
  const { branchId } = req.user;
  const guardians = await Guardian.find({branchId});
  res.json(guardians);
};






//........................................................./
//@ Method: GET/:id */
//........................................................./
/**
 *$ Type: Controller
 * @param /:id
 ** Endpoint: guardian/getguardianbyid/:id
 ** Description:Get Data By id
 */
const getGuardianById = async (req, res) => {
  const { id } = req.params;

  const guardian = await Guardian.findById(id);
  if (guardian) {
    res.json(guardian);
  } else {
    res.status(404).json({ message: "Guardian not found" });
  }
};





//........................................................./
//@ Method: UPDATE/:id */
//........................................................./
/**
 *$ Type: Controller
 * @param /:id
 ** Endpoint: guardian/updateguardian/:id
 ** Description: Update the Existing Record By id
 */
const updateGuardian = async (req, res) => {
  const { id } = req.params;

  const updatedGuardian = await Guardian.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (updatedGuardian) {
    res.json(updatedGuardian);
  } else {
    res.status(404).json({ message: "Guardian not found" });
  }
};




//........................................................./
//@ Method: POST */
//........................................................./
/**
 *$ Type: Controller
 * @param /:id
 ** Endpoint: guardian/deleteguardian/:id
 ** Description: Delete the Existing Record By id
 */
const deleteGuardian = async (req, res) => {
  const { id } = req.params;
  const deletedGuardian = await Guardian.findByIdAndDelete(id);
  if (deletedGuardian) {
    res.json({ message: "Guardian deleted" });
  } else {
    res.status(404).json({ message: "Guardian not found" });
  }
};


const getGuardianByBranch  = async(req,res)=>{
const {branch} = req.params;

}




// const createGuardianInEnroll = async (req, res) => {
//   const {student} = req.params;
//   const guardian = await Guardian.create(req.body)
//   const updatedStudent = await Student.findByIdAndUpdate(student,{guardian:guardian._id})
//   console.log("updated Student....>>>>>>>>",updatedStudent)
//   res.status(201).json(guardian);
// };





module.exports = {
  createGuardian,
  getGuardians,
  getGuardianById,
  updateGuardian,
  deleteGuardian,
 
};
