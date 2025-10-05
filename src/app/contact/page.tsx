import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-600">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-gray-100 mb-4">Contact Us</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
          <div>
            <div className="flex items-start gap-4 mb-8">
              <MapPin className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-200 mb-3">Address</h3>
                <p className="text-gray-400 leading-relaxed">
                  Assam Engineering College<br />
                  Hostel 4<br />
                  Guwahati, Assam<br />
                  India - 781013
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-start gap-4 mb-8">
              <Phone className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-200 mb-3">Phone</h3>
                <p className="text-gray-400 mb-2">
                  <a href="tel:+919876543210" className="hover:text-blue-400 transition-colors">
                    +91 98765 43210
                  </a>
                </p>
                <p className="text-gray-400">
                  <a href="tel:+919123456780" className="hover:text-blue-400 transition-colors">
                    +91 91234 56780
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-200 mb-3">Email</h3>
                <p className="text-gray-400 mb-2">
                  <a href="mailto:info@rhinore.com" className="hover:text-blue-400 transition-colors">
                    info@rhinore.com
                  </a>
                </p>
                <p className="text-gray-400">
                  <a href="mailto:support@rhinore.com" className="hover:text-blue-400 transition-colors">
                    support@rhinore.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-200 mb-3">Business Hours</h3>
                <p className="text-gray-400 mb-2">Monday - Friday</p>
                <p className="text-gray-300 mb-4">9:00 AM - 6:00 PM</p>
                <p className="text-gray-400 mb-2">Saturday</p>
                <p className="text-gray-300 mb-4">10:00 AM - 4:00 PM</p>
                <p className="text-gray-400 mb-2">Sunday</p>
                <p className="text-gray-300">Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-16 mb-20">
          <h2 className="text-3xl font-bold text-gray-100 mb-8">Send us a message</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="How can we help you?"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              rows={6}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors inline-flex items-center gap-2">
            <Send className="w-5 h-5" />
            Send Message
          </button>
        </div>

        <div className="border-t border-gray-700 pt-16">
          <h2 className="text-3xl font-bold text-gray-100 mb-8">Location</h2>
          <div className="bg-gray-700 border border-gray-600 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.634479822937!2d91.69729207549493!3d26.15173997710589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5f57e51f8673%3A0x6c5e2e5e0e5e0e5e!2sAssam%20Engineering%20College!5e0!3m2!1sen!2sin!4v1709876543210!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Rhinore Security Systems. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
