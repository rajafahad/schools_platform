const Category = require("Modules/Models/category.model");

//* Create new Category
const createCategory = async (req, res) => {
  const { name, branch, status } = req.body;

  for (const branchId of branch) {
    const newCategory = new Category({
      name,
      status,
      branch: branchId,
    });
    await newCategory.save();
  }
  res.status(201).json({ success: true });
};

//* Get All Category
const getAllCategory = async (req, res) => {
  const categories = await Category.find().populate({
    path: "branch",
    select: "branchName -_id",
  });
  res.send(categories);
};

//* Delete category By id
const deleteCategory = async (req, res) => {
  const id = req.params.id;
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return res
      .status(404)
      .json({ success: false, message: "Category Not Found" });
  }

  res.json({ success: true, message: "SuccessFully Category Deleted" });
};


//* Update Category
const updateCategory = async(req,res)=>{
    const id = req.params.id;
    const updatedCategory = await Category.findByIdAndUpdate(id,req.body)
    if(!updatedCategory){
        return res.status(404).json({success:false, message:"Category Not Found"})
    }

    res.json({success:true,message:'SuccessFully Updated'})
}



module.exports = {
  createCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
};

