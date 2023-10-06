import React from "react";
import { useSelector } from "react-redux";
import { Outlet, redirect, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EnrollRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const enrollStudentState = useSelector((state) => state.enrollStudentState);

  if (location.pathname === "/enroll/personal-info" || location.pathname === "/enroll/personal-info/") {
    return <Outlet />;
  } else if (location.pathname === "/enroll/family" || location.pathname === "/enroll/family/") {
    if (enrollStudentState.personalInformation) {
      return <Outlet />;
    } else {
      toast.warning("Please Complete Student Personal Informational First", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        hideProgressBar: true,
      });
      // navigate("/enroll/personal-info")
      return navigate("/enroll/personal-info");
    }
  } else if (location.pathname === "/enroll/academic" || location.pathname === "/enroll/academic/") {
    if (enrollStudentState.personalInformation) {
      return <Outlet />;
    } else {
      navigate("/enroll/personal-info");
      toast.warning("Please Complete Student Personal Informational First...", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        hideProgressBar: true,
      });
    }
  } else if (location.pathname === "/enroll/fee" || location.pathname === "/enroll/fee/") {
    if (enrollStudentState.academic) {
      return <Outlet />;
    } else {
      toast.warning("Please Complete Student Personal Informational First", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        hideProgressBar: true,
      });
    }
  } else {
  }

  //  return <Outlet/>
};

export default EnrollRoute;
