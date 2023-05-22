import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import Lottie from "lottie-react";
import empty from "../../../assets/lottie/emptyState.json";
import imgRecipient from "../../../assets/imgRecipient.png";
import ChatCircle from "../../../assets/ChatsCircle.png";
import AdminUseTable from "../../../Components/Table/AdminUseTable";
import AdminCreateNegotiation from "../../../Components/Admin/AdminNegotiate/AdminCreateNegotiation";

const ActiveNegotiation = ({
  handleAllNegotiate,
  handleSuspended,
  handleClosed,
  handleTerminated,
}) => {
  const header = [
    {
      id: 1,
      name: "Deal name",
    },
    {
      id: 2,
      name: "Scout",
    },
    {
      id: 3,
      name: "Initial Offer",
    },
    {
      id: 4,
      name: "Current Offer",
    },
    {
      id: 5,
      name: "Payments",
      case: "All_negotiate_payment",
    },
    {
      id: 6,
      name: "Active Negotiaties",
    },
  ];

  const options = [
    { value: "blues", label: "Blues" },
    { value: "rock", label: "Rock" },
    { value: "jazz", label: "Jazz" },
    { value: "orchestra", label: "Orchestra" },
  ];

  const dataTable = [
    {
      id: 1,
      dealname: "5 Season Deal",
      InitialOffer: "$12,000",
      CurrentOffer: "$15,000",
      surname: "Not paid",

      imgRecip: imgRecipient,
      scoutname: "David Dada",
      chat: ChatCircle,
      number: "8",
    },
  ];

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };

  return (
    <div className="AdminDashboard">
      <div className="AdminPage_Dashboard">
        <div className="AdminPage_DashboardTAbleCat">
          <div className="AdminPage_NegotiateTab">
            {/* <div className='AdminPage_NegotiateTabTitle'>
        <p className='AdminPAge_Negotiate_TabNegotiateActive' onClick={handleAllNegotiate}>All Negotiate</p>
        <p className='AdminPAge_Negotiate_TabNegotiateInactive'onClick={handleSuspended}>Suspended</p>
        <p className='AdminPAge_Negotiate_TabNegotiateInactive' onClick={handleClosed}>Closed <span className='AdminPage_NegotiateTab_TabNumber'>10k</span></p>
        <p className='AdminPAge_Negotiate_TabNegotiateInactive' onClick={handleTerminated}>Terminated</p>
      </div> */}
            <p className="AdminPage_NegotiateTitleText">All Negotiates</p>
            <div className="AdminPage_TableInfo">
              <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
              <span className="AdminPage_TableInfoText">
                This is a table of recent communication on the platform
              </span>
            </div>
            <div className="AdminPage_TableTitleandLink">
              <button
                className="AdminPage_NegotiateCreateButton"
                onClick={handleShow}
              >
                Create Negotiate
              </button>
              <div className="AdminDashboard_Search">
                <input
                  type="text"
                  placeholder="Search name"
                  className="AdminDashboard_SearchInput"
                />
                <RiSearchLine className="AdminDashboard_SearchIcon" />
              </div>
            </div>
            <div className="AdminTable_NegotiateTable">
              {dataTable?.length === 0 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Lottie
                    style={{ width: "200px", height: "200px" }}
                    animationData={empty}
                  />
                </div>
              ) : (
                <AdminUseTable header={header} data={dataTable} />
              )}
            </div>
            <AdminCreateNegotiation
              show={show}
              handleShow={handleShow}
              handleHide={handleHide}
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveNegotiation;
