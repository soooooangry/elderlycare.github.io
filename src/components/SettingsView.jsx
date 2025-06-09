import React, { useState, useEffect } from 'react';
import { Tabs, Typography, Button, message, Card } from 'antd';
import { SaveOutlined, SettingOutlined } from '@ant-design/icons';
import AlertRuleSettings from './AlertRuleSettings';
import NotificationPreferences from './NotificationPreferences';
import DeviceManagement from './DeviceManagement';
import ProfileManagement from './ProfileManagement';

const { Title } = Typography;

const SettingsView = ({ patient }) => {
  const [activeTab, setActiveTab] = useState('alerts');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [loading, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    alertRules: {},
    notifications: {},
    devices: [],
    profile: {}
  });

  // 初始化表单数据
  useEffect(() => {
    if (patient) {
      loadPatientSettings(patient.id);
    }
  }, [patient]);

  const loadPatientSettings = async (patientId) => {
    // 模拟加载患者设置数据
    const defaultSettings = {
      alertRules: {
        vitals: {
          heartRate: {
            enabled: true,
            minThreshold: 60,
            maxThreshold: 120
          },
          bloodPressure: {
            enabled: true,
            systolicRange: [90, 140],
            diastolicRange: [60, 90]
          },
          oxygenSaturation: {
            enabled: true,
            minThreshold: 92
          }
        },
        activity: {
          inactivity: {
            enabled: true,
            duration: 120 // minutes
          },
          fall: {
            enabled: false
          }
        }
      },
      notifications: {
        emergency: {
          system: true,
          sms: true,
          push: true,
          call: true
        },
        moderate: {
          system: true,
          sms: true,
          push: false,
          call: false
        },
        low: {
          system: true,
          sms: false,
          push: false,
          call: false
        }
      },
      devices: [
        {
          id: '1',
          name: '华为智能手表 GT 3',
          type: 'smartwatch',
          status: 'connected',
          battery: 85
        },
        {
          id: '2',
          name: '欧姆龙血压计',
          type: 'bloodpressure',
          status: 'connected',
          battery: null
        }
      ],
      profile: {
        basicInfo: {
          name: patient.name,
          age: patient.age,
          gender: patient.gender,
          height: patient.height,
          weight: patient.weight
        },
        healthProfile: {
          chronicDiseases: patient.conditions || [],
          allergies: '无已知过敏史'
        },
        emergencyContacts: [
          {
            name: patient.emergencyContact.name,
            relationship: '子女',
            phone: patient.emergencyContact.phone
          }
        ]
      }
    };

    setFormData(defaultSettings);
  };

  const handleFormChange = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    
    try {
      // 模拟保存到服务器
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success('设置已保存成功！');
      setHasUnsavedChanges(false);
    } catch (error) {
      message.error('保存失败，请重试');
    } finally {
      setSaving(false);
    }
  };

  // 页面离开前的确认
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '您有未保存的更改，确定要离开吗？';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const tabItems = [
    {
      key: 'alerts',
      label: '警报规则',
      children: (
        <AlertRuleSettings
          data={formData.alertRules}
          onChange={(data) => handleFormChange('alertRules', data)}
        />
      )
    },
    {
      key: 'notifications',
      label: '通知偏好',
      children: (
        <NotificationPreferences
          data={formData.notifications}
          onChange={(data) => handleFormChange('notifications', data)}
        />
      )
    },
    {
      key: 'devices',
      label: '设备管理',
      children: (
        <DeviceManagement
          data={formData.devices}
          onChange={(data) => handleFormChange('devices', data)}
        />
      )
    },
    {
      key: 'profile',
      label: '个案信息',
      children: (
        <ProfileManagement
          data={formData.profile}
          onChange={(data) => handleFormChange('profile', data)}
        />
      )
    }
  ];

  return (
    <div className="settings-view" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 页面标题 */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={1} style={{ margin: 0, color: '#1890ff' }}>
          <SettingOutlined style={{ marginRight: '12px' }} />
          设置 - {patient.name}
        </Title>
      </Card>

      {/* 标签页内容 */}
      <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          size="large"
          style={{ flex: 1 }}
          tabBarStyle={{ marginBottom: '24px' }}
        />
      </Card>

      {/* 统一操作区域 */}
      <div style={{ 
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000
      }}>
        <Button
          type="primary"
          size="large"
          icon={<SaveOutlined />}
          onClick={handleSaveChanges}
          loading={loading}
          disabled={!hasUnsavedChanges}
          style={{
            boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
            height: '48px',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          保存更改
          {hasUnsavedChanges && <span style={{ color: '#faad14', marginLeft: '4px' }}>*</span>}
        </Button>
      </div>
    </div>
  );
};

export default SettingsView; 