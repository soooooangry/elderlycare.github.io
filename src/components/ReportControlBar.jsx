import React from 'react';
import { Card, DatePicker, Button, Space, Typography } from 'antd';
import { FileTextOutlined, PrinterOutlined, ReloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Title } = Typography;

const ReportControlBar = ({ 
  patient, 
  dateRange, 
  onDateRangeChange, 
  onGenerateReport, 
  loading 
}) => {
  const handlePrint = () => {
    window.print();
  };

  const presets = [
    {
      label: '最近7天',
      value: [dayjs().subtract(7, 'day'), dayjs()],
    },
    {
      label: '最近30天',
      value: [dayjs().subtract(30, 'day'), dayjs()],
    },
    {
      label: '上个月',
      value: [
        dayjs().subtract(1, 'month').startOf('month'),
        dayjs().subtract(1, 'month').endOf('month'),
      ],
    },
    {
      label: '最近3个月',
      value: [dayjs().subtract(3, 'month'), dayjs()],
    },
  ];

  return (
    <Card 
      className="report-control-bar no-print"
      style={{ 
        marginBottom: '24px',
        borderColor: '#1890ff'
      }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
            <FileTextOutlined style={{ marginRight: '8px' }} />
            正在查看 {patient.name} 的健康报告
          </Title>
        </div>

        <Space size="large" wrap>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '4px', 
              fontWeight: 'bold',
              color: '#666'
            }}>
              报告时间范围：
            </label>
            <RangePicker
              value={dateRange}
              onChange={onDateRangeChange}
              presets={presets}
              format="YYYY-MM-DD"
              allowClear={false}
              style={{ width: '280px' }}
            />
          </div>

          <Space>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={onGenerateReport}
              loading={loading}
              size="large"
            >
              生成报告
            </Button>
            
            <Button
              icon={<PrinterOutlined />}
              onClick={handlePrint}
              size="large"
            >
              导出为 PDF / 打印
            </Button>
          </Space>
        </Space>
      </div>
    </Card>
  );
};

export default ReportControlBar; 