import React, { useState, useRef, useEffect, JSX } from 'react';
import { Send, Pin, AlertTriangle, Bell, Filter, Paperclip, Image, Mic, Video, Users, MessageCircle, Activity, Download, FileText, Radio } from 'lucide-react';

const Connect = () => {
  const [messageInput, setMessageInput] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<number | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'chat',
      sender: 'Control Head',
      role: 'control',
      message: 'Good morning team. Please report any unusual observations immediately.',
      timestamp: 'Oct 5, 2025 08:00 AM',
      isPinned: false
    },
    {
      id: 2,
      type: 'alert',
      sender: 'AI System',
      role: 'system',
      message: 'ALERT: High water content detected in Tunnel 3, Zone D. Immediate attention required.',
      timestamp: 'Oct 5, 2025 10:25 AM',
      isPinned: true,
      severity: 'critical',
      attachments: ['tunnel3-water.jpg']
    },
    {
      id: 3,
      type: 'chat',
      sender: 'Overman 2',
      role: 'overman',
      message: 'Confirmed. Water level rising in Zone D. Drainage pumps activated.',
      timestamp: 'Oct 5, 2025 10:28 AM',
      isPinned: false
    },
    {
      id: 4,
      type: 'issue',
      sender: 'Overman 3',
      role: 'overman',
      title: 'Tunnel 2 - Temperature Sensor Malfunction',
      message: 'Sensor showing intermittent readings. Needs calibration.',
      timestamp: 'Oct 5, 2025 11:40 AM',
      status: 'Open',
      comments: 2,
      isPinned: false
    },
    {
      id: 5,
      type: 'chat',
      sender: 'Control Head',
      role: 'control',
      message: '@Overman3 Maintenance team dispatched. ETA 30 minutes.',
      timestamp: 'Oct 5, 2025 11:45 AM',
      isPinned: false
    },
    {
      id: 6,
      type: 'alert',
      sender: 'IoT Device #A42',
      role: 'iot',
      message: 'WARNING: Pore pressure spike detected in Tunnel 1, Zone B.',
      timestamp: 'Oct 5, 2025 12:15 PM',
      isPinned: true,
      severity: 'warning',
      attachments: []
    },
    {
      id: 7,
      type: 'chat',
      sender: 'Overman 5',
      role: 'overman',
      message: 'Inspecting now. Minor equipment vibration noted earlier.',
      timestamp: 'Oct 5, 2025 12:18 PM',
      isPinned: false
    },
    {
      id: 8,
      type: 'issue',
      sender: 'Overman 1',
      role: 'overman',
      title: 'Tunnel 4 - Ventilation System Check Required',
      message: 'Air flow seems reduced in Zone C. Requesting inspection.',
      timestamp: 'Oct 5, 2025 01:30 PM',
      status: 'In Review',
      comments: 5,
      isPinned: false,
      attachments: ['ventilation-reading.png']
    },
    {
      id: 9,
      type: 'chat',
      sender: 'Overman 4',
      role: 'overman',
      message: 'All clear in my section. Routine patrol completed.',
      timestamp: 'Oct 5, 2025 02:00 PM',
      isPinned: false
    },
    {
      id: 10,
      type: 'chat',
      sender: 'Control Head',
      role: 'control',
      message: 'Great work everyone. Stay vigilant. Next briefing at 16:00.',
      timestamp: 'Oct 5, 2025 02:30 PM',
      isPinned: false
    }
  ]);

  const [showAttachment, setShowAttachment] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  interface DownloadReportTypeMap {
    ai: void;
    iot: void;
    human: void;
  }

  type ReportType = keyof DownloadReportTypeMap;

  const downloadCSV = (reportType: ReportType): void => {
    let csvContent = '';
    let filename = '';
    
    if (reportType === 'ai') {
      csvContent = 'Timestamp,Alert Type,Message,Severity,Status\n';
      csvContent += '2025-01-15 10:25,Water Detection,High water content detected in Tunnel 3 Zone D,Critical,Active\n';
      csvContent += '2025-01-14 14:30,Displacement Warning,Unusual ground movement in Tunnel 2 Zone A,High,Resolved\n';
      csvContent += '2025-01-13 09:15,Stress Alert,Elevated stress levels in Tunnel 1 Zone C,Medium,Resolved\n';
      filename = 'ai_alerts_history.csv';
    } else if (reportType === 'iot') {
      csvContent = 'Timestamp,Device ID,Sensor Type,Location,Reading,Alert Level\n';
      csvContent += '2025-01-15 12:15,A42,Pore Pressure,Tunnel 1 Zone B,2.8 kPa,Warning\n';
      csvContent += '2025-01-14 16:20,B23,Vibration,Tunnel 4 Zone D,5.2 Hz,Normal\n';
      csvContent += '2025-01-13 11:05,C31,Temperature,Tunnel 2 Zone A,32°C,Caution\n';
      filename = 'iot_sensor_history.csv';
    } else if (reportType === 'human') {
      csvContent = 'Timestamp,Reporter,Tunnel,Zone,Issue Type,Description,Status\n';
      csvContent += '2025-01-15 11:40,Overman 3,Tunnel 2,Zone A,Sensor Fault,Temperature sensor malfunction,Open\n';
      csvContent += '2025-01-15 13:30,Overman 1,Tunnel 4,Zone C,Ventilation,Reduced air flow detected,In Review\n';
      csvContent += '2025-01-14 10:00,Overman 5,Tunnel 1,Zone B,Equipment,Minor vibration in conveyor,Resolved\n';
      filename = 'human_reports_history.csv';
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedFiles(prev => [...prev, ...files]);
  };

  interface RemoveFileFn {
    (index: number): void;
  }

  const removeFile: RemoveFileFn = (index) => {
    setSelectedFiles((prev: File[]) => prev.filter((_, i) => i !== index));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], `audio-${Date.now()}.wav`, { type: 'audio/wav' });
        setSelectedFiles(prev => [...prev, audioFile]);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current !== null) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  interface FormatRecordingTime {
    (seconds: number): string;
  }

  const formatRecordingTime: FormatRecordingTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  interface FileWithType extends File {
    type: string;
    name: string;
  }

  interface FileIconProps {
    file: FileWithType;
  }

  const getFileIcon = (file: FileWithType): JSX.Element => {
    if (file.type.startsWith('image/')) return <Image className="w-4 h-4 text-blue-400" />;
    if (file.type.startsWith('audio/')) return <Mic className="w-4 h-4 text-green-400" />;
    if (file.type.startsWith('video/')) return <Video className="w-4 h-4 text-purple-400" />;
    return <Paperclip className="w-4 h-4 text-gray-400" />;
  };

  // Define message types above the component or near other type definitions
  interface ChatMessage {
    id: number;
    type: 'chat';
    sender: string;
    role: string;
    message: string;
    timestamp: string;
    isPinned: boolean;
    attachments?: {
      name: string;
      type: string;
      url: string;
    }[];
  }

  interface AlertMessage {
    id: number;
    type: 'alert';
    sender: string;
    role: string;
    message: string;
    timestamp: string;
    isPinned: boolean;
    severity: 'critical' | 'warning';
    attachments?: string[] | { name: string; type: string; url: string }[];
  }

  interface IssueMessage {
    id: number;
    type: 'issue';
    sender: string;
    role: string;
    title: string;
    message: string;
    timestamp: string;
    status: string;
    comments: number;
    isPinned: boolean;
    attachments?: string[] | { name: string; type: string; url: string }[];
  }

  type Message = ChatMessage | AlertMessage | IssueMessage;
  
    const handleSendMessage = () => {
      if (!messageInput.trim() && selectedFiles.length === 0) return;
  
      const newMessage: ChatMessage = {
        id: Date.now(),
        type: 'chat',
        sender: 'Overman 6',
        role: 'overman',
        message: messageInput,
        timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isPinned: false,
        attachments: selectedFiles.map(file => ({
          name: file.name,
          type: file.type,
          url: URL.createObjectURL(file)
        }))
      };
  
      setMessages(prev => [...prev, newMessage]);
      setMessageInput('');
      setSelectedFiles([]);
    };

  interface SenderRoleColorMap {
    [key: string]: string;
    control: string;
    overman: string;
    system: string;
    iot: string;
  }

  const getSenderColor = (role: keyof SenderRoleColorMap | string): string => {
    switch (role) {
      case 'control':
        return 'bg-blue-600';
      case 'overman':
        return 'bg-emerald-600';
      case 'system':
        return 'bg-red-600';
      case 'iot':
        return 'bg-orange-600';
      default:
        return 'bg-gray-600';
    }
  };

  interface SenderRole {
    control: string;
    overman: string;
    system: string;
    iot: string;
    [key: string]: string;
  }

  interface SenderIconProps {
    role: keyof SenderRole | string;
  }

  const getSenderIcon = (role: keyof SenderRole | string): JSX.Element => {
    switch (role) {
      case 'control':
        return <Users className="w-4 h-4" />;
      case 'overman':
        return <MessageCircle className="w-4 h-4" />;
      case 'system':
        return <AlertTriangle className="w-4 h-4" />;
      case 'iot':
        return <Activity className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  interface StatusColorMap {
    [key: string]: string;
    Open: string;
    'In Review': string;
    Resolved: string;
  }

  type StatusType = keyof StatusColorMap | string;

  const getStatusColor = (status: StatusType): string => {
    switch (status) {
      case 'Open':
        return 'bg-red-500';
      case 'In Review':
        return 'bg-yellow-500';
      case 'Resolved':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const pinnedMessages = messages.filter(msg => msg.isPinned);

  return (
    <div className="min-h-screen bg-gray-600 flex flex-col overflow-auto">
      
      {/* Header */}
      <div className="bg-gray-700 border-b border-gray-500 shadow-lg p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-100 mb-1 flex items-center gap-2">
                <MessageCircle className="w-8 h-8 text-emerald-400" />
                Community Connections
              </h1>
              <p className="text-gray-300">Real-time communication hub for safety monitoring</p>
            </div>
            <div className="relative group">
              <button className="p-2 bg-gray-600 hover:bg-emerald-600 rounded-lg text-gray-300 hover:text-white transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                <span className="text-sm font-semibold">Export</span>
              </button>
              <div className="absolute right-0 top-full mt-2 bg-gray-700 rounded-lg shadow-xl border border-gray-500 p-2 hidden group-hover:block w-56 z-50">
                <button onClick={() => downloadCSV('ai')} className="w-full text-left px-3 py-2 hover:bg-gray-600 rounded-lg text-gray-200 transition-all flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>AI Alerts History</span>
                </button>
                <button onClick={() => downloadCSV('iot')} className="w-full text-left px-3 py-2 hover:bg-gray-600 rounded-lg text-gray-200 transition-all flex items-center gap-2">
                  <Radio className="w-4 h-4 text-orange-400" />
                  <span>IoT Sensor Data</span>
                </button>
                <button onClick={() => downloadCSV('human')} className="w-full text-left px-3 py-2 hover:bg-gray-600 rounded-lg text-gray-200 transition-all flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>Human Reports</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pinned Alerts Section */}
      {pinnedMessages.length > 0 && (
        <div className="bg-gray-700 border-b border-gray-500 shadow-lg">
          <div className="max-w-7xl mx-auto p-4">
            <div className="flex items-center gap-2 mb-3">
              <Pin className="w-5 h-5 text-yellow-400" />
              <h2 className="text-lg font-bold text-gray-100">Pinned Critical Alerts</h2>
            </div>
            <div className="space-y-2">
              {pinnedMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-lg border-2 ${
                    msg.type === 'alert' && msg.severity === 'critical' 
                      ? 'bg-red-900 bg-opacity-30 border-red-500' 
                      : 'bg-yellow-900 bg-opacity-30 border-yellow-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`w-6 h-6 flex-shrink-0 ${
                      msg.type === 'alert' && msg.severity === 'critical' ? 'text-red-400' : 'text-yellow-400'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-100">{msg.sender}</span>
                        <span className="text-xs text-gray-400">{msg.timestamp}</span>
                      </div>
                      <p className="text-gray-100 font-semibold">{msg.message}</p>
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-2 flex items-center gap-2">
                          <Image className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-blue-400">{msg.attachments.length} attachment(s)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}



      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gray-600">
        <div className="max-w-7xl mx-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className="w-full">
              
              {/* Chat Message */}
              {msg.type === 'chat' && (
                <div className={`flex ${msg.role === 'control' ? 'justify-start' : 'justify-start'}`}>
                  <div className={`max-w-2xl ${msg.role === 'control' ? 'ml-0' : 'ml-0'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`${getSenderColor(msg.role)} p-1.5 rounded-full text-white`}>
                        {getSenderIcon(msg.role)}
                      </div>
                      <span className="font-semibold text-gray-200 text-sm">{msg.sender}</span>
                      <span className="text-xs text-gray-400">{msg.timestamp}</span>
                    </div>
                    <div className={`${getSenderColor(msg.role)} text-white p-4 rounded-2xl shadow-lg`}>
                      <p className="text-base">{msg.message}</p>
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {msg.attachments.map((attachment, idx) => (
                            <div key={idx}>
                              {attachment.type?.startsWith('image/') ? (
                                <img 
                                  src={typeof attachment === 'string' ? attachment : attachment.url} 
                                  alt="Attachment" 
                                  className="rounded-lg max-w-xs cursor-pointer hover:opacity-90"
                                  onClick={() => {
                                    const url = typeof attachment === 'string'
                                      ? attachment
                                      : (attachment.url ?? '');
                                    if (url) window.open(url, '_blank');
                                  }}
                                />
                              ) : attachment.type?.startsWith('audio/') ? (
                                <div className="bg-white bg-opacity-20 rounded-lg p-2">
                                  <audio controls className="w-full">
                                    <source src={attachment.url} type={attachment.type} />
                                  </audio>
                                </div>
                              ) : (
                                <div className="bg-white bg-opacity-20 rounded-lg p-2 flex items-center gap-2">
                                  <Paperclip className="w-4 h-4" />
                                  <span className="text-sm">
                                    {typeof attachment === 'string'
                                      ? attachment
                                      : attachment.name}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Issue/Report Card */}
              {msg.type === 'issue' && (
                <div className="bg-gray-700 rounded-lg p-5 border border-gray-500 shadow-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-yellow-400" />
                      <h3 className="font-bold text-gray-100 text-lg">{msg.title}</h3>
                    </div>
                    <span className={`${getStatusColor(msg.status)} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                      {msg.status}
                    </span>
                  </div>
                  <p className="text-gray-200 mb-3">{msg.message}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-gray-400">
                      <span>By {msg.sender}</span>
                      <span>{msg.timestamp}</span>
                      {msg.comments > 0 && (
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {msg.comments} comments
                        </span>
                      )}
                    </div>
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="flex items-center gap-2 text-blue-400">
                        <Paperclip className="w-4 h-4" />
                        <span>{msg.attachments.length} file(s)</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Alert Message */}
              {msg.type === 'alert' && !msg.isPinned && (
                <div className={`p-4 rounded-lg border-2 ${
                  msg.severity === 'critical' 
                    ? 'bg-red-900 bg-opacity-20 border-red-500' 
                    : 'bg-yellow-900 bg-opacity-20 border-yellow-500'
                }`}>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`w-6 h-6 flex-shrink-0 ${
                      msg.severity === 'critical' ? 'text-red-400' : 'text-yellow-400'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-100">{msg.sender}</span>
                        <span className="text-xs text-gray-400">{msg.timestamp}</span>
                      </div>
                      <p className="text-gray-100 font-semibold">{msg.message}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-gray-700 border-t border-gray-500 shadow-lg">
        <div className="max-w-7xl mx-auto p-4">
          
          {/* File Previews */}
          {selectedFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative bg-gray-600 rounded-lg p-2 flex items-center gap-2 group">
                  {getFileIcon(file)}
                  <span className="text-sm text-gray-200 max-w-[150px] truncate">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="ml-2 text-red-400 hover:text-red-300"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-end gap-3">
            <div className="flex gap-2">
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="p-3 bg-gray-600 hover:bg-gray-550 rounded-lg text-gray-300 transition-all cursor-pointer"
              >
                <Paperclip className="w-5 h-5" />
              </label>
              
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
              <label
                htmlFor="image-upload"
                className="p-3 bg-gray-600 hover:bg-gray-550 rounded-lg text-gray-300 transition-all cursor-pointer"
              >
                <Image className="w-5 h-5" />
              </label>
              
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`p-3 rounded-lg transition-all ${
                  isRecording 
                    ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse' 
                    : 'bg-gray-600 hover:bg-gray-550 text-gray-300'
                }`}
              >
                <Mic className="w-5 h-5" />
              </button>
              {isRecording && (
                <div className="flex items-center px-3 bg-red-600 rounded-lg text-white text-sm font-mono">
                  {formatRecordingTime(recordingTime)}
                </div>
              )}
            </div>
            <div className="flex-1">
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type a message... (Use @ to mention someone)"
                rows={2}
                className="w-full px-4 py-3 bg-gray-600 border border-gray-500 text-gray-100 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-base"
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!messageInput.trim() && selectedFiles.length === 0}
              className="p-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">Press Enter to send, Shift+Enter for new line</p>
        </div>
      </div>
    </div>
  );
};

export default Connect;
