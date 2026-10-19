import React, { Fragment, useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {

    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(user.firstName ?? '');
    const [lastName, setLastName] = useState(user.lastName ?? '');
    const [age, setAge] = useState(user.age ?? '');
    const [gender, setGender] = useState(user.gender ?? '');
    const [about, setAbout] = useState(user.about ?? '');
    const [profileUrl, setProfileUrl] = useState(user.profileUrl ?? '');
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleProfileSave = async () => {
        setLoading(true); setError('');
        try {
            const res = await axios.patch(BASE_URL + 'profile/edit',
                { firstName, lastName, age, about, profileUrl, gender },
                { withCredentials: true });
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2500);
        } catch (err) {
            setError(err?.response?.data?.message || err?.response?.data || err?.message || 'Something went wrong');
        } finally { setLoading(false); }
    };

    const inputClass = "input input-bordered w-full";
    const labelClass = "text-xs font-semibold text-base-content/50 uppercase tracking-widest pl-1";

    return (
        <Fragment>
            <div className="page-content px-4 py-8 pb-20">
                {/* Page title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold gradient-text">Edit Profile</h1>
                    <p className="text-base-content/45 text-sm mt-1">Update your info · see a live preview</p>
                </div>

                <div className="flex flex-col lg:flex-row justify-center items-start gap-8 max-w-5xl mx-auto">

                    {/* ── Form Card ── */}
                    <div className="w-full lg:max-w-md animate-fade-up">
                        <div className="rounded-[1.75rem] overflow-hidden shadow-2xl border border-white/8"
                            style={{ background: 'oklch(var(--b2) / 0.88)', backdropFilter: 'blur(20px)' }}>
                            {/* Gradient strip */}
                            <div className="h-[3px]"
                                style={{ background: 'linear-gradient(90deg, oklch(var(--p)), oklch(var(--s)), oklch(var(--a)))' }} />

                            <div className="p-6 sm:p-8 flex flex-col gap-5">
                                {/* First + Last */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col gap-1.5">
                                        <label className={labelClass}>First Name</label>
                                        <input type="text" className={inputClass} placeholder="First Name"
                                            value={firstName} onChange={e => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className={labelClass}>Last Name</label>
                                        <input type="text" className={inputClass} placeholder="Last Name"
                                            value={lastName} onChange={e => setLastName(e.target.value)} />
                                    </div>
                                </div>

                                {/* Age + Gender */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col gap-1.5">
                                        <label className={labelClass}>Age</label>
                                        <input type="number" className={inputClass} placeholder="Age"
                                            min="18" max="100"
                                            value={age} onChange={e => setAge(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className={labelClass}>Gender</label>
                                        <select className="select select-bordered w-full" value={gender} onChange={e => setGender(e.target.value)}>
                                            <option disabled value="">Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                {/* About */}
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center justify-between pl-1">
                                        <label className={labelClass}>About</label>
                                        <span className="text-xs text-base-content/35">{about.length}/200</span>
                                    </div>
                                    <textarea className="textarea textarea-bordered w-full h-24 resize-none"
                                        placeholder="About"
                                        value={about} onChange={e => setAbout(e.target.value)} maxLength={200} />
                                </div>

                                {/* Profile URL */}
                                <div className="flex flex-col gap-1.5">
                                    <label className={labelClass}>Photo URL</label>
                                    <label className="input input-bordered w-full gap-3">
                                        <span className="opacity-45">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                            </svg>
                                        </span>
                                        <input type="url" className="grow min-w-0" placeholder="https://"
                                            value={profileUrl} onChange={e => setProfileUrl(e.target.value)} />
                                    </label>
                                </div>

                                {/* Error */}
                                {error && (
                                    <div className="animate-shake flex items-start gap-3 rounded-xl px-4 py-3 text-sm font-medium
                                                    bg-red-500/10 border border-red-500/25 text-red-400">
                                        <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                        </svg>
                                        {error}
                                    </div>
                                )}

                                {/* Save */}
                                <button onClick={handleProfileSave} disabled={loading}
                                    className="btn-shimmer w-full py-3 rounded-2xl text-base mt-1">
                                    {loading
                                        ? <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                            </svg>
                                            Saving…
                                        </span>
                                        : 'Save Changes'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── Live Preview ── */}
                    <div className="w-full lg:max-w-sm animate-fade-up" style={{ animationDelay: '0.1s' }}>
                        <div className="text-center mb-3">
                            <span className="inline-block text-xs font-semibold uppercase tracking-widest
                                             px-4 py-1.5 rounded-full border border-primary/40 text-primary">
                                Live Preview
                            </span>
                        </div>
                        <UserCard profileEdit={true}
                            user={{ firstName, lastName, age, about, profileUrl, gender }} />
                    </div>
                </div>
            </div>

            {/* Success toast */}
            {showToast && (
                <div className="toast toast-end toast-bottom z-50 mb-20 mr-2">
                    <div className="rounded-2xl shadow-xl px-5 py-3 flex items-center gap-2 text-white font-semibold text-sm"
                        style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Profile updated successfully!
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default EditProfile;