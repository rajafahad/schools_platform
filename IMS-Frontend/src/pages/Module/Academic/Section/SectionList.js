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
import EditClassModal from "./EditSectionModal";
import AddClassModal from "./AddSectionModal";
import { formatDate } from "utils/Utils";

const SectionList = () => {
  const { useApi, isLoading, error, data } = useApiHook();
  const [classModalData, setClassModalData] = useState([]);
  const [classData, setClassData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddClassModalOpen, setAddClassModalOpen] = useState(false);

  const openModal = (data) => {
    setClassModalData(data);
    setModalOpen(true); // Function to open the modal
  };

  const openAddClassModal = () => {
    setAddClassModalOpen(true); // Function to open the modal
  };

  useEffect(() => {
    useApi.get("api/section").then((response) => {
      setClassData(response);
    });
  }, []);

  const updateData = () => {
    // Refresh the  data
    setClassData(null);
    useApi.get("api/section").then((response) => {
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
      name: "Branch Name",
      selector: (row) => row.branch?.branchName,
      sortable: true,
      wrap: true,
      compact: true,
      //   hide: 370,
    },
    {
      name: "Section Name",
      selector: (row) => row.name,
      wrap: true,
      sortable: true,
      //   hide: "sm",
    },
    {
      name: "Section Code",
      selector: (row) => row.sectionCode,
      wrap: true,
      maxWidth: "200px",
      sortable: true,
      //   hide: "sm",
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
      wrap: true,
      width:"150px",
      sortable: true,
      //   hide: "sm",
      cell:(row)=>(
        <span>{formatDate(row.createdAt)}</span>
      )
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
      name: "Action",
      width: "100px",
      cell: (row) => (
        <div className="tb-odr-btns">
          <Button color="primary" size="sm" className="btn-icon btn-dim " onClick={() => openModal(row)}>
            <Icon name="edit"></Icon>
          </Button>

          <Button
            color="danger"
            size="sm"
            className="btn-icon btn-dim"
            onClick={() => deleteModal("api/section/", row._id, updateData)}
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
              <BlockTitle page>Branch</BlockTitle>
              <BlockDes className="text-soft">Manage your Classes</BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <Button color="primary" onClick={openAddClassModal}>
                {/* <Icon name="plus"></Icon> */}
                <span>Add Section</span>
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
      <EditClassModal
        isOpen={isModalOpen}
        toggle={() => setModalOpen(!isModalOpen)}
        modalData={classModalData}
        updateData={updateData}
      />

      <AddClassModal
        isOpen={isAddClassModalOpen}
        toggle={() => setAddClassModalOpen(!isAddClassModalOpen)}
        updateData={updateData}
      />
    </>
  );
};
export default SectionList;
