import React, { Fragment, useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + 'profile/view', { withCredentials: true });
      dispatch(addUser(res?.data));
    } catch (error) {
      if (error.status === 401)
        navigate('/login');
      console.error(error);
    }
  }

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [])

  return (
    <Fragment>
      <NavBar />
      {/* Outlet fills space between navbar and footer */}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  )
}

export default Body