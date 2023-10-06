import React, { useEffect, useState } from "react";

import { Block, BlockContent, BlockDes, BlockHead, BlockTitle, Button, Icon, PreviewCard } from "components/Component";
import Select from "react-select";
import { Form, Spinner, Alert, Col, Row, Badge, Table } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useNavigation } from "react-router-dom";

//***************************************************************************************/
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import Head from "layout/head/Head";
import createBranchValidationSchema from "Validation/createBranchValidation";
import Content from "layout/content/Content";
import { useApiHook } from "utils/api";
import ReactQuill from "react-quill";
const AddProgram = () => {
  const [errorVal, setErrorValue] = useState("");
  const [branchSelection, setBranchSelection] = useState();
  const { useApi, isLoading, error, data } = useApiHook();
  const [programType, setProgramType] = useState();
  const { useApi: getBranch, data: branchData, isLoading: isLoadingBranch } = useApiHook();

  const navigate = useNavigate();

  const onFormSubmit = (formData) => {
    setErrorValue("");
    useApi
      .post("api/branch/", formData)
      .then((response) => {
        reset();
        toast.success("Successfully Branch Created", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
        navigate("/branch-list");
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

  useEffect(() => {
    getBranch.get("/api/branch");
  }, []);

  const {
    register,
    setError,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  // {resolver:yupResolver(createBranchValidationSchema)}

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      // [{ 'size': ['small', 'normal', 'large', 'huge',] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      // ["link", "image", "video"],
      ["link"],
      ["blockquote"],
      // [{ font: [] }],
      [{ align: [] }],
      // [{ direction: "rtl" }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: true,
    },
  };

  return (
    <>
      <Head title="Admin Information" />
      <Content>
        <Block className="">
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Create Your Program</BlockTitle>
              <BlockDes>
                <p>Enter Detail to Create Your Program</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>

          <PreviewCard className=" nk-auth-pCard" bodyClass="card-inner-lg">
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  <Icon name="alert-circle" /> {errorVal}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-4">
                {/* Branch  field */}
                {/* ................................................................................................... */}
                <Col lg="12">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label overline-title" htmlFor="branch">
                        Branch/Campus <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      {isLoadingBranch ? (
                        <Spinner color="primary" />
                      ) : (
                        <Controller
                          name="branch"
                          control={control}
                          defaultValue={null}
                          // rules={{ required: "Branch is required" }} // Add validation rules as needed
                          render={({ field }) => {
                            const branchOptions = branchData
                              ? [
                                  {
                                    value: "all",
                                    label: "Select All",
                                  },
                                  ...branchData.map((branch) => ({
                                    value: branch._id,
                                    label: `${branch?.schoolName} (${branch?.branchName})`,
                                  })),
                                ]
                              : [];

                            return (
                              <Select
                                isMulti
                                {...field}
                                options={branchOptions}
                                value={branchSelection}
                                onChange={(selection) => {
                                  const selectedBranchIds = selection?.map((option) => option.value);
                                  const allBranchSelection = branchData
                                    ? branchData.map((branch) => ({
                                        value: branch._id,
                                        label: `${branch?.schoolName} (${branch?.branchName})`,
                                      }))
                                    : [];

                                  if (selectedBranchIds?.includes("all")) {
                                    setBranchSelection(allBranchSelection);
                                    setValue("branch", allBranchSelection);
                                  } else {
                                    setBranchSelection(selection);
                                    setValue("branch", selection);
                                  }
                                }}
                              />
                            );
                          }}
                        />
                      )}
                      {errors.branch && <span className="invalid">{errors.branch.message}</span>}
                    </div>
                  </div>
                </Col>

                {/* Program Name field */}
                {/* ................................................................................................... */}
                <Col lg="12">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label overline-title" htmlFor="schoolName">
                        Program Name <span className="text-danger">*</span>
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

                {/* Program Code field */}
                {/* ................................................................................................... */}
                <Col lg="6">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label overline-title" htmlFor="schoolName">
                        Program Code <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="schoolName"
                        {...register("schoolName")}
                        placeholder="e.g BSCS"
                        className="form-control form-control"
                      />
                      {errors.schoolName && <span className="invalid">{errors.schoolName.message}</span>}
                    </div>
                  </div>
                </Col>

                {/* Required Credits field */}
                {/* ................................................................................................... */}
                <Col lg="6">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label overline-title" htmlFor="schoolName">
                        Required Credits Hour <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        id="schoolName"
                        {...register("schoolName")}
                        placeholder="e.g 132"
                        className="form-control form-control"
                      />
                      {errors.schoolName && <span className="invalid">{errors.schoolName.message}</span>}
                    </div>
                  </div>
                </Col>

                {/* Degree Type */}
                {/* ................................................................................................... */}
                <Col lg="6">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label overline-title" htmlFor="status">
                        Degree Type <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <div className="form-control-wrap">
                        <select {...register("status")} className="form-control form-control" id="status">
                          <option value="" disabled>
                            Select
                          </option>
                          <option value="1">Bachelor</option>
                          <option value="0">Master</option>
                        </select>
                        {errors.status && <span className="invalid">{errors.status.message}</span>}
                      </div>
                    </div>
                  </div>
                </Col>
                {/* Duration  field */}
                {/* ................................................................................................... */}
                <Col lg="6">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label overline-title" htmlFor="schoolName">
                        Duration <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        id="schoolName"
                        {...register("schoolName")}
                        placeholder="e.g 132"
                        className="form-control form-control"
                      />
                      {errors.schoolName && <span className="invalid">{errors.schoolName.message}</span>}
                    </div>
                  </div>
                </Col>

                {/*Description */}
                {/* ................................................................................................... */}

                <Col lg="12">
                  <label className="form-label overline-title" htmlFor="schoolName">
                    Description <span className="text-danger">*</span>
                  </label>
                  <ReactQuill modules={modules} />
                </Col>

                  {/*Eligibility */}
                {/* ................................................................................................... */}

                <Col lg="12">
                  <label className="form-label overline-title" htmlFor="schoolName">
                  Eligibility <span className="text-danger">*</span>
                  </label>
                  <ReactQuill modules={modules} />
                </Col>

                {/*Program Type*/}
                {/* ................................................................................................... */}

                <Col lg="12">
                  <div className="form-group ">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="admission For">
                        Type: <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <ul className="custom-control-group d-flex justify-content">
                        <li>
                          <div className="custom-control custom-control-sm custom-radio custom-control-pro checked ">
                            <input
                              type="radio"
                              className="custom-control-input "
                              name="btnRadioControl"
                              id="Father"
                              value="Father"
                              checked={programType === "Father"}
                              onChange={(event) => setProgramType(event.target.value)}
                              key="Father"
                            />
                            <label className="custom-control-label" htmlFor="Father">
                              Semester
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-control-sm custom-radio custom-control-pro checked">
                            <input
                              type="radio"
                              className="custom-control-input"
                              name="btnRadioControl"
                              id="Mother"
                              value="Mother"
                              checked={programType === "Mother"}
                              onChange={(event) => setProgramType(event.target.value)}
                              key="Mother"
                            />
                            <label className="custom-control-label" htmlFor="Mother">
                              Terms
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-control-sm custom-radio custom-control-pro checked">
                            <input
                              type="radio"
                              className="custom-control-input"
                              name="btnRadioControl"
                              id="Other"
                              value="Other"
                              checked={programType === "Other"}
                              onChange={(event) => setProgramType(event.target.value)}
                              key="Other"
                            />
                            <label className="custom-control-label" htmlFor="Other">
                              Parts
                            </label>
                          </div>
                        </li>
                      </ul>
                      {/* {errors.role && <span className="invalid">{errors.role.message}</span>} */}
                    </div>
                  </div>
                </Col>

                {/* No. of Semester/Term/Parts */}
                {/* ................................................................................................... */}
                <Col lg="6">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="contactNumber">
                        Total Semester <span className="text-danger"></span>
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

                <PreviewCard>
                  <Table className="border mt-2">
                    <thead className="table-light">
                      <tr>
                        <th className="overline-title">#</th>
                        <th className="overline-title">Semester Name</th>
                        <th className="overline-title ">Credit Hour</th>
                        <th className="overline-title ">Courses</th>
                        <th className="overline-title ">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>1st Semester</td>
                        <td>3</td>
                      </tr>
                    </tbody>
                  </Table>

                  <div className="container d-flex justify-content-center  pt-2">
                    <Button className="btn-dim" outline color="light" size="sm">
                      <Icon name="plus" />
                      <span>Add New</span>
                    </Button>
                  </div>
                </PreviewCard>

                <Col xl="12">
                  <Button disabled={isLoading} color="primary" size="md" type="submit">
                    {isLoading ? (
                      <>
                        <Spinner size="sm" color="light" />
                        <span> Loading... </span>
                      </>
                    ) : (
                      "Create Program"
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};
export default AddProgram;
