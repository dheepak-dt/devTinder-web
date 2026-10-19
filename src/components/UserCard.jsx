import axios from 'axios';
import React, { Fragment } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFeed } from '../utils/feedSlice';

/* ── Age + Gender pill (clean, no emoji) ── */
const InfoPill = ({ children }) => (
    <span className="info-pill">{children}</span>
);

/* ── Action button icons ── */
const XIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);
const HeartIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

/* ── Gender symbol (text, no emoji) ── */
const genderLabel = (g) => {
    if (!g) return null;
    const map = { male: '♂ Male', female: '♀ Female', other: '⚧ Other' };
    return map[g.toLowerCase()] ?? g;
};

const UserCard = ({ user, profileEdit }) => {
    const dispatch = useDispatch();
    let { _id, firstName, lastName, age, gender, profileUrl, about } = user || {};
    profileUrl = profileUrl || 'https://i.pinimg.com/originals/13/74/20/137420f5b9c39bc911e472f5d20f053e.jpg';

    const handleSendRequest = async (statusText, id) => {
        try {
            await axios.post(BASE_URL + 'request/send/' + statusText + '/' + id, {}, { withCredentials: true });
            dispatch(removeUserFeed(id));
        } catch (error) { console.dir(error); }
    };

    return (
        <Fragment>
            <div className="animate-fade-up w-full max-w-[340px] mx-auto my-6
                      rounded-[1.75rem] overflow-hidden shadow-2xl border border-white/8
                      transition-all duration-300 hover:scale-[1.015] hover:shadow-3xl
                      bg-base-300">

                {/* ── Hero image with overlay ── */}
                <div className="relative h-[300px] w-full overflow-hidden">
                    <img
                        src={profileUrl}
                        alt={`${firstName ?? 'User'}'s profile`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {/* gradient overlay */}
                    <div className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(10,10,20,0.88) 0%, rgba(10,10,20,0.3) 45%, transparent 100%)' }} />

                    {/* Name + meta over image */}
                    <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
                        <h2 className="text-white text-xl font-extrabold leading-snug drop-shadow">
                            {firstName ?? 'Unknown'} {lastName ?? ''}
                        </h2>
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                            {age && <InfoPill>{age} yrs</InfoPill>}
                            {gender && <InfoPill>{genderLabel(gender)}</InfoPill>}
                        </div>
                    </div>
                </div>

                {/* ── Body ── */}
                <div className="px-5 pt-4 pb-5">
                    {about && (
                        <p className="text-base-content/60 text-[0.875rem] leading-relaxed line-clamp-3">
                            {about}
                        </p>
                    )}

                    {!profileEdit && (
                        <div className="flex gap-3 mt-4">
                            {/* Ignore */}
                            <button
                                onClick={() => handleSendRequest('ignored', _id)}
                                className="btn-positive flex-1 flex items-center justify-center gap-2
                           py-2.5 rounded-2xl text-sm">
                                <XIcon /> Ignore
                            </button>

                            {/* Interested */}
                            <button
                                onClick={() => handleSendRequest('interested', _id)}
                                className="btn-positive flex-1 flex items-center justify-center gap-2
                           py-2.5 rounded-2xl text-sm">
                                <HeartIcon /> Interested
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default UserCard;