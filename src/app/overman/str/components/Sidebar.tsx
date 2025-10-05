'use client'

import React from 'react'
import {
  HomeIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  LinkIcon,
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'

const navItems = [
  { name: 'Dashboard', id: 'dashboard', icon: HomeIcon },
  { name: 'Task', id: 'task', icon: ClipboardDocumentCheckIcon },
  { name: 'Report', id: 'report', icon: ChartBarIcon },
  { name: 'Connect', id: 'connect', icon: LinkIcon },
  { name: 'Help', id: 'help', icon: QuestionMarkCircleIcon },
  { name: 'Spot', id: 'spot', icon: MagnifyingGlassIcon },
]

export default function Sidebar({
  activePage,
  onNavigate,
}: {
  activePage: string
  onNavigate: (page: string) => void
}) {
  return (
    <aside className="overflow-y-auto w-65 h-screen bg-white text-gray-800 flex flex-col border-r border-gray-200">
      <div className="p-6  bg-gray-300 text-white rounded-r-full shadow-teal-500 shadow-2xl">
        <h1 className="text-5xl font-bold text-gray-900">Overman</h1>
        <h2 className="text-sm font-light text-gray-500 px-1">BETA</h2>
      </div>
      <nav className="flex-1 px-4 py-40" aria-label="Sidebar Navigation">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-lg text-left transition-colors ${
                  activePage === item.id
                    ? 'bg-gray-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-9 h-9" aria-hidden="true" />
                <span className="text-lg font-stretch-normal hover:mask-radial-from-green-500">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => {
             if (typeof window !== 'undefined') {
               window.location.href = '/login';
             }
           }}
          className="flex items-center gap-6 px-10 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <ArrowLeftOnRectangleIcon className="w-9 h-9" aria-hidden="true" />
          <span className="text-lg font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  )
}


//export default Sidebar;