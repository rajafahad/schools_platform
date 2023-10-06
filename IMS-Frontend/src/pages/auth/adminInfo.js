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
import { Form, Spinner, Alert, Col, Row,} from "reactstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

//***************************************************************************************/
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import adminInfoValidationSchema from "../../Validation/adminInfoValidation";

const AdminInfo = () => {
  const [loading, setLoading] = useState(false);
  const [errorVal, setError] = useState("");
  const navigate = useNavigate();

  const onFormSubmit = (data) => {
    setError("");
    setLoading(true);
    const token = localStorage.getItem("x-token");
    axios
      .put("http://localhost:5000/api/owner/", data, { headers: { Authorization: `${token}` } })
      .then((response) => {
        setLoading(false);
        toast.success("Successfully Information Added", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
        navigate(`${process.env.PUBLIC_URL}/create-branch`);
      })
      .catch((error) => {
        
        if (error.response && error.response.status === 401) {
          setLoading(false);
          // Invalid token, remove from storage and navigate to login page
          localStorage.removeItem("x-token");
          navigate(`${process.env.PUBLIC_URL}/auth-login`);
          toast.error("Unauthorize. Please login again.", {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            hideProgressBar: true,
          });
        }
        setLoading(false);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(adminInfoValidationSchema) });

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
              className="circle bg-success text-center fw-bold text-white"
            >
              2
            </div>
            <div style={{ height: "3px", width: "100px" }} className="bg-success-dim"></div>
            <div
              style={{ width: "30px", height: "30px", paddingTop: "0px", fontSize: "17px" }}
              className="circle bg-success-dim text-center fw-bold text-success"
            >
              3
            </div>
          </div>

          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Admin Profile Detail</BlockTitle>
              <BlockDes>
                <p>We need your some Data to proceed your Application.</p>
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
              {/* First Name Field */}
              {/* ................................................................................................... */}
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="firstName">
                      First Name <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="firstName"
                      {...register("firstName")}
                      placeholder="e.g Fahad"
                      className="form-control-lg form-control"
                    />
                    {errors.firstName && <span className="invalid">{errors.firstName.message}</span>}
                  </div>
                </div>
              </Col>

              {/* Last Name field */}
              {/* ................................................................................................... */}
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="lastName">
                      Last Name <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="lastName"
                      {...register("lastName")}
                      placeholder="E.g Ali"
                      className="form-control-lg form-control"
                    />
                    {errors.lastName && <span className="invalid">{errors.lastName.message}</span>}
                  </div>
                </div>
              </Col>

              {/* Institution Name field */}
              {/* ................................................................................................... */}
              <Col lg="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="institutionName">
                      Institution Name <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="institutionName"
                      {...register("institutionName")}
                      placeholder="Enter Institution Name e.x Punjab Group of Colleges"
                      className="form-control-lg form-control"
                    />
                    {errors.institutionName && <span className="invalid">{errors.institutionName.message}</span>}
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
                      placeholder="Enter Contact Number"
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
                      placeholder="Enter WhatsApp Number"
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
                      Street Address <span className="text-danger">*</span>
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

              {/* Role Field Option */}
              {/* ................................................................................................... */}
              <Col lg="6">
                <div className="form-group ">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="role">
                      Role <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <select {...register("role")} defaultValue={""} className="form-control-lg form-control" id="role">
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="administrator">Administrator</option>
                      <option value="director">Director</option>
                      <option value="principal">Principal</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.role && <span className="invalid">{errors.role.message}</span>}
                  </div>
                </div>
              </Col>

              {/* <Col lg="6">
                  <div className="form-group">
                    <label className="form-label">Payment Methods</label>
                    <ul className="custom-control-group g-3 align-center">
                      <li>
                        <div className="custom-control custom-control-sm custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="pay-card-1" />
                          <label className="custom-control-label" htmlFor="pay-card-1">
                            Card
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-control-sm custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="pay-bitcoin-1" />
                          <label className="custom-control-label" htmlFor="pay-bitcoin-1">
                            Bitcoin
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-control-sm custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="pay-cash-1" />
                          <label className="custom-control-label" htmlFor="pay-cash-1">
                            Cash
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Col> */}

              <Col xl="12">
                <Button disabled={loading} color="primary" size="lg" type="submit">
                  {loading ? (
                    <>
                      <Spinner size="sm" color="light" />
                      <span> Loading... </span>
                    </>
                  ) : (
                    "Save Information"
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
export default AdminInfo;
