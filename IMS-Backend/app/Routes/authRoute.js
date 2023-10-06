const { loginUser, signupSchoolOwner } = require("../controllers/authController");
const validateToken = require("../middleware/authMiddleware");

const router = require("express").Router()

router.post('/login',loginUser);
router.post('/register',signupSchoolOwner);


router.get('/protected',validateToken, async(req,res)=>{
    res.send(req.user.userId)
})



module.exports = router;
