import React, { memo, useEffect } from "react";
import { Icon, Block } from "components/Component";
import { Modal, ModalBody, Form, Spinner, Card, Table } from "reactstrap";
import { useApiHook } from "utils/api";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "Redux/Slices/modalSlice";
const ViewSubjectModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modal.modals["subjectModal"] || { isOpen: false, modalProps: {} });
  const { isOpen, modalProps } = modalState;
  // console.log(modalProps?.selectedClass?._id);

  const {
    useApi: getSubjectByClass,
    data: subjectClassData,
    error: subjectClassError,
    isLoading: subjectClassIsLoading,
  } = useApiHook();

useEffect(()=>{
  if(modalProps?.selectedClass?._id){
    getSubjectByClass.get(`api/subjectassign/getsubjectbyclass/${modalProps.selectedClass._id}`);
  }
  
},[modalProps?.selectedClass?._id])
  return (
    <Modal
      isOpen={isOpen}
      toggle={() => dispatch(closeModal({ modalName: "subjectModal" }))}
      className="modal-dialog-centered"
      size="lg"
    >
      <ModalBody>
        <a
          href="#cancel"
          onClick={(ev) => {
            ev.preventDefault();
            dispatch(closeModal({ modalName: "subjectModal" }));
          }}
          className="close"
        >
          <Icon name="cross-sm"></Icon>
        </a>
        <div className="p-2">
          <h5 className="title"> Subject list</h5>
          <div className="mt-4">
            <Block size="lg">
              <Card className="border p-1">
                <div>
                  <div>
                    <span className="overline-title">Class Name: {modalProps?.selectedClass?.name} </span>
                  </div>
                  <div>
                    <span className="overline-title">Class Code: {modalProps?.selectedClass?.classCode}</span>
                  </div>
                  <div>
                    <span className="overline-title">Branch Name: {modalProps?.selectedClass?.branch?.branchName}</span>
                  </div>
                </div>
              </Card>
              <Table className="border mt-2">
                <thead className="table-light">
                  <tr>
                    <th className="overline-title">#</th>
                    <th className="overline-title">Subject Name</th>
                    <th className="overline-title ">Subject Code</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectClassIsLoading ? (
                     <tr>
                     <td colSpan="3" className="text-center">
                       <Spinner color="primary" />
                     </td>
                   </tr>
                    
                  ) : (
                    subjectClassData?.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.subject.name}</td>
                          <td>{data.subject.subjectCode}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>
            </Block>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
export default ViewSubjectModal;
