import React, { useState } from 'react';
import { Layout } from 'antd';
import TopNavBar from './components/TopNavBar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { mockPatients } from './data/mockData';

const { Content } = Layout;

const App = () => {
  const [selectedPatientId, setSelectedPatientId] = useState('1');
  const [currentView, setCurrentView] = useState('dashboard');

  const selectedPatient = mockPatients.find(p => p.id === selectedPatientId);

  return (
    <div className="dashboard-layout">
      <TopNavBar />
      <div className="main-layout">
        <Sidebar
          patients={mockPatients}
          selectedPatientId={selectedPatientId}
          onPatientSelect={setSelectedPatientId}
          currentView={currentView}
          onViewChange={setCurrentView}
        />
        <Content className="content-area">
          <MainContent
            patient={selectedPatient}
            currentView={currentView}
          />
        </Content>
      </div>
    </div>
  );
};

export default App; 