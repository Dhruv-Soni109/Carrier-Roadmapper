import React from 'react';
import { RoadmapProvider, useRoadmap } from './context/RoadmapContext';
import { Navbar } from './components/common/Navbar';
import { LandingPage } from './pages/LandingPage';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { RoadmapModal } from './components/generator/RoadmapModal';
import { ExportModal } from './components/export/ExportModal';
import { ToastContainer } from './components/common/Toast';
import { ErrorBoundary } from './components/common/ErrorBoundary';

const AppContent = () => {
  const { viewMode } = useRoadmap();

  return (
    <div className="min-h-screen flex flex-col bg-[#080c16] text-slate-100 transition-colors duration-300 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />

      {/* Main Top Navbar */}
      <Navbar />

      {/* Primary View Coordinator */}
      <div className="relative z-10 flex-1 flex flex-col">
        {viewMode === 'landing' ? <LandingPage /> : <DashboardLayout />}
      </div>

      {/* Global Modals & Notifications */}
      <RoadmapModal />
      <ExportModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <RoadmapProvider>
        <AppContent />
      </RoadmapProvider>
    </ErrorBoundary>
  );
}
