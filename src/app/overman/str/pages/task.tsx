import React, { useState, useEffect } from 'react';
import { Search, Filter, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface TaskItem {
  id: number;
  task: string;
  zone: string;
  assignedTo: string;
  deadline: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

const Task = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 1, task: 'Gas Sensor Check', zone: 'A', assignedTo: 'Overman 1', deadline: '10:30 AM', status: 'Pending' },
    { id: 2, task: 'Roof Bolt Inspection', zone: 'B', assignedTo: 'Overman 2', deadline: '11:00 AM', status: 'In Progress' },
    { id: 3, task: 'Ventilation System Check', zone: 'C', assignedTo: 'Overman 3', deadline: '09:45 AM', status: 'Completed' },
    { id: 4, task: 'Emergency Exit Verification', zone: 'A', assignedTo: 'Overman 4', deadline: '10:15 AM', status: 'Pending' },
    { id: 5, task: 'Equipment Safety Audit', zone: 'D', assignedTo: 'Overman 5', deadline: '12:00 PM', status: 'Completed' },
    { id: 6, task: 'Ground Support Assessment', zone: 'B', assignedTo: 'Overman 6', deadline: '11:30 AM', status: 'In Progress' },
    { id: 7, task: 'Water Accumulation Check', zone: 'C', assignedTo: 'Overman 1', deadline: '10:00 AM', status: 'Pending' },
    { id: 8, task: 'Lighting System Inspection', zone: 'D', assignedTo: 'Overman 2', deadline: '01:00 PM', status: 'Completed' },
    { id: 9, task: 'Fire Extinguisher Status', zone: 'A', assignedTo: 'Overman 3', deadline: '02:00 PM', status: 'Pending' },
    { id: 10, task: 'Communication Equipment Test', zone: 'B', assignedTo: 'Overman 4', deadline: '11:45 AM', status: 'In Progress' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [currentTime, setCurrentTime] = useState({ hours: 14, minutes: 24, seconds: 10 });

  // Timer effect - updates every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(prevTime => {
        let { hours, minutes, seconds } = prevTime;
        seconds += 1;
        
        if (seconds >= 60) {
          seconds = 0;
          minutes += 1;
        }
        
        if (minutes >= 60) {
          minutes = 0;
          hours += 1;
        }
        
        if (hours >= 24) {
          hours = 0;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter and search tasks
  useEffect(() => {
    let result = tasks;

    // Apply status filter
    if (filterStatus !== 'All') {
      result = result.filter(task => task.status === filterStatus);
    }

    // Apply search
    if (searchQuery.trim()) {
      result = result.filter(task =>
        task.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTasks(result);
  }, [searchQuery, filterStatus, tasks]);

  // Calculate progress for each overman
  const getOvermanProgress = () => {
    const overmen = ['Overman 1', 'Overman 2', 'Overman 3', 'Overman 4', 'Overman 5', 'Overman 6'];
    return overmen.map(overman => {
      const overmanTasks = tasks.filter(t => t.assignedTo === overman);
      const completed = overmanTasks.filter(t => t.status === 'Completed').length;
      const total = overmanTasks.length;
      const percentage = total > 0 ? (completed / total) * 100 : 0;
      return { overman, completed, total, percentage };
    });
  };
  // Mark task as complete
  // (TaskItem interface moved above for type safety)
  // Mark task as complete
  interface TaskItem {
    id: number;
    task: string;
    zone: string;
    assignedTo: string;
    deadline: string;
    status: 'Pending' | 'In Progress' | 'Completed';
  }

  interface OvermanProgress {
    overman: string;
    completed: number;
    total: number;
    percentage: number;
  }

  interface Time {
    hours: number;
    minutes: number;
    seconds: number;
  }

  const markAsComplete = (taskId: number): void => {
    setTasks((prevTasks: TaskItem[]) =>
      prevTasks.map((task: TaskItem) =>
        task.id === taskId ? { ...task, status: 'Completed' } : task
      )
    );
  };

  // Get status badge color
  const getStatusColor = (status: TaskItem["status"]) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500';
      case 'In Progress':
        return 'bg-blue-500';
      case 'Completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: TaskItem["status"]) => {
    switch (status) {
      case 'Pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'In Progress':
        return <Clock className="w-4 h-4" />;
      case 'Completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Format time with leading zeros
  interface FormatTime {
    (value: number): string;
  }

  const formatTime: FormatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  // Summary counts
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;

  // Overman progress data
  const progressData = getOvermanProgress();

  return (
    <div className=" overflow-auto bg-gray-600">
      
      {/* Sticky Summary Bar */}
      <div className="sticky top-0 z-50 bg-gray-700 border-b border-gray-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-100">Tasks for the Day</h1>
              <p className="text-sm text-gray-300">Overman Inspection & Safety Management</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-100">{totalTasks}</p>
                <p className="text-xs text-gray-400">Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">{pendingTasks}</p>
                <p className="text-xs text-gray-400">Pending</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">{inProgressTasks}</p>
                <p className="text-xs text-gray-400">In Progress</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">{completedTasks}</p>
                <p className="text-xs text-gray-400">Completed</p>
              </div>
            </div>
          </div>
          
          {/* Timer at bottom left */}
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <div className="bg-gray-600 px-4 py-2 rounded-lg border border-gray-500">
              <span className="text-2xl font-mono font-bold text-emerald-400">
                {formatTime(currentTime.hours)}:{formatTime(currentTime.minutes)}:{formatTime(currentTime.seconds)}
              </span>
              <span className="text-xs text-gray-400 ml-2">24h Timer</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">

        {/* Overman Progress Bento Grid - All 6 in one compact grid */}
        <div className="bg-gray-700 rounded-lg shadow-xl p-4 border border-gray-500 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {progressData.map((data, idx) => (
              <div key={idx} className="bg-gray-600 rounded-lg p-3 border border-gray-500">
                <div className="mb-2">
                  <h3 className="text-xs font-semibold text-gray-100 mb-1">{data.overman}</h3>
                  <span className="text-xs text-gray-400">{data.completed}/{data.total}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${data.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400">{data.percentage.toFixed(0)}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-gray-700 rounded-lg shadow-xl p-4 mb-6 border border-gray-500">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by task, zone, or overman..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-600 border border-gray-500 text-gray-100 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 bg-gray-600 border border-gray-500 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
              >
                <option value="All">All Tasks</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-700 rounded-lg shadow-xl p-5 border border-gray-500 hover:shadow-2xl hover:border-emerald-500 transition-all duration-200 group relative"
              >
                {/* Task Header */}
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">{task.task}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-gray-600 text-gray-200 px-2 py-1 rounded text-xs font-medium">
                      Zone {task.zone}
                    </span>
                  </div>
                </div>

                {/* Task Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Deadline:</span>
                    <span className="font-medium text-gray-200">{task.deadline}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Assigned To:</span>
                    <span className="font-medium text-gray-200">{task.assignedTo}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <div className={`${getStatusColor(task.status)} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}>
                    {getStatusIcon(task.status)}
                    <span>{task.status}</span>
                  </div>
                </div>

                {/* Hover Action Button */}
                {task.status !== 'Completed' && (
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 rounded-lg transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => markAsComplete(task.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-lg transform scale-95 group-hover:scale-100 transition-transform duration-200 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Complete
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No tasks found matching your criteria.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Task;