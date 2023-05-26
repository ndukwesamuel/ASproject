import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import Lottie from "lottie-react";
import empty from "../../../assets/lottie/emptyState.json";
import imgRecipient from "../../../assets/imgRecipient.png";
import ChatCircle from "../../../assets/ChatsCircle.png";
import AdminUseTable from "../../../Components/Table/AdminUseTable";
import AdminCreateNegotiation from "../../../Components/Admin/AdminNegotiate/AdminCreateNegotiation";
import {
  Admin__Active_Negotiations_fun,
  Admin___Negotiations_fun,
} from "../../../Slice/Admin/Admin_NegotiationsSlice";
import { useDispatch, useSelector } from "react-redux";

const ActiveNegotiation = ({}) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);

  const handleAllNegotiate = () => {
    setStep(1);
  };

  const handleSuspended = () => {
    setStep(2);
  };

  const handleClosed = () => {
    setStep(3);
  };

  const handleTerminated = () => {
    setStep(4);
  };

  const {
    Admin___Negotiations,
    Admin___Negotiations_isError,
    Admin___Negotiations_isSuccess,
    Admin___Negotiations_isLoading,
    Admin___Negotiations_message,
  } = useSelector((state) => state.reducer.Admin_NegotiationsSlice);

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

  useEffect(() => {
    dispatch(Admin___Negotiations_fun());

    return () => {};
  }, [Admin___Negotiations_isSuccess]);

  return (
    <div className="AdminDashboard">
      <div className="AdminPage_Dashboard">
        <div className="AdminPage_DashboardTAbleCat">
          <div className="AdminPage_NegotiateTab">
            <div className="AdminPage_NegotiateTabTitle">
              <p
                className={`${
                  step === 1
                    ? "AdminPAge_Negotiate_TabNegotiateActive"
                    : "AdminPAge_Negotiate_TabNegotiateInactive"
                }`}
                // className="AdminPAge_Negotiate_TabNegotiateActive"
                onClick={handleAllNegotiate}
              >
                All Negotiate
              </p>
              <p
                onClick={handleSuspended}
                className={`${
                  step === 2
                    ? "AdminPAge_Negotiate_TabNegotiateActive"
                    : "AdminPAge_Negotiate_TabNegotiateInactive"
                }`}
              >
                Suspended
              </p>
              <p
                onClick={handleClosed}
                className={`${
                  step === 3
                    ? "AdminPAge_Negotiate_TabNegotiateActive"
                    : "AdminPAge_Negotiate_TabNegotiateInactive"
                }`}
              >
                Closed{" "}
                <span className="AdminPage_NegotiateTab_TabNumber">10k</span>
              </p>
              <p
                className={`${
                  step === 4
                    ? "AdminPAge_Negotiate_TabNegotiateActive"
                    : "AdminPAge_Negotiate_TabNegotiateInactive"
                }`}
                onClick={handleTerminated}
              >
                Terminated
              </p>
            </div>

            {step === 1 && (
              <>
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
                  {Admin___Negotiations?.Admin__Active_Negotiations?.data
                    .length === 0 ? (
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
                    <AdminUseTable
                      header={header}
                      data={
                        Admin___Negotiations?.Admin__Active_Negotiations?.data
                      }
                    />
                  )}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <p className="AdminPage_NegotiateTitleText">Suspended</p>
                <div className="AdminPage_SuspendedTableInfo">
                  <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
                  <span className="AdminPage_TableInfoText">
                    This is a table of Suspended Negotiates on the platform
                  </span>
                </div>

                <div className="AdminTable_NegotiateTable">
                  {Admin___Negotiations?.Admin__Suspended_Negotiations?.data
                    .length === 0 ? (
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
                    <AdminUseTable
                      header={header}
                      data={
                        Admin___Negotiations?.Admin__Suspended_Negotiations
                          ?.data
                      }
                    />
                  )}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <p className="AdminPage_NegotiateTitleText">Closed</p>
                <div className="AdminPage_TableInfo">
                  <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
                  <span className="AdminPage_TableInfoText">
                    This is a table of Closed Negotiates on the platform
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
                  {Admin___Negotiations?.Admin__Close_Negotiations?.data
                    .length === 0 ? (
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
                    <AdminUseTable
                      header={header}
                      data={
                        Admin___Negotiations?.Admin__Close_Negotiations?.data
                      }
                    />
                  )}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <p className="AdminPage_NegotiateTitleText">Terminated</p>
                <div className="AdminPage_TerminatedTableInfo">
                  <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
                  <span className="AdminPage_TableInfoText">
                    This is a table of Terminated Negotiates on the platform
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
                  {Admin___Negotiations?.Admin__Terminate_Negotiations?.data
                    .length === 0 ? (
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
                    <AdminUseTable
                      header={header}
                      data={
                        Admin___Negotiations?.Admin__Terminate_Negotiations
                          ?.data
                      }
                    />
                  )}
                </div>
              </>
            )}

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
