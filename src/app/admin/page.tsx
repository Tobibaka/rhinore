'use client'

import React, {useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '@/app/admin/str/components/Layout'
import Sidebar from '@/app/admin/str/components/Sidebar'


// Import all pages
import Dashboard from '@/app/admin/str/pages/dashboard'
import Sensor from '@/app/admin/str/pages/sensor'
import Approval from '@/app/admin/str/pages/approval'
import Connect from '@/app/admin/str/pages/connect'
import Tracking from '@/app/admin/str/pages/tracking'
import Escape from '@/app/admin/str/pages/escape'
import { Navigate } from 'react-router-dom'

export default function Admin() {
  const [activePage, setActivePage] = useState('dashboard')

  const pages: Record<string, React.ReactNode> = {
    dashboard: <Dashboard />,
    task: <Sensor />,
    report: <Approval />,
    connect: <Connect />,
    help: <Tracking />,
    spot: <Escape />,
    login: <div>Logging out...</div>,
  }

  return (
    <div className="flex">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <Layout>
        <div className="w-full">{pages[activePage] || <Dashboard />}</div>
      </Layout>
    </div>
  )
}