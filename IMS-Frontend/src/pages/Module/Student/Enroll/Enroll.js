import React, { useState, useEffect, forwardRef } from "react";
import { Card, Label } from "reactstrap";
import { Form, Spinner, Alert, Col, Row } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockContent,
  BlockTitle,
  Icon,
  Button,
  PreviewAltCard,
  PreviewCard,
} from "../../../../components/Component";
import EnrollStudentAside from "./EnrollStudentAside";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Head from "../../../../layout/head/Head";
import Content from "../../../../layout/content/Content";
import { useNavigate } from "react-router";
import api, { useApiHook } from "utils/api";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { setEnrollStudentState } from "Redux/Slices/enrollStudentSlice";
import PersonalDetailView from "./PersonalDetailView";

const EnrollStudent = () => {
  const [sm, updateSm] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const { useApi: getBranch, data: branchData, isLoading: isLoadingBranch, error: branchError } = useApiHook();
  const { useApi, data, error, isLoading } = useApiHook();
  const [errorVal, setErrorValue] = useState("");

  //* Redux State
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const enrollStudentState = useSelector((state) => state.enrollStudentState);
  const { personalInformation } = enrollStudentState;
  useEffect(() => {
    getBranch.get("/api/branch");
  }, []);
  const {
    register,
    setError,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();


  //Enroll Form Submit
  const onFormSubmit = (formData) => {
    const nonEmptyFields = {};
    const formValues = getValues();

    for (const field in formValues) {
      if (formValues[field] !== "") {
        nonEmptyFields[field] = formValues[field];
      }
    }
    console.log(formData)
    setErrorValue("");
    useApi
      .post("api/student/", formData)
      .then((response) => {
        dispatch(
          setEnrollStudentState({
            ...enrollStudentState,
            studentId: response._id,
            studentName: response.firstName + " " + response.lastName,
            personalInformation: true,
            branchId: response.branch,
            personalData: response,
          })
        );
        // reset();
        toast.success("Successfully Saved", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
        navigate("/enroll/academic");
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
      });
  };

  // function to change the design view under 990 px
  const viewChange = () => {
    if (window.innerWidth < 990) {
      setMobileView(true);
    } else {
      setMobileView(false);
      updateSm(false);
    }
  };

  useEffect(() => {
    viewChange();
    window.addEventListener("load", viewChange);
    window.addEventListener("resize", viewChange);
    document.getElementsByClassName("nk-header")[0].addEventListener("click", function () {
      updateSm(false);
    });
    return () => {
      window.removeEventListener("resize", viewChange);
      window.removeEventListener("load", viewChange);
    };
  }, []);

  return (
    <>
      <Head title="Personal Information"></Head>

      <Content>
        <div style={{ paddingBottom: "15px" }}>
          <BlockHeadContent>
            <BlockTitle tag="h3" page>
              Student Admission Form
            </BlockTitle>
            <BlockDes className="text-soft">
              <p>Fill The Personal Information, Contact Detail, Academic</p>
            </BlockDes>
          </BlockHeadContent>
        </div>

        <Card className="card-bordered">
          {errorVal && (
            <div className="mb-3">
              <Alert color="danger" className="alert-icon">
                <Icon name="alert-circle" /> {errorVal}
              </Alert>
            </div>
          )}
          <div className="card-aside-wrap">
            <div
              className={`card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg ${
                sm ? "content-active" : ""
              }`}
            >
              <EnrollStudentAside updateSm={updateSm} sm={sm} />
            </div>
            <div className="card-inner card-inner-lg">
              {sm && mobileView && <div className="toggle-overlay" onClick={() => updateSm(!sm)}></div>}
              <BlockHead size="lg">
                <BlockBetween>
                  <BlockHeadContent>
                    <BlockTitle tag="h4">Personal Information</BlockTitle>
                    <BlockDes>
                      <p>Basic info, like Student name and address,</p>
                    </BlockDes>
                  </BlockHeadContent>
                  <BlockHeadContent className="align-self-start d-lg-none">
                    <Button
                      className={`toggle btn btn-icon btn-trigger mt-n1 ${sm ? "active" : ""}`}
                      onClick={() => updateSm(!sm)}
                    >
                      <Icon name="menu-alt-r"></Icon>
                    </Button>
                  </BlockHeadContent>
                </BlockBetween>
              </BlockHead>

              <Block>
                {personalInformation && <PersonalDetailView/>}

                {!personalInformation && (
                  <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                    <Row className="g-3">
                      <div className="data-head">
                        <h6 className="overline-title">Brach</h6>
                      </div>

                      {/* Branch Field */}
                      {/* ................................................................................................... */}
                      <Col lg="12">
                        <div className="form-group ">
                          <div className="form-label-group">
                            <label className="form-label" htmlFor="branch">
                              Brach/Campus <span className="text-danger">*</span>
                            </label>
                          </div>
                          <div className="form-control-wrap">
                            {isLoadingBranch ? (
                              <Spinner color="primary"></Spinner>
                            ) : (
                              <select
                                {...register("branch")}
                                defaultValue={""}
                                className="form-control-lg form-control"
                                id="branch"
                              >
                                <option value="" disabled>
                                  Select
                                </option>
                                {branchData &&
                                  branchData.map((branch) => (
                                    <option key={branch._id} value={branch._id}>
                                      {branch.schoolName} ({branch.branchName})
                                    </option>
                                  ))}
                              </select>
                            )}
                            {errors.branch && <span className="invalid">{errors.branch.message}</span>}
                          </div>
                        </div>
                      </Col>

                      <div className="data-head">
                        <h6 className="overline-title">Personal</h6>
                      </div>
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

                      {/* Gender Name Field */}
                      {/* ................................................................................................... */}
                      <Col lg="6">
                        <div className="form-group ">
                          <div className="form-label-group">
                            <label className="form-label" htmlFor="gender">
                              Gender <span className="text-danger">*</span>
                            </label>
                          </div>
                          <div className="form-control-wrap">
                            <select
                              {...register("gender")}
                              defaultValue={""}
                              className="form-control-lg form-control"
                              id="gender"
                            >
                              <option value="" disabled>
                                Select
                              </option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                            {errors.gender && <span className="invalid">{errors.gender.message}</span>}
                          </div>
                        </div>
                      </Col>

                      {/* Date Of Birth field */}
                      {/* ................................................................................................... */}
                      <Col lg="6">
                        <div className="form-group">
                          <div className="form-label-group">
                            <label className="form-label" htmlFor="birthday">
                              Birthday Date <span className="text-danger">*</span>
                            </label>
                          </div>
                          <div className="form-control-wrap">
                            <input
                              type="date"
                              id="birthday"
                              {...register("birthday")}
                              placeholder="E.g Ali"
                              className="form-control-lg form-control "
                            />
                            {errors.birthday && <span className="invalid">{errors.birthday.message}</span>}
                          </div>
                        </div>
                      </Col>

                      {/* Blood Group  Field */}
                      {/* ................................................................................................... */}
                      <Col lg="6">
                        <div className="form-group ">
                          <div className="form-label-group">
                            <label className="form-label" htmlFor="bloodGroup">
                              Blood Group <span className="text-danger"></span>
                            </label>
                          </div>
                          <div className="form-control-wrap">
                            <select
                              {...register("bloodGroup")}
                              defaultValue={""}
                              className="form-control-lg form-control"
                              id="bloodGroup"
                            >
                              <option value="" disabled>
                                Select
                              </option>
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                            </select>
                            {errors.bloodGroup && <span className="invalid">{errors.bloodGroup.message}</span>}
                          </div>
                        </div>
                      </Col>

                      {/* Mother Tongue field */}
                      {/* ................................................................................................... */}
                      <Col lg="6">
                        <div className="form-group">
                          <div className="form-label-group">
                            <label className="form-label" htmlFor="motherTongue">
                              Mother Tongue <span className="text-danger"></span>
                            </label>
                          </div>
                          <div className="form-control-wrap">
                            <input
                              type="text"
                              id="motherTongue"
                              {...register("motherTongue")}
                              placeholder="E.g Ali"
                              className="form-control-lg form-control"
                            />
                            {errors.motherTongue && <span className="invalid">{errors.motherTongue.message}</span>}
                          </div>
                        </div>
                      </Col>

                      {/* Religion Field */}
                      {/* ................................................................................................... */}
                      <Col lg="6">
                        <div className="form-group ">
                          <div className="form-label-group">
                            <label className="form-label" htmlFor="religion">
                              Religion <span className="text-danger"></span>
                            </label>
                          </div>
                          <div className="form-control-wrap">
                            <select
                              {...register("religion")}
                              defaultValue={""}
                              className="form-control-lg form-control"
                              id="religion"
                            >
                              <option value="" disabled>
                                Select
                              </option>
                              <option value="Islam">Islam</option>
                              <option value="Christianity">Christianity</option>
                              <option value="Hinduism">Hinduism</option>
                              <option value="Buddhism">Buddhism</option>
                              <option value="Judaism">Judaism</option>
                              <option value="Qadiyani">Qadiyani</option>
                              <option value="Other">Other</option>
                            </select>
                            {errors.religion && <span className="invalid">{errors.religion.message}</span>}
                          </div>
                        </div>
                      </Col>

                      {/* Caste field */}
                      {/* ................................................................................................... */}
                      <Col lg="6">
                        <div className="form-group">
                          <div className="form-label-group">
                            <label className="form-label" htmlFor="caste">
                              Ethnicity/Caste <span className="text-danger"></span>
                            </label>
                          </div>
                          <div className="form-control-wrap">
                            <input
                              type="text"
                              id="caste"
                              {...register("caste")}
                              placeholder="E.g Ali"
                              className="form-control-lg form-control"
                            />
                            {errors.caste && <span className="invalid">{errors.caste.message}</span>}
                          </div>
                        </div>
                      </Col>

                      <div className="data-head">
                        <h6 className="overline-title">Contact Detail</h6>
                      </div>
                      {/* Contact Number */}
                      {/* ................................................................................................... */}
                      <Col lg="6">
                        <div className="form-group">
                          <div className="form-label-group">
                            <label className="form-label" htmlFor="contactNumber">
                              Contact Number <span className="text-danger"></span>
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
                              WhatsApp Number <span className="text-danger"></span>
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
                      <div className="data-head">
                        <h6 className="overline-title">Address</h6>
                      </div>
                      {/* Address  field */}
                      {/* ................................................................................................... */}
                      <Col lg="12">
                        <div className="form-group">
                          <div className="form-label-group">
                            <label className="form-label" htmlFor="streetAddress">
                              Street Address <span className="text-danger"></span>
                            </label>
                          </div>
                          <div className="form-control-wrap">
                            <input
                              type="text"
                              id="streetAddress"
                              {...register("streetAddress")}
                              placeholder="e.g Street 2E DHA Phase 4"
                              className="form-control-lg form-control"
                            />
                            {errors.streetAddress && <span className="invalid">{errors.streetAddress.message}</span>}
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
                        <Button disabled={isLoading} color="primary" size="md" type="submit">
                          {isLoading ? (
                            <>
                              <Spinner size="sm" color="light" />
                              <span> Loading... </span>
                            </>
                          ) : (
                            "Save Data"
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Block>
            </div>
          </div>
        </Card>
      </Content>
    </>
  );
};

export default EnrollStudent;
