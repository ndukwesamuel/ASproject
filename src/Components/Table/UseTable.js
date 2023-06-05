import React, { useState } from 'react'
import './UseTable.css'
import {FiEdit} from 'react-icons/fi'
import {MdDelete} from 'react-icons/md'
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetPlayerOfferDetailsApi, PlayerAcceptOfferDetailsApi, PlayerDealsApi, PlayerDeleteOfferDetailsApi } from '../../Slice/Player/PlayerDeal/PlayerDealSlice';
import { CircularProgress } from '@mui/material';
import { PulseLoader } from "react-spinners";
import { PlayerAcceptRequestDetailsApi, PlayerDeleteRequestDetailsApi, PlayerFanDealsApi } from '../../Slice/Player/PlayerDeal/PlayerFanDealSlice';

const UseTable = ({header, data, handleShowEdit}) => {

  const [acceptIndex, setAcceptIndex] = useState(null)
  const [acceptRequestIndex, setAcceptRequestIndex] = useState(null)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [deleteRequestIndex, setDeleteRequestIndex] = useState(null)
  const sentData = {}
  const dispatch = useDispatch()
  const userId = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user?.id)
  const handleAcceptOffer = async (id) =>{
    setAcceptIndex(id)
    sentData.offer_id = id
    sentData.user_id = userId
    // console.log('sent data ', sentData)
    await dispatch(PlayerAcceptOfferDetailsApi(sentData))
    await dispatch(PlayerDealsApi())
    setAcceptIndex(null)
  }

  const handleAcceptRequest = async (id) =>{
    setAcceptRequestIndex(id)
    sentData.offer_id = id
    sentData.user_id = userId
    // console.log('sent data ', sentData)
    await dispatch(PlayerAcceptRequestDetailsApi(sentData))
    await dispatch(PlayerFanDealsApi())
    setAcceptIndex(null)
  }

  const handleDeleteOffer = async (id) =>{
    setDeleteIndex(id)
    sentData.offer_id = id
    sentData.user_id = userId
    // console.log('sent data ', sentData)
    await dispatch(PlayerDeleteOfferDetailsApi(sentData))
    await dispatch(PlayerDealsApi())
    setDeleteIndex(null)
  }

  const handleDeleteRequest = async (id) =>{
    setDeleteRequestIndex(id)
    sentData.offer_id = id
    sentData.user_id = userId
    // console.log('sent data ', sentData)
    await dispatch(PlayerDeleteRequestDetailsApi(sentData))
    await dispatch(PlayerFanDealsApi())
    setDeleteIndex(null)
  }

  return (
    <table  className='AdminUserTable' >
      <thead>
        <tr>
            {header?.map((item, index)=>(
                <th key={index} colSpan={item?.name== "Actions" && 2} className="UseTable_tableheader">{item?.name == "AcceptDeclineOffer" 
                || item?.name == "FanAcceptDeclineOffer" ? "Actions" : item?.name}</th>
            ))}
          {/* <th className="UseTable_tableheader">First Name</th>
          <th className="UseTable_tableheader">Last Name</th>
          <th className="UseTable_tableheader">Username</th> */}
        </tr>
      </thead>
      <tbody>
        {data?.map((each, index)=>{
             return(
             <tr key={index}>
            {header?.map((item)=>{
                switch(item?.name) {
                    case 'Deal name':
                        return (<td  className='useTable_tableDetails'>{each?.offer?.deal?.DealName || each?.request?.deal?.fanRequest}</td>);
                    case 'Recipient':
                        return (<td className='useTable_tableDetails'><div style={{display:'flex', alignItems:'center'}}><img src={each?.offer?.player?.profile_pics} className='useTable_ImageRecipient' alt='Recipient image'/>{each?.offer?.player?.firstname} {each?.offer?.player?.surname}</div></td>);
                    case 'Sender':
                          return (<td className='useTable_tableDetails'>
                            <div style={{display:'flex', alignItems:'center'}}>
                              <img src={each?.offer?.sender?.profile_pics  || each?.request?.sender?.profile_pics} className='useTable_ImageRecipient' alt='Recipient image'/>{each?.offer?.sender?.firstname || each?.request?.sender?.firstname} {each?.offer?.sender?.surname || each?.request?.sender?.surname}
                            </div>
                            </td>);
                    case 'Details':
                        return (<td className='useTable_tableDetails'>{each?.offer?.deal?.about || each?.offer?.deal?.detail || each?.request?.deal?.detail}</td>);
                    case 'Amount':
                        return (<td className='useTable_tableDetails'>${each?.offer?.deal?.value || each?.request?.deal?.value}</td>);
                    case 'Payment':
                        return (<td className='useTable_tableDetails'>{each?.offer?.deal?.surname || each?.request?.deal?.detail}</td>);
                    case 'Status':
                        return (<td className='useTable_tableDetails'>{each?.offer?.deal?.offerStatus || each?.offer?.deal?.status || each?.request?.deal?.requestStatus}</td>);
                    
                    case "AcceptDeclineOffer":
                      return (
                        <td
                          className="useTable_ViewEditSuspendDetails"
                          style={{ flex: 1, width: "200px" }}
                        >
                          {/* <Link className="Admin_playersviewprofile">Edit</Link> */}
                        {each?.offer?.deal?.offerStatus == 'accepted' ? 
                        <button className='AcceptedPlayerUseTable'>Accepted</button>
                        : each?.offer?.deal?.offerStatus == 'rejected' ?
                        <button className='RejectedPlayerUseTable'>Rejected</button> 
                        :<>
                          <button
                            className="Admin_playersviewprofile"
                            onClick={()=> handleAcceptOffer(each?.offer?.deal?.offerId)}
                          >
                            {acceptIndex == each?.offer?.deal?.offerId? 
                            <PulseLoader
                              color="#1D7F33"
                              size={13}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                            : <span>Accept</span>}
                          </button>
                          <button
                            className="Admin_playersSuspendprofile"
                            onClick={()=> handleDeleteOffer(each?.offer?.deal?.offerId)}
                          >
                              {deleteIndex == each?.offer?.deal?.offerId? 
                            <PulseLoader
                              color="#7F351D"
                              size={13}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                            : <span>Decline</span>}
                          </button>
                          </>}
                        </td>
                      );
                      case "FanAcceptDeclineOffer":
                      return (
                        <td
                          className="useTable_ViewEditSuspendDetails"
                          style={{ flex: 1, width: "200px" }}
                        >
                          {/* <Link className="Admin_playersviewprofile">Edit</Link> */}
                        {each?.request?.deal?.requestStatus == 'accepted' ? 
                        <button className='AcceptedPlayerUseTable'>Accepted</button>
                        : each?.request?.deal?.requestStatus == 'rejected' ?
                        <button className='RejectedPlayerUseTable'>Rejected</button> 
                        :<>
                          <button
                            className="Admin_playersviewprofile"
                            onClick={()=> handleAcceptRequest(each?.request?.deal?.requestId)}
                          >
                            {acceptRequestIndex == each?.request?.deal?.requestId ? 
                            <PulseLoader
                              color="#1D7F33"
                              size={13}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                            : <span>Accept</span>}
                          </button>
                          <button
                            className="Admin_playersSuspendprofile"
                            onClick={()=> handleDeleteRequest(each?.request?.deal?.requestId)}
                          >
                              {deleteRequestIndex == each?.request?.deal?.requestId? 
                            <PulseLoader
                              color="#7F351D"
                              size={13}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                            : <span>Decline</span>}
                          </button>
                          </>}
                        </td>
                      );
                      case '':
                          return (<>
                          <td className='useTable_tableDetails'><Link to={`/afrisport/player/dealsmade/${each?.offer?.deal?.offerId || each?.request?.deal?.requestId}`} style={{color:'white'}} className='useTable_tableDetailsLink'>Details</Link></td>
                          </>);
                      case 'Scout Deals':
                          return (<>
                          <td className='useTable_tableDetails'><Link to={`/afrisport/scout/dealsmade/${each?.offer?.deal?.offerId}`} style={{color:'white'}} className='useTable_tableDetailsLink'>Details</Link></td>
                          </>);
                }
            })}
            
          </tr>
          )
})}
        
      </tbody>
    </table>
  )
}

export default UseTable