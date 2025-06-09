import React from 'react';
import DashboardView from './DashboardView';
import ReportsView from './ReportsView';
import SettingsView from './SettingsView';
import { Empty } from 'antd';

const MainContent = ({ patient, currentView }) => {
  if (!patient) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%' 
      }}>
        <Empty description="请选择一个个案" />
      </div>
    );
  }

  switch (currentView) {
    case 'dashboard':
      return <DashboardView patient={patient} />;
    case 'reports':
      return <ReportsView patient={patient} />;
    case 'settings':
      return <SettingsView patient={patient} />;
    default:
      return <DashboardView patient={patient} />;
  }
};

export default MainContent; 