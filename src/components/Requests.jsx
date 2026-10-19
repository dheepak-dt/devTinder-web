import axios from 'axios'
import React, { Fragment, useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../utils/requestSlice'
import UserTile from './UserTile'

const Requests = () => {

  const dispatch = useDispatch();
  const requests = useSelector(store => store.requests);

  const getAllRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + 'user/request/received', { withCredentials: true });
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.dir(error);
    }
  }

  useEffect(() => {
    getAllRequests();
  }, [])

  if (!requests || requests?.length === 0) return (
    <div className="page-content flex flex-col items-center justify-center gap-4 px-4 text-center pb-16">
      <div className="text-7xl mb-2">📨</div>
      <h2 className="text-2xl font-extrabold gradient-text">No Pending Requests</h2>
      <p className="text-base-content/50 text-sm max-w-xs">
        When other developers are interested in you, their requests will appear here.
      </p>
    </div>
  )

  return (
    <Fragment>
      <div className="page-content px-4 py-8 pb-20">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold gradient-text">Pending Requests</h1>
          <p className="text-base-content/50 text-sm mt-1">
            {requests.length} {requests.length === 1 ? 'request' : 'requests'} waiting for your response
          </p>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full"
            style={{ background: 'linear-gradient(90deg, oklch(var(--p)), oklch(var(--s)))' }} />
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {requests.map((data) => (
            <UserTile user={data?.fromUserId} requestId={data?._id} key={data._id} />
          ))}
        </div>
      </div>
    </Fragment>
  )
}

export default Requests