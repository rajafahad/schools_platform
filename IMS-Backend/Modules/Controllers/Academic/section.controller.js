const Section = require("../../Models/section.model");

// Get all sections
const getAllSections = async (req, res) => {
  const sections = await Section.find().populate({path:'branch',select:'branchName -_id'});
  res.json(sections);
};




// Get a single section by ID
const getSectionById = async (req, res) => {
  const section = await Section.findById(req.params.id);
  if (!section) {
    return res.status(404).json({ error: "Section not found" });
  }
  res.json(section);
};






// Create a new section
const createSection = async (req, res) => {
  const { name, sectionCode, status, branch } = req.body;

for(const branchId of branch){
  const newSection = new Section({
    name,
    sectionCode,
    status,
    branch:branchId
  });
  await newSection.save()
}

  res.status(201).json("Success");
};



// Update a section by ID
const updateSection = async (req, res) => {
  const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!section) {
    return res.status(404).json({ error: "Section not found" });
  }
  res.json(section);
};




// Delete a section by ID
const deleteSection = async (req, res) => {
  const section = await Section.findByIdAndDelete(req.params.id);
  if (!section) {
    return res.status(404).json({ error: "Section not found" });
  }
  res.json({ message: "Section deleted successfully" });
};







// Export the controller functions
module.exports = {
  getAllSections,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
};
