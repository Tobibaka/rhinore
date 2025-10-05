import React from 'react';
import { Shield, Target, Users, Award, Activity, Zap, Database, MessageSquare, CheckCircle, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Senior Overman",
      company: "Coal India Ltd",
      text: "The IoT-based monitoring system has transformed our safety protocols. Real-time vibration and displacement data helps us make instant decisions.",
      avatar: "RK"
    },
    {
      name: "Priya Sharma",
      role: "Zonal Safety Admin",
      company: "NMDC Steel",
      text: "The approval workflow and escape route management features are exceptional. Communication between control heads and field teams is seamless.",
      avatar: "PS"
    },
    {
      name: "Amit Patel",
      role: "Control Head Engineer",
      company: "Tata Steel Mining",
      text: "Rhinore's analytics dashboard provides critical insights. The strain and pore pressure monitoring have prevented multiple potential incidents.",
      avatar: "AP"
    }
  ];

  const coreValues = [
    { icon: Shield, title: "Safety First", desc: "Prioritizing miner safety through advanced IoT monitoring" },
    { icon: Zap, title: "Real-Time Alerts", desc: "Instant notifications for threshold breaches and anomalies" },
    { icon: Database, title: "Data-Driven", desc: "Comprehensive analytics for informed decision-making" },
    { icon: MessageSquare, title: "Seamless Communication", desc: "Integrated chat between admins and field teams" }
  ];

  return (
    <div className="min-h-screen bg-gray-600">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        <div className="mb-20 text-center">
          <h1 className="text-6xl font-bold text-gray-100 mb-6">About Rhinore</h1>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-orange-500 to-red-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Advanced Mining Safety & Control Platform powered by IoT sensors and real-time data analytics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 auto-rows-auto">
          
          <div className="md:col-span-2 bg-gradient-to-br from-gray-700 to-gray-800 p-8 border-2 border-gray-500 row-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-blue-400" />
              <h2 className="text-3xl font-bold text-gray-100">Our Vision</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              To revolutionize mining safety through cutting-edge IoT technology, creating a zero-incident workplace where every miner returns home safely. We envision a future where predictive analytics and real-time monitoring eliminate workplace hazards before they occur.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Our platform integrates advanced sensors for vibration monitoring, ground displacement tracking, pore pressure analysis, and structural strain measurement across multiple zones, tunnels, and depth levels.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 border-2 border-blue-700">
            <Activity className="w-10 h-10 text-blue-300 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">IoT Sensors</h3>
            <p className="text-blue-200 text-sm">
              Real-time monitoring of vibration, displacement, pore pressure, and strain across 6 zones and 6 depth levels
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-900 to-green-800 p-6 border-2 border-green-700">
            <CheckCircle className="w-10 h-10 text-green-300 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Smart Approvals</h3>
            <p className="text-green-200 text-sm">
              Automated approval workflow with detailed reasoning and sensor data validation for informed decisions
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-6 border-2 border-purple-700">
            <TrendingUp className="w-10 h-10 text-purple-300 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Analytics Dashboard</h3>
            <p className="text-purple-200 text-sm">
              Comprehensive charts and graphs showing trends, anomalies, and predictive insights for proactive safety
            </p>
          </div>

          <div className="md:col-span-2 bg-gradient-to-br from-gray-700 to-gray-800 p-8 border-2 border-gray-500">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-purple-400" />
              <h2 className="text-3xl font-bold text-gray-100">What We Do</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <p className="text-gray-300">
                  <span className="font-semibold text-gray-100">IoT Monitoring:</span> Deploy vibration sensors, displacement meters, pore pressure gauges, and strain sensors across mining zones A-F, tunnels 1-6, and depths 1-6
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                <p className="text-gray-300">
                  <span className="font-semibold text-gray-100">Approval System:</span> Streamline safety approvals with detailed sensor readings, automated threshold checks, and clear approval/rejection workflows
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                <p className="text-gray-300">
                  <span className="font-semibold text-gray-100">Escape Route Management:</span> Digital escape route mapping with zone-specific image uploads, safety notes, and real-time chat between overmen and control heads
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                <p className="text-gray-300">
                  <span className="font-semibold text-gray-100">Analytics & Reports:</span> Generate comprehensive reports with vibration trends, displacement patterns, and anomaly detection for regulatory compliance
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900 to-orange-800 p-6 border-2 border-orange-700">
            <MessageSquare className="w-10 h-10 text-orange-300 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Team Chat</h3>
            <p className="text-orange-200 text-sm">
              Instant communication between zonal admins and overman teams for rapid response to safety concerns
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-100 mb-12 text-center">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 border-2 border-gray-500 hover:border-gray-400 transition-all">
                <value.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-100 mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-100 mb-4 text-center">System Architecture</h2>
          <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
            Our platform integrates multiple IoT sensors with real-time dashboards, approval workflows, and analytics engines
          </p>
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 border-2 border-gray-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-100 mb-2">Data Collection</h3>
                <p className="text-gray-400 text-sm">IoT sensors capture vibration, displacement, pore pressure, and strain data every 30 seconds</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-100 mb-2">Processing & Analysis</h3>
                <p className="text-gray-400 text-sm">AI algorithms analyze patterns, detect anomalies, and trigger alerts when thresholds are breached</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-100 mb-2">Visualization & Action</h3>
                <p className="text-gray-400 text-sm">Real-time dashboards display insights, enabling overmen and control heads to make instant decisions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-100 mb-12 text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 border-2 border-gray-500 hover:border-gray-400 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-100">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 border-2 border-gray-500 text-center">
          <h2 className="text-3xl font-bold text-gray-100 mb-4">Ready to Transform Mining Safety?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join leading mining companies using Rhinore to protect their workforce with cutting-edge IoT technology
          </p>
          <a 
            href="/login"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 via-orange-500 to-red-600 hover:from-purple-700 hover:via-orange-600 hover:to-red-700 text-white font-bold rounded-lg transition-all"
          >
            Get Started Today
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Rhinore Security Systems. Protecting lives through intelligent mining safety solutions.
          </p>
        </div>
      </div>
    </div>
  );
}
