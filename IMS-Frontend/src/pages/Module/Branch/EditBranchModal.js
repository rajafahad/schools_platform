
import React, { useEffect } from "react";
import { Icon, Button, Col } from "../../../components/Component";
import { Modal, ModalBody, Form, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import createBranchValidationSchema from "../../../Validation/createBranchValidation";
import { useApiHook } from "../../../utils/api";
const EditBranchModal = ({ isOpen, toggle, branchData,updateBranch }) => {
  const [errorVal, setErrorValue] = useState("");
  const { useApi, isLoading, error, data } = useApiHook();
  useEffect(() => {
    reset();
  }, [branchData]);


  const onFormSubmit = (formData) => {
    console.log(branchData._id);
    setErrorValue("");
    useApi.put(`api/branch/${branchData._id}`, formData)
      .then((response) => {
        reset();
        toast.success("Successfully Branch Updated", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
        updateBranch()
        toggle();
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

  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({resolver:yupResolver(createBranchValidationSchema)});





  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered" size="lg">
      <ModalBody>
        <a
          href="#cancel"
          onClick={(ev) => {
            ev.preventDefault();
            toggle();
          }}
          className="close"
        >
          <Icon name="cross-sm"></Icon>
        </a>
        <div className="p-2">
          <h5 className="title">Update Branch</h5>
          <div className="mt-4">
            <Form className="row gy-2" onSubmit={handleSubmit(onFormSubmit)}>
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
                      defaultValue={branchData.schoolName}
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
                      defaultValue={branchData.branchName}
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
                      <select
                        {...register("schoolLevel")}
                        defaultValue={branchData.schoolLevel}
                        className="form-control-lg form-control"
                        id="schoolLevel"
                      >
                        <option value="" disabled>
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
                      defaultValue={branchData.email}
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
                      defaultValue={branchData.contactNumber}
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
                      defaultValue={branchData.whatsapp}
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
                      defaultValue={branchData.address}
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
                      defaultValue={branchData.country}
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
                      defaultValue={branchData.state}
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
                      defaultValue={branchData.city}
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

              <Col size="12">
                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                  <li>
                    <Col xl="12">
                      <Button disabled={isLoading} color="primary" size="md" type="submit">
                        {isLoading ? (
                          <>
                            <Spinner size="sm" color="light" />
                            <span> Loading... </span>
                          </>
                        ) : (
                          "Update branch"
                        )}
                      </Button>
                    </Col>
                  </li>
                  <li>
                    <Button
                      onClick={(ev) => {
                        ev.preventDefault();
                        toggle();
                      }}
                      className="link link-light"
                    >
                      Cancel
                    </Button>
                  </li>
                </ul>
              </Col>
            </Form>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
export default EditBranchModal;
