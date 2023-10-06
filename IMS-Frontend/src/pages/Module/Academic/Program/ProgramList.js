import React, { memo, useMemo, useState } from "react";
import Head from "layout/head/Head";
import Content from "layout/content/Content";
import {
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
  ReactDataTable,
} from "components/Component";
import { Badge, Spinner } from "reactstrap";
import { useEffect } from "react";
import deleteModal from "utils/deleteModal";
import { useApiHook } from "utils/api";
import EditClassModal from "./EditProgramModal";
import AddClassModal from "./AddProgramModal";
import { formatDate } from "utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "Redux/Slices/modalSlice";
import EditProgramModal from "./EditProgramModal";

const ProgramList = () => {
  const { useApi, isLoading, error, data } = useApiHook();
  const [classModalData, setClassModalData] = useState([]);
  const [classData, setClassData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAssignSubjectModal, setAssignSubjectModal] = useState(false);
  const dispatch = useDispatch();

  const { useApi: getSubject, data: subjectData, error: subjectError, isLoading: subjectIsLoading } = useApiHook();

  const {
    useApi: getSubjectAssign,
    data: subjectAssignData,
    error: subjectAssignError,
    isLoading: subjectAssignIsLoading,
  } = useApiHook();
  const openModalold = (data) => {
    setClassModalData(data);
    setModalOpen(true); // Function to open the modal
  };

  const openAssignSubjectModal = (data) => {
    setClassModalData(data);
    getSubject.get(`api/subject/bybranch/${data.branch._id}`);
    setAssignSubjectModal(true);
  };

  const checkSubjectAssignToClass = () => {
    if (classData) {
      const ClassesId = classData?.map((data) => data._id);
      getSubjectAssign.post("api/subjectassign/issubjectassigntoclass", ClassesId);
    }
  };

  useEffect(() => {
    useApi.get("api/class").then((response) => {
      setClassData(response);
    });
  }, []);

  // useEffect(() => {
  //   checkSubjectAssignToClass();
  // }, []);

  useEffect(() => {
    checkSubjectAssignToClass();
  }, [classData]);

  const updateData = () => {
    // Refresh the  data
    setClassData(null);
    useApi.get("api/class").then((response) => {
      setClassData(response);
    });
    // setReload(!reload)
  };
  // useEffect(()=>{
  //   if(shouldUpdateData){
  //     updateData()
  //   }
  // },[shouldUpdateData])

  const dataTableColumns = [
    {
      name: "#",
      selector: (row) => row.id,
      width: "55px",
      sortable: true,
      cell: (row, index) => index + 1,
    },
    {
      name: "Branch Name",
      selector: (row) => row.branch?.branchName,
      sortable: true,
      wrap: true,
      compact: true,
      //   hide: 370,
    },
    {
      name: "Class Name",
      selector: (row) => row.name,
      wrap: true,
      sortable: true,
      //   hide: "sm",
    },
    {
      name: "Class Code",
      selector: (row) => row.classCode,
      wrap: true,
      maxWidth: "200px",
      sortable: true,
      //   hide: "sm",
    },
    {
      name: "Level",
      selector: (row) => row.level?.name,
      wrap: true,
      maxWidth: "200px",
      sortable: true,
      //   hide: "sm",
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
      wrap: true,
      width: "150px",
      sortable: true,
      //   hide: "sm",
      cell: (row) => <span>{formatDate(row.createdAt)}</span>,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      wrap: true,
      width: "120px",
      sortable: true,
      //   hide: "sm",
      cell: (row) => (
        <div className="tb-odr-btns">
          <Badge className="badge-dot" color={row.status ? "success" : "danger"}>
            {row.status ? "Active" : "Inactive"}
          </Badge>
        </div>
      ),
    },

    {
      name: "Subject",
      minWidth: "120px",
      cell: (row) => (
        <div className="tb-odr-btns">
          <Button
            color="info"
            size="sm"
            className="btn-icon btn-dim "
            onClick={() => dispatch(openModal({ modalName: "subjectModal", modalProps: { selectedClass: row } }))}
          >
            <Icon name="eye-alt-fill"></Icon>
          </Button>
          {subjectAssignIsLoading ? (
            <Spinner size="sm" color="primary" />
          ) : (
            <>
              {subjectAssignData?.includes(row._id) ? (
                <Button color="light" size="sm" className="btn btn-dim" onClick={() => openAssignSubjectModal(row)}>
                  Edit
                </Button>
              ) : (
                <Button color="success" size="sm" className="btn btn-dim" onClick={() => openAssignSubjectModal(row)}>
                  Add
                </Button>
              )}
            </>
          )}
        </div>
      ),

      //   hide: "md",
    },

    {
      name: "Action",
      width: "100px",
      cell: (row) => (
        <div className="tb-odr-btns">
          <Button color="primary" size="sm" className="btn-icon btn-dim " onClick={() => openModalold(row)}>
            <Icon name="edit"></Icon>
          </Button>

          <Button
            color="danger"
            size="sm"
            className="btn-icon btn-dim"
            onClick={() => deleteModal("api/class/", row._id, updateData)}
          >
            <Icon name="trash-fill"></Icon>
          </Button>
        </div>
      ),

      //   hide: "md",
    },
  ];

  return (
    <>
      <Head title="Class" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Classes</BlockTitle>
              <BlockDes className="text-soft">Manage your Classes</BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <Button color="primary" onClick={() => dispatch(openModal({ modalName: "addClassModal" }))}>
                {/* <Icon name="plus"></Icon> */}
                <span>Add Class</span>
              </Button>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <PreviewCard>
          {classData ? (
            <ReactDataTable
              data={classData}
              columns={dataTableColumns}
              progressPending={isLoading}
              pagination
              actions
              searchBy={"name"}
            />
          ) : (
            <div className="d-flex justify-content center">
              {isLoading ? <Spinner color="primary" /> : <h6>Please Check Error</h6>}
            </div>
          )}
        </PreviewCard>
      </Content>
      {isModalOpen && (
        <EditProgramModal
          isOpen={isModalOpen}
          toggle={() => setModalOpen(!isModalOpen)}
          modalData={classModalData}
          updateData={updateData}
        />
      )}

      <AddClassModal updateData={updateData} />

     
    </>
  );
};
export default ProgramList;
