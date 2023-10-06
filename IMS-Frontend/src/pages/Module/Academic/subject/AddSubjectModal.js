import React, { useEffect } from "react";
import { Icon, Button, Col } from "components/Component";
import { Modal, ModalBody, Form, Spinner } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApiHook } from "utils/api";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, toggleModal } from "Redux/Slices/modalSlice";
const AddSubjectModal = ({ updateData }) => {
  const [errorVal, setErrorValue] = useState("");
  const { useApi, isLoading, error, data } = useApiHook();
  const { useApi: getBranch, data: branchData, isLoading: isLoadingBranch, error: branchError } = useApiHook();
  const [branchSelection, setBranchSelection] = useState();
  const dispatch = useDispatch();

  //Redux
  //------------------------------------------------------------------------------------------------------------------------//
  const modalState = useSelector((state) => state.modal.modals["addSubjectModal"] || { isOpen: false, modalProps: {} });
  const { isOpen } = modalState;

  const onFormSubmit = (formData) => {
    const selectedBranches = formData.branch?.map((branch) => branch.value);
    const updatedData = {
      ...formData,
      branch: selectedBranches,
    };
    setErrorValue("");
    useApi
      .post(`api/subject/`, updatedData)
      .then((response) => {
        reset();
        setBranchSelection(null);
        toast.success("Successfully Subject Created", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
        updateData();
        dispatch(closeModal({ modalName: "addSubjectModal" }));
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

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => dispatch(toggleModal({ modalName: "addSubjectModal" }))}
      className="modal-dialog-centered"
      size="lg"
    >
      <ModalBody className="bg-lighter rounded">
        <a
          href="#cancel"
          onClick={(ev) => {
            ev.preventDefault();
            dispatch(closeModal({ modalName: "addSubjectModal" }));
            reset();
            setBranchSelection(null);
          }}
          className="close"
        >
          <Icon name="cross-sm"></Icon>
        </a>
        <div className="p-2">
          <h5 className="title">Add Subject</h5>
          <div className="mt-4">
            <Form className="row gy-2" onSubmit={handleSubmit(onFormSubmit)}>
              <Col lg="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="branch">
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
                        render={({ field }) => (
                          <Select
                            isMulti
                            {...field}
                            options={[
                              {
                                value: "all",
                                label: "Select All",
                              },
                              ...branchData?.map((branch) => ({
                                value: branch._id,
                                label: `${branch.schoolName} (${branch.branchName})`,
                              })),
                            ]}
                            value={branchSelection}
                            onChange={(selection) => {
                              const selectedBranchIds = selection.map((option) => option.value);
                              const AllBranchSelection = branchData?.map((branch) => ({
                                value: branch._id,
                                label: `${branch.schoolName} (${branch.branchName})`,
                              }));

                              if (selectedBranchIds.includes("all")) {
                                setBranchSelection(AllBranchSelection);
                                setValue("branch", AllBranchSelection);
                              } else {
                                setBranchSelection(selection);
                                setValue("branch", selection);
                              }
                            }}
                          />
                        )}
                      />
                    )}
                    {errors.branch && <span className="invalid">{errors.branch.message}</span>}
                  </div>
                </div>
              </Col>

              {/* Subject Name field */}
              {/* ................................................................................................... */}
              <Col lg="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="name">
                      Subject Name <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      placeholder="e.g English"
                      className="form-control form-control"
                    />
                    {errors.name && <span className="invalid">{errors.name.message}</span>}
                  </div>
                </div>
              </Col>
              {/* Subject Code field */}
              {/* ................................................................................................... */}
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="subjectCode">
                      Subject Code <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="subjectCode"
                      {...register("subjectCode")}
                      placeholder="UKG-01"
                      className="form-control form-control"
                    />
                    {errors.subjectCode && <span className="invalid">{errors.subjectCode.message}</span>}
                  </div>
                </div>
              </Col>

              {/* Subject Type field */}
              {/* ................................................................................................... */}
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="subjectType">
                      Subject Type <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-control-wrap">
                      <select {...register("subjectType")} className="form-control form-control" id="status">
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="Theory">Theory</option>
                        <option value="Practical">Practical</option>
                        <option value="Compulsory">Compulsory</option>
                        <option value="Optional">Optional</option>
                        <option value="Elective">Elective</option>
                        <option value="Research">Research</option>
                        <option value="Project">Project</option>
                        <option value="Internship">Internship</option>
                        <option value="Language">Language</option>
                        <option value="Core">Core</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.subjectType && <span className="invalid">{errors.subjectType.message}</span>}
                    </div>
                  </div>
                </div>
              </Col>

              {/* Status */}
              {/* ................................................................................................... */}
              <Col lg="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="status">
                      Status <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-control-wrap">
                      <select {...register("status")} className="form-control form-control" id="status">
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                      {errors.status && <span className="invalid">{errors.status.message}</span>}
                    </div>
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
                          "Create"
                        )}
                      </Button>
                    </Col>
                  </li>
                  <li>
                    <Button
                      onClick={(ev) => {
                        ev.preventDefault();
                        dispatch(closeModal({ modalName: "addSubjectModal" }));
                        reset();
                        setBranchSelection(null);
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
export default AddSubjectModal;
