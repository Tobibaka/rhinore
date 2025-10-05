import React, { useState } from 'react';
import { Activity, Move, Vibrate, Droplets, HardHat, Layers } from 'lucide-react';

interface IotDevice {
  id: number;
  type: string;
  icon: React.ElementType;
  tunnel: number;
  zone: string;
  depth: number;
  color: string;
  bg: string;
}

interface Overman {
  id: number;
  name: string;
  tunnel: number;
  zone: string;
  depth: number;
  color: string;
  bg: string;
}

interface HoveredItem {
  tunnel: number;
  zone: string;
  depth: number;
  iot: IotDevice[];
  workers: Overman[];
}

interface MousePosition {
  x: number;
  y: number;
}

const Spot = () => {
  const [hoveredItem, setHoveredItem] = useState<HoveredItem | null>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent, hasItems: boolean, tunnel: number, zone: string, depth: number, iot: IotDevice[], workers: Overman[]) => {
    if (hasItems) {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setHoveredItem({ tunnel, zone, depth, iot, workers });
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  // IoT Device Placements (2 devices per type, 4 types = 8 total devices)
  const iotDevices = [
    // Stress Sensors (2)
    { id: 1, type: 'Stress', icon: Activity, tunnel: 1, zone: 'A', depth: 2, color: 'text-red-500', bg: 'bg-red-100' },
    { id: 2, type: 'Stress', icon: Activity, tunnel: 4, zone: 'D', depth: 5, color: 'text-red-500', bg: 'bg-red-100' },
    
    // Displacement Sensors (2)
    { id: 3, type: 'Displacement', icon: Move, tunnel: 2, zone: 'B', depth: 3, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 4, type: 'Displacement', icon: Move, tunnel: 5, zone: 'E', depth: 1, color: 'text-blue-500', bg: 'bg-blue-100' },
    
    // Vibration Sensors (2)
    { id: 5, type: 'Vibration', icon: Vibrate, tunnel: 3, zone: 'C', depth: 4, color: 'text-purple-500', bg: 'bg-purple-100' },
    { id: 6, type: 'Vibration', icon: Vibrate, tunnel: 6, zone: 'F', depth: 6, color: 'text-purple-500', bg: 'bg-purple-100' },
    
    // Pore Pressure Sensors (2)
    { id: 7, type: 'Pore Pressure', icon: Droplets, tunnel: 1, zone: 'A', depth: 4, color: 'text-cyan-500', bg: 'bg-cyan-100' },
    { id: 8, type: 'Pore Pressure', icon: Droplets, tunnel: 3, zone: 'C', depth: 2, color: 'text-cyan-500', bg: 'bg-cyan-100' }
  ];

  // Overman Placements (6 overmen distributed across tunnels/zones/depths)
  const overmen = [
    { id: 1, name: 'Overman 1', tunnel: 2, zone: 'B', depth: 1, color: 'text-emerald-500', bg: 'bg-emerald-100' },
    { id: 2, name: 'Overman 2', tunnel: 3, zone: 'C', depth: 5, color: 'text-emerald-500', bg: 'bg-emerald-100' },
    { id: 3, name: 'Overman 3', tunnel: 1, zone: 'A', depth: 6, color: 'text-emerald-500', bg: 'bg-emerald-100' },
    { id: 4, name: 'Overman 4', tunnel: 5, zone: 'E', depth: 3, color: 'text-emerald-500', bg: 'bg-emerald-100' },
    { id: 5, name: 'Overman 5', tunnel: 4, zone: 'D', depth: 2, color: 'text-emerald-500', bg: 'bg-emerald-100' },
    { id: 6, name: 'Overman 6', tunnel: 6, zone: 'F', depth: 4, color: 'text-emerald-500', bg: 'bg-emerald-100' }
  ];

  const zones = ['A', 'B', 'C', 'D', 'E', 'F'];
  const tunnels = [1, 2, 3, 4, 5, 6];
  const depths = [1, 2, 3, 4, 5, 6];

  // Function to get items at specific location
  const getItemsAtLocation = (tunnel: number, zone: string, depth: number): { iot: IotDevice[], workers: Overman[] } => {
    const iot = iotDevices.filter(d => d.tunnel === tunnel && d.zone === zone && d.depth === depth);
    const workers = overmen.filter(o => o.tunnel === tunnel && o.zone === zone && o.depth === depth);
    return { iot, workers };
  };

  // Get background darkness based on depth (darker as depth increases)
  const getDepthShade = (depth: number): string => {
    const shades = [
      'bg-gray-400',  // Depth 1 - lightest
      'bg-gray-500',  // Depth 2
      'bg-gray-600',  // Depth 3
      'bg-gray-700',  // Depth 4
      'bg-gray-800',  // Depth 5
      'bg-black'      // Depth 6 - darkest
    ];
    return shades[depth - 1];
  };

  return (
    <div className="min-h-screen bg-gray-600 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-2 flex items-center gap-3">
            <Layers className="w-10 h-10 text-emerald-400" />
            IoT & Personnel Location Map
          </h1>
          <p className="text-gray-300 text-lg">Real-time tracking of sensors and overman workers across all zones</p>
        </div>

        {/* Legend */}
        <div className="bg-gray-700 rounded-xl p-6 mb-6 border border-gray-500 shadow-xl">
          <h2 className="text-xl font-bold text-gray-100 mb-4">Legend</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-red-100 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-red-500" />
              </div>
              <span className="text-gray-200 text-sm">Stress Sensor</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Move className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-gray-200 text-sm">Displacement</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Vibrate className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-gray-200 text-sm">Vibration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-cyan-100 p-2 rounded-lg">
                <Droplets className="w-5 h-5 text-cyan-500" />
              </div>
              <span className="text-gray-200 text-sm">Pore Pressure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <HardHat className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="text-gray-200 text-sm">Overman Worker</span>
            </div>
          </div>
        </div>

        {/* 6 Zone Boxes in Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {zones.map(zone => (
            <div key={zone} className="bg-gray-700 rounded-xl p-6 border border-gray-500 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-100 mb-4 text-center">Zone {zone}</h3>
              
              {/* 6 Tunnel Bars with Depth Shading */}
              <div className="space-y-3">
                {tunnels.map(tunnel => (
                  <div key={tunnel} className="space-y-1">
                    <div className="text-xs font-semibold text-gray-300 mb-1">Tunnel {tunnel}</div>
                    
                    {/* Depth Bars with increasing darkness */}
                    <div className="flex gap-1">
                      {depths.map(depth => {
                        const { iot, workers } = getItemsAtLocation(tunnel, zone, depth);
                        const hasItems = iot.length > 0 || workers.length > 0;
                        
                        return (
                          <div
                            key={depth}
                            className={`flex-1 h-12 rounded ${getDepthShade(depth)} border ${
                              hasItems ? 'border-emerald-400' : 'border-gray-600'
                            } flex items-center justify-center gap-1 cursor-pointer hover:scale-105 transition-all relative group`}
                            onMouseMove={(e) => handleMouseMove(e, hasItems, tunnel, zone, depth, iot, workers)}
                            onMouseLeave={handleMouseLeave}
                          >
                            {/* Depth number */}
                            <span className="absolute top-0.5 left-1 text-xs text-gray-400">{depth}</span>
                            
                            {/* Icons */}
                            <div className="flex gap-0.5 flex-wrap justify-center mt-2">
                              {iot.map((device, idx) => {
                                const Icon = device.icon;
                                return (
                                  <div key={idx} className={`${device.bg} p-0.5 rounded`}>
                                    <Icon className={`w-3 h-3 ${device.color}`} />
                                  </div>
                                );
                              })}
                              {workers.map((worker, idx) => (
                                <div key={idx} className={`${worker.bg} p-0.5 rounded`}>
                                  <HardHat className={`w-3 h-3 ${worker.color}`} />
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Hover Info Panel - Follows Cursor */}
        {hoveredItem && (
          <div 
            className="fixed bg-gray-800 border-2 border-emerald-500 rounded-xl p-4 shadow-2xl max-w-xs z-50 pointer-events-none"
            style={{
              left: `${mousePosition.x + 20}px`,
              top: `${mousePosition.y + 20}px`,
              transform: 'translate(0, 0)'
            }}
          >
            <h3 className="text-lg font-bold text-gray-100 mb-2">Location Details</h3>
            <div className="space-y-1 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">Zone:</span>
                <span className="text-gray-100 font-semibold">{hoveredItem.zone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">Tunnel:</span>
                <span className="text-gray-100 font-semibold">{hoveredItem.tunnel}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">Depth Level:</span>
                <span className="text-gray-100 font-semibold">{hoveredItem.depth}</span>
              </div>
            </div>

            {hoveredItem.iot.length > 0 && (
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-gray-300 mb-1">IoT Devices:</h4>
                <div className="space-y-2">
                  {hoveredItem.iot.map((device, idx) => {
                    const Icon = device.icon;
                    return (
                      <div key={idx} className="flex items-center gap-2">
                        <div className={`${device.bg} p-1.5 rounded`}>
                          <Icon className={`w-4 h-4 ${device.color}`} />
                        </div>
                        <span className="text-gray-200 text-sm">{device.type} Sensor</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {hoveredItem.workers.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-300 mb-1">Personnel:</h4>
                <div className="space-y-2">
                  {hoveredItem.workers.map((worker, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className={`${worker.bg} p-1.5 rounded`}>
                        <HardHat className={`w-4 h-4 ${worker.color}`} />
                      </div>
                      <span className="text-gray-200 text-sm">{worker.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Spot;