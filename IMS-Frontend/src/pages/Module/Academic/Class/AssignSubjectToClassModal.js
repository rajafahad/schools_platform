import React, { useEffect } from "react";
import { Icon, Button, Col, PreviewTable } from "components/Component";
import { Modal, ModalBody, Form, Spinner, Card } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApiHook } from "utils/api";
import Select from "react-select";
const AssignSubjectToClassModal = ({ isOpen, toggle, modalData, updateData, subjectList, subjectIsLoading }) => {
  const [errorVal, setErrorValue] = useState("");
  const [subjectSelection, setSubjectSelection] = useState(null);
  const { useApi, isLoading, error, data } = useApiHook();

  useEffect(() => {
    reset();
  }, [modalData]);

  const onFormSubmit = (data) => {
    setValue("classId", modalData._id);
    setValue("branch", modalData.branch._id);
    const formData = getValues()
   
    const selectedSubjects = formData.subject?.map((subject) => subject.value);
    const updatedData = {
      ...formData,
      subject: selectedSubjects,
    };
    setErrorValue("");
    useApi
      .post(`api/subjectassign/addsubjecttoclass`, updatedData)
      .then((response) => {
        reset();
        setSubjectSelection(null);
        toast.success("Successfully Class Created", {
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
  const {
    register,
    setError,
    setValue,
    getValues,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered" size="lg">
      <ModalBody className="bg-lighter rounded">
        <a
          href="#cancel"
          onClick={(ev) => {
            ev.preventDefault();
            toggle();
            reset();
            setSubjectSelection(null);
          }}
          className="close"
        >
          <Icon name="cross-sm"></Icon>
        </a>
        <div className="p-2">
          <h5 className="title">Assign Subject to Class</h5>
          <div className="mt-4">
            <Form className="row gy-2" onSubmit={handleSubmit(onFormSubmit)}>
            <Card className="border p-1">
                <div className="">
                  <div>
                    <span className="overline-title">Class Name: {modalData?.name}</span>
                  </div>
                  <div>
                    <span className="overline-title">Class Code: {modalData?.classCode}</span>
                  </div>
                  <div>
                    <span className="overline-title">Branch Name: {modalData?.branch?.branchName}</span>
                  </div>
                </div>
              </Card>

              <Col lg="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="subject">
                      Subject <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    {subjectIsLoading ? (
                      <Spinner color="primary" />
                    ) : (
                      <Controller
                        name="subject"
                        control={control}
                        defaultValue={null}
                        // rules={{ required: "subject is required" }} // Add validation rules as needed
                        render={({ field }) =>
                          subjectList ? (
                            <Select
                              isMulti
                              {...field}
                              options={[
                                {
                                  value: "all",
                                  label: "Select All",
                                },
                                ...subjectList?.map((subject) => ({
                                  value: subject?._id,
                                  label: `${subject?.name} (${subject?.subjectCode})`,
                                })),
                              ]}
                              value={subjectSelection}
                              onChange={(selection) => {
                                const selectedSubjectIds = selection?.map((option) => option?.value);
                                const AllSubjectSelection = subjectList?.map((subject) => ({
                                  value: subject?._id,
                                  label: `${subject?.name} (${subject?.subjectCode})`,
                                }));

                                if (selectedSubjectIds.includes("all")) {
                                  setSubjectSelection(AllSubjectSelection);
                                  setValue("subject", AllSubjectSelection);
                                } else {
                                  setSubjectSelection(selection);
                                  setValue("subject", selection);
                                }
                              }}
                            />
                          ) : (
                            <span>No Record Found</span>
                          )
                        }
                      />
                    )}
                    {errors.subject && <span className="invalid">{errors.subject.message}</span>}
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
                          "Save"
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
                        setSubjectSelection(null);
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
export default AssignSubjectToClassModal;
