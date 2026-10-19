import axios from 'axios';
import React, { Fragment, useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed, clearFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {

  const feed = useSelector(store => store.feed);
  const userId = useSelector(store => store.user?._id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearFeed());
    if (!userId) return;

    let isCurrentUser = true;
    const getFeed = async () => {
      try {
        const res = await axios.get(BASE_URL + 'feed', { withCredentials: true });
        if (isCurrentUser) dispatch(addFeed(res?.data?.data));
      } catch (error) {
        console.dir(error);
      }
    };

    getFeed();
    return () => {
      isCurrentUser = false;
    };
  }, [dispatch, userId]);

  if (!feed || feed?.length === 0) return (
    <div className="page-content flex flex-col items-center justify-center gap-4 px-4 text-center pb-16">
      <h2 className="text-2xl font-bold">No More Developers!</h2>
      <p className="text-base-content/50 text-sm max-w-xs">
        You've seen everyone for now. Check back later for new developers to connect with.
      </p>
    </div>
  )

  return (
    <Fragment>
      <div className="page-content flex flex-col items-center justify-start px-4 pt-4 pb-20">
        {/* Sub header */}
        <p className="text-base-content/40 text-xs uppercase tracking-widest font-semibold mb-4">
          Discover Developers
        </p>
        <UserCard user={feed[0]} />
      </div>
    </Fragment>
  )
}

export default Feed