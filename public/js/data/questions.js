// FBTI Questions — 25题
// score key: S/I=决策模式, L/T=时间偏好, A/G=风险态度, R/E=情绪控制

const QUESTIONS = [
  {
    id: 1,
    question: '朋友群里有人发了一只"稳赚"的股票，你的第一反应是？',
    options: [
      { label: 'A', text: '截图，回头自己查基本面再说', score: { S: 1 } },
      { label: 'B', text: '搜代码看K线，两分钟自己判断', score: { S: 1 } },
      { label: 'C', text: '群里气氛挺好，先买点感受一下', score: { I: 1, E: 1 } },
      { label: 'D', text: '等它涨了再看看是不是真的', score: { G: 1 } }
    ]
  },
  {
    id: 2,
    question: '你买入一只股票前，通常花多长时间研究？',
    options: [
      { label: 'A', text: '几天到几周，能查的全查完', score: { S: 1, L: 1 } },
      { label: 'B', text: '几个小时，看核心指标就够', score: { S: 1 } },
      { label: 'C', text: '半小时内，想多了反而出错', score: { I: 1 } },
      { label: 'D', text: '研究？我靠感觉', score: { I: 1, E: 1 } }
    ]
  },
  {
    id: 3,
    question: '你持有的股票突然涨了20%，你会？',
    options: [
      { label: 'A', text: '对照目标价，没到，继续拿', score: { L: 1, R: 1 } },
      { label: 'B', text: '卖一半，剩一半继续跑', score: { G: 1, R: 1 } },
      { label: 'C', text: '感觉要见顶了，先出来', score: { I: 1, T: 1 } },
      { label: 'D', text: '加仓，涨了说明我看对了', score: { A: 1 } }
    ]
  },
  {
    id: 4,
    question: '你持有的股票突然跌了15%，你会？',
    options: [
      { label: 'A', text: '翻出止损设置，触发就走', score: { S: 1, R: 1 } },
      { label: 'B', text: '检查买入逻辑是否还在，在就拿着', score: { L: 1, R: 1 } },
      { label: 'C', text: '加仓，越跌越买，机会来了', score: { A: 1 } },
      { label: 'D', text: '每隔十分钟刷一次，手心出汗', score: { E: 1 } }
    ]
  },
  {
    id: 5,
    question: '你理想的持仓时长是？',
    options: [
      { label: 'A', text: '五年起步，我做时间的朋友', score: { L: 2 } },
      { label: 'B', text: '半年到一年，等一个完整波段', score: { L: 1 } },
      { label: 'C', text: '几周，行情来了就走', score: { T: 1 } },
      { label: 'D', text: '能当天出就当天出，隔夜都嫌长', score: { T: 2 } }
    ]
  },
  {
    id: 6,
    question: '你通常怎么分配单只股票的仓位？',
    options: [
      { label: 'A', text: '单只不超过15%，分散才安心', score: { G: 2 } },
      { label: 'B', text: '看好的可以到30%左右', score: { A: 1 } },
      { label: 'C', text: '最看好的时候可以到50%以上', score: { A: 2 } },
      { label: 'D', text: '看好什么就全押，不然有什么意义', score: { A: 2 } }
    ]
  },
  {
    id: 7,
    question: '交易日下午两点，你盯盘的频率是？',
    options: [
      { label: 'A', text: '我不盯盘，设好委托就不看了', score: { R: 2 } },
      { label: 'B', text: '偶尔看一眼，了解行情就行', score: { R: 1 } },
      { label: 'C', text: '每隔半小时刷一下，正常水平', score: { E: 1 } },
      { label: 'D', text: '一直开着，出不了我的视线', score: { E: 2, T: 1 } }
    ]
  },
  {
    id: 8,
    question: '你选股主要靠什么？',
    options: [
      { label: 'A', text: '财务模型和基本面研究', score: { S: 2 } },
      { label: 'B', text: '技术指标和量化筛选', score: { S: 2 } },
      { label: 'C', text: '行业判断加直觉验证', score: { I: 1, S: 1 } },
      { label: 'D', text: '直觉、感觉、气感、氛围', score: { I: 2, E: 1 } }
    ]
  },
  {
    id: 9,
    question: '市场今天大跌3%，你第一个动作是？',
    options: [
      { label: 'A', text: '检查各持仓是否触发止损线', score: { S: 1, R: 1 } },
      { label: 'B', text: '看看有没有错杀的买入机会', score: { I: 1, A: 1 } },
      { label: 'C', text: '先刷一圈新闻，搞清楚发生什么', score: { S: 1 } },
      { label: 'D', text: '打开账户，盯着数字，胃不太舒服', score: { E: 2 } }
    ]
  },
  {
    id: 10,
    question: '你看到别人晒出这个月+30%的收益截图，你的感受是？',
    options: [
      { label: 'A', text: '随便看看，和我的计划没关系', score: { R: 2 } },
      { label: 'B', text: '好奇他用了什么策略，想学', score: { S: 1, R: 1 } },
      { label: 'C', text: '心里有点动，开始想要不要调整操作', score: { E: 1 } },
      { label: 'D', text: '当天就开始找类似的机会', score: { E: 2, I: 1 } }
    ]
  },
  {
    id: 11,
    question: '你最认同哪种投资哲学？',
    options: [
      { label: 'A', text: '好公司长期持有，时间会给答案', score: { L: 2, G: 1 } },
      { label: 'B', text: '市场永远有机会，关键是找到它', score: { A: 1, I: 1 } },
      { label: 'C', text: '快进快出，赚确定性的钱', score: { T: 2, S: 1 } },
      { label: 'D', text: '人生苦短，投资也要享受过程', score: { E: 2, I: 1 } }
    ]
  },
  {
    id: 12,
    question: '你通常同时持有几只股票？',
    options: [
      { label: 'A', text: '10只以上，充分分散', score: { G: 2 } },
      { label: 'B', text: '5到10只，适度集中', score: { G: 1 } },
      { label: 'C', text: '3到5只，高度集中', score: { A: 1 } },
      { label: 'D', text: '1到3只，重注精选', score: { A: 2 } }
    ]
  },
  {
    id: 13,
    question: '涨停板出现了，你没在里面。你会？',
    options: [
      { label: 'A', text: '分析为什么涨，记录下来备用', score: { S: 1, R: 1 } },
      { label: 'B', text: '看看第二天有没有继续追的空间', score: { I: 1, A: 1 } },
      { label: 'C', text: '有点可惜，但很快翻篇', score: { R: 1 } },
      { label: 'D', text: '心里非常难受，后悔昨天没买', score: { E: 2 } }
    ]
  },
  {
    id: 14,
    question: '你的交易有书面记录吗？',
    options: [
      { label: 'A', text: '有，每笔都记录买入逻辑和目标位', score: { S: 2 } },
      { label: 'B', text: '大概记一下，不那么详细', score: { S: 1 } },
      { label: 'C', text: '基本没有，脑子里记着就好', score: { I: 1 } },
      { label: 'D', text: '记了也不看，记了有什么用', score: { I: 1, E: 1 } }
    ]
  },
  {
    id: 15,
    question: '你设好了止盈点，股价刚好到了，你会？',
    options: [
      { label: 'A', text: '直接卖，纪律就是纪律', score: { R: 2, S: 1 } },
      { label: 'B', text: '卖一部分，留一部分继续看', score: { R: 1 } },
      { label: 'C', text: '感觉还能涨，再等等', score: { E: 1 } },
      { label: 'D', text: '临时把止盈线往上移一格', score: { E: 2 } }
    ]
  },
  {
    id: 16,
    question: '你如何看待技术分析（K线、均线）？',
    options: [
      { label: 'A', text: '核心工具，买卖点都靠它', score: { S: 2 } },
      { label: 'B', text: '辅助参考，配合基本面用', score: { S: 1, I: 1 } },
      { label: 'C', text: '有用，但我更相信自己的判断', score: { I: 1 } },
      { label: 'D', text: '看不懂，但图挺好看的', score: { I: 1, E: 1 } }
    ]
  },
  {
    id: 17,
    question: '假设你有10万可以投资，你的配置思路是？',
    options: [
      { label: 'A', text: '分散买几个行业的ETF，稳健增长', score: { G: 2, S: 1 } },
      { label: 'B', text: '精选3到5只研究充分的股票', score: { A: 1, S: 1 } },
      { label: 'C', text: '把握一个最确定的机会，重仓', score: { A: 2 } },
      { label: 'D', text: '先观望一个月再说，不着急', score: { G: 1, L: 1 } }
    ]
  },
  {
    id: 18,
    question: '一只你持有的股票，两年了还没怎么涨，你会？',
    options: [
      { label: 'A', text: '重新评估逻辑，逻辑没变就继续拿', score: { L: 1, R: 1 } },
      { label: 'B', text: '逐渐减仓，换有更好机会的品种', score: { T: 1, R: 1 } },
      { label: 'C', text: '继续持有，好东西需要等待', score: { L: 2, E: 1 } },
      { label: 'D', text: '早就换掉了，机会成本太高', score: { T: 2, A: 1 } }
    ]
  },
  {
    id: 19,
    question: '你认为影响投资成败最大的因素是？',
    options: [
      { label: 'A', text: '方法论和系统，可重复可优化', score: { S: 2 } },
      { label: 'B', text: '对市场的理解和判断力', score: { I: 1 } },
      { label: 'C', text: '心态和情绪控制', score: { R: 1 } },
      { label: 'D', text: '说实话，运气占很大一部分', score: { I: 1, E: 1 } }
    ]
  },
  {
    id: 20,
    question: '你的交易风格更像哪种角色？',
    options: [
      { label: 'A', text: '工程师：有系统、可复制、持续迭代', score: { S: 2, R: 1 } },
      { label: 'B', text: '猎手：潜伏等待，一击即中', score: { I: 1, R: 1 } },
      { label: 'C', text: '冲浪者：感受行情，随势而动', score: { I: 1, E: 1 } },
      { label: 'D', text: '探险家：冒险是乐趣的一部分', score: { A: 1, E: 2 } }
    ]
  },
  {
    id: 21,
    question: '你的止损是怎么设置的？',
    options: [
      { label: 'A', text: '明确的百分比，触发就无条件执行', score: { S: 2, R: 2 } },
      { label: 'B', text: '有大概范围，但根据情况灵活调整', score: { I: 1 } },
      { label: 'C', text: '心里有底线，但有时候会放宽一点', score: { E: 1 } },
      { label: 'D', text: '持有就好，跌了还会涨回来的', score: { E: 2, L: 1 }, special: 'no_stoploss' }
    ]
  },
  {
    id: 22,
    question: '你账户今天浮盈5000，你感觉？',
    options: [
      { label: 'A', text: '正常，在预期范围内，继续执行计划', score: { R: 2 } },
      { label: 'B', text: '开心，但不会影响接下来的操作', score: { R: 1 } },
      { label: 'C', text: '心情很好，手痒，可能会多操作几下', score: { E: 1 } },
      { label: 'D', text: '截图，发一下', score: { E: 2 } }
    ]
  },
  {
    id: 23,
    question: '一笔交易亏损出场后，你怎么处理情绪？',
    options: [
      { label: 'A', text: '复盘，找问题，写进交易日志', score: { S: 1, R: 2 } },
      { label: 'B', text: '想一想，然后继续', score: { R: 1 } },
      { label: 'C', text: '难受一阵，需要时间缓缓', score: { E: 1 } },
      { label: 'D', text: '想办法尽快把亏掉的赚回来', score: { E: 2, A: 1 } }
    ]
  },
  {
    id: 24,
    question: '你看好一个行业未来五年，你会怎么做？',
    options: [
      { label: 'A', text: '买这个行业的ETF，长期持有', score: { L: 2, G: 1 } },
      { label: 'B', text: '深入研究最优质的几家公司，集中押注', score: { L: 1, A: 1, S: 1 } },
      { label: 'C', text: '跟踪行业热点，找波段机会进出', score: { T: 1, A: 1 } },
      { label: 'D', text: '先买一点，感受感受再决定', score: { G: 1, I: 1 } }
    ]
  },
  {
    id: 25,
    question: '（悄悄问你）你最近的一次亏损，主要原因是？',
    isSpecial: true,
    emoji: '🎰',
    options: [
      { label: 'A', text: '我没亏 / 亏损在可控范围内', score: { R: 1 }, special: null },
      { label: 'B', text: '止损设了，但没有执行', score: { E: 1 }, special: 'stop_reinforce' },
      { label: 'C', text: '追高了，入场位置不好', score: { E: 1, A: 1 }, special: 'surf_reinforce' },
      { label: 'D', text: '听消息买的', score: { E: 2 }, special: 'easter_egg' }
    ]
  }
];

const LOADING_TEXTS = [
  '分析你的交易基因中…',
  '扫描止盈执行力…',
  '计算你的 FOMO 指数…',
  '检测盘感雷达…',
  '测量钻石手硬度…',
  '评估梭哈概率…',
  '人格锁定中…'
];
