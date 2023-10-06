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
import { Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import deleteModal from "utils/deleteModal";
import EditBranchModal from "./EditBranchModal";
import { useApiHook } from "utils/api";
import { formatDate } from "utils/Utils";

const BranchList = () => {
  const { useApi, isLoading, error, data } = useApiHook();
  const [branchModalData, setBranchModalData] = useState([]);
  const [branchData, setBranchData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (branch) => {
    setBranchModalData(branch);
    setModalOpen(true); // Function to open the modal
  };

  useEffect(() => {
    useApi.get("api/branch").then((response) => {
      setBranchData(response);
    });
  }, []);

  // useEffect(() => {
  //   setBranchData(null)
  //   UseApi.get("api/branch").then((response)=>{
  //     setBranchData(response)
  //   })
  // }, [reload]);

  const updateBranch = () => {
    // Refresh the branch data
    setBranchData(null);
    useApi.get("api/branch").then((response) => {
      setBranchData(response);
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
      selector: (row) => row.branchName,
      sortable: true,
      wrap: true,
      compact: true,
      //   hide: 370,
    },
    {
      name: "School Name",
      selector: (row) => row.schoolName,
      wrap: true,
      sortable: true,
      //   hide: "sm",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      wrap: true,
      sortable: true,
      //   hide: "sm",
    },
    {
      name: "Mobile",
      selector: (row) => row.contactNumber,
      sortable: true,
      width:"130px"
      //   hide: "md",
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
      width:"150px"
      //   hide: "md",
    },
    // {
    //   name: "Created At",
    //   selector: (row) => row.createdAt,
    //   wrap: true,
    //   width:"130px",
    //   sortable: true,
    //   //   hide: "sm",
    //   cell:(row)=>(
    //     <span>{formatDate(row.createdAt)}</span>
    //   )
    // },
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
            onClick={() => deleteModal("api/branch/", row._id,updateBranch)}
          >
            <Icon name="trash-fill"></Icon>
          </Button>

          {/* btn-white For Background */}
          {/* <Button color="primary" size="sm" className="btn btn-dim">
              View
            </Button> */}
        </div>
      ),

      //   hide: "md",
    },
  ];

  return (
    <>
      <Head title="Branch" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Branch</BlockTitle>
              <BlockDes className="text-soft">Manage your Branches</BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <Link to={"/add-branch"}>
                <Button color="primary">
                  {/* <Icon name="plus"></Icon> */}
                  <span>Add Branch</span>
                </Button>
              </Link>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <PreviewCard>
          {/* <ReactDataTable
              data={brachData}
              columns={dataTableColumns}
              expandableRows
              progressPending={isLoading}
              pagination
              actions
              searchBy={"branchName"}
            /> */}

          {branchData ? (
            <ReactDataTable
              data={branchData}
              columns={dataTableColumns}
              expandableRows
              progressPending={isLoading}
              pagination
              actions
              searchBy={"branchName"}
            />
          ) : (
            <div className="d-flex justify-content center">
              {isLoading ? <Spinner color="primary" /> : <h6>Please Check Error</h6>}
            </div>
          )}
        </PreviewCard>

        {/* <Card className="card-stretch border">
          <ReactDataTableAlt data={DataTableData} columns={dataTableColumns} expandableRows pagination actions />
        </Card> */}
      </Content>
      <EditBranchModal
        isOpen={isModalOpen}
        toggle={() => setModalOpen(!isModalOpen)}
        branchData={branchModalData}
        updateBranch={updateBranch}
      />
    </>
  );
};
export default BranchList;
