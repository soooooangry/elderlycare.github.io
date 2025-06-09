import React, { useState } from 'react';
import { Space } from 'antd';
import ReportControlBar from './ReportControlBar';
import ReportContainer from './ReportContainer';
import dayjs from 'dayjs';

const ReportsView = ({ patient }) => {
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(7, 'day'),
    dayjs()
  ]);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    setLoading(true);
    
    // 模拟API调用延迟
    setTimeout(() => {
      // 生成报告数据
      const generatedData = generateReportData(patient, dateRange);
      setReportData(generatedData);
      setLoading(false);
    }, 1000);
  };

  const generateReportData = (patientData, range) => {
    const [startDate, endDate] = range;
    const days = endDate.diff(startDate, 'day') + 1;

    // 生成AI摘要
    const aiSummary = generateAISummary(patientData, days);

    // 生成时间范围内的数据
    const vitalsTrend = generateVitalsTrend(patientData, days);
    const activityData = generateActivityData(patientData, days);
    const medicationData = generateMedicationSummary(patientData, days);
    const significantEvents = generateSignificantEvents(patientData, days);

    return {
      period: {
        start: startDate.format('YYYY年MM月DD日'),
        end: endDate.format('YYYY年MM月DD日')
      },
      aiSummary,
      vitalsTrend,
      vitalsStats: calculateVitalsStats(vitalsTrend),
      activityData,
      medicationData,
      significantEvents,
      generatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
    };
  };

  const generateAISummary = (patient, days) => {
    const summaries = [
      `在过去${days}天中，${patient.name}的整体健康状况保持${patient.status === 'normal' ? '稳定' : patient.status === 'warning' ? '需要关注' : '需要紧急处理'}。`,
      patient.status === 'normal' 
        ? `生命体征监测显示各项指标均在正常范围内，活动量适中，情绪状态良好。建议继续保持现有的健康管理方案。`
        : patient.status === 'warning'
        ? `监测到部分生命体征出现波动，建议加强日常观察，适当调整生活方式。`
        : `检测到多项健康指标异常，已及时采取相应措施，建议密切关注并考虑调整治疗方案。`,
      `用药依从性良好，与护理人员的沟通积极主动。总体而言，健康状况${patient.status === 'danger' ? '需要持续关注' : '令人满意'}。`
    ];
    
    return summaries.join(' ');
  };

  const generateVitalsTrend = (patient, days) => {
    return Array.from({ length: days }, (_, i) => {
      const date = dayjs().subtract(days - 1 - i, 'day');
      return {
        date: date.format('MM-DD'),
        heartRate: patient.vitals.heartRate.current + (Math.random() - 0.5) * 10,
        systolic: patient.vitals.bloodPressure.current.systolic + (Math.random() - 0.5) * 20,
        diastolic: patient.vitals.bloodPressure.current.diastolic + (Math.random() - 0.5) * 10,
        oxygenSaturation: patient.vitals.oxygenSaturation.current + (Math.random() - 0.5) * 2
      };
    });
  };

  const calculateVitalsStats = (vitalsTrend) => {
    const heartRates = vitalsTrend.map(d => d.heartRate);
    const systolics = vitalsTrend.map(d => d.systolic);
    const diastolics = vitalsTrend.map(d => d.diastolic);
    const oxygenSats = vitalsTrend.map(d => d.oxygenSaturation);

    return {
      heartRate: {
        avg: Math.round(heartRates.reduce((a, b) => a + b) / heartRates.length),
        max: Math.round(Math.max(...heartRates)),
        min: Math.round(Math.min(...heartRates)),
        abnormal: heartRates.filter(hr => hr > 100 || hr < 60).length
      },
      bloodPressure: {
        avgSystolic: Math.round(systolics.reduce((a, b) => a + b) / systolics.length),
        avgDiastolic: Math.round(diastolics.reduce((a, b) => a + b) / diastolics.length),
        maxSystolic: Math.round(Math.max(...systolics)),
        minSystolic: Math.round(Math.min(...systolics)),
        abnormal: systolics.filter(sp => sp > 140).length
      },
      oxygenSaturation: {
        avg: Math.round(oxygenSats.reduce((a, b) => a + b) / oxygenSats.length),
        max: Math.round(Math.max(...oxygenSats)),
        min: Math.round(Math.min(...oxygenSats)),
        abnormal: oxygenSats.filter(os => os < 95).length
      }
    };
  };

  const generateActivityData = (patient, days) => {
    return {
      dailySteps: Array.from({ length: days }, (_, i) => ({
        date: dayjs().subtract(days - 1 - i, 'day').format('MM-DD'),
        steps: Math.floor(Math.random() * 3000) + 2000,
        target: 6000
      })),
      sleepData: Array.from({ length: days }, (_, i) => ({
        date: dayjs().subtract(days - 1 - i, 'day').format('MM-DD'),
        deepSleep: Math.floor(Math.random() * 2) + 2,
        lightSleep: Math.floor(Math.random() * 3) + 3,
        remSleep: Math.floor(Math.random() * 1.5) + 1.5
      }))
    };
  };

  const generateMedicationSummary = (patient, days) => {
    return [
      {
        name: '阿司匹林',
        dosage: '100mg',
        frequency: '每日一次',
        adherence: Math.floor(Math.random() * 10) + 90
      },
      {
        name: '降压药',
        dosage: '5mg',
        frequency: '每日两次',
        adherence: Math.floor(Math.random() * 15) + 85
      },
      {
        name: '钙片',
        dosage: '600mg',
        frequency: '每日一次',
        adherence: Math.floor(Math.random() * 20) + 80
      }
    ];
  };

  const generateSignificantEvents = (patient, days) => {
    const events = [];
    
    // 添加警报事件
    if (patient.alerts && patient.alerts.length > 0) {
      patient.alerts.forEach(alert => {
        events.push({
          date: alert.time.split(' ')[0],
          time: alert.time.split(' ')[1],
          type: '健康警报',
          description: alert.type,
          severity: alert.severity
        });
      });
    }

    // 添加护理笔记事件
    if (patient.notes && patient.notes.length > 0) {
      patient.notes.slice(0, 3).forEach(note => {
        events.push({
          date: note.timestamp.split(' ')[0],
          time: note.timestamp.split(' ')[1],
          type: '护理记录',
          description: note.content,
          author: note.author
        });
      });
    }

    return events.sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));
  };

  // 初始化时生成默认报告
  React.useEffect(() => {
    handleGenerateReport();
  }, [patient]);

  return (
    <div className="reports-view">
      <ReportControlBar
        patient={patient}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onGenerateReport={handleGenerateReport}
        loading={loading}
      />
      
      {reportData && (
        <ReportContainer
          patient={patient}
          reportData={reportData}
        />
      )}
    </div>
  );
};

export default ReportsView; 