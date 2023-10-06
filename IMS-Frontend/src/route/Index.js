import React, { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Sales from "pages/Sales";
import Crypto from "pages/Crypto";
import Homepage from "pages/Homepage";
import Invest from "pages/Invest";

import Blank from "pages/others/Blank";
import Faq from "pages/others/Faq";
import Regularv1 from "pages/others/Regular-1";
import Regularv2 from "pages/others/Regular-2";
import Terms from "pages/others/Terms";

import Error404Classic from "pages/error/404-classic";
import Error404Modern from "pages/error/404-modern";
import Error504Modern from "pages/error/504-modern";
import Error504Classic from "pages/error/504-classic";

import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import ForgotPassword from "pages/auth/ForgotPassword";
import Success from "pages/auth/Success";

import Layout from "layout/Index";
import LayoutNoSidebar from "layout/Index-nosidebar";
import LayoutApp from "layout/Index-app";
import ProtectedRoute from "./protectedRoute";
import AdminInfo from "pages/auth/adminInfo";
import CreateBranchWizard from "pages/auth/createBranchWizard";
import BranchList from "pages/Module/Branch/BranchList";
import AddBranch from "pages/Module/Branch/addBranch";
import IsLogin from "utils/isLogin";
import Academic from "pages/Module/Student/Enroll/Academic";
import Family from "pages/Module/Student/Enroll/Family";
import EnrollStudent from "pages/Module/Student/Enroll/Enroll";
import ClassList from "pages/Module/Academic/Class/ClassList";
import SectionList from "pages/Module/Academic/Section/SectionList";
import CategoryList from "pages/Module/Academic/Category/CategoryList";
import DepartmentList from "pages/Module/Academic/Department/DepartmentList";
import SessionList from "pages/Module/Academic/Session/SessionList";
import LevelList from "pages/Module/Academic/Level/LevelList";
import SubjectList from "pages/Module/Academic/subject/SubjectList";
import ProgramList from "pages/Module/Academic/Program/ProgramList";
import AddProgram from "pages/Module/Academic/Program/addProgram";
import EnrollRoute from "./EnrollRoute";
import DegreeTypeList from "pages/Module/Academic/Program/Degree Type/DegreeTypeList";
import CourseList from "pages/Module/Academic/Program/Course/CourseList";

const Pages = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      {/* Protected Route */}
      {/* ****************************************************************************** */}
      <Route element={<ProtectedRoute />}>
        <Route path={`${process.env.PUBLIC_URL}`} element={<Layout />}>
          <Route index element={<Homepage />}></Route>
          <Route path="crypto" element={<Crypto />}></Route>
          <Route path="sales" element={<Sales />}></Route>
          <Route path="invest" element={<Invest />}></Route>
          <Route path="_blank" element={<Blank />}></Route>
          <Route path="branch-list" element={<BranchList />} />
          <Route path="add-branch" element={<AddBranch />} />

          {/* ----------Enroll---------- */}
          <Route path="enroll" element={<EnrollRoute/>}>
            <Route path="personal-info" element={<EnrollStudent />} />
            <Route path="academic" element={<Academic />} />
            <Route path="family" element={<Family />} />
            <Route path="fee" element={<Family />} />
          </Route>

          {/* ----------Academic---------- */}
          <Route path="academic">
            <Route path="class" element={<ClassList/>}/>
            <Route path="section" element={<SectionList/>}/>
            <Route path="category" element={<CategoryList/>}/>
            <Route path="department" element={<DepartmentList/>}/>
            <Route path="session" element={<SessionList/>}/>
            <Route path="level" element={<LevelList/>}/>
            <Route path="subject" element={<SubjectList/>}/>
            <Route path="program" element={<ProgramList/>}/>
            <Route path="add-program" element={<AddProgram/>}/>
            <Route path="degree-type" element={<DegreeTypeList/>}/>
            <Route path="courses" element={<CourseList/>}/>
            <Route path="" element={""}/>
          </Route>

          {/* ----------Pages---------- */}
          <Route path="pages">
            <Route path="terms-policy" element={<Terms />}></Route>
            <Route path="faq" element={<Faq />}></Route>
            <Route path="regular-v1" element={<Regularv1 />}></Route>
            <Route path="regular-v2" element={<Regularv2 />}></Route>
          </Route>
        </Route>

        {/* ----------App Bar---------- */}
        <Route path={`${process.env.PUBLIC_URL}`}>
          <Route element={<LayoutApp app={{ icon: "chat", theme: "bg-purple-dim", text: "Messages" }} />}>
            <Route path="app-messages" element={<Blank />}></Route>
          </Route>
        </Route>
      </Route>
      {/* ****************************************************************************** */}
      {/* Protected Route End*/}

      {/* Authentication Route */}
      {/* ****************************************************************************** */}
      <Route element={<IsLogin />}>
        <Route path={`${process.env.PUBLIC_URL}`} element={<LayoutNoSidebar />}>
          <Route path="auth-success" element={<Success />}></Route>
          <Route path="auth-reset" element={<ForgotPassword />}></Route>
          <Route path="auth-register" element={<Register />}></Route>
          <Route path="auth-login" element={<Login />}></Route>
        </Route>
      </Route>
      {/* ****************************************************************************** */}

      <Route path={`${process.env.PUBLIC_URL}`} element={<LayoutNoSidebar />}>
        <Route path="errors">
          <Route path="404-modern" element={<Error404Modern />}></Route>
          <Route path="404-classic" element={<Error404Classic />}></Route>
          <Route path="504-modern" element={<Error504Modern />}></Route>
          <Route path="504-classic" element={<Error504Classic />}></Route>
        </Route>
        <Route path="admin-info" element={<AdminInfo />} />
        <Route path="create-branch" element={<CreateBranchWizard />} />
        <Route path="*" element={<Error404Modern />}></Route>
      </Route>
    </Routes>
  );
};
export default Pages;
