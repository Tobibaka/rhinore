import React from 'react';
import {
  HomeIcon,
  CpuChipIcon,
  CheckBadgeIcon,
  LinkIcon,
  MapPinIcon,
  LifebuoyIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

const navItems = [
    { name: 'Dashboard', id: 'dashboard', icon: HomeIcon },
    { name: 'Sensor', id: 'sensor', icon: CpuChipIcon },
    { name: 'Approval', id: 'approval', icon: CheckBadgeIcon },
    { name: 'Connect', id: 'connect', icon: LinkIcon },
    { name: 'Tracking',id: 'tracking', icon: MapPinIcon },
    { name: 'Escape', id: 'escape', icon: LifebuoyIcon },
  ];

export default function Sidebar({
   activePage,
   onNavigate,
 }: {
   activePage: string
   onNavigate: (page: string) => void
 }) {
   return (
     <aside className="w-64 h-screen bg-white text-gray-800 flex flex-col border-r border-gray-200">
       <div className="p-6">
         <h1 className="text-2xl font-bold text-gray-900">Control-Head</h1>
       </div>
       <nav className="flex-1 px-4 py-2" aria-label="Sidebar Navigation">
         <ul className="space-y-2">
           {navItems.map((item) => (
             <li key={item.id}>
               <button
                 onClick={() => onNavigate(item.id)}
                 className={`w-full flex items-center gap-4 px-5 py-4 rounded-lg text-left transition-colors ${
                   activePage === item.id
                     ? 'bg-blue-600 text-white'
                     : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                 }`}
               >
                 <item.icon className="w-6 h-6" aria-hidden="true" />
                 <span className="text-lg font-medium">{item.name}</span>
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
           className="flex items-center gap-4 px-5 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
         >
           <ArrowLeftOnRectangleIcon className="w-6 h-6" aria-hidden="true" />
           <span className="text-lg font-medium">Log Out</span>
         </button>
       </div>
     </aside>
   )
}