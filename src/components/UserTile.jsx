import axios from 'axios';
import React, { Fragment } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux';
import { removeRequest } from '../utils/requestSlice';

/* ── SVG icons ── */
const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);
const XIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

/* ── Gender helper ── */
const genderLabel = (g) => {
    if (!g) return null;
    const map = { male: '♂ Male', female: '♀ Female', other: '⚧ Other' };
    return map[g.toLowerCase()] ?? g;
};

const UserTile = ({ user, requestId }) => {
    const dispatch = useDispatch();
    let { firstName, lastName, age, gender, profileUrl, about } = user || {};
    profileUrl = profileUrl || 'https://i.pinimg.com/originals/13/74/20/137420f5b9c39bc911e472f5d20f053e.jpg';

    const handleRequest = async (statusText) => {
        try {
            await axios.post(BASE_URL + 'request/review/' + statusText + '/' + requestId, {}, { withCredentials: true });
            dispatch(removeRequest(requestId));
        } catch (error) { console.dir(error); }
    };

    return (
        <Fragment>
            <div className="animate-fade-up group rounded-2xl overflow-hidden border border-base-content/10
                      bg-base-200 shadow-md hover:shadow-xl hover:scale-[1.01]
                      transition-all duration-300">

                {/* Card layout */}
                <div className="flex items-center gap-4 p-4">

                    {/* ── Avatar ── */}
                    <div className="shrink-0 relative">
                        {/* Gradient ring */}
                        <div className="p-[2px] rounded-2xl"
                            style={{ background: 'linear-gradient(135deg, oklch(var(--p)), oklch(var(--s)))' }}>
                            <div className="w-20 h-20 sm:w-[5.5rem] sm:h-[5.5rem] rounded-[14px] overflow-hidden bg-base-300">
                                <img
                                    src={profileUrl}
                                    alt="Profile"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ── Details ── */}
                    <div className="flex-1 min-w-0">
                        <h2 className="font-bold text-base leading-tight truncate">
                            {firstName} {lastName}
                        </h2>

                        {/* Age + Gender */}
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {age && <span className="info-pill">{age} yrs</span>}
                            {gender && <span className="info-pill">{genderLabel(gender)}</span>}
                        </div>

                        {about && (
                            <p className="text-base-content/50 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                                {about}
                            </p>
                        )}

                        {/* ── Accept / Deny – only on Requests page ── */}
                        {requestId && (
                            <div className="flex gap-2 mt-3">
                                <button onClick={() => handleRequest('accepted')}
                                    className="btn-positive flex-1 flex items-center justify-center gap-2
                           py-2.5 rounded-2xl text-sm">
                                    <CheckIcon /> Accept
                                </button>
                                <button onClick={() => handleRequest('rejected')}
                                    className="btn-positive flex-1 flex items-center justify-center gap-2
                           py-2.5 rounded-2xl text-sm">
                                    <XIcon /> Deny
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UserTile;