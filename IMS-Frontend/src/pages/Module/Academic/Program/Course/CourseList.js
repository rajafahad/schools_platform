import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import deleteModal from "utils/deleteModal";
import { useApiHook } from "utils/api";
import EditClassModal from "./EditCourseModal";
import AddClassModal from "./AddCourseModal";
import { formatDate } from "utils/Utils";
import { useDispatch } from "react-redux";
import { openModal } from "Redux/Slices/modalSlice";

const CourseList = () => {
  const { useApi, isLoading, error, data } = useApiHook();
  const [classModalData, setClassModalData] = useState([]);
  const [classData, setClassData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddClassModalOpen, setAddClassModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    useApi.get("api/course").then((response) => {
      setClassData(response);
    });
  }, []);

  const updateData = () => {
    // Refresh the  data
    setClassData(null);
    useApi.get("api/course").then((response) => {
      setClassData(response);
    });
    // setReload(!reload)
  };

  const dataTableColumns = [
    {
      name: "#",
      selector: (row) => row.id,
      width: "55px",
      sortable: true,
      cell: (row, index) => index + 1,
    },
    {
      name: "Campus",
      selector: (row) => row.branch?.branchName,
      sortable: true,
      wrap: true,
      compact: true,
      //   hide: 370,
    },
    {
      name: "Course Code",
      selector: (row) => row.courseCode,
      wrap: true,
      maxWidth: "200px",

      //   hide: "sm",
    },
    {
      name: "Course Name",
      selector: (row) => row.name,
      wrap: true,

      //   hide: "sm",
    },

    {
      name: "Course Type",
      selector: (row) => row.courseType,
      wrap: true,

      //   hide: "sm",
    },
    {
      name: "Credit Hour",
      selector: (row) => row.creditHour,
      width:"110px",
      wrap: true,

      //   hide: "sm",
    },
    
    {
      name: "Prerequisites",
      selector: (row) => row.prerequisite,
      width:"150px",
      wrap: true,
      //   hide: "sm",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      wrap: true,
      width: "90px",
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
      name: "Action",
      width: "100px",
      cell: (row) => (
        <div className="tb-odr-btns">
          <Button
            color="primary"
            size="sm"
            className="btn-icon btn-dim "
            onClick={() => dispatch(openModal({ modalName: "editCourseModal", modalProps: { modalData: row } }))}
          >
            <Icon name="edit"></Icon>
          </Button>

          <Button
            color="danger"
            size="sm"
            className="btn-icon btn-dim"
            onClick={() => deleteModal("api/course/", row._id, updateData)}
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
              <BlockTitle page>Course</BlockTitle>
              <BlockDes className="text-soft">Manage your Courses</BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <Button color="primary" onClick={() => dispatch(openModal({ modalName: "addCourseModal" }))}>
                {/* <Icon name="plus"></Icon> */}
                <span>Add Course</span>
              </Button>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <PreviewCard>
          {classData ? (
            <ReactDataTable
              data={classData}
              columns={dataTableColumns}
              expandableRows
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
      <EditClassModal updateData={updateData} />

      <AddClassModal updateData={updateData} />
    </>
  );
};
export default CourseList;
