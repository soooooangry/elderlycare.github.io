import dayjs from 'dayjs';

// 生成模拟的生命体征数据
const generateVitalData = (baseValue, variance, count = 24) => {
  return Array.from({ length: count }, (_, i) => ({
    time: dayjs().subtract(count - 1 - i, 'hour').format('HH:mm'),
    value: baseValue + (Math.random() - 0.5) * variance
  }));
};

// 生成活动数据
const generateActivityData = (days = 7) => {
  return Array.from({ length: days }, (_, i) => ({
    date: dayjs().subtract(days - 1 - i, 'day').format('MM-DD'),
    steps: Math.floor(Math.random() * 3000) + 2000,
    sleep: Math.floor(Math.random() * 2) + 7
  }));
};

export const mockPatients = [
  {
    id: '1',
    name: '张奶奶',
    age: 78,
    gender: '女',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    status: 'normal', // normal, warning, danger
    height: 158,
    weight: 62,
    conditions: ['高血压', '糖尿病'],
    emergencyContact: {
      name: '张小明',
      phone: '138-0000-1234'
    },
    vitals: {
      heartRate: {
        current: 72,
        data: generateVitalData(72, 10)
      },
      bloodPressure: {
        current: { systolic: 135, diastolic: 82 },
        data: generateVitalData(135, 15).map((item, i) => ({
          ...item,
          systolic: item.value,
          diastolic: generateVitalData(82, 8)[i].value
        }))
      },
      oxygenSaturation: {
        current: 98,
        data: generateVitalData(98, 2)
      },
      respiratoryRate: {
        current: 18,
        data: generateVitalData(18, 3)
      }
    },
    activity: generateActivityData(),
    mentalState: {
      gds: { score: 3, date: '2024-01-15', maxScore: 15 },
      mmse: { score: 26, date: '2024-01-10', maxScore: 30 },
      emotionAnalysis: {
        positive: 60,
        neutral: 30,
        negative: 10
      }
    },
    medication: {
      adherence: Array.from({ length: 30 }, (_, i) => ({
        date: dayjs().subtract(29 - i, 'day').format('YYYY-MM-DD'),
        status: Math.random() > 0.2 ? 'full' : Math.random() > 0.5 ? 'partial' : 'missed'
      }))
    },
    alerts: [],
    notes: [
      {
        id: 1,
        author: '护理员小王',
        content: '今日精神状态良好，主动参与活动',
        timestamp: '2024-01-20 14:30'
      },
      {
        id: 2,
        author: '医生李主任',
        content: '血压控制稳定，继续现有用药方案',
        timestamp: '2024-01-19 09:15'
      }
    ]
  },
  {
    id: '2',
    name: '王爷爷',
    age: 82,
    gender: '男',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    status: 'warning',
    height: 172,
    weight: 68,
    conditions: ['高血压', '心律不齐'],
    emergencyContact: {
      name: '王芳',
      phone: '139-0000-5678'
    },
    vitals: {
      heartRate: {
        current: 95,
        data: generateVitalData(95, 15)
      },
      bloodPressure: {
        current: { systolic: 150, diastolic: 95 },
        data: generateVitalData(150, 20).map((item, i) => ({
          ...item,
          systolic: item.value,
          diastolic: generateVitalData(95, 10)[i].value
        }))
      },
      oxygenSaturation: {
        current: 96,
        data: generateVitalData(96, 3)
      },
      respiratoryRate: {
        current: 20,
        data: generateVitalData(20, 4)
      }
    },
    activity: generateActivityData(),
    mentalState: {
      gds: { score: 6, date: '2024-01-12', maxScore: 15 },
      mmse: { score: 24, date: '2024-01-08', maxScore: 30 },
      emotionAnalysis: {
        positive: 45,
        neutral: 35,
        negative: 20
      }
    },
    medication: {
      adherence: Array.from({ length: 30 }, (_, i) => ({
        date: dayjs().subtract(29 - i, 'day').format('YYYY-MM-DD'),
        status: Math.random() > 0.15 ? 'full' : Math.random() > 0.4 ? 'partial' : 'missed'
      }))
    },
    alerts: [
      {
        id: 1,
        type: '血压偏高',
        time: '2024-01-20 08:30',
        severity: 'warning'
      }
    ],
    notes: [
      {
        id: 1,
        author: '护理员小李',
        content: '夜间睡眠质量一般，需要关注',
        timestamp: '2024-01-20 08:00'
      }
    ]
  },
  {
    id: '3',
    name: '陈奶奶',
    age: 85,
    gender: '女',
    avatar: 'https://randomuser.me/api/portraits/women/85.jpg',
    status: 'danger',
    height: 155,
    weight: 58,
    conditions: ['冠心病', '骨质疏松'],
    emergencyContact: {
      name: '陈建华',
      phone: '137-0000-9012'
    },
    vitals: {
      heartRate: {
        current: 110,
        data: generateVitalData(110, 20)
      },
      bloodPressure: {
        current: { systolic: 170, diastolic: 100 },
        data: generateVitalData(170, 25).map((item, i) => ({
          ...item,
          systolic: item.value,
          diastolic: generateVitalData(100, 12)[i].value
        }))
      },
      oxygenSaturation: {
        current: 94,
        data: generateVitalData(94, 4)
      },
      respiratoryRate: {
        current: 24,
        data: generateVitalData(24, 5)
      }
    },
    activity: generateActivityData(),
    mentalState: {
      gds: { score: 9, date: '2024-01-14', maxScore: 15 },
      mmse: { score: 22, date: '2024-01-11', maxScore: 30 },
      emotionAnalysis: {
        positive: 30,
        neutral: 40,
        negative: 30
      }
    },
    medication: {
      adherence: Array.from({ length: 30 }, (_, i) => ({
        date: dayjs().subtract(29 - i, 'day').format('YYYY-MM-DD'),
        status: Math.random() > 0.3 ? 'full' : Math.random() > 0.6 ? 'partial' : 'missed'
      }))
    },
    alerts: [
      {
        id: 1,
        type: '心率过速',
        time: '2024-01-20 10:15',
        severity: 'danger'
      },
      {
        id: 2,
        type: '血压严重超标',
        time: '2024-01-20 06:45',
        severity: 'danger'
      }
    ],
    notes: [
      {
        id: 1,
        author: '值班护士',
        content: '紧急情况：出现胸闷症状，已联系医生',
        timestamp: '2024-01-20 10:20'
      }
    ]
  }
]; 