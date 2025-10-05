import React, { useState } from 'react';
import { Activity, Move, Droplets, Vibrate, RotateCcw, Battery, BatteryWarning, Target, Power, Wifi } from 'lucide-react';

type SensorKey = 'stress' | 'displacement' | 'porePressure' | 'vibration';

type SensorData = {
  name: string;
  battery: number;
  accuracy: number;
  active: boolean;
};

interface Thresholds {
  stress: number;
  displacement: number;
  porePressure: number;
  vibration: number;
  overall: number;
}

interface SensorsState {
  stress: SensorData;
  displacement: SensorData;
  porePressure: SensorData;
  vibration: SensorData;
}

const Sensor: React.FC = () => {
  const [thresholds, setThresholds] = useState<Thresholds>({
    stress: 75,
    displacement: 65,
    porePressure: 70,
    vibration: 80,
    overall: 90
  });

  const [sensors, setSensors] = useState<SensorsState>({
    stress: { name: 'STR-2400X', battery: 87, accuracy: 99.2, active: true },
    displacement: { name: 'DSP-7810M', battery: 92, accuracy: 98.7, active: true },
    porePressure: { name: 'PPR-5630H', battery: 64, accuracy: 97.5, active: true },
    vibration: { name: 'VIB-9200Z', battery: 78, accuracy: 99.8, active: true }
  });

  const defaultThresholds: Thresholds = {
    stress: 75,
    displacement: 65,
    porePressure: 70,
    vibration: 80,
    overall: 90
  };

  const handleThresholdChange = (sensor: keyof Thresholds, value: string) => {
    setThresholds(prev => ({ ...prev, [sensor]: parseInt(value) }));
  };

  const toggleSensorActive = (sensorKey: SensorKey) => {
    setSensors(prev => ({
      ...prev,
      [sensorKey]: { ...prev[sensorKey], active: !prev[sensorKey].active }
    }));
  };

  const resetToDefault = () => {
    setThresholds(defaultThresholds);
  };

  interface GaugeColor {
    from: string;
    to: string;
  }

  const getGaugeColor = (value: number): GaugeColor => {
    if (value < 40) return { from: '#10b981', to: '#34d399' };
    if (value < 70) return { from: '#fbbf24', to: '#fcd34d' };
    return { from: '#ef4444', to: '#f87171' };
  };

  interface GaugeMeterProps {
    label: string;
    value: number;
    icon: React.ElementType;
    sensorData: SensorData;
    sensorKey: SensorKey;
  }

  const GaugeMeter: React.FC<GaugeMeterProps> = ({ label, value, icon: Icon, sensorData, sensorKey }) => {
    const color = getGaugeColor(value);
    const rotation = (value / 100) * 180 - 90;
    const batteryColor = sensorData.battery > 70 ? '#10b981' : sensorData.battery > 30 ? '#fbbf24' : '#ef4444';
    const BatteryIcon = sensorData.battery > 30 ? Battery : BatteryWarning;

    return (
      <div className="relative flex flex-col items-center">
        <div className="w-full mb-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-3 border border-gray-600 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Wifi className={`w-4 h-4 ${sensorData.active ? 'text-emerald-400' : 'text-gray-500'}`} />
              <span className="text-gray-300 font-bold text-sm tracking-wider" style={{ fontFamily: 'monospace' }}>
                {sensorData.name}
              </span>
            </div>
            <button
              onClick={() => toggleSensorActive(sensorKey)}
              className={`flex items-center gap-1 px-3 py-1 rounded-md transition-all border-2 ${
                sensorData.active 
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-500/50' 
                  : 'bg-gray-700 border-gray-500 text-gray-400'
              }`}
            >
              <Power className="w-3 h-3" />
              <span className="text-xs font-bold">{sensorData.active ? 'ACTIVE' : 'OFFLINE'}</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 bg-gray-800 rounded px-2 py-1 border border-gray-700">
              <BatteryIcon className="w-4 h-4" style={{ color: batteryColor }} />
              <span className="text-gray-400">Battery:</span>
              <span className="font-bold text-gray-200">{sensorData.battery}%</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800 rounded px-2 py-1 border border-gray-700">
              <Target className="w-4 h-4 text-blue-400" />
              <span className="text-gray-400">Accuracy:</span>
              <span className="font-bold text-gray-200">{sensorData.accuracy}%</span>
            </div>
          </div>
        </div>

        <div className={`relative w-64 h-32 transition-opacity ${!sensorData.active ? 'opacity-30' : ''}`}>
          <svg className="absolute inset-0" viewBox="0 0 200 100">
            <defs>
              <linearGradient id={`gauge-bg-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <filter id={`glow-${label}`}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <path
              d="M 20 90 A 80 80 0 0 1 180 90"
              fill="none"
              stroke={`url(#gauge-bg-${label})`}
              strokeWidth="16"
              strokeLinecap="round"
              filter={`url(#glow-${label})`}
            />
            
            <path
              d="M 25 88 A 75 75 0 0 1 175 88"
              fill="none"
              stroke="#1f2937"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {[0, 25, 50, 75, 100].map((tick) => {
              const angle = (tick / 100) * 180 - 90;
              const rad = (angle * Math.PI) / 180;
              const x1 = 100 + 70 * Math.cos(rad);
              const y1 = 90 + 70 * Math.sin(rad);
              const x2 = 100 + 80 * Math.cos(rad);
              const y2 = 90 + 80 * Math.sin(rad);
              return (
                <line
                  key={tick}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#9ca3af"
                  strokeWidth="2"
                />
              );
            })}

            <g transform={`rotate(${rotation} 100 90)`} style={{ transition: 'transform 0.3s ease-out' }}>
              <line
                x1="100"
                y1="90"
                x2="100"
                y2="20"
                stroke={color.from}
                strokeWidth="4"
                strokeLinecap="round"
                filter={`url(#glow-${label})`}
              />
              <polygon
                points="100,15 95,25 105,25"
                fill={color.from}
                filter={`url(#glow-${label})`}
              />
              <circle cx="100" cy="90" r="10" fill="#1f2937" stroke={color.from} strokeWidth="3" />
              <circle cx="100" cy="90" r="6" fill="#374151" />
              <circle cx="100" cy="90" r="3" fill={color.from} filter={`url(#glow-${label})`} />
            </g>
          </svg>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-6">
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-3 rounded-full border-2 border-gray-600 shadow-lg">
              <Icon className="w-6 h-6 text-gray-300" />
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 px-4 py-1 rounded-lg border border-gray-600 shadow-lg">
              <span className="text-2xl font-bold text-gray-100">{value}%</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-400 mt-1">MIN</div>
        <div className="text-xs text-gray-400 absolute right-0 bottom-8">MAX</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 p-8">
      <style dangerouslySetInnerHTML={{ __html: `
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #34d399);
          border: 3px solid #fff;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.6), 0 0 20px rgba(16, 185, 129, 0.4);
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #34d399);
          border: 3px solid #fff;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.6);
          cursor: pointer;
        }
        .slider-overall::-webkit-slider-thumb {
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #6ee7b7);
          border: 4px solid #fff;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.8);
          cursor: pointer;
        }
        .slider-overall::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #6ee7b7);
          border: 4px solid #fff;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.8);
          cursor: pointer;
        }
      ` }} />
      
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-100 mb-2 tracking-wider" style={{ fontFamily: 'monospace', letterSpacing: '0.2em' }}>
            SENSOR ALERT THRESHOLDS
          </h1>
          <p className="text-gray-300 text-lg">Configure benchmark levels for system alerts</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border-2 border-blue-500 shadow-2xl mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-100 tracking-widest" style={{ fontFamily: 'monospace' }}>
              LIVE PREVIEW
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
              <span className="text-emerald-400 text-sm font-bold">MONITORING</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(sensors).map(([key, sensor]) => {
              const sensorIcons = {
                stress: Activity,
                displacement: Move,
                porePressure: Droplets,
                vibration: Vibrate
              };
              type SensorKey = keyof typeof sensorIcons;
              const typedKey = key as SensorKey;
              const SensorIcon = sensorIcons[typedKey];
              const currentValue = thresholds[typedKey];
              const statusColor = currentValue >= thresholds.overall ? 'text-red-400 border-red-500' : 
                                 currentValue >= 70 ? 'text-yellow-400 border-yellow-500' : 
                                 'text-emerald-400 border-emerald-500';
              const bgGlow = currentValue >= thresholds.overall ? 'shadow-red-500/30' : 
                            currentValue >= 70 ? 'shadow-yellow-500/30' : 
                            'shadow-emerald-500/30';
              
              return (
                <div key={key} className={`bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border-2 ${statusColor} shadow-xl ${bgGlow} ${!sensor.active ? 'opacity-40' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <SensorIcon className={`w-5 h-5 ${statusColor}`} />
                    <span className="text-xs text-gray-400" style={{ fontFamily: 'monospace' }}>{sensor.name}</span>
                  </div>
                  <div className={`text-3xl font-bold ${statusColor} mb-1`}>
                    {currentValue}%
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  {sensor.active && currentValue >= thresholds.overall && (
                    <div className="mt-2 text-xs text-red-400 font-bold animate-pulse">
                      ⚠ ALERT
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">System Status:</span>
              <span className="text-gray-300" style={{ fontFamily: 'monospace' }}>
                {Object.values(sensors).filter(s => s.active).length} / {Object.keys(sensors).length} Sensors Online
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={resetToDefault}
            className="bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-gray-100 font-semibold px-6 py-3 rounded-lg border border-gray-600 shadow-lg transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            SET TO SYSTEM DEFAULT
          </button>
        </div>

        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-8 border-2 border-emerald-600 shadow-2xl mb-8">
          <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center tracking-widest" style={{ fontFamily: 'monospace' }}>
            OVERALL ALERT THRESHOLD
          </h2>
          
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 px-8 py-4 rounded-lg border-2 border-emerald-500 shadow-lg">
              <span className="text-6xl font-bold text-emerald-400">{thresholds.overall}%</span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <input
              type="range"
              min="0"
              max="100"
              value={thresholds.overall}
              onChange={(e) => handleThresholdChange('overall', e.target.value)}
              className="w-full h-4 rounded-lg appearance-none cursor-pointer slider-overall"
              style={{
                background: 'linear-gradient(to right, #10b981 0%, #fbbf24 50%, #ef4444 100%)',
              }}
            />
            <div className="flex justify-between text-sm text-gray-400 mt-3">
              <span className="font-semibold">LOW ALERT</span>
              <span className="font-semibold">MEDIUM ALERT</span>
              <span className="font-semibold">HIGH ALERT</span>
            </div>
          </div>

          <p className="text-center text-gray-400 mt-6 text-sm">
            System will trigger alerts when any sensor exceeds this threshold
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-6 border border-gray-600 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-500 shadow-xl">
              <h2 className="text-xl font-bold text-gray-100 mb-4 text-center tracking-widest" style={{ fontFamily: 'monospace' }}>
                STRESS
              </h2>
              <GaugeMeter 
                label="stress" 
                value={thresholds.stress} 
                icon={Activity} 
                sensorData={sensors.stress}
                sensorKey="stress"
              />
              <div className="mt-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={thresholds.stress}
                  onChange={(e) => handleThresholdChange('stress', e.target.value)}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: 'linear-gradient(to right, #10b981 0%, #fbbf24 50%, #ef4444 100%)',
                  }}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-500 shadow-xl">
              <h2 className="text-xl font-bold text-gray-100 mb-4 text-center tracking-widest" style={{ fontFamily: 'monospace' }}>
                DISPLACEMENT
              </h2>
              <GaugeMeter 
                label="displacement" 
                value={thresholds.displacement} 
                icon={Move}
                sensorData={sensors.displacement}
                sensorKey="displacement"
              />
              <div className="mt-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={thresholds.displacement}
                  onChange={(e) => handleThresholdChange('displacement', e.target.value)}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: 'linear-gradient(to right, #10b981 0%, #fbbf24 50%, #ef4444 100%)',
                  }}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-500 shadow-xl">
              <h2 className="text-xl font-bold text-gray-100 mb-4 text-center tracking-widest" style={{ fontFamily: 'monospace' }}>
                PORE PRESSURE
              </h2>
              <GaugeMeter 
                label="porePressure" 
                value={thresholds.porePressure} 
                icon={Droplets}
                sensorData={sensors.porePressure}
                sensorKey="porePressure"
              />
              <div className="mt-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={thresholds.porePressure}
                  onChange={(e) => handleThresholdChange('porePressure', e.target.value)}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: 'linear-gradient(to right, #10b981 0%, #fbbf24 50%, #ef4444 100%)',
                  }}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-500 shadow-xl">
              <h2 className="text-xl font-bold text-gray-100 mb-4 text-center tracking-widest" style={{ fontFamily: 'monospace' }}>
                VIBRATION
              </h2>
              <GaugeMeter 
                label="vibration" 
                value={thresholds.vibration} 
                icon={Vibrate}
                sensorData={sensors.vibration}
                sensorKey="vibration"
              />
              <div className="mt-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={thresholds.vibration}
                  onChange={(e) => handleThresholdChange('vibration', e.target.value)}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: 'linear-gradient(to right, #10b981 0%, #fbbf24 50%, #ef4444 100%)',
                  }}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0</span>
                  <span>100</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default Sensor;

