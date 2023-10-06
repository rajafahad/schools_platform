
import React, { useEffect } from "react";
import { Icon, Button, Col } from "components/Component";
import { Modal, ModalBody, Form, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApiHook } from "utils/api";
const EditSessionModal = ({ isOpen, toggle, modalData,updateData }) => {
  const [errorVal, setErrorValue] = useState("");
  const { useApi, isLoading, error, data } = useApiHook();
  useEffect(() => {
    reset();
  }, [modalData]);


  const onFormSubmit = (formData) => {
    console.log(modalData._id);
    setErrorValue("");
    useApi.put(`api/session/${modalData._id}`, formData)
      .then((response) => {
        reset();
        toast.success("Successfully Session Updated", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
        updateData()
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
  } = useForm();





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
          <h5 className="title">Edit Session</h5>
          <div className="mt-4">
            <Form className="row gy-2" onSubmit={handleSubmit(onFormSubmit)}>
              {/* Class Name field */}
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
                      defaultValue={modalData.name}
                      type="text"
                      id="name"
                      {...register("name")}
                      placeholder="e.g Decent Public School"
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
                      <select
                        {...register("status")}
                        defaultValue={modalData.status ? "1":"0"}
                        className="form-control-lg form-control"
                        id="status"
                      >
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
                          "Update"
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
export default EditSessionModal;
