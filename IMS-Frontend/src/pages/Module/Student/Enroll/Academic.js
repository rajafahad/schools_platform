
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
} from "components/Component";
import EnrollStudentAside from "./EnrollStudentAside";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import Content from "layout/content/Content";
import Head from "layout/head/Head";
import { useApiHook } from "utils/api";
import { useDispatch, useSelector } from "react-redux";
import {setEnrollStudentState } from "Redux/Slices/enrollStudentSlice";
import { useNavigate } from "react-router";
import AcademicDetailView from "./AcademicDetailView";

const ExampleCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
  <div onClick={onClick} ref={ref}>
    <div className="form-icon form-icon-left">
      <Icon name="calendar"></Icon>
    </div>
    <input className="form-control date-picker" type="text" value={value} onChange={onChange} />
  </div>
));
const Academic = () => {
  const [sm, updateSm] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [startIconDate, setStartIconDate] = useState(new Date());
  const [admissionFor, setAdmissionFor] = useState("Grade/Class");
  const [errorVal, setErrorValue] = useState("");
  
  //* Enroll Student State Redux State
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const enrollStudentBranch = useSelector((state) => state.enrollStudentState.branchId);
  const enrollStudentState = useSelector((state) => state.enrollStudentState);
  const {academic} = enrollStudentState;
  //Api
  //----------------------------------------------//
  // const {useApi: , data: , error: , isLoading: } = useApiHook()
  const { useApi, data, error, isLoading } = useApiHook();
  const { useApi: getCategory, data: categoryData, error: categoryError, isLoading: CategoryIsLoading } = useApiHook();
  const { useApi: getSession, data: sessionData, error: sessionError, isLoading: SessionIsLoading } = useApiHook();
  const { useApi: getLevel, data: levelData, error: levelError, isLoading: levelIsLoading } = useApiHook();
  const { useApi: getClass, data: classData, error: classError, isLoading: classIsLoading } = useApiHook();
  const { useApi: getProgram, data: ProgramData, error: ProgramError, isLoading: ProgramIsLoading } = useApiHook();
  const { useApi: getCourse, data: courseData, error: courseError, isLoading: courseIsLoading } = useApiHook();
  const {
    useApi: getDepartment,
    data: departmentData,
    error: departmentError,
    isLoading: departmentIsLoading,
  } = useApiHook();
  const { useApi: getSection, data: sectionData, error: sectionError, isLoading: sectionIsLoading } = useApiHook();
  //* useEffect to get Selection Data
  //* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
  useEffect(() => {
    getCategory.get(`api/enroll/getcategorybybranch/${enrollStudentBranch}`);
    getSession.get(`api/enroll/getsessionbybranch/${enrollStudentBranch}`);
    getLevel.get(`api/enroll/getlevelbybranch/${enrollStudentBranch}`);
    getDepartment.get(`api/enroll/getdepartmentbybranch/${enrollStudentBranch}`);
    getSection.get(`api/enroll/getsectionbybranch/${enrollStudentBranch}`);
  }, []);

  useEffect(() => {
    if (admissionFor === "Grade/Class") {
      getClass.get(`api/enroll/getclassesbybranch/${enrollStudentBranch}`);
    }
    reset();
  }, [admissionFor]);
  //* Use Form
  //* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
  const {
    register,
    setValue,
    getValues,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
  //* Handle Admission To on Change
  //* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
  const handleAdmissionForChange = (event) => {
    setAdmissionFor(event.target.value);
  };


  //* Submit Form
  //* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
  const onFormSubmit = (formData) => {
    setValue('student',enrollStudentState.studentId)
    setValue('branch',enrollStudentBranch)
   
    const nonEmptyFields = {};
    const formValues = getValues();

    for (const field in formValues) {
      if (formValues[field] !== "") {
        nonEmptyFields[field] = formValues[field];
      }
    }
    
    setErrorValue("");
    useApi
      .post("api/enroll/addacademicdata", nonEmptyFields)
      .then((response) => {
       const category= categoryData.find(category=>category._id=response.category)
       const session= sessionData.find(session=>session._id=response.session)
       const level= levelData.find(level=>level._id=response.level)
       const section= sectionData.find(section=>section._id=response.section)
       const department= departmentData.find(department=>department._id=response.department)
       const className= classData.find(className=>className._id=response.class)
      

        dispatch(
          setEnrollStudentState({
            ...enrollStudentState,
            academic:true,
            academicId:response._id,
            academicData:{
              ...response,
              category:category.name,
              session:session.name,
              level:level.name,
              section:section.name,
              department:department.name,
              class:className.name,
            }
            
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
        navigate("/enroll/family");
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

  return (
    <>
      <Head title="User List - Profile"></Head>

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
                    <BlockTitle tag="h4"> Academic Details</BlockTitle>
                    <BlockDes>
                      <p>File Information like Session Class/Program Section</p>
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

                {academic && <AcademicDetailView key={"564545454"}/>}

                {!academic  &&
                <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <div className="data-head">
                      <h6 className="overline-title">Academic Details</h6>
                    </div>

                    {/* Admission For Field */}
                    {/* ................................................................................................... */}
                    <Col lg="12">
                      <div className="form-group ">
                        <div className="form-label-group">
                          <label className="form-label" htmlFor="admission For">
                            Admission For <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="form-control-wrap">
                          <ul className="custom-control-group">
                            <li>
                              <div className="custom-control custom-control-sm custom-radio custom-control-pro checked ">
                                <input
                                  type="radio"
                                  className="custom-control-input "
                                  name="btnRadioControl"
                                  id="Class"
                                  value="Grade/Class"
                                  checked={admissionFor === "Grade/Class"}
                                  onChange={handleAdmissionForChange}
                                  key="Grade/Class"
                                />
                                <label className="custom-control-label" htmlFor="Class">
                                  Grade/Class
                                </label>
                              </div>
                            </li>
                            <li>
                              <div className="custom-control custom-control-sm custom-radio custom-control-pro checked">
                                <input
                                  type="radio"
                                  className="custom-control-input"
                                  name="btnRadioControl"
                                  id="Program"
                                  value="Program"
                                  checked={admissionFor === "Program"}
                                  onChange={handleAdmissionForChange}
                                  key="Program"
                                />
                                <label className="custom-control-label" htmlFor="Program">
                                  Program
                                </label>
                              </div>
                            </li>
                            <li>
                              <div className="custom-control custom-control-sm custom-radio custom-control-pro checked">
                                <input
                                  type="radio"
                                  className="custom-control-input"
                                  name="btnRadioControl"
                                  id="Courses"
                                  value="Courses"
                                  checked={admissionFor === "Courses"}
                                  onChange={handleAdmissionForChange}
                                  key="Courses"
                                />
                                <label className="custom-control-label" htmlFor="Courses">
                                  Courses
                                </label>
                              </div>
                            </li>
                          </ul>
                          {/* {errors.role && <span className="invalid">{errors.role.message}</span>} */}
                        </div>
                      </div>
                    </Col>

                    {/* Category Field */}
                    {/* ................................................................................................... */}
                    <Col lg="6">
                      <div className="form-group ">
                        <div className="form-label-group">
                          <label className="form-label" htmlFor="category">
                            Category <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="form-control-wrap">
                          {CategoryIsLoading ? (
                            <Spinner color="primary"></Spinner>
                          ) : (
                            <select
                              {...register("category")}
                              defaultValue={""}
                              className="form-control-lg form-control"
                              id="category"
                            >
                              <option value="" disabled>
                                Select
                              </option>
                              {categoryData &&
                                categoryData.map((category) => (
                                  <option key={category._id} value={category._id}>
                                    {category.name}
                                  </option>
                                ))}
                            </select>
                          )}
                          {errors.category && <span className="invalid">{errors.category.message}</span>}
                        </div>
                      </div>
                    </Col>

                    {/* Session Field */}
                    {/* ................................................................................................... */}
                    <Col lg="6">
                      <div className="form-group ">
                        <div className="form-label-group">
                          <label className="form-label" htmlFor="session">
                            Session <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="form-control-wrap">
                          {SessionIsLoading ? (
                            <Spinner color="primary"></Spinner>
                          ) : (
                            <select
                              {...register("session")}
                              defaultValue={""}
                              className="form-control-lg form-control"
                              id="session"
                            >
                              <option value="" disabled>
                                Select
                              </option>
                              {sessionData &&
                                sessionData?.map((session) => (
                                  <option key={session._id} value={session._id}>
                                    {session.name}
                                  </option>
                                ))}
                            </select>
                          )}
                          {errors.session && <span className="invalid">{errors.session.message}</span>}
                        </div>
                      </div>
                    </Col>

                    {/* Level Field */}
                    {/* ................................................................................................... */}
                    <Col lg="6">
                      <div className="form-group ">
                        <div className="form-label-group">
                          <label className="form-label" htmlFor="level">
                            Level <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="form-control-wrap">
                          {levelIsLoading ? (
                            <Spinner color="primary"></Spinner>
                          ) : (
                            <select
                              {...register("level")}
                              defaultValue={""}
                              className="form-control-lg form-control"
                              id="level"
                            >
                              <option value="" disabled>
                                Select
                              </option>
                              {levelData &&
                                levelData.map((level) => (
                                  <option key={level._id} value={level._id}>
                                    {level.name}
                                  </option>
                                ))}
                            </select>
                          )}
                          {errors.category && <span className="invalid">{errors.category.message}</span>}
                        </div>
                      </div>
                    </Col>

                    {/* Program/Class/courses Field */}
                    {/* ................................................................................................... */}
                    {/* <Col lg="6">
                      <div className="form-group ">
                        <div className="form-label-group">
                          <label
                            className="form-label"
                            htmlFor={
                              admissionFor === "Grade/Class"
                                ? "Class"
                                : admissionFor === "Program"
                                ? "Program"
                                : admissionFor === "Courses"
                                ? "Course"
                                : ""
                            }
                          >
                            {admissionFor === "Grade/Class"
                              ? "Grade/Class"
                              : admissionFor === "Program"
                              ? "Program"
                              : "Courses"}
                            <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="form-control-wrap">
                          {classIsLoading || ProgramIsLoading || courseIsLoading ? (
                            <Spinner color="primary"></Spinner>
                          ) : (
                            <select
                              {...register(
                                admissionFor === "Grade/Class"
                                  ? "class"
                                  : admissionFor === "Program"
                                  ? "program"
                                  : admissionFor === "Courses"
                                  ? "course"
                                  : ""
                              )}
                              defaultValue={""}
                              className="form-control-lg form-control"
                              id={
                                admissionFor === "Grade/Class"
                                  ? "class"
                                  : admissionFor === "Program"
                                  ? "program"
                                  : admissionFor === "Courses"
                                  ? "course"
                                  : ""
                              }
                            >
                              <option value="" disabled>
                                Select
                              </option>
                              {admissionFor === "Grade/Class" ? (
                                classData?.map((classList) => (
                                  <option key={classList._id} value={classList._id}>
                                    {classList.name}
                                  </option>
                                ))
                              ) : admissionFor === "Program" ? (
                                ProgramData?.map((program) => (
                                  <option key={program._id} value={program._id}>
                                    {program.name}
                                  </option>
                                ))
                              ) : admissionFor === "Courses" ? (
                                courseData?.map((course) => (
                                  <option key={course._id} value={course._id}>
                                    {course.name}
                                  </option>
                                ))
                              ) : (
                                <option value="" disabled>
                                  Select First Admission For
                                </option>
                              )}
                            </select>
                          )}
                          {admissionFor === "Grade/Class"
                            ? errors.class
                            : admissionFor === "Program"
                            ? errors.program
                            : admissionFor === "Courses"
                            ? errors.course
                            : false && (
                                <span className="invalid">
                                  {admissionFor === "Grade/Class"
                                    ? errors.class.message
                                    : admissionFor === "Program"
                                    ? errors.program.message
                                    : admissionFor === "Courses"
                                    ? errors.course.message
                                    : ""}
                                </span>
                              )}
                        </div>
                      </div>
                    </Col> */}

                    {/* Class Field */}
                    {/* ................................................................................................... */}
                    {admissionFor === "Grade/Class" && (
                      <Col lg="6">
                        <div className="form-group ">
                          <div className="form-label-group">
                            <label className="form-label" htmlFor="class">
                              Class <span className="text-danger">*</span>
                            </label>
                          </div>
                          <div className="form-control-wrap">
                            {classIsLoading ? (
                              <Spinner color="primary"></Spinner>
                            ) : (
                              <select
                                {...register("class")}
                                defaultValue={""}
                                className="form-control-lg form-control"
                                id="class"
                              >
                                <option value="" disabled>
                                  Select
                                </option>
                                {classData &&
                                  classData?.map((classList) => (
                                    <option key={classList._id} value={classList._id}>
                                      {classList.name}
                                    </option>
                                  ))}
                              </select>
                            )}
                            {errors.class && <span className="invalid">{errors.class.message}</span>}
                          </div>
                        </div>
                      </Col>
                    )}

                    {/* Program Field */}
                    {/* ................................................................................................... */}
                    {admissionFor === "Program" && (
                      <Col lg="6">
                        <div className="form-group ">
                          <div className="form-label-group">
                            <label className="form-label" htmlFor="program">
                              Program <span className="text-danger">*</span>
                            </label>
                          </div>
                          <div className="form-control-wrap">
                            {ProgramIsLoading ? (
                              <Spinner color="primary"></Spinner>
                            ) : (
                              <select
                                {...register("program")}
                                defaultValue={""}
                                className="form-control-lg form-control"
                                id="program"
                              >
                                <option value="" disabled>
                                  Select
                                </option>
                                {ProgramData &&
                                  ProgramData?.map((program) => (
                                    <option key={program._id} value={program._id}>
                                      {program.name}
                                    </option>
                                  ))}
                              </select>
                            )}
                            {errors.program && <span className="invalid">{errors.program.message}</span>}
                          </div>
                        </div>
                      </Col>
                    )}

                    {/* Course Field */}
                    {/* ................................................................................................... */}
                    {admissionFor === "Courses" && (
                      <Col lg="6">
                        <div className="form-group ">
                          <div className="form-label-group">
                            <label className="form-label" htmlFor="course">
                              Course <span className="text-danger">*</span>
                            </label>
                          </div>
                          <div className="form-control-wrap">
                            {courseIsLoading ? (
                              <Spinner color="primary"></Spinner>
                            ) : (
                              <select
                                {...register("course")}
                                defaultValue={""}
                                className="form-control-lg form-control"
                                id="course"
                              >
                                <option value="" disabled>
                                  Select
                                </option>
                                {courseData &&
                                  courseData?.map((course) => (
                                    <option key={course._id} value={course._id}>
                                      {course.name}
                                    </option>
                                  ))}
                              </select>
                            )}
                            {errors.course && <span className="invalid">{errors.course.message}</span>}
                          </div>
                        </div>
                      </Col>
                    )}

                    {/* Section Field */}
                    {/* ................................................................................................... */}
                    <Col lg="6">
                      <div className="form-group ">
                        <div className="form-label-group">
                          <label className="form-label" htmlFor="section">
                            Section <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="form-control-wrap">
                          {sectionIsLoading ? (
                            <Spinner color="primary"></Spinner>
                          ) : (
                            <select
                              {...register("section")}
                              defaultValue={""}
                              className="form-control-lg form-control"
                              id="section"
                            >
                              <option value="" disabled>
                                Select
                              </option>
                              {sectionData &&
                                sectionData.map((section) => (
                                  <option key={section._id} value={section._id}>
                                    {section.name}
                                  </option>
                                ))}
                            </select>
                          )}
                          {errors.section && <span className="invalid">{errors.section.message}</span>}
                        </div>
                      </div>
                    </Col>

                    {/* Department Field */}
                    {/* ................................................................................................... */}
                    <Col lg="6">
                      <div className="form-group ">
                        <div className="form-label-group">
                          <label className="form-label" htmlFor="department">
                            Department <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="form-control-wrap">
                          {departmentIsLoading ? (
                            <Spinner color="primary"></Spinner>
                          ) : (
                            <select
                              {...register("department")}
                              defaultValue={""}
                              className="form-control-lg form-control"
                              id="department"
                            >
                              <option value="" disabled>
                                Select
                              </option>
                              {departmentData &&
                                departmentData.map((department) => (
                                  <option key={department._id} value={department._id}>
                                    {department.name}
                                  </option>
                                ))}
                            </select>
                          )}
                          {errors.department && <span className="invalid">{errors.department.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <div className="data-head">
                      <h6 className="overline-title">Extra Details</h6>
                    </div>

                    {/* Registration Number Field */}
                    {/* ................................................................................................... */}
                    <Col lg="6">
                      <div className="form-group">
                        <div className="form-label-group">
                          <label className="form-label" htmlFor="registrationNo">
                            Registration No <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            id="registrationNo"
                            {...register("registrationNo")}
                            placeholder="e.g R-85525"
                            className="form-control-lg form-control"
                          />
                          {errors.registrationNo && <span className="invalid">{errors.registrationNo.message}</span>}
                        </div>
                      </div>
                    </Col>

                    {/* Registration Number Field */}
                    {/* ................................................................................................... */}
                    <Col lg="6">
                      <div className="form-group">
                        <div className="form-label-group">
                          <label className="form-label" htmlFor="classRollNo">
                            Class Roll No <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            id="classRollNo"
                            {...register("classRollNo")}
                            placeholder="e.g Fahad"
                            className="form-control-lg form-control"
                          />
                          {errors.classRollNo && <span className="invalid">{errors.classRollNo.message}</span>}
                        </div>
                      </div>
                    </Col>

                    {/* Admission Date Field */}
                    {/* ................................................................................................... */}
                    <Col lg="6">
                      <div className="form-group">
                        <div className="form-label-group">
                          <label className="form-label" htmlFor="admissionDate">
                            Admission Date <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="form-control-wrap">
                          <input
                            type="date"
                            defaultValue={new Date()}
                            id="admissionDate"
                            {...register("admissionDate")}
                            placeholder="E.g 25/07/1998"
                            className="form-control-lg form-control "
                          />
                          {errors.admissionDate && <span className="invalid">{errors.admissionDate.message}</span>}
                        </div>
                      </div>
                    </Col>

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

                }
              </Block>
            </div>
          </div>
        </Card>
      </Content>
    </>
  );
};

export default Academic;
