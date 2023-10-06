const Session = require("Modules/Models/session.model");

const createSession = async (req, res) => {
  const { name, branch, status } = req.body;
  for (const branchId of branch) {
    const newSession = new Session({
      name,
      status,
      branch: branchId,
    });
    await newSession.save();
  }
  res
    .status(201)
    .json({ success: true, message: "Sessions SuccessFully Creates" });
};

const getAllSession = async (req, res) => {
  const sessions = await Session.find().populate({
    path: "branch",
    select: "branchName -_id",
  });
  res.send(sessions);
};

const updateSession = async (req, res) => {
  const id = req.params.id;
  const session = await Session.findByIdAndUpdate(id, req.body);

  if (!session) {
    return res
      .status(404)
      .json({ success: false, message: "Sessions Not Found" });
  }
  res.json({ success: true, message: "Successfully Session Updated" });
};

const deleteSession = async (req, res) => {
  const id = req.params.id;
  const session = await Session.findByIdAndDelete(id);

  if (!session) {
    return res
      .status(404)
      .json({ success: false, message: "Session not Found" });
  }
  res.json({ success: true, message: "Successfully Session Deleted" });
};

module.exports = {
  createSession,
  getAllSession,
  updateSession,
  deleteSession,
};
