const validateToken = require("app/middleware/authMiddleware");

const router = require("express").Router();

//# Middleware: validateToken used in File
router.use(validateToken)

// api/yourRouteName

// api/student
router.use("/student",require("Modules/Routes/student.route"));

// api/branch
router.use('/branch',require('Modules/Routes/branch.route'));

// api/guardian
router.use('/guardian',require('Modules/Routes/guardian.route'));

// api/class
router.use('/class',require("Modules/Routes/class.route"));

// api/subject
router.use('/subject',require('Modules/Routes/subject.route'));

// api/subjectassign
router.use('/subjectassign',require('Modules/Routes/subjectAssign.route'));

// api/staff
router.use('/staff',require('Modules/Routes/staff.route'));

// api/staffdepartment
router.use('/staffdepartment',require('Modules/Routes/staffDepartment.route'));

// api/staffdesignation
router.use('/staffdesignation',require('Modules/Routes/staffDesignation.route'));

// api/student
router.use('/student',require('Modules/Routes/student.route'));

// api/owner
router.use('/owner',require('app/Routes/schoolOwnerRoute'))

// api/section
router.use('/section',require("Modules/Routes/section.route"));

// api/category
router.use('/category',require('Modules/Routes/category.route'))

// api/department
router.use('/department' , require('Modules/Routes/department.route'))

// api/session
router.use('/session', require('Modules/Routes/session.route'));

// api/level
router.use('/level',require('Modules/Routes/level.route'));

// api/enroll
router.use('/enroll', require('Modules/Routes/enroll.route'));

// api/degreetype
router.use('/degreetype',require('Modules/Routes/degreeType.route'));

// api/course
router.use('/course',require('Modules/Routes/course.route'));

module.exports = router;