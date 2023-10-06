const { getCategoryByBranch, getSessionByBranch, getDepartmentByBranch, getLevelByBranch, getSectionByBranch, getClassesByBranch, AddAcademicData, createGuardianInEnroll } = require('Modules/Controllers/Academic/enroll.controller');
const express = require('express');
const router = express.Router();

// api/enroll/YourRouteName

// api/enroll/getcategorybybranch
router.get('/getcategorybybranch/:branch',getCategoryByBranch);

// api/enroll/getsessionbybranch
router.get('/getsessionbybranch/:branch',getSessionByBranch);

// api/enroll/getdepartmentbybranch
router.get('/getdepartmentbybranch/:branch',getDepartmentByBranch);

// api/enroll/getlevelbybranch
router.get('/getlevelbybranch/:branch',getLevelByBranch);

// api/enroll/getsectionbybranch
router.get('/getsectionbybranch/:branch',getSectionByBranch)

// api/enroll/getclassesbybranch
router.get('/getclassesbybranch/:branch',getClassesByBranch)

// api/enroll/addacademicdata
router.post('/addacademicdata',AddAcademicData)

// api/enroll/createguardianinenroll
router.post('/createguardianinenroll/:student',createGuardianInEnroll)




module.exports = router