import React, { useState } from 'react';
import { Upload, MessageCircle, X, Send, MapPin, Layers, ArrowDown, FileImage, CheckCircle } from 'lucide-react';

const Escape = () => {
  const [selectedZone, setSelectedZone] = useState('A');
  const [selectedTunnel, setSelectedTunnel] = useState('1');
  const [selectedDepth, setSelectedDepth] = useState('1');
  const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | null>(null);
  const [notes, setNotes] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Overman 1', text: 'Zone A escape route has been updated with new markers.', timestamp: '09:15 AM', isAdmin: false },
    { id: 2, sender: 'Zonal Admin', text: 'Thank you. Please verify the ventilation shaft access.', timestamp: '09:20 AM', isAdmin: true },
    { id: 3, sender: 'Overman 2', text: 'Ventilation shaft access confirmed and clear.', timestamp: '09:25 AM', isAdmin: false },
    { id: 4, sender: 'Overman 3', text: 'Emergency lighting installed in Tunnel 2.', timestamp: '10:30 AM', isAdmin: false },
    { id: 5, sender: 'Zonal Admin', text: 'Good work team. Keep updating the routes regularly.', timestamp: '10:35 AM', isAdmin: true }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const zones = ['A', 'B', 'C', 'D', 'E', 'F'];
  const tunnels = ['1', '2', '3', '4', '5', '6'];
  const depths = ['1', '2', '3', '4', '5', '6'];

  interface Message {
    id: number;
    sender: string;
    text: string;
    timestamp: string;
    isAdmin: boolean;
  }

  interface ImageUploadEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleImageUpload = (e: ImageUploadEvent) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date();
      const timestamp = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'Zonal Admin',
        text: newMessage,
        timestamp: timestamp,
        isAdmin: true
      }]);
      setNewMessage('');
    }
  };

  const handleSaveRoute = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gray-600 p-6 relative">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-100 mb-8 tracking-tight">
          Escape Route Settings
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-2xl p-6 border border-gray-500">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-gray-200">Select Zone</h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {zones.map(zone => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                    selectedZone === zone
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-2 border-blue-400 shadow-lg'
                      : 'bg-gray-900 bg-opacity-50 text-gray-300 border border-gray-600 hover:border-gray-500'
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-2xl p-6 border border-gray-500">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-gray-200">Select Tunnel</h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {tunnels.map(tunnel => (
                <button
                  key={tunnel}
                  onClick={() => setSelectedTunnel(tunnel)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                    selectedTunnel === tunnel
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white border-2 border-purple-400 shadow-lg'
                      : 'bg-gray-900 bg-opacity-50 text-gray-300 border border-gray-600 hover:border-gray-500'
                  }`}
                >
                  {tunnel}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-2xl p-6 border border-gray-500">
            <div className="flex items-center gap-2 mb-4">
              <ArrowDown className="w-5 h-5 text-green-400" />
              <h2 className="text-lg font-semibold text-gray-200">Select Depth</h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {depths.map(depth => (
                <button
                  key={depth}
                  onClick={() => setSelectedDepth(depth)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                    selectedDepth === depth
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white border-2 border-green-400 shadow-lg'
                      : 'bg-gray-900 bg-opacity-50 text-gray-300 border border-gray-600 hover:border-gray-500'
                  }`}
                >
                  {depth}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-2xl p-6 border border-gray-500 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-200">Current Selection</h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold">
                Zone {selectedZone}
              </span>
              <span className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm font-semibold">
                Tunnel {selectedTunnel}
              </span>
              <span className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm font-semibold">
                Depth {selectedDepth}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-2xl p-6 border border-gray-500">
            <div className="flex items-center gap-2 mb-4">
              <FileImage className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-gray-200">Section Image Upload</h2>
            </div>
            
            {!uploadedImage ? (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-900 bg-opacity-50 hover:border-gray-500 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="mb-2 text-sm text-gray-300 font-semibold">Click to upload section image</p>
                  <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            ) : (
              <div className="relative">
                <img src={typeof uploadedImage === 'string' ? uploadedImage : undefined} alt="Uploaded section" className="w-full h-64 object-cover rounded-lg border border-gray-600" />
                <button
                  onClick={() => setUploadedImage(null)}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-2xl p-6 border border-gray-500">
            <h2 className="text-lg font-semibold text-gray-200 mb-4">Safety Notes & Instructions</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter safety instructions, escape route updates, or any important notes for this section..."
              className="w-full h-64 p-4 bg-gray-900 bg-opacity-50 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500 resize-none"
            />
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-2xl p-6 border border-gray-500">
          <button 
            onClick={handleSaveRoute}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-lg shadow-lg transition-all text-lg border border-blue-500"
          >
            Save Escape Route Settings
          </button>
        </div>
      </div>

      {showToast && (
        <div className="fixed top-8 right-8 bg-gradient-to-br from-green-700 to-green-800 border-2 border-green-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-slide-in flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-300" />
          <div>
            <p className="font-bold text-lg">Escape Route Saved!</p>
            <p className="text-sm text-green-200">Zone {selectedZone}, Tunnel {selectedTunnel}, Depth {selectedDepth}</p>
          </div>
        </div>
      )}

      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-full shadow-2xl transition-all z-50 border-2 border-purple-400"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-gradient-to-br from-gray-800 to-gray-900 border-l-2 border-gray-500 shadow-2xl transform transition-transform duration-300 z-50 ${
        chatOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b-2 border-gray-600 bg-gradient-to-r from-gray-700 to-gray-800">
            <div>
              <h2 className="text-xl font-bold text-gray-100">Chat with Overman</h2>
              <p className="text-xs text-gray-400">Team Communication</p>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="p-2 hover:bg-gray-600 rounded-lg transition-all border border-gray-600"
            >
              <X className="w-5 h-5 text-gray-300" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-gray-800">
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.isAdmin ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs ${message.isAdmin ? 'bg-gradient-to-br from-blue-600 to-blue-700 border border-blue-500' : 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600'} rounded-lg p-3 shadow-xl`}>
                  <p className="text-xs font-semibold ${message.isAdmin ? 'text-blue-200' : 'text-gray-400'} mb-1">{message.sender}</p>
                  <p className="text-sm text-gray-100">{message.text}</p>
                  <p className="text-xs ${message.isAdmin ? 'text-blue-300' : 'text-gray-500'} mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t-2 border-gray-600 bg-gradient-to-r from-gray-800 to-gray-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-all border border-blue-500 shadow-lg"
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

export default Escape;