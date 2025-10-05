import React, { useState, useRef } from 'react';
import { Image, Mic, FileText, Upload, Search, Filter, Camera, MicOff, Trash2 } from 'lucide-react';

const Report = () => {
  type FormData = {
    tunnelNumber: string;
    zone: string;
    issueType: string;
    description: string;
    images: File[];
    audio: File | null;
    overmanNumber: string;
  };

  const [formData, setFormData] = useState<FormData>({
    tunnelNumber: '',
    zone: '',
    issueType: '',
    description: '',
    images: [],
    audio: null,
    overmanNumber: ''
  });

  type ReportData = {
    id: number;
    tunnelNumber: string;
    zone: string;
    issueType: string;
    description: string;
    images: File[];
    audio: File | null;
    timestamp: string;
    status: string;
    reportedBy: string;
  };
  
  const [reports, setReports] = useState<ReportData[]>([
    {
      id: 1,
      tunnelNumber: 'Tunnel 3',
      zone: 'Zone D',
      issueType: 'Water Accumulation',
      description: 'High water content detected in Zone D. Water level has risen significantly, posing potential safety risks. Immediate drainage action recommended.',
      images: [],
      audio: null,
      timestamp: 'Today at 10:25 AM',
      status: 'Approved - Uploading to Community',
      reportedBy: 'Overman 2'
    },
    {
      id: 2,
      tunnelNumber: 'Tunnel 1',
      zone: 'Zone B',
      issueType: 'Equipment Issue',
      description: 'Minor vibration detected in conveyor belt system. Equipment is functional but requires monitoring.',
      images: [],
      audio: null,
      timestamp: 'Today at 09:15 AM',
      status: 'Not Approved - Minor Issue',
      reportedBy: 'Overman 5'
    },
    {
      id: 3,
      tunnelNumber: 'Tunnel 2',
      zone: 'Zone A',
      issueType: 'Sensor Fault',
      description: 'Temperature sensor showing intermittent readings. Requires calibration check.',
      images: [],
      audio: null,
      timestamp: 'Today at 11:40 AM',
      status: 'Pending Review',
      reportedBy: 'Overman 3'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterIssue, setFilterIssue] = useState('All');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showTunnel3Image, setShowTunnel3Image] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const issueTypes = ['Sensor Fault', 'Crack', 'Gas Leak', 'Equipment Issue', 'Water Accumulation', 'Others'];
  const tunnelNumbers = ['Tunnel 1', 'Tunnel 2', 'Tunnel 3', 'Tunnel 4', 'Tunnel 5'];
  const zones = ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'];

  interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {}

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  interface ImageUploadEvent extends React.ChangeEvent<HTMLInputElement> {}

  interface HandleImageUploadFn {
    (e: ImageUploadEvent): void;
  }

  const handleImageUpload: HandleImageUploadFn = (e) => {
    const files = Array.from(e.target.files ?? []) as File[];
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  interface AudioUploadEvent extends React.ChangeEvent<HTMLInputElement> {}

  interface HandleAudioUploadFn {
    (e: AudioUploadEvent): void;
  }

  const handleAudioUpload: HandleAudioUploadFn = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, audio: file }));
    }
  };

  interface RemoveImageFn {
    (index: number): void;
  }

  const removeImage: RemoveImageFn = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
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
        const audioFile = new File([audioBlob], 'recorded-audio.wav', { type: 'audio/wav' });
        setFormData(prev => ({ ...prev, audio: audioFile }));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
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
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  interface FormatRecordingTimeFn {
    (seconds: number): string;
  }

  const formatRecordingTime: FormatRecordingTimeFn = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    if (!formData.tunnelNumber || !formData.zone || !formData.issueType || !formData.description || !formData.overmanNumber) {
      alert('Please fill in all required fields');
      return;
    }

    const newReport = {
      id: Date.now(),
      ...formData,
      reportedBy: `Overman ${formData.overmanNumber}`,
      timestamp: new Date().toLocaleString(),
      status: 'Pending Review'
    };

    setReports(prev => [newReport, ...prev]);
    setFormData({
      tunnelNumber: '',
      zone: '',
      issueType: '',
      description: '',
      images: [],
      audio: null,
      overmanNumber: ''
    });
  };

  interface GetStatusColorFn {
    (status: string): string;
  }

  const getStatusColor: GetStatusColorFn = (status) => {
    if (status.includes('Approved')) return 'bg-green-500';
    if (status.includes('Not Approved')) return 'bg-red-500';
    if (status.includes('Pending')) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  interface GetStatusIconFn {
    (status: string): string;
  }

  const getStatusIcon: GetStatusIconFn = (status) => {
    if (status.includes('Approved')) return '✓';
    if (status.includes('Not Approved')) return '✕';
    if (status.includes('Pending')) return '⏳';
    return '•';
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.tunnelNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterIssue === 'All' || report.issueType === filterIssue;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-600 p-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-2">Issue Report Submission</h1>
          <p className="text-gray-300 text-lg">Submit tunnel inspection reports with multimedia evidence</p>
        </div>

        <div className="bg-gray-700 rounded-xl shadow-2xl p-8 mb-8 border border-gray-500">
          <h2 className="text-2xl font-bold text-gray-100 mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-400" />
            New Report
          </h2>

          <div className="space-y-6">
            
            <div>
              <label className="block text-gray-200 text-sm font-semibold mb-3">
                Overman Number *
              </label>
              <div className="grid grid-cols-6 gap-3">
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, overmanNumber: num.toString() }))}
                    className={`py-3 px-4 rounded-lg text-lg font-bold transition-all ${
                      formData.overmanNumber === num.toString()
                        ? 'bg-emerald-600 text-white border-2 border-emerald-400'
                        : 'bg-gray-600 text-gray-200 border-2 border-gray-500 hover:border-emerald-500'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-200 text-sm font-semibold mb-2">
                  Tunnel Number *
                </label>
                <select
                  name="tunnelNumber"
                  value={formData.tunnelNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-600 border border-gray-500 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg"
                >
                  <option value="">Select Tunnel</option>
                  {tunnelNumbers.map(tunnel => (
                    <option key={tunnel} value={tunnel}>{tunnel}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-200 text-sm font-semibold mb-2">
                  Zone *
                </label>
                <select
                  name="zone"
                  value={formData.zone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-600 border border-gray-500 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg"
                >
                  <option value="">Select Zone</option>
                  {zones.map(zone => (
                    <option key={zone} value={zone}>{zone}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-200 text-sm font-semibold mb-2">
                Issue Type *
              </label>
              <select
                name="issueType"
                value={formData.issueType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-600 border border-gray-500 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg"
              >
                <option value="">Select Issue Type</option>
                {issueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-200 text-sm font-semibold mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 bg-gray-600 border border-gray-500 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg resize-none"
                placeholder="Describe the issue in detail..."
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-200 text-sm font-semibold mb-2">
                Upload Images
              </label>
              <label className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-600 border-2 border-dashed border-gray-500 text-gray-300 rounded-lg cursor-pointer hover:border-emerald-500 transition-all">
                <Camera className="w-6 h-6" />
                <span className="text-lg">Choose Images</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-200 text-sm font-semibold mb-2">
                Audio Evidence
              </label>
              <div className="flex gap-4">
                <label className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-600 border-2 border-dashed border-gray-500 text-gray-300 rounded-lg cursor-pointer hover:border-emerald-500 transition-all">
                  <Upload className="w-6 h-6" />
                  <span className="text-lg">Upload Audio</span>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`flex items-center justify-center gap-2 px-6 py-4 rounded-lg text-lg font-semibold transition-all ${
                    isRecording 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-6 h-6" />
                      Stop ({formatRecordingTime(recordingTime)})
                    </>
                  ) : (
                    <>
                      <Mic className="w-6 h-6" />
                      Record
                    </>
                  )}
                </button>
              </div>

              {formData.audio && (
                <div className="mt-3 flex items-center gap-2 bg-gray-600 p-3 rounded-lg">
                  <Mic className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-200 text-sm">{formData.audio.name}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-lg transition-all text-xl shadow-lg"
            >
              Submit Report
            </button>
          </div>
        </div>

        <div className="bg-gray-700 rounded-xl shadow-2xl p-8 border border-gray-500">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Submitted Reports ({reports.length})</h2>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-600 border border-gray-500 text-gray-100 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterIssue}
                onChange={(e) => setFilterIssue(e.target.value)}
                className="pl-10 pr-8 py-3 bg-gray-600 border border-gray-500 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer text-lg"
              >
                <option value="All">All Issues</option>
                {issueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredReports.length > 0 ? (
              filteredReports.map(report => (
                <div key={report.id} className="bg-gray-600 rounded-lg p-6 border border-gray-500 hover:border-emerald-500 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-100 mb-2">
                        {report.tunnelNumber} | {report.zone}
                      </h3>
                      <p className="text-emerald-400 font-semibold text-lg">Issue: {report.issueType}</p>
                    </div>
                    <span className={`${getStatusColor(report.status)} text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2`}>
                      <span>{getStatusIcon(report.status)}</span>
                      {report.status}
                    </span>
                  </div>

                  <p className="text-gray-200 mb-4 text-lg">{report.description}</p>

                  <div className="mb-4">
                    <p className="text-gray-300 text-sm">
                      <span className="font-semibold">Reported by:</span> {report.reportedBy}
                    </p>
                  </div>

                  {report.tunnelNumber === 'Tunnel 3' && (
                    <div className="mb-4">
                      <button
                        type="button"
                        onMouseEnter={() => setShowTunnel3Image(true)}
                        onMouseLeave={() => setShowTunnel3Image(false)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                      >
                        <Image className="w-4 h-4" />
                        View Image
                      </button>
                      {showTunnel3Image && (
                        <div className="mt-3 border-2 border-blue-500 rounded-lg overflow-hidden">
                          <img 
                            src="/image/tunnel3.png" 
                            alt="Tunnel 3 Evidence" 
                            className="w-full h-auto"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {report.status.includes('Approved') && report.status.includes('Community') && (
                    <div className="bg-emerald-600 bg-opacity-20 border border-emerald-500 rounded-lg p-4 mb-4">
                      <p className="text-emerald-400 font-semibold text-sm flex items-center gap-2">
                        <span className="text-lg">🌐</span>
                        This critical report is being uploaded to the Community Connections page. All personnel should stay alert to this problem.
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-3">
                    {report.images.length > 0 && (
                      <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg">
                        <Image className="w-5 h-5 text-blue-400" />
                        <span className="text-gray-200 text-sm">{report.images.length} Image(s)</span>
                      </div>
                    )}
                    {report.audio && (
                      <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg">
                        <Mic className="w-5 h-5 text-green-400" />
                        <span className="text-gray-200 text-sm">Audio Attached</span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-400 text-sm">Submitted: {report.timestamp}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No reports found.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Report;