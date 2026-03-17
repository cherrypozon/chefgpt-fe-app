'use client'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react';
import PageLoader from '../PageLoader/main'
import {
  useAppDispatch,
  useAppSelector,
  authThunks,
  clearAuthError,
} from '../../redux'
import type { RootState } from '../../redux'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated)
  const loading = useAppSelector((state: RootState) => state.auth.isLoading)
  const authError = useAppSelector((state: RootState) => state.auth.error)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showLoader, setShowLoader] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Clear auth error when component mounts or inputs change
  useEffect(() => {
    if (authError) {
      dispatch(clearAuthError())
    }
  }, [email, password])

  // Navigate when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setShowLoader(true)
    }
  }, [isAuthenticated])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(authThunks.login({ email, password }))
  }

  const handleRequestDemo = () => {
    // Demo mode - skip auth
    setShowLoader(true)
  }

  const handleLoaderComplete = () => {
    navigate('/home')
  }

  if (showLoader) {
    return <PageLoader onComplete={handleLoaderComplete} />
  }

  return (
    <div className="flex h-screen w-screen bg-background text-text overflow-hidden">

      {/* LEFT PANEL — always dark purple regardless of theme */}
      <div
        className="hidden md:flex flex-col justify-between w-[55%] p-12 relative overflow-hidden"
        style={{ backgroundColor: '#3D2C5A' }}
      >

        {/* Geometric decorations */}
        <div
          className="absolute top-8 left-8 w-28 h-28 border-2 pointer-events-none"
          style={{ borderColor: 'rgba(161,0,255,0.4)' }}
        />
        <div
          className="absolute bottom-16 right-12 w-44 h-44 border pointer-events-none"
          style={{ borderColor: 'rgba(161,0,255,0.4)' }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-14 h-14 border pointer-events-none"
          style={{ borderColor: 'rgba(161,0,255,0.4)' }}
        />

        {/* Top: Logo */}
        <div className="flex items-center gap-3 z-10">
          <div className="w-9 h-9 flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            <div className="w-4 h-4 bg-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-white">Chef</span>
            <span style={{ color: '#A100FF' }}>GPT</span>
          </span>
        </div>

        {/* Middle: Tagline */}
        <div className="z-10">
          <h2 className="text-6xl font-serif italic font-light leading-snug text-white mb-16">
            "Intelligence that<br />knows its way<br />around a kitchen"
          </h2>

          {/* Features */}
          <ul className="space-y-5">
            {[
              'AI Culinary Assistant',
              'Real-time Analytics',
              'Feedback Management',
              'Compliance Tracking',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-white text-base">
                <div className="w-2 h-2 flex-shrink-0" style={{ backgroundColor: '#A100FF' }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom: copyright */}
        <p className="text-[11px] z-10" style={{ color: 'rgba(255,255,255,0.45)' }}>
          © 2025 ChefGPT · Culinary Intelligence Platform
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-col justify-center items-center w-full md:w-[45%] px-8 py-12 bg-background">

        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="md:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="w-9 h-9 flex items-center justify-center bg-cards">
              <div className="w-4 h-4 bg-corePurple" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-text">Chef</span>
              <span className="text-corePurple">GPT</span>
            </span>
          </div>

          <h3 className="text-3xl font-bold mb-1 text-text">
            Welcome Back
          </h3>

          <p className="mb-8 text-sm text-darkgrey">
            Sign in to access your kitchen intelligence.
          </p>

          {authError && (
            <div className="p-3 mb-5 bg-red-500/10 border border-red-500/50 text-red-400 text-sm rounded-sm">
              {authError}
            </div>
          )}

          <div className="space-y-5">

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2 text-darkgrey">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chef@restaurant.com"
                className="w-full px-4 py-3 border border-borderGrey bg-cards text-text text-sm focus:outline-none focus:border-corePurple transition-colors duration-150"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-cards border border-borderGrey text-text text-sm focus:outline-none focus:border-corePurple transition-colors duration-150 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-6 -translate-y-1/2 text-darkgrey"
              >
                {showPassword ? <EyeOff size={18} strokeWidth={0.5} /> : <Eye size={18} strokeWidth={0.5} />}
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 font-semibold text-base text-white transition-opacity duration-150 hover:opacity-90 mt-2 disabled:opacity-50"
              style={{ backgroundColor: '#A100FF' }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <p className="text-center text-sm text-darkgrey pt-1">
              Don't have an account?{' '}
              <button
                // onClick={handleRequestDemo}
                className="font-semibold hover:underline mb-7"
                style={{ color: '#A100FF' }}
              >
                Sign Up
              </button>
            </p>

            {/* line */}
            <div className='w-full h-2 flex items-center justify-center mb-5'>
              <div className='w-10 h-px bg-darkGrey'></div>
              <span className='mx-3 text-xs text-darkGrey'>or</span>
              <div className='w-10 h-px bg-darkGrey'></div>
            </div>

            <button
              onClick={handleRequestDemo}
              className="w-full py-3 font-semibold text-base bg-transparent border border-borderGrey  text-corePurple transition-opacity duration-150 hover:opacity-90 mt-2"
            >
              Demo
            </button>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Login