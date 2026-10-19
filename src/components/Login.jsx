import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { clearFeed } from '../utils/feedSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

/* ── SVG icons ── */
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const InputField = ({ label, type = 'text', placeholder, value, onChange, icon: Icon, minLength, maxLength }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-base-content/50 uppercase tracking-widest pl-1">{label}</label>
    <label className="input input-bordered w-full gap-3">
      {Icon && <span className="opacity-45"><Icon /></span>}
      <input
        type={type}
        className="grow min-w-0"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete="off"
      />
    </label>
  </div>
);

const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true); setError('');
    try {
      const res = await axios.post(BASE_URL + 'login', { emailId, password }, { withCredentials: true });
      dispatch(clearFeed());
      dispatch(addUser(res?.data?.data || {}));
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || err?.response?.data || err?.message || 'Something went wrong');
    } finally { setLoading(false); }
  };

  const handleSignUp = async () => {
    setLoading(true); setError('');
    try {
      const res = await axios.post(BASE_URL + 'signup', { firstName, lastName, emailId, password }, { withCredentials: true });
      dispatch(clearFeed());
      dispatch(addUser(res?.data?.data || {}));
      navigate('/profile');
    } catch (err) {
      setError(err?.response?.data?.message || err?.response?.data || err?.message || 'Something went wrong');
    } finally { setLoading(false); }
  };

  return (
    <Fragment>
      <div className="page-content flex items-center justify-center px-4 py-10 relative overflow-hidden">

        {/* Blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-blob absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-[0.18]"
            style={{ background: 'linear-gradient(135deg, oklch(var(--p)), oklch(var(--s)))' }} />
          <div className="animate-blob absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full opacity-[0.13]"
            style={{ background: 'linear-gradient(135deg, oklch(var(--s)), oklch(var(--a)))', animationDelay: '3s' }} />
        </div>

        {/* Card */}
        <div className="animate-fade-up relative w-full max-w-[420px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/8"
          style={{ background: 'oklch(var(--b2) / 0.88)', backdropFilter: 'blur(24px)' }}>

          {/* Rainbow strip */}
          <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, oklch(var(--p)), oklch(var(--s)), oklch(var(--a)))' }} />

          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 shadow-lg text-white font-extrabold text-lg"
                style={{ background: 'linear-gradient(135deg, oklch(var(--p)), oklch(var(--s)))' }}>
                DT
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold gradient-text tracking-tight">
                {isLoginForm ? 'Sign in' : 'Create account'}
              </h1>
              <p className="text-base-content/45 text-sm mt-1">
                {isLoginForm ? 'Welcome back 👋 Enter your details.' : 'Join DevTinder and find your tech match.'}
              </p>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-4">
              {!isLoginForm && (
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="First Name" placeholder="First Name" icon={UserIcon}
                    value={firstName} onChange={e => setFirstName(e.target.value)} minLength="2" maxLength="50" />
                  <InputField label="Last Name" placeholder="Last Name" icon={UserIcon}
                    value={lastName} onChange={e => setLastName(e.target.value)} minLength="2" maxLength="50" />
                </div>
              )}
              <InputField label="Email" type="email" placeholder="Username" icon={MailIcon}
                value={emailId} onChange={e => setEmailId(e.target.value)} />
              <InputField label="Password" type="password" placeholder="Password" icon={LockIcon}
                value={password} onChange={e => setPassword(e.target.value)} minLength="6" />
            </div>

            {/* Error */}
            {error && (
              <div className="animate-shake mt-5 flex items-start gap-3 rounded-xl px-4 py-3 text-sm font-medium
                              bg-red-500/10 border border-red-500/25 text-red-400">
                <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            {/* CTA Button */}
            <button
              className="btn-shimmer w-full mt-6 py-3 rounded-2xl text-base"
              onClick={isLoginForm ? handleLogin : handleSignUp}
              disabled={loading}>
              {loading
                ? <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  {isLoginForm ? 'Signing in…' : 'Creating account…'}
                </span>
                : (isLoginForm ? 'Sign In' : 'Create Account')
              }
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-base-content/10" />
              <span className="text-xs text-base-content/30 font-medium">or</span>
              <div className="flex-1 h-px bg-base-content/10" />
            </div>

            {/* Toggle */}
            <p className="text-center text-sm text-base-content/50">
              {isLoginForm ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button onClick={() => { setIsLoginForm(v => !v); setError(''); }}
                className="font-semibold text-primary hover:underline underline-offset-2 transition-all">
                {isLoginForm ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;