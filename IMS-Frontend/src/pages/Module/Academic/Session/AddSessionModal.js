import React, { useEffect } from "react";
import { Icon, Button, Col } from "components/Component";
import { Modal, ModalBody, Form, Spinner } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApiHook } from "utils/api";
import Select from "react-select";
const AddSessionModal = ({ isOpen, toggle, updateData }) => {
  const [errorVal, setErrorValue] = useState("");
  const { useApi, isLoading, error, data } = useApiHook();
  const { useApi: getBranch, data: branchData, isLoading: isLoadingBranch, error: branchError } = useApiHook();
  const [branchSelection, setBranchSelection] = useState();

  const onFormSubmit = (formData) => {
    const selectedBranches = formData.branch?.map((branch) => branch.value);
    const updatedData = {
      ...formData,
      branch: selectedBranches,
    };
    setErrorValue("");
    useApi
      .post(`api/session/`, updatedData)
      .then((response) => {
        reset();
        setBranchSelection(null);
        toast.success("Successfully Session Created", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
        updateData();
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
    <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered" size="lg">
      <ModalBody>
        <a
          href="#cancel"
          onClick={(ev) => {
            ev.preventDefault();
            toggle();
            reset();
            setBranchSelection(null);
          }}
          className="close"
        >
          <Icon name="cross-sm"></Icon>
        </a>
        <div className="p-2">
          <h5 className="title">Add Session</h5>
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

              {/* Branch Field */}
              {/* ................................................................................................... */}
              {/* <Col lg="12">
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
              </Col> */}

              {/* Session Name field */}
              {/* ................................................................................................... */}
              <Col lg="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="name">
                    Session Name <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      placeholder="e.g Regular"
                      className="form-control-lg form-control"
                    />
                    {errors.name && <span className="invalid">{errors.name.message}</span>}
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
                      <select {...register("status")} className="form-control-lg form-control" id="status">
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="1">Activate</option>
                        <option value="0">Deactivate</option>
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
                        toggle();
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
export default AddSessionModal;
