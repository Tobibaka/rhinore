'use client'

import React, { useState } from 'react'
import Layout from '@/app/overman/str/components/Layout'
import Sidebar from '@/app/overman/str/components/Sidebar'

// Import all pages
import Dashboard from '@/app/overman/str/pages/dashboard'
import Task from '@/app/overman/str/pages/task'
import Report from '@/app/overman/str/pages/report'
import Connect from '@/app/overman/str/pages/connect'
import Help from '@/app/overman/str/pages/help'
import Spot from '@/app/overman/str/pages/spot'

export default function Overman() {
  const [activePage, setActivePage] = useState('dashboard')

  const pages: Record<string, React.ReactNode> = {
    dashboard: <Dashboard />,
    task: <Task />,
    report: <Report />,
    connect: <Connect />,
    help: <Help />,
    spot: <Spot />,
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
