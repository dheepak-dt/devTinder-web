import axios from 'axios';
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { clearFeed } from '../utils/feedSlice';

const NavBar = () => {
    const user = useSelector(store => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + 'logout', {}, { withCredentials: true });
            dispatch(removeUser());
            dispatch(clearFeed());
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Fragment>
            <div className="navbar sticky top-0 z-50 shadow-lg px-4 md:px-6"
                 style={{
                     background: 'linear-gradient(135deg, oklch(var(--p)) 0%, oklch(var(--s)) 100%)',
                     backdropFilter: 'blur(12px)',
                 }}>

                {/* ── Brand ── */}
                <div className="flex-1">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                            DT
                        </div>
                        <span className="text-white font-extrabold text-lg tracking-wide hidden sm:inline">
                            Dev<span className="text-white/75">Tinder</span>
                        </span>
                        <span className="text-white font-extrabold text-lg tracking-wide sm:hidden">
                            DT
                        </span>
                    </Link>
                </div>

                {/* ── Right side ── */}
                {user && (
                    <div className="flex items-center gap-3">
                        {/* Welcome text – hidden on xs */}
                        <span className="hidden md:block text-white/80 text-sm font-medium">
                            Hey, <span className="text-white font-semibold">{user.firstName}</span> 👋
                        </span>

                        {/* Avatar dropdown */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button"
                                 aria-label="Open account menu"
                                 className="btn btn-ghost btn-circle avatar ring-2 ring-white/40 hover:ring-white transition-all">
                                <div className="w-9 rounded-full overflow-hidden">
                                    <img
                                        alt="Profile"
                                        src={user.profileUrl || 'https://i.pinimg.com/originals/13/74/20/137420f5b9c39bc911e472f5d20f053e.jpg'}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </div>
                            <ul tabIndex={-1}
                                className="menu dropdown-content z-50 mt-3 w-64 rounded-2xl border border-base-content/10 bg-base-100 p-2 shadow-2xl">
                                <li className="pointer-events-none mb-1">
                                    <div className="flex items-center gap-3 rounded-xl px-3 py-3">
                                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-base-200 ring-1 ring-base-content/10">
                                            <img
                                                alt=""
                                                src={user.profileUrl || 'https://i.pinimg.com/originals/13/74/20/137420f5b9c39bc911e472f5d20f053e.jpg'}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-bold text-base-content">{user.firstName}</p>
                                            <p className="text-xs text-base-content/50">Your account</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="menu-title px-3 py-1 text-[0.65rem] uppercase tracking-wider text-base-content/40">
                                    <span>Menu</span>
                                </li>
                                <li>
                                    <Link to="/profile" className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-base-content/75 transition-colors hover:bg-primary/10 hover:text-primary">
                                        <svg className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <circle cx="12" cy="8" r="4" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                                        </svg>
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/connections" className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-base-content/75 transition-colors hover:bg-primary/10 hover:text-primary">
                                        <svg className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <circle cx="9" cy="8" r="3" /><path d="M3.5 20v-1a5.5 5.5 0 0 1 11 0v1M16 5.5a3 3 0 0 1 0 5.8M17 14a5 5 0 0 1 3.5 4.8V20" />
                                        </svg>
                                        Connections
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/requests" className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-base-content/75 transition-colors hover:bg-primary/10 hover:text-primary">
                                        <svg className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" />
                                        </svg>
                                        Requests
                                    </Link>
                                </li>
                                <li className="mt-1 border-t border-base-content/10 pt-1">
                                    <button onClick={handleLogout}
                                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-error/80 transition-colors hover:bg-error/10 hover:text-error">
                                        <svg className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M10 17l5-5-5-5M15 12H3" /><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
                                        </svg>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Not logged in */}
                {!user && (
                    <Link to="/login"
                          className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white px-5 py-2 text-sm font-bold text-primary shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-0">
                        Login
                    </Link>
                )}
            </div>
        </Fragment>
    )
}

export default NavBar