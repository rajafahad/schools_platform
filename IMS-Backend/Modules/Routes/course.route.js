const express = require('express');
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCourseByBranch
} = require('../Controllers/Academic/course.controller');
const router = express.Router();

//* api/Course/YourEndPoint

// api/Course/
router.post('/', createCourse);
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

//* Get Course By Branch
// api/Course/bybranch
router.get('/bybranch/:branch',getCourseByBranch)

module.exports = router;
