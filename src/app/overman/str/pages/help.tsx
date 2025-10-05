import React, { useState } from 'react';
import { Phone, MapPin, AlertTriangle, MessageCircle, Hospital, X, Send, Shield, Flame, Heart, Bell, Clock, Navigation, Check } from 'lucide-react';

const Help = () => {
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [message, setMessage] = useState('');
  const [locationUpdated, setLocationUpdated] = useState(false);
  const [escapeProtocolView, setEscapeProtocolView] = useState({
    tunnel: '1',
    zone: 'A',
    depth: '1'
  });
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Emergency chat initiated. How can we assist you?", sender: "operator", time: "Now" }
  ]);

  const emergencyNumbers = [
    { name: "Police HQ", number: "100", icon: Shield },
    { name: "Fire Department", number: "101", icon: Flame },
    { name: "Ambulance Service", number: "102", icon: Heart },
    { name: "Emergency Admin", number: "108", icon: Phone }
  ];

  const recentAlarms = [
    { id: 1, message: "High water content detected in Tunnel 3, Zone D", time: "10:25 AM", severity: "major", icon: AlertTriangle },
    { id: 2, message: "Pore pressure spike in Tunnel 1, Zone B", time: "12:15 PM", severity: "major", icon: AlertTriangle },
    { id: 3, message: "Temperature sensor malfunction in Tunnel 2", time: "11:40 AM", severity: "minor", icon: Bell },
    { id: 4, message: "Minor equipment vibration detected", time: "09:15 AM", severity: "minor", icon: Bell },
    { id: 5, message: "Ventilation system check required", time: "01:30 PM", severity: "minor", icon: Bell },
    { id: 6, message: "Ground displacement warning in Tunnel 4", time: "08:45 AM", severity: "major", icon: AlertTriangle }
  ];

  interface EmergencyNumber {
    name: string;
    number: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }

  interface Alarm {
    id: number;
    message: string;
    time: string;
    severity: 'major' | 'minor';
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }

  interface EscapeProtocolView {
    tunnel: string;
    zone: string;
    depth: string;
  }

  interface ChatMessage {
    id: number;
    text: string;
    sender: 'user' | 'operator';
    time: string;
  }

  const handleCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleLocationShare = () => {
    setShowLocationPopup(true);
    setTimeout(() => setShowLocationPopup(false), 3000);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        text: message,
        sender: "user",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessage('');
      
      setTimeout(() => {
        const response = {
          id: chatMessages.length + 2,
          text: "We've received your message. Emergency units are being dispatched to your location.",
          sender: "operator",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, response]);
      }, 1500);
    }
  };

  const handleSOSAlert = () => {
    alert("🆘 SOS Alert sent to all emergency contacts and authorities!");
  };

  const handleNearbyHospitals = () => {
    alert("🏥 Opening nearby hospitals map...");
  };

  const handleUpdateLocation = () => {
    setLocationUpdated(true);
    setTimeout(() => setLocationUpdated(false), 3000);
  };

  const getEscapeProtocolImage = () => {
    const { zone } = escapeProtocolView;
    const zoneMap = { 'A': '1', 'B': '2', 'C': '3', 'D': '4', 'E': '5', 'F': '6' };
    const imageNum = zoneMap[zone as keyof typeof zoneMap] || '1';
    return `/images/escp${imageNum}.png`;
  };

  return (
    <div className="min-h-screen bg-gray-600">
      <header className="bg-gray-700 border-b border-gray-500 p-6 shadow-lg">
        <h1 className="text-4xl font-bold text-gray-100 flex items-center gap-3">
          <AlertTriangle className="w-10 h-10 text-red-500 animate-pulse" />
          Emergency Panic Section
        </h1>
        <p className="text-gray-300 mt-2">Immediate assistance and emergency response</p>
      </header>

      <div className="flex">
        <div className="w-72 p-6 space-y-3 bg-gray-700 border-r border-gray-500">
          <div className="space-y-2">
            <button
              onClick={() => handleCall('100')}
              className="w-full p-3 rounded-xl font-medium text-base transition-all duration-300 bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-3 group"
            >
              <Shield className="w-5 h-5 group-hover:animate-pulse" />
              Call Police
            </button>
            
            <button
              onClick={() => handleCall('101')}
              className="w-full p-3 rounded-xl font-medium text-base transition-all duration-300 bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-3 group"
            >
              <Flame className="w-5 h-5 group-hover:animate-pulse" />
              Call Fire Dept
            </button>
            
            <button
              onClick={() => handleCall('102')}
              className="w-full p-3 rounded-xl font-medium text-base transition-all duration-300 bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-3 group"
            >
              <Heart className="w-5 h-5 group-hover:animate-pulse" />
              Call Ambulance
            </button>
          </div>

          <div className="space-y-2 pt-3">
            <button
              onClick={handleLocationShare}
              className="w-full p-3 rounded-xl font-medium text-base transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-3 group"
            >
              <MapPin className="w-5 h-5 group-hover:animate-bounce" />
              Share My Location
            </button>
            
            <button
              onClick={handleSOSAlert}
              className="w-full p-3 rounded-xl font-medium text-base transition-all duration-300 bg-orange-600 hover:bg-orange-700 text-white shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-3 group"
            >
              <AlertTriangle className="w-5 h-5 group-hover:animate-pulse" />
              Send SOS Alert
            </button>
            
            <button
              onClick={handleNearbyHospitals}
              className="w-full p-3 rounded-xl font-medium text-base transition-all duration-300 bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-3 group"
            >
              <Hospital className="w-5 h-5 group-hover:animate-pulse" />
              Nearby Hospitals
            </button>

            <div className="relative w-full">
              <button
                onClick={() => setShowChatPanel(true)}
                className="w-full p-3 rounded-xl font-medium text-base transition-all duration-300 bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-3 group"
              >
                <MessageCircle className="w-5 h-5 group-hover:animate-bounce" />
                <span>Chat Zonal Admin</span>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowChatPanel(false);
                  }}
                  className="ml-auto p-1.5 rounded-full hover:bg-gray-500 cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-6">
          <div className="bg-gray-700 rounded-xl p-4 shadow-xl border border-gray-500">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-bold text-gray-100 flex items-center gap-2 whitespace-nowrap">
                  <Navigation className="w-5 h-5 text-emerald-400" />
                  View Escape Protocol:
                </h3>
                
                <select
                  value={escapeProtocolView.tunnel}
                  onChange={(e) => setEscapeProtocolView(prev => ({ ...prev, tunnel: e.target.value }))}
                  className="px-3 py-2 bg-gray-600 border border-gray-500 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                >
                  <option value="1">Tunnel 1</option>
                  <option value="2">Tunnel 2</option>
                  <option value="3">Tunnel 3</option>
                  <option value="4">Tunnel 4</option>
                  <option value="5">Tunnel 5</option>
                  <option value="6">Tunnel 6</option>
                </select>

                <select
                  value={escapeProtocolView.zone}
                  onChange={(e) => setEscapeProtocolView(prev => ({ ...prev, zone: e.target.value }))}
                  className="px-3 py-2 bg-gray-600 border border-gray-500 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                >
                  <option value="A">Zone A</option>
                  <option value="B">Zone B</option>
                  <option value="C">Zone C</option>
                  <option value="D">Zone D</option>
                  <option value="E">Zone E</option>
                  <option value="F">Zone F</option>
                </select>

                <select
                  value={escapeProtocolView.depth}
                  onChange={(e) => setEscapeProtocolView(prev => ({ ...prev, depth: e.target.value }))}
                  className="px-3 py-2 bg-gray-600 border border-gray-500 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                >
                  <option value="1">Depth 1</option>
                  <option value="2">Depth 2</option>
                  <option value="3">Depth 3</option>
                  <option value="4">Depth 4</option>
                  <option value="5">Depth 5</option>
                  <option value="6">Depth 6</option>
                </select>
              </div>

              <button
                onClick={handleUpdateLocation}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-lg flex items-center gap-2 whitespace-nowrap"
              >
                <MapPin className="w-4 h-4" />
                Update Location
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 rounded-xl p-4 shadow-xl border border-gray-500">
              <h2 className="text-lg font-bold mb-2 text-gray-100 flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                Escape Protocol Map
              </h2>
              <p className="text-gray-300 text-xs mb-3">
                Tunnel {escapeProtocolView.tunnel} | Zone {escapeProtocolView.zone} | Depth {escapeProtocolView.depth}
              </p>
              <div className="bg-gray-800 rounded-lg p-2 border border-gray-500">
                <img
                  src={getEscapeProtocolImage()}
                  alt={`Escape Protocol`}
                  className="w-full h-48 object-contain rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23374151"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%239ca3af"%3EEscape Map%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            </div>

            <div className="bg-gray-700 rounded-xl p-4 shadow-xl border border-gray-500">
              <div className="flex items-center gap-3 mb-3">
                <Bell className="w-6 h-6 text-yellow-400 animate-pulse" />
                <h2 className="text-lg font-bold text-gray-100">Recent Alarms</h2>
              </div>
              
              <div className="bg-blue-600 bg-opacity-20 border border-blue-500 rounded-lg p-2 mb-3">
                <p className="text-blue-300 text-xs font-semibold flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  Next alarm auto-sent with location
                </p>
              </div>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {recentAlarms.map((alarm) => (
                  <div 
                    key={alarm.id} 
                    className={`p-3 rounded-lg ${
                      alarm.severity === 'major' 
                        ? 'bg-gray-800 border border-red-500' 
                        : 'bg-gray-800 border border-yellow-500'
                    } flex items-center gap-3 transition-all shadow-md`}
                  >
                    <div className={`p-2 rounded-full ${
                      alarm.severity === 'major' ? 'bg-red-600' : 'bg-yellow-600'
                    }`}>
                      <alarm.icon className="w-4 h-4 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-100 font-medium text-sm mb-1">{alarm.message}</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span className="text-xs text-gray-400">{alarm.time}</span>
                        <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-bold flex-shrink-0 ${
                          alarm.severity === 'major' 
                            ? 'bg-red-600 text-white' 
                            : 'bg-yellow-600 text-white'
                        }`}>
                          {alarm.severity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-2xl p-8 shadow-xl border border-gray-500">
            <h2 className="text-2xl font-bold mb-6 text-gray-100">Emergency Protocols</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-gray-600 border border-gray-500">
                <h3 className="font-semibold text-lg mb-2 text-gray-100">Escape Protocol Steps</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Stay calm and assess the situation</li>
                  <li>• Follow the nearest escape route marked on map</li>
                  <li>• Move to designated assembly points</li>
                  <li>• Call emergency services immediately</li>
                  <li>• Help others if safe to do so</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-xl bg-gray-600 border border-gray-500">
                <h3 className="font-semibold text-lg mb-2 text-gray-100">Emergency Numbers</h3>
                <ul className="space-y-2 text-gray-300">
                  {emergencyNumbers.map((contact, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <contact.icon className="w-4 h-4" />
                      <span>{contact.name}: {contact.number}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {locationUpdated && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-emerald-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 border-2 border-emerald-400">
            <div className="bg-white rounded-full p-1">
              <Check className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="font-bold text-lg">Location Updated!</p>
              <p className="text-sm text-emerald-100">
                Tunnel {escapeProtocolView.tunnel} | Zone {escapeProtocolView.zone} | Depth {escapeProtocolView.depth}
              </p>
            </div>
          </div>
        </div>
      )}

      {showLocationPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-700 p-6 rounded-2xl shadow-2xl border border-gray-500 max-w-sm mx-4 animate-pulse">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-100">Location Shared!</h3>
              <p className="text-gray-300">Your location has been shared with authorities</p>
            </div>
          </div>
        </div>
      )}

      <div className={`fixed right-0 top-0 h-full w-96 transform transition-transform duration-300 z-40 ${
        showChatPanel ? 'translate-x-0' : 'translate-x-full'
      } bg-gray-700 border-l border-gray-500 shadow-2xl`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-500">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-100">Emergency Chat</h3>
              <button
                onClick={() => setShowChatPanel(false)}
                className="p-2 rounded-full hover:bg-gray-600 text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-600 text-white'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs mt-1 opacity-70">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-500">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type emergency message..."
                className="flex-1 p-2 rounded-lg border bg-gray-600 border-gray-500 text-white placeholder-gray-400"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;