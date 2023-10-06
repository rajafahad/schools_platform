import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import signUpValidationSchema from "../../Validation/signupValidationSchema";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  // All Declaration in Component Function Start here
  //* -----------------------------------------------------------------------------------//
  const [passState, setPassState] = useState(false);
  const [confirmPassState, setConfirmPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorVal, setError] = useState("");
  const navigate = useNavigate();

  // React Hook from to Handle Form with Validation
  //* -----------------------------------------------------------------------------------//
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpValidationSchema) });

  // Handle Form Submit
  //* -----------------------------------------------------------------------------------//
  const handleFormSubmit = (data) => {
    setError("");
    setLoading(true);

    axios
      .post("http://localhost:5000/auth/register", data)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("x-token", token);
        setLoading(false);
        toast.success("Successfully Register", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
        navigate(`${process.env.PUBLIC_URL}/admin-info`);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 409) {
          setError("Email Already Register");
        } else {
          setError("something Wrong");
        }
      });

    // setTimeout(() => {
    //   navigate(`${process.env.PUBLIC_URL}/auth-success`);
    // }, 1000);
  };

  // Return JSX
  //* -----------------------------------------------------------------------------------//
  return (
    <>
      <Head title="Register" />
      <Block className="nk-block-middle nk-auth-body wide-xs pb-4">
        <div className="brand-logo pb-4 pt-4 text-center">
          <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
            <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
            <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
          </Link>
        </div>
        <PreviewCard className="card-bordered border-0 " bodyClass="card-inner-lg">
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Register</BlockTitle>
              <BlockDes>
                <p>Register to Your New Journey</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>
          {errorVal && (
            <div className="mb-3">
              <Alert color="danger" className="alert-icon">
                <Icon name="alert-circle" /> {errorVal}
              </Alert>
            </div>
          )}
          {/* Name Field */}
          {/* .............................................................................................. */}
          <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
            {/* <div className="form-group">
              <label className="form-label" htmlFor="name">
                Full Name
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  placeholder="Enter your name"
                  className="form-control-lg form-control"
                />
                {errors.name && <p className="invalid">{errors.name.message}</p>}
              </div>
            </div> */}

            {/* Email Field */}
            {/* .............................................................................................. */}
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  Email <span className="text-danger">*</span>
                </label>
              </div>
              <div className="form-control-wrap">
                <input
                  type="text"
                  bssize="lg"
                  id="default-01"
                  {...register("email")}
                  className="form-control-lg form-control"
                  placeholder="Enter your email address or username"
                />
                {errors.email && <p className="invalid">{errors.email.message}</p>}
              </div>
            </div>

            {/* Password Field */}
            {/* .............................................................................................. */}
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Password <span className="text-danger">*</span>
                </label>
              </div>
              <div className="form-control-wrap">
                <a
                  href="#password"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setPassState(!passState);
                  }}
                  className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>

                  <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                </a>
                <input
                  type={passState ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  placeholder="Enter your Password"
                  className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                />
                {errors.password && <span className="invalid">{errors.password.message}</span>}
              </div>
            </div>

            {/* Confirm Password */}
            {/* .............................................................................................. */}
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Confirm Password <span className="text-danger">*</span>
                </label>
              </div>
              <div className="form-control-wrap">
                <a
                  href="#password"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setConfirmPassState(!confirmPassState);
                  }}
                  className={`form-icon lg form-icon-right passcode-switch ${
                    confirmPassState ? "is-hidden" : "is-shown"
                  }`}
                >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>

                  <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                </a>
                <input
                  type={confirmPassState ? "text" : "password"}
                  id="confrimpassword"
                  {...register("confirmPassword")}
                  placeholder="Enter your Password"
                  className={`form-control-lg form-control ${confirmPassState ? "is-hidden" : "is-shown"}`}
                />
                {errors.confirmPassword && <span className="invalid">{errors.confirmPassword.message}</span>}
              </div>
            </div>
            {/* .............................................................................................. */}
            {/* .............................................................................................. */}
            {/* .............................................................................................. */}

            {/* Submit Button */}
            {/* .............................................................................................. */}
            <div className="form-group">
              <Button disabled={loading} type="submit" color="primary" size="lg" className="btn-block">
                {loading ? (
                  <>
                    <Spinner size="sm" color="light" />
                    <span> Loading... </span>
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </form>
          <div className="form-note-s2 text-center pt-4">
            {" "}
            Already have an account?{" "}
            <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
              <strong>Sign in instead</strong>
            </Link>
          </div>
          <div className="text-center pt-4 pb-3">
            <h6 className="overline-title overline-title-sap">
              <span>OR</span>
            </h6>
          </div>
          <ul className="nav justify-center gx-8">
            <li className="nav-item">
              <a
                className="nav-link"
                href="#socials"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                Facebook
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#socials"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                Google
              </a>
            </li>
          </ul>
        </PreviewCard>
      </Block>
      <AuthFooter />
    </>
  );
};
export default Register;
