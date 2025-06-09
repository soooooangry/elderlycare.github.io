import React, { useState } from 'react';
import { Row, Col, Card, Avatar, Tag, Button, Alert, Typography, Progress, Input, List, Statistic } from 'antd';
import { 
  UserOutlined, 
  HeartOutlined, 
  TrophyOutlined,
  MedicineBoxOutlined,
  EditOutlined,
  PhoneOutlined,
  AlertOutlined
} from '@ant-design/icons';
import VitalsCard from './VitalsCard';
import ActivityChart from './ActivityChart';
import MentalStateCard from './MentalStateCard';
import MedicationCalendar from './MedicationCalendar';

const { Text, Title } = Typography;
const { TextArea } = Input;

const DashboardView = ({ patient }) => {
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      // 这里可以添加保存笔记的逻辑
      console.log('添加笔记:', newNote);
      setNewNote('');
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'danger': return 'error';
      case 'warning': return 'warning';
      default: return 'info';
    }
  };

  return (
    <div>
      <Row gutter={[24, 24]}>
        {/* 个案核心资讯卡 */}
        <Col xs={24} lg={12}>
          <Card title="个案信息" style={{ height: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <Avatar 
                src={patient.avatar}
                icon={<UserOutlined />}
                size={80}
                style={{ marginRight: '20px' }}
              />
              <div style={{ flex: 1 }}>
                <Title level={3} style={{ margin: '0 0 8px 0' }}>
                  {patient.name}
                </Title>
                <div style={{ marginBottom: '16px' }}>
                  <Text>
                    {patient.age}岁 · {patient.gender} · {patient.height}cm · {patient.weight}kg
                  </Text>
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <Text strong>慢性病: </Text>
                  {patient.conditions.map(condition => (
                    <Tag key={condition} color="blue" style={{ marginBottom: '4px' }}>
                      {condition}
                    </Tag>
                  ))}
                </div>

                <div>
                  <Text strong>紧急联系人: </Text>
                  <div style={{ marginTop: '4px' }}>
                    <PhoneOutlined style={{ marginRight: '8px' }} />
                    <Text>{patient.emergencyContact.name} - {patient.emergencyContact.phone}</Text>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* 即时风险警示卡 */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <span>
                <AlertOutlined style={{ marginRight: '8px', color: '#ff4d4f' }} />
                风险警报
              </span>
            }
            style={{ height: '280px' }}
          >
            {patient.alerts && patient.alerts.length > 0 ? (
              <div>
                {patient.alerts.map(alert => (
                  <Alert
                    key={alert.id}
                    message={alert.type}
                    description={`${alert.time} - 需要立即处理`}
                    type={getAlertColor(alert.severity)}
                    showIcon
                    style={{ marginBottom: '12px' }}
                    action={
                      <Button size="small" type="primary">
                        处理
                      </Button>
                    }
                  />
                ))}
              </div>
            ) : (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center',
                height: '180px',
                color: '#52c41a'
              }}>
                <TrophyOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                <Text style={{ fontSize: '16px', color: '#52c41a' }}>
                  目前状态良好，无风险警报
                </Text>
              </div>
            )}
          </Card>
        </Col>

        {/* 关键生命体征卡 */}
        <Col xs={24}>
          <Card title="生命体征监测">
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={6}>
                <VitalsCard
                  title="心率"
                  current={patient.vitals.heartRate.current}
                  unit="次/分"
                  data={patient.vitals.heartRate.data}
                  icon={<HeartOutlined />}
                  color="#ff4d4f"
                />
              </Col>
              <Col xs={12} sm={6}>
                <VitalsCard
                  title="血压"
                  current={`${Math.round(patient.vitals.bloodPressure.current.systolic)}/${Math.round(patient.vitals.bloodPressure.current.diastolic)}`}
                  unit="mmHg"
                  data={patient.vitals.bloodPressure.data}
                  icon={<HeartOutlined />}
                  color="#722ed1"
                />
              </Col>
              <Col xs={12} sm={6}>
                <VitalsCard
                  title="血氧"
                  current={patient.vitals.oxygenSaturation.current}
                  unit="%"
                  data={patient.vitals.oxygenSaturation.data}
                  icon={<HeartOutlined />}
                  color="#1890ff"
                />
              </Col>
              <Col xs={12} sm={6}>
                <VitalsCard
                  title="呼吸率"
                  current={patient.vitals.respiratoryRate.current}
                  unit="次/分"
                  data={patient.vitals.respiratoryRate.data}
                  icon={<HeartOutlined />}
                  color="#52c41a"
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* 活动与睡眠趋势图 */}
        <Col xs={24} lg={12}>
          <ActivityChart data={patient.activity} />
        </Col>

        {/* 情绪与认知评估摘要卡 */}
        <Col xs={24} lg={12}>
          <MentalStateCard mentalState={patient.mentalState} />
        </Col>

        {/* 用药依从性追踪器 */}
        <Col xs={24} lg={12}>
          <MedicationCalendar medicationData={patient.medication} />
        </Col>

        {/* 护理笔记 */}
        <Col xs={24} lg={12}>
          <Card title="护理笔记" style={{ height: '400px' }}>
            <div style={{ marginBottom: '16px' }}>
              <TextArea
                rows={3}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="输入护理笔记..."
                style={{ marginBottom: '8px' }}
              />
              <Button 
                type="primary" 
                icon={<EditOutlined />}
                onClick={handleAddNote}
                disabled={!newNote.trim()}
              >
                添加笔记
              </Button>
            </div>
            
            <div style={{ height: '240px', overflowY: 'auto' }}>
              <List
                dataSource={patient.notes}
                renderItem={note => (
                  <List.Item style={{ padding: '8px 0' }}>
                    <div style={{ width: '100%' }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        marginBottom: '4px'
                      }}>
                        <Text strong>{note.author}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {note.timestamp}
                        </Text>
                      </div>
                      <Text>{note.content}</Text>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardView; 