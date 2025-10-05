
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Cloud, Droplets, Thermometer, Activity, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const [riskLevel, setRiskLevel] = useState(62);
  const [riskChanges, setRiskChanges] = useState([1, -3, 4, 2, -1]);
  const [currentChangeIndex, setCurrentChangeIndex] = useState(0);

  // Simulated sensor data with predictions
  type StressDatum = { time: string; value?: number; predicted?: number; type: string };
  const [stressData, setStressData] = useState<StressDatum[]>([]);
  type DisplacementDatum = { time: string; value?: number; predicted?: number; type: string };
  const [displacementData, setDisplacementData] = useState<DisplacementDatum[]>([]);
  type PorePressureDatum = { time: string; value?: number; predicted?: number; type: string };
  const [porePressureData, setPorePressureData] = useState<PorePressureDatum[]>([]);
  type VibrationDatum = { time: string; value?: number; predicted?: number; type: string };
  const [vibrationData, setVibrationData] = useState<VibrationDatum[]>([]);
  const [mapView, setMapView] = useState('satellite');

  // Initialize data on mount
  useEffect(() => {
    generateInitialData();
  }, []);

  // Risk level updater - every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const change = riskChanges[currentChangeIndex];
      setRiskLevel(prev => Math.max(0, Math.min(100, prev + change)));
      setCurrentChangeIndex((prev) => (prev + 1) % riskChanges.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentChangeIndex]);

  const generateInitialData = () => {
    const timePoints = 24;
    const predictionPoints = 12;
    
    // Stress data (kPa)
    const stress = [];
    let stressBase = 6.5;
    for (let i = 0; i < timePoints; i++) {
      stress.push({
        time: `${i}h`,
        value: stressBase + Math.random() * 2,
        type: 'current'
      });
      stressBase += 0.05;
    }
    for (let i = 0; i < predictionPoints; i++) {
      stress.push({
        time: `${timePoints + i}h`,
        predicted: stressBase + Math.random() * 2.5 + i * 0.15,
        type: 'predicted'
      });
      stressBase += 0.15;
    }
    setStressData(stress);

    // Displacement data (mm)
    const displacement = [];
    let dispBase = 10;
    for (let i = 0; i < timePoints; i++) {
      displacement.push({
        time: `${i}h`,
        value: dispBase + Math.random() * 1.5,
        type: 'current'
      });
      dispBase += 0.08;
    }
    for (let i = 0; i < predictionPoints; i++) {
      displacement.push({
        time: `${timePoints + i}h`,
        predicted: dispBase + Math.random() * 1.8 + i * 0.1,
        type: 'predicted'
      });
      dispBase += 0.1;
    }
    setDisplacementData(displacement);

    // Pore Pressure data (kPa)
    const porePressure = [];
    let poreBase = 1.5;
    for (let i = 0; i < timePoints; i++) {
      porePressure.push({
        time: `${i}h`,
        value: poreBase + Math.random() * 0.8,
        type: 'current'
      });
      poreBase += 0.02;
    }
    for (let i = 0; i < predictionPoints; i++) {
      porePressure.push({
        time: `${timePoints + i}h`,
        predicted: poreBase + Math.random() * 0.9 + i * 0.05,
        type: 'predicted'
      });
      poreBase += 0.05;
    }
    setPorePressureData(porePressure);

    // Vibration data (Hz)
    const vibration = [];
    let vibBase = 3.5;
    for (let i = 0; i < timePoints; i++) {
      vibration.push({
        time: `${i}h`,
        value: vibBase + Math.random() * 1.2,
        type: 'current'
      });
      vibBase += 0.03;
    }
    for (let i = 0; i < predictionPoints; i++) {
      vibration.push({
        time: `${timePoints + i}h`,
        predicted: vibBase + Math.random() * 1.5 + i * 0.08,
        type: 'predicted'
      });
      vibBase += 0.08;
    }
    setVibrationData(vibration);
  };

  interface GetRiskColor {
    (level: number): string;
  }

  const getRiskColor: GetRiskColor = (level) => {
    if (level < 40) return '#10b981';
    if (level < 70) return '#f59e0b';
    return '#ef4444';
  };

  interface GetRiskLabel {
    (level: number): string;
  }

  const getRiskLabel: GetRiskLabel = (level) => {
    if (level < 40) return 'Low';
    if (level < 70) return 'Moderate';
    return 'High';
  };

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number; color: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-700 border border-gray-500 p-3 rounded shadow-lg">
          <p className="text-gray-200 text-sm mb-1">{`Time: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-semibold">
              {`${entry.name}: ${entry.value.toFixed(2)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className=" h-screen bg-gray-600 overflow-auto py-8">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-100 mb-2">Landslide Monitoring Dashboard</h1>
          <p className="text-gray-300">Real-time Slope Stability Analysis & Prediction</p>
        </div>

        {/* BENTO GRID - First 2 Rows Combined */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          
          {/* Row 1 - Risk Level (2 cols) */}
          <div className="col-span-2 bg-gray-700 rounded-lg p-4 border border-gray-500 shadow-xl">
            <h3 className="text-gray-200 text-xs font-semibold mb-2">Today Risk Level</h3>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold mb-1" style={{ color: getRiskColor(riskLevel) }}>
                  {riskLevel}%
                </div>
                <div className="text-xs font-semibold" style={{ color: getRiskColor(riskLevel) }}>
                  {getRiskLabel(riskLevel)}
                </div>
              </div>
              <div className="h-16 w-6 bg-gray-600 rounded-full overflow-hidden relative">
                <div 
                  className="absolute bottom-0 w-full transition-all duration-1000"
                  style={{ 
                    height: `${riskLevel}%`,
                    backgroundColor: getRiskColor(riskLevel)
                  }}
                />
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Changes: {riskChanges.join('% / ')}%
            </div>
          </div>

          {/* Row 1 - Weather Snapshot (2 cols) */}
          <div className="col-span-2 bg-gray-700 rounded-lg p-4 border border-gray-500 shadow-xl">
            <h3 className="text-gray-200 text-xs font-semibold mb-2">Weather Snapshot</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-orange-400" />
                  <span className="text-gray-200 text-xs">Temperature</span>
                </div>
                <span className="text-gray-100 font-semibold text-sm">28°C</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-200 text-xs">Humidity</span>
                </div>
                <span className="text-gray-100 font-semibold text-sm">68%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-gray-300" />
                  <span className="text-gray-200 text-xs">Rainfall</span>
                </div>
                <span className="text-gray-100 font-semibold text-sm">12 mm/hr</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-amber-400">↑ Increasing rainfall</div>
          </div>

          {/* Row 2 - Sensor Status (2 cols) */}
          <div className="col-span-2 bg-gray-700 rounded-lg p-4 border border-gray-500 shadow-xl">
            <h3 className="text-gray-200 text-xs font-semibold mb-2">Sensor Status</h3>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-xs">Stress</span>
                <span className="text-emerald-400 font-semibold text-xs">8.3 kPa</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-xs">Displacement</span>
                <span className="text-emerald-400 font-semibold text-xs">12.5 mm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-xs">Pore Pressure</span>
                <span className="text-emerald-400 font-semibold text-xs">2.1 kPa</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-xs">Vibration</span>
                <span className="text-emerald-400 font-semibold text-xs">4.2 Hz</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-xs">Rainfall</span>
                <span className="text-emerald-400 font-semibold text-xs">15 mm/hr</span>
              </div>
            </div>
          </div>

          {/* Row 2 - AI Prediction (2 cols) */}
          <div className="col-span-2 bg-gray-700 rounded-lg p-4 border border-gray-500 shadow-xl">
            <h3 className="text-gray-200 text-xs font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              AI Predictions
            </h3>
            <div className="space-y-2">
              <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded p-2">
                <div className="text-red-400 font-semibold text-xs">High Risk in 12hrs</div>
                <div className="text-gray-300 text-xs">74% confidence</div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-xs">Stress</span>
                  <span className="text-amber-400 font-semibold text-xs">+18% in 6hrs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-xs">Displacement</span>
                  <span className="text-amber-400 font-semibold text-xs">+9% in 24hrs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3: Stress + Displacement Graphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Stress Graph */}
          <div className="bg-gray-700 rounded-lg p-6 border border-gray-500 shadow-xl">
            <h3 className="text-gray-200 text-lg font-semibold mb-4">Stress vs Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                <XAxis dataKey="time" stroke="#d1d5db" />
                <YAxis stroke="#d1d5db" label={{ value: 'Stress (kPa)', angle: -90, position: 'insideLeft', fill: '#d1d5db' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} name="Current" />
                <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Predicted" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Displacement Graph */}
          <div className="bg-gray-700 rounded-lg p-6 border border-gray-500 shadow-xl">
            <h3 className="text-gray-200 text-lg font-semibold mb-4">Displacement vs Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={displacementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                <XAxis dataKey="time" stroke="#d1d5db" />
                <YAxis stroke="#d1d5db" label={{ value: 'Displacement (mm)', angle: -90, position: 'insideLeft', fill: '#d1d5db' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} name="Current" />
                <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Predicted" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ROW 4: Pore Pressure + Vibration Graphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Pore Pressure */}
          <div className="bg-gray-700 rounded-lg p-6 border border-gray-500 shadow-xl">
            <h3 className="text-gray-200 text-lg font-semibold mb-4">Pore Pressure vs Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={porePressureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                <XAxis dataKey="time" stroke="#d1d5db" />
                <YAxis stroke="#d1d5db" label={{ value: 'Pore Pressure (kPa)', angle: -90, position: 'insideLeft', fill: '#d1d5db' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} name="Current" />
                <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Predicted" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Vibration */}
          <div className="bg-gray-700 rounded-lg p-6 border border-gray-500 shadow-xl">
            <h3 className="text-gray-200 text-lg font-semibold mb-4">Vibration vs Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={vibrationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                <XAxis dataKey="time" stroke="#d1d5db" />
                <YAxis stroke="#d1d5db" label={{ value: 'Vibration (Hz)', angle: -90, position: 'insideLeft', fill: '#d1d5db' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} name="Current" />
                <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Predicted" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ROW 5: Map Section (Full Width) */}
        <div className="bg-gray-700 rounded-lg p-6 border border-gray-500 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-200 text-lg font-semibold">Site Map - Dhanbad Open Pit</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setMapView('satellite')}
                className={`px-3 py-1 rounded text-sm ${mapView === 'satellite' ? 'bg-emerald-600 text-white' : 'bg-gray-600 text-gray-200'}`}
              >
                Satellite
              </button>
              <button
                onClick={() => setMapView('heatmap')}
                className={`px-3 py-1 rounded text-sm ${mapView === 'heatmap' ? 'bg-emerald-600 text-white' : 'bg-gray-600 text-gray-200'}`}
              >
                DEM Heatmap
              </button>
              <button
                onClick={() => setMapView('cracks')}
                className={`px-3 py-1 rounded text-sm ${mapView === 'cracks' ? 'bg-emerald-600 text-white' : 'bg-gray-600 text-gray-200'}`}
              >
                AI Crack Overlay
              </button>
            </div>
          </div>
          <div className="w-full h-96 bg-gray-600 rounded flex items-center justify-center relative overflow-hidden">
            {mapView === 'satellite' && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
                <div className="text-gray-300 text-center">
                  <Activity className="w-16 h-16 mx-auto mb-2 opacity-50" />
                  <p>Satellite View</p>
                  <p className="text-xs mt-1">Dhanbad Open Pit Mine, India</p>
                </div>
              </div>
            )}
            {mapView === 'heatmap' && (
              <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-yellow-700 to-green-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <p className="font-semibold">DEM Heatmap View</p>
                  <p className="text-xs mt-1">Elevation & Stress Distribution</p>
                </div>
              </div>
            )}
            {mapView === 'cracks' && (
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <div className="text-red-400 text-center">
                  <AlertTriangle className="w-16 h-16 mx-auto mb-2" />
                  <p className="font-semibold">AI Crack Detection Overlay</p>
                  <p className="text-xs mt-1">Neural Network Analysis</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;