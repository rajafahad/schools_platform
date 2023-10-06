import { Button, Icon } from "components/Component";
import React, { useEffect, useState } from "react";
import { useApiHook } from "utils/api";
import AssignSubjectToClassModal from "./AssignSubjectToClassModal";
import ViewSubjectModal from "./ViewSubjectModal";

const SubjectColumnCell = ({ row, classData, updateData }) => {
  const [classModalData, setClassModalData] = useState([]);
  const [isViewSubjectModal, setViewSubjectModal] = useState(false);
  const [isAssignSubjectModal, setAssignSubjectModal] = useState(false);

  const { useApi, isLoading, error, data } = useApiHook();

  const {
    useApi: getSubjectAssign,
    data: subjectAssignData,
    error: subjectAssignError,
    isLoading: subjectAssignIsLoading,
  } = useApiHook();
  const { useApi: getSubject, data: subjectData, error: subjectError, isLoading: subjectIsLoading } = useApiHook();
  const {
    useApi: getSubjectByClass,
    data: subjectClassData,
    error: subjectClassError,
    isLoading: subjectClassIsLoading,
  } = useApiHook();
  const checkSubjectAssignToClass = () => {
    const ClassesId = classData?.map((data) => data._id);
    getSubjectAssign.post("api/subjectassign/issubjectassigntoclass", ClassesId);
  };

  const openAssignSubjectModal = (data) => {
    setClassModalData(data);
    getSubject.get(`api/subject/bybranch/${data.branch._id}`);
    setAssignSubjectModal(true);
  };

  const openViewSubjectModal = (data) => {
    setClassModalData(data);
    setViewSubjectModal(true); // Function to open the modal
    getSubjectByClass.get(`api/subjectassign/getsubjectbyclass/${data._id}`);
  };

  useEffect(() => {
    checkSubjectAssignToClass();
  }, []);
  return (
    <>
      <div className="tb-odr-btns">
        <Button color="info" size="sm" className="btn-icon btn-dim " onClick={() => openViewSubjectModal(row)}>
          <Icon name="eye-alt-fill"></Icon>
        </Button>
        {subjectAssignData?.includes(row._id) ? (
          <Button color="light" size="sm" className="btn btn-dim" onClick={() => openAssignSubjectModal(row)}>
            Edit
          </Button>
        ) : (
          <Button color="success" size="sm" className="btn btn-dim" onClick={() => openAssignSubjectModal(row)}>
            Add
          </Button>
        )}
      </div>

      <AssignSubjectToClassModal
        isOpen={isAssignSubjectModal}
        toggle={() => setAssignSubjectModal(!isAssignSubjectModal)}
        modalData={classModalData}
        updateData={updateData}
        subjectList={subjectData}
        subjectIsLoading={subjectIsLoading}
      />

      <ViewSubjectModal
        isOpen={isViewSubjectModal}
        toggle={() => setViewSubjectModal(!isViewSubjectModal)}
        modalData={classModalData}
        subjectList={subjectClassData}
        subjectIsLoading={subjectClassIsLoading}
      />
    </>
  );
};

export default SubjectColumnCell;
