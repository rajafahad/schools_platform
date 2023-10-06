import React, { useState } from "react";
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
import { Form, Spinner, Alert, Col, Row, Badge } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

//***************************************************************************************/
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import createBranchValidationSchema from "../../Validation/createBranchValidation";

const CreateBranchWizard = () => {
  const [loading, setLoading] = useState(false);
  const [errorVal, setErrorValue] = useState("");
  const navigate = useNavigate();

  const onFormSubmit = (formData) => {
    setErrorValue("");
    setLoading(true);
    const token = localStorage.getItem("x-token");
    axios
      .post("http://localhost:5000/api/branch/", formData, { headers: { Authorization: `${token}` } })
      .then((response) => {
        console.log(response);
        setLoading(false);
        toast.success("Successfully Branch Created", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
        navigate(`${process.env.PUBLIC_URL}/auth-success`);
        localStorage.removeItem("x-token");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          // Set the server-side validation errors in the form state
          const serverErrors = error.response.data.errors;
          for (let field in serverErrors) {
            setError(field, {
              message: serverErrors[field],
            });
          }
        }

        setLoading(false);
      });
  };

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createBranchValidationSchema) });
  // {resolver:yupResolver(createBranchValidationSchema)}

  return (
    <>
      <Head title="Admin Information" />
      <Block className="nk-block-middle nk-auth-wizard pb-4">
        <div className="brand-logo pb-4 text-center">
          <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
            <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
            <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
          </Link>
        </div>

        <PreviewCard className="card-bordered border-0 nk-auth-pCard " bodyClass="card-inner-lg">
          <div className="d-flex justify-content center pb-4">
            <div
              style={{ width: "30px", height: "30px", paddingTop: "0px", fontSize: "17px" }}
              className="circle border border-success text-center fw-bold text-success"
            >
              1
            </div>

            <div style={{ height: "3px", width: "100px" }} className="bg-success"></div>
            <div
              style={{ width: "30px", height: "30px", paddingTop: "0px", fontSize: "17px" }}
              className="circle border border-success text-center fw-bold text-success"
            >
              2
            </div>
            <div style={{ height: "3px", width: "100px" }} className="bg-success"></div>
            <div
              style={{ width: "30px", height: "30px", paddingTop: "0px", fontSize: "17px" }}
              className="circle bg-success text-center fw-bold text-white"
            >
              3
            </div>
          </div>

          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Create Your First Branch</BlockTitle>
              <BlockDes>
                <p>Create Your First Branch to Start new School journey</p>
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
          <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
            <Row className="g-4">
              {/* School Name field */}
              {/* ................................................................................................... */}
              <Col lg="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="schoolName">
                      School/Campus Name <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="schoolName"
                      {...register("schoolName")}
                      placeholder="e.g Decent Public School"
                      className="form-control-lg form-control"
                    />
                    {errors.schoolName && <span className="invalid">{errors.schoolName.message}</span>}
                  </div>
                </div>
              </Col>
              {/* Branch Name field */}
              {/* ................................................................................................... */}
              <Col lg="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="branchName">
                      Branch Name <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="branchName"
                      {...register("branchName")}
                      placeholder="Model Town Branch"
                      className="form-control-lg form-control"
                    />
                    {errors.branchName && <span className="invalid">{errors.branchName.message}</span>}
                  </div>
                </div>
              </Col>

              {/* School Type/Level */}
              {/* ................................................................................................... */}
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="schoolLevel">
                      School Level <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-control-wrap">
                      <select {...register("schoolLevel")} defaultValue={""} className="form-control-lg form-control" id="schoolLevel">
                        <option value="" disabled >
                          Select
                        </option>
                        <option value="Primary School">Primary School</option>
                        <option value="Middle School">Middle School</option>
                        <option value="High School">High School</option>
                        <option value="Secondary School">Secondary School</option>
                        <option value="College">College</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.schoolLevel && <span className="invalid">{errors.schoolLevel.message}</span>}
                    </div>
                  </div>
                </div>
              </Col>

              {/* Email */}
              {/* ................................................................................................... */}
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="email">
                      Email <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="email"
                      {...register("email")}
                      placeholder="Enter Branch Email Address"
                      className="form-control-lg form-control"
                    />
                    {errors.email && <span className="invalid">{errors.email.message}</span>}
                  </div>
                </div>
              </Col>

              {/* Contact Number */}
              {/* ................................................................................................... */}
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="contactNumber">
                      Contact Number <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="number"
                      id="contactNumber"
                      {...register("contactNumber")}
                      placeholder="Enter Branch Contact Number"
                      className="form-control-lg form-control"
                    />
                    {errors.contactNumber && <span className="invalid">{errors.contactNumber.message}</span>}
                  </div>
                </div>
              </Col>

              {/* WhatsApp Number */}
              {/* ................................................................................................... */}
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="whatsapp">
                      WhatsApp Number <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="number"
                      id="whatsapp"
                      {...register("whatsapp")}
                      placeholder="Enter Branch WhatsApp Number"
                      className="form-control-lg form-control"
                    />
                    {errors.whatsapp && <span className="invalid">{errors.whatsapp.message}</span>}
                  </div>
                </div>
              </Col>

              {/* Address  field */}
              {/* ................................................................................................... */}
              <Col lg="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="address">
                      Full Address <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="address"
                      {...register("address")}
                      placeholder="e.g Street 2E DHA Phase 4"
                      className="form-control-lg form-control"
                    />
                    {errors.address && <span className="invalid">{errors.address.message}</span>}
                  </div>
                </div>
              </Col>
              {/* Country Field */}
              {/* ................................................................................................... */}
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="country">
                      Country <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="country"
                      {...register("country")}
                      placeholder="Enter your State/Province"
                      className="form-control-lg form-control"
                    />
                    {errors.country && <span className="invalid">{errors.country.message}</span>}
                  </div>
                </div>
              </Col>

              {/* State Field */}
              {/* ................................................................................................... */}
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="state">
                      State/Province <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="state"
                      {...register("state")}
                      placeholder="Enter your State/Province"
                      className="form-control-lg form-control"
                    />
                    {errors.state && <span className="invalid">{errors.state.message}</span>}
                  </div>
                </div>
              </Col>

              {/* City Field */}
              {/* ................................................................................................... */}
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="city">
                      City <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="city"
                      {...register("city")}
                      placeholder="Enter Your City"
                      className="form-control-lg form-control"
                    />
                    {errors.city && <span className="invalid">{errors.city.message}</span>}
                  </div>
                </div>
              </Col>

              <Col xl="12">
                <Button disabled={loading} color="primary" size="lg" type="submit">
                  {loading ? (
                    <>
                      <Spinner size="sm" color="light" />
                      <span> Loading... </span>
                    </>
                  ) : (
                    "Create branch"
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
          <div className="form-note-s2 text-center pt-4">
            Skip the Step? <Link to={`${process.env.PUBLIC_URL}/auth-login`}>Goto Login</Link>
          </div>
        </PreviewCard>
      </Block>
      <AuthFooter />
    </>
  );
};
export default CreateBranchWizard;
