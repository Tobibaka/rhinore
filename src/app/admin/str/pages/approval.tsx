import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Activity, Move, Droplet, Gauge, User, Layers, MapPin } from 'lucide-react';

const Approval = () => {
  const [approvalData, setApprovalData] = useState<ApprovalItem[]>([
    { 
      id: 1, 
      title: "Approval 1", 
      status: "approved",
      reason: "Stable readings within threshold",
      vibration: "0.12 mm/s",
      displacement: "0.8 mm",
      porePressure: "35 kPa",
      strain: "0.003 %",
      overman: "Overman 1",
      tunnel: "Tunnel 1",
      depth: "Depth 1",
      zone: "Zone A"
    },
    { 
      id: 2, 
      title: "Approval 2", 
      status: "approved",
      reason: "Minor fluctuations, still safe",
      vibration: "0.25 mm/s",
      displacement: "1.1 mm",
      porePressure: "38 kPa",
      strain: "0.004 %",
      overman: "Overman 2",
      tunnel: "Tunnel 2",
      depth: "Depth 2",
      zone: "Zone B"
    },
    { 
      id: 3, 
      title: "Approval 3", 
      status: "rejected",
      reason: "Displacement exceeded tolerance",
      vibration: "0.30 mm/s",
      displacement: "3.5 mm",
      displacementAlert: true,
      porePressure: "40 kPa",
      strain: "0.009 %",
      overman: "Overman 3",
      tunnel: "Tunnel 3",
      depth: "Depth 3",
      zone: "Zone C"
    },
    { 
      id: 4, 
      title: "Approval 4", 
      status: "pending",
      reason: "Incomplete vibration data",
      vibration: "Sensor Offline",
      vibrationAlert: true,
      displacement: "1.4 mm",
      porePressure: "36 kPa",
      strain: "0.005 %",
      overman: "Overman 4",
      tunnel: "Tunnel 4",
      depth: "Depth 4",
      zone: "Zone D"
    },
    { 
      id: 5, 
      title: "Approval 5", 
      status: "pending",
      reason: "Waiting for pore pressure recalibration",
      vibration: "0.22 mm/s",
      displacement: "0.9 mm",
      porePressure: "Data not calibrated",
      porePressureAlert: true,
      strain: "0.004 %",
      overman: "Overman 5",
      tunnel: "Tunnel 5",
      depth: "Depth 5",
      zone: "Zone E"
    },
    { 
      id: 6, 
      title: "Approval 6", 
      status: "pending",
      reason: "High strain trend under review",
      vibration: "0.18 mm/s",
      displacement: "1.2 mm",
      porePressure: "39 kPa",
      strain: "0.012 %",
      strainAlert: true,
      overman: "Overman 6",
      tunnel: "Tunnel 6",
      depth: "Depth 6",
      zone: "Zone F"
    }
  ]);

  const approved = approvalData.filter(item => item.status === "approved").length;
  const rejected = approvalData.filter(item => item.status === "rejected").length;
  const pending = approvalData.filter(item => item.status === "pending").length;

  const getStatusBadge = (status: StatusType): React.ReactNode => {
    switch(status) {
      case "approved":
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 border border-green-600 shadow-lg">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="font-semibold text-green-400 text-sm">Approved</span>
          </div>
        );
      case "rejected":
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 border border-red-600 shadow-lg">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="font-semibold text-red-400 text-sm">Rejected</span>
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 border border-yellow-600 shadow-lg">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="font-semibold text-yellow-400 text-sm">Pending</span>
          </div>
        );
      default:
        return null;
    }
  };

  interface ApprovalHandler {
    (id: number): void;
  }

  const handleApprove: ApprovalHandler = (id) => {
    setApprovalData((prevData: ApprovalItem[]) =>
      prevData.map((item: ApprovalItem) =>
        item.id === id ? { ...item, status: "approved" as const } : item
      )
    );
  };

  interface ApprovalItem {
    id: number;
    title: string;
    status: "approved" | "rejected" | "pending";
    reason: string;
    vibration: string;
    vibrationAlert?: boolean;
    displacement: string;
    displacementAlert?: boolean;
    porePressure: string;
    porePressureAlert?: boolean;
    strain: string;
    strainAlert?: boolean;
    overman: string;
    tunnel: string;
    depth: string;
    zone: string;
  }

  type StatusType = "approved" | "rejected" | "pending";

  const handleReject = (id: number) => {
    setApprovalData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, status: "rejected" as const } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-600 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-100 mb-8 tracking-tight">
          Approval Dashboard
        </h1>
        
        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl shadow-2xl p-6 mb-8 border border-gray-500">
          <h2 className="text-xl font-semibold text-gray-200 mb-6">Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 shadow-lg border border-gray-600">
              <p className="text-sm text-gray-400 mb-2">Total Approvals</p>
              <p className="text-3xl font-bold text-gray-100">{approvalData.length}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 shadow-lg border border-gray-600">
              <p className="text-sm text-gray-400 mb-2">Approved</p>
              <p className="text-3xl font-bold text-green-400">{approved}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 shadow-lg border border-gray-600">
              <p className="text-sm text-gray-400 mb-2">Rejected</p>
              <p className="text-3xl font-bold text-red-400">{rejected}</p>
              {rejected > 0 && <p className="text-xs text-gray-400 mt-2">Minor Issue</p>}
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 shadow-lg border border-gray-600">
              <p className="text-sm text-gray-400 mb-2">Pending</p>
              <p className="text-3xl font-bold text-yellow-400">{pending}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          {approvalData.map((item, index) => (
            <div 
              key={item.id} 
              className={`bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-2xl p-5 border border-gray-500 hover:border-gray-400 transition-all ${
                index === 0 ? ' md:col-span-2' : 
                index === 3 ? 'lg:col-span-2' : 
                index === 4 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-100">{item.title}</h3>
                  {getStatusBadge(item.status as StatusType)}
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="flex items-center gap-2 p-2 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-600">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Reported By</p>
                      <p className="text-xs font-semibold text-gray-200">{item.overman}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-600">
                    <Layers className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Location</p>
                      <p className="text-xs font-semibold text-gray-200">{item.tunnel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Depth</p>
                      <p className="text-xs font-semibold text-gray-200">{item.depth}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Zone</p>
                      <p className="text-xs font-semibold text-gray-200">{item.zone}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-3 p-2.5 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-600">
                  <p className="text-xs text-gray-400 italic">{item.reason}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 flex-grow">
                  <div className={`flex items-center gap-2 p-2 rounded-lg border ${item.vibrationAlert ? 'bg-red-900 bg-opacity-20 border-red-700' : 'bg-gray-900 bg-opacity-50 border-gray-600'}`}>
                    <Activity className="w-4 h-4 text-blue-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Vibration</p>
                      <p className={`text-xs font-semibold truncate ${item.vibrationAlert ? 'text-red-400' : 'text-gray-200'}`}>
                        {item.vibration}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 p-2 rounded-lg border ${item.displacementAlert ? 'bg-red-900 bg-opacity-20 border-red-700' : 'bg-gray-900 bg-opacity-50 border-gray-600'}`}>
                    <Move className="w-4 h-4 text-purple-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Displacement</p>
                      <p className={`text-xs font-semibold truncate ${item.displacementAlert ? 'text-red-400' : 'text-gray-200'}`}>
                        {item.displacement}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 p-2 rounded-lg border ${item.porePressureAlert ? 'bg-red-900 bg-opacity-20 border-red-700' : 'bg-gray-900 bg-opacity-50 border-gray-600'}`}>
                    <Droplet className="w-4 h-4 text-cyan-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Pore Pressure</p>
                      <p className={`text-xs font-semibold truncate ${item.porePressureAlert ? 'text-red-400' : 'text-gray-200'}`}>
                        {item.porePressure}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 p-2 rounded-lg border ${item.strainAlert ? 'bg-red-900 bg-opacity-20 border-red-700' : 'bg-gray-900 bg-opacity-50 border-gray-600'}`}>
                    <Gauge className="w-4 h-4 text-green-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Strain</p>
                      <p className={`text-xs font-semibold truncate ${item.strainAlert ? 'text-red-400' : 'text-gray-200'}`}>
                        {item.strain}
                      </p>
                    </div>
                  </div>
                </div>

                {item.status === "pending" && (
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 border border-green-600 text-green-400 rounded-lg font-semibold shadow-lg transition-all text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 border border-red-600 text-red-400 rounded-lg font-semibold shadow-lg transition-all text-sm"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Approval;