// FBTI Personalities Data
// image: 图片文件名（存放于 /assets/images/）
// 图片映射待确认后更新 image 字段

const PERSONALITIES = {
  HODL: {
    code: 'HODL', name: '长拿苦行僧', englishName: 'The Diamond Holder', system: 'S',
    quote: '时间是我最重的仓位',
    description: '你不看短线波动，因为那会打扰你打坐。你的持仓列表看起来像一份五年规划，止盈目标的单位是"年"。熊市是你的打折季，别人割肉出逃的时候你在悄悄补仓。你大概是16种人格里睡眠质量最好的一个。',
    strengths: ['情绪稳如铁，市场噪音进不来', '复利在你身上能发挥到极致', '真正做到了"别人恐惧我贪婪"'],
    weaknesses: ['有时候"长期持有"是"不舍得止损"的高端说法', '市场结构变化时反应慢半拍'],
    said: ['"跌了？不慌，我是做长期的。"', '"再跌我就再加。"'],
    strategy: '指数定投 / 价值股长期持有 / 买入持有不折腾',
    archetype: '巴菲特的散户门徒（但账户里少了几个零）',
    dimensions: { S: 90, L: 95, G: 80, R: 92 },
    image: null, color: '#1B3A6B', accentColor: '#F4C542'  // HODL image pending
  },
  DYOR: {
    code: 'DYOR', name: '股镇做题家', englishName: 'The Overresearcher', system: 'S',
    quote: '我有一百页研究支撑这个满仓',
    description: '在你买入一只股票之前，你已经读完了近十年财报、CEO访谈、行业竞争格局，以及竞争对手的季报。你的重仓不叫赌，叫"高确信度配置"。别人问你为什么买这只，你能讲四十分钟。',
    strengths: ['信息优势明显，真正理解自己持有的东西', '买入逻辑扎实，不容易被市场噪音动摇', '出现危机时能快速判断逻辑是否被破坏'],
    weaknesses: ['分析瘫痪——永远还有一份报告没读完', '确认偏误：越研究越觉得自己对，仓位越来越重'],
    said: ['"这只我研究了两个月。"', '"市场短期是投票机，长期是称重机。"'],
    strategy: '集中持仓价值投资 / 深度行业研究 / 逆向投资',
    archetype: '彼得·林奇（加了几分学院气息）',
    dimensions: { S: 88, L: 90, A: 75, R: 85 },
    image: 'JYXwauehsyqVXQa12LWz_.png', color: '#1A3A6B', accentColor: '#7EC8E3'
  },
  MACD: {
    code: 'MACD', name: 'K线判官', englishName: 'The Backtester', system: 'S',
    quote: '历史总是押韵——直到它不押了',
    description: '你的电脑桌面是K线图，枕边读物是技术分析手册。你相信价格包含一切信息，相信图表会说话，相信支撑位和压力位。你是纯粹的技术派，逻辑严谨，纪律严格，入场和出场都有依据。',
    strengths: ['纪律性强，有明确的买卖信号不靠感情', '风控意识优秀，止损是本能', '不被公司故事和情绪叙事带跑'],
    weaknesses: ['过度依赖历史数据，黑天鹅面前系统会短路', '所有人都看同一根均线，拥挤交易是隐患'],
    said: ['"均线金叉了，可以进。"', '"跌破支撑，止损。"'],
    strategy: '技术面趋势交易 / 均值回归系统 / 量化因子策略',
    archetype: '活在Bloomberg终端里的量化研究员',
    dimensions: { S: 92, T: 80, G: 82, R: 90 },
    image: '5Wz0Vb4ANy2p6wKWioYH-.png', color: '#0C2340', accentColor: '#00B4D8'
  },
  ALGO: {
    code: 'ALGO', name: '人型机器人', englishName: 'The Algorithm', system: 'S',
    quote: '不是我在亏，是模型在亏',
    description: '你有完整的交易系统：入场条件、仓位管理、止损规则、复盘流程，全部成文。当信号来临，你执行；信号不来，你等待。你是所有人里最像机构的散户。唯一的问题是……你也是人，偶尔那个人会在关键时刻跳出来。',
    strengths: ['执行纪律是16种人格里最强的', '情绪对决策的影响最小', '风险管理体系完整，不会一次亏光'],
    weaknesses: ['黑天鹅会让整个系统失效，然后你会非常困惑', '过于机械，可能错过非系统性的大机会'],
    said: ['"信号出现了。"', '"不在计划内，不做。"', '"（亏了）模型要优化了。"'],
    strategy: '量化趋势跟踪 / 系统化短线 / 高频规则执行',
    archetype: '西蒙斯（但没有那么多台服务器）',
    dimensions: { S: 95, T: 82, A: 78, R: 95 },
    image: '5MmmnG9FuO3NPi3asA9-c.png', color: '#051525', accentColor: '#00D2FF'
  },
  PLAN: {
    code: 'PLAN', name: '拍腿大师', englishName: 'The Eternal Planner', system: 'S',
    quote: '计划写得很好，下次一定执行',
    description: '你的投资计划无懈可击：买入理由、目标价、止损位、仓位比例，一应俱全。然后你打开自选股，看了眼账户，心里一紧，然后关掉了。你是最懂投资的那批人之一，也是最不容易下手的那批人之一。',
    strengths: ['思维严谨，不会冲动买入', '善于发现和分析投资机会', '不会做明显愚蠢的交易'],
    weaknesses: ['行动力是最大的障碍', '错过的机会比做错的决定还多'],
    said: ['"我计划等回调再买。"', '（回调来了）"再等等，感觉还会跌。"', '（涨上去了）"哎。"'],
    strategy: '强制定投（绕过主观择时）/ 预设委托单 / 减少自主决策环节',
    archetype: '每一个写了完美投资计划但没有点击买入按钮的人',
    dimensions: { S: 80, L: 85, G: 75, E: 60 },
    image: '2wrMdeT9r5jJkNM1XiazG.png', color: '#1A2F5A', accentColor: '#A8DADC'
  },
  FOMO: {
    code: 'FOMO', name: '追涨敢死队', englishName: 'The Anxious Believer', system: 'S',
    quote: '我早就看到这只了，就是没买……',
    description: '你完全相信长期主义，你有一套系统，你知道择时是徒劳的。然而当你看到别人晒收益的帖子，你的手指会不受控制地开始操作。理智是你的操作系统，FOMO是你的病毒。',
    strengths: ['有明确的投资框架，不会完全没有原则', '对新机会保持敏感，不会错过大趋势', '长期持仓的意志力其实还不错'],
    weaknesses: ['看到别人赚钱就坐立不安', '容易在高位追入"别人的机会"'],
    said: ['"这个我早就分析过，就是没买。"', '"涨了这么多了，还能进吗？"'],
    strategy: '设立"FOMO仓"（固定比例允许冲动，其余严格执行计划）',
    archetype: '白天价值投资信徒、晚上刷财经号到深夜的基金经理',
    dimensions: { S: 72, L: 80, A: 70, E: 75 },
    image: 'yM_gcghAx6Y69EwSAk8BA.png', color: '#2D1B4E', accentColor: '#C77DFF'
  },
  STOP: {
    code: 'STOP', name: '卖飞专业户', englishName: 'The Almost-Seller', system: 'S',
    quote: '止盈线到了……再等一根K线',
    description: '你有止盈线，你设好了，就差点击确认。然后它到了。你盯着屏幕想：再涨一点。然后它又涨了。再一点。然后它开始跌。你还是没卖。这不叫贪心，这叫"感觉还有空间"。',
    strengths: ['不容易被短期波动吓出场', '有完整的交易框架，只是执行时手软', '熟悉自己的交易品种，很少做陌生的事'],
    weaknesses: ['止盈比止损更难，浮盈经常还回去', '"感觉"在关键时刻比系统更有话语权'],
    said: ['"到目标价了，再等等。"', '（然后跌了）"没事，我做波段的。"'],
    strategy: '分批止盈 / 移动止损代替固定止盈点 / 提前设置好委托单',
    archetype: '本来能10倍出场、最后只赚20%的那个人',
    dimensions: { S: 75, T: 70, G: 72, E: 70 },
    image: 'cKHUOcMJxhxjcOqVvFP_7.png', color: '#1F3A1F', accentColor: '#80B918'
  },
  PUMP: {
    code: 'PUMP', name: '止盈跑路王', englishName: 'The Gut-Exit Trader', system: 'S',
    quote: '进场有逻辑，出场有故事',
    description: '进场时你是一台冷静的机器：K线、量能、位置、仓位，全部核查到位。出场时你是一个活生生的人：市场一波动，心脏跟着颤。你有很好的系统，但情绪总在最关键的时刻接管决策权。',
    strengths: ['入场逻辑完整，不靠冲动开仓', '对市场节奏感知敏锐', '行动力强，不会空想'],
    weaknesses: ['情绪化出场是最大软肋，波动越大越容易失控', '"系统说持有，心跳说卖出"'],
    said: ['"入场的时候我是理性的。"', '（持仓大跌）"先出来再说。"'],
    strategy: '预设出场规则减少盘中决策 / 降低单笔仓位减少心理压力',
    archetype: '大跌日打出完美抄底价、却在反弹第一天就平仓的交易员',
    dimensions: { S: 78, T: 76, A: 74, E: 80 },
    image: 'CkwSIOcS6vnjteJVN0j9k.png', color: '#3A1F1F', accentColor: '#FF6B35'
  },
  SNIF: {
    code: 'SNIF', name: '欧皇', englishName: 'The Market Sniffer', system: 'I',
    quote: '说不清，但就是对了。这叫直觉，不叫运气',
    description: '你在别人看不懂的时候买入，在所有人都看好的时候悄悄离场。你说不清你的选股逻辑，但你的成功率让旁边的人开始怀疑人生。有人说你是运气好，你也不反驳——因为你自己也不完全确定方法论在哪里。',
    strengths: ['天生的市场风险嗅觉', '不容易被市场情绪和群体叙事带走', '逆向思维能力强，敢于在寂静中建仓'],
    weaknesses: ['成功难以复制，说不出方法论就没法持续优化', '偶尔过早离场，踏空后半程'],
    said: ['"感觉不对劲。"（三天后市场果然出事）', '"我也不知道为什么，就是应该买。"'],
    strategy: '直觉驱动+纪律止损 / 建立交易日志把直觉可视化',
    archetype: '索罗斯（背痛预警版）',
    dimensions: { I: 82, L: 85, G: 78, R: 80 },
    image: 'VNBVPtBrzqrXd6GlBNijY.png', color: '#1A3A2A', accentColor: '#52B788'
  },
  MOON: {
    code: 'MOON', name: '满仓莽夫', englishName: 'The Rational Bull', system: 'I',
    quote: '仓位代表确信度',
    description: '当你看好一个东西，你不做小仓位试探——你直接上重仓。不是因为你不懂风险，而是因为你认为那不是风险，而是机会。你清醒地知道自己在做什么，只是别人眼里你还是在赌。通常你赢了，偶尔输了，代价很大。',
    strengths: ['高确信度下收益惊人', '真正做到了把钱押在自己最有把握的地方', '长期视角下风险其实被充分评估过'],
    weaknesses: ['一次判断失误代价巨大', '黑天鹅是永远的敌人'],
    said: ['"这个机会我非常确定。"', '"仓位重才有意义。"'],
    strategy: '集中持仓 / 设置硬性亏损上限防黑天鹅 / 定期检视逻辑是否变化',
    archetype: '巴菲特重仓可口可乐 / 木头姐押注特斯拉',
    dimensions: { I: 80, L: 88, A: 88, R: 75 },
    image: 'pwr5dr57wAC2RgLTbkOSZ.png', color: '#1A2A0A', accentColor: '#B5E48C'
  },
  EXIT: {
    code: 'EXIT', name: '冷静操盘手', englishName: 'The Clean Exit', system: 'I',
    quote: '够了，走了',
    description: '进出果断，从不恋战。你的交易字典里没有"再等等"，只有"差不多了，离场"。你可能不是赚最多的，但你是最不容易亏大钱的。每次出手干净利落，没有多余动作。',
    strengths: ['执行力是16种人格里最顶级的', '止盈止损都不手软，心态极稳', '不会因为贪心把一笔好交易搞砸'],
    weaknesses: ['有时离场太早，错过主升浪后半程', '不容易拿到"10倍股"级别的收益'],
    said: ['"赚够了，走了。"', '"留给下一个人拿。"'],
    strategy: '短线波段 / 设定明确目标位后坚决执行 / 不追求最高点',
    archetype: '科比：做完了该做的事，点头离开',
    dimensions: { I: 85, T: 85, G: 80, R: 92 },
    image: 'nkl55Yr5pxnaho6CzoRO9.png', color: '#0A1A2A', accentColor: '#48CAE4'
  },
  SURF: {
    code: 'SURF', name: '闪电猎手', englishName: 'The Wave Rider', system: 'I',
    quote: '涨停了？追！（但有止损）',
    description: '别人看到涨停板还在分析，你已经进去了。你不叫追高，你叫"把握动能"。你的逻辑是：能涨的东西，继续涨的概率更高。你用理性管理这个激进的直觉，冲进去也能冷静出来，大多数时候效果不错。',
    strengths: ['对市场热点高度敏感，行动快', '敢于追入强势股，不犹豫', '进出及时，不拖泥带水'],
    weaknesses: ['追到假突破时比较难看', '止损纪律要求极高，否则容易坐过山车'],
    said: ['"涨停了，追！"', '"强者恒强。"', '（被套了）"止损，换下一个。"'],
    strategy: '动量/趋势策略 / 严格设置追涨止损位 / 仓位控制分散风险',
    archetype: 'CAN SLIM选股法的激进执行者',
    dimensions: { I: 82, T: 88, A: 85, R: 78 },
    image: 'a7x3EiQQKP-eHLY_ItO1Y.png', color: '#1A1A3A', accentColor: '#7B2FBE'
  },
  FEEL: {
    code: 'FEEL', name: '钻石铁头', englishName: 'The Emotional Hodler', system: 'I',
    quote: '持了三年了，有感情了，不卖',
    description: '你买入一只股票，经常是因为它"有故事"。你记得每一次买入时的心情，记得那天市场的气氛。和你的持仓之间，是有感情的。这让你拿得很稳，有时候也拿得太久。',
    strengths: ['长期持有的意志力强（因为有感情）', '对公司基本面有深入的理解', '不容易被短期波动赶出场'],
    weaknesses: ['感情用事是最大的风险来源', '该止损的股票因为"感情"硬拿着'],
    said: ['"这只股票，我了解它。"', '"它总会回来的。"'],
    strategy: '设立"感性禁区"（不允许感情覆盖止损纪律）/ 定期重新评估持仓逻辑',
    archetype: '每一个把持仓当老朋友的老股民',
    dimensions: { I: 78, L: 88, G: 70, E: 82 },
    image: 'GvOjDcMDBwxUU_NJQTIaq.png', color: '#2A1A0A', accentColor: '#E9C46A'
  },
  WAGM: {
    code: 'WAGM', name: '套牢真爱粉', englishName: 'The True Believer', system: 'I',
    quote: '不是在炒股，是在用钱投票给未来',
    description: 'We\'re All Gonna Make It. 你投资的不是股票，是信仰。你看好的不是公司，是趋势、是时代、是人类文明的方向。你愿意重仓持有五年，因为你相信这是正确的事。有人说你在赌，你说你在见证历史。',
    strengths: ['超强的持仓意志，熊市不投降', '对长期趋势的判断经常准确', '在别人恐慌时越战越勇'],
    weaknesses: ['信仰有时候会蒙蔽判断，拒绝承认逻辑被破坏', '可能把"看好赛道"变成"拒绝止损"的理由'],
    said: ['"这个赛道十年后一定对。"', '（腰斩了）"正是加仓的好时机。"'],
    strategy: '赛道分散，别把信仰押在单一标的 / 设好仓位上限 / 定期检视基本面',
    archetype: '2020年买入特斯拉后经历多次腰斩还继续持有的真信徒',
    dimensions: { I: 85, L: 92, A: 90, E: 85 },
    image: 'qgqoVxXcf_bzSByRwL0w6.png', color: '#3A1A2A', accentColor: '#F72585'
  },
  VIBE: {
    code: 'VIBE', name: '玄学大师', englishName: 'The Vibe Trader', system: 'I',
    quote: '今天的氛围不对，我不动',
    description: '你的交易逻辑是：今天市场的氛围怎么样？感觉对就进，感觉不对就观望。你没有固定系统，但有一套只有你自己能解码的直觉语言。这套语言有时候非常管用，有时候……你也说不清哪里出了问题。',
    strengths: ['灵活，不被固定框架限制', '对市场情绪有天然感知', '不会在感觉不对劲的时候强行入场'],
    weaknesses: ['缺乏可复制的方法论，难以持续优化', '"vibe"无法写进交易日志，复盘困难'],
    said: ['"感觉来了。"', '"今天不对，不动。"', '（被问为什么买）"……说不清，感觉对。"'],
    strategy: '建立基本记录习惯，把直觉可视化 / 加入简单的止损保护',
    archetype: '从来不能解释为什么买、但偶尔赚大钱的神秘老手',
    dimensions: { I: 88, T: 72, G: 65, E: 78 },
    image: 'l-6_DQmrJT_sHBfo6JQ9s.png', color: '#1A0A2A', accentColor: '#9B5DE5'
  },
  YOLO: {
    code: 'YOLO', name: '梭哈战神', englishName: 'The Happy Degen', system: 'I',
    quote: '亏了不叫亏，叫花钱买经历',
    description: 'You Only Live Once. 你不是不懂风险，你只是觉得人生太短，不能全部用来控制风险。你做交易，一部分是为了赚钱，一部分是为了感受市场的可能性。账户的起伏对你来说是游戏的一部分。',
    strengths: ['行动力和勇气是16种人格里最强的', '不会因为怕亏而错过机会', '心态好，承受波动的能力强'],
    weaknesses: ['没有系统容易亏得莫名其妙', '风险管理是最大硬伤'],
    said: ['"这把梭了。"', '"交学费了，下次聪明。"（下次依然）'],
    strategy: '设置硬性亏损上限（冒险也要有底线）/ 单笔风险不超过5%',
    archetype: '每一个曾经5倍杠杆进场、然后发了条"交学费了"朋友圈的人',
    dimensions: { I: 90, T: 90, A: 92, E: 90 },
    image: 'MPRVghXehG8EwU-PidoGW.png', color: '#2A0A0A', accentColor: '#FF4D6D'
  }
};

// Easter egg personality
const EASTER_EGG = {
  code: 'INFO', name: '消息韭菜', englishName: 'The Tip Follower', system: 'E',
  quote: '不是我判断失误，是消息不准',
  description: '你的投资决策核心驱动力是——别人说的话。群里的消息、大V的推文、朋友的"稳赚"，每一条都能让你的手指产生条件反射。你不是在分析市场，你是在追踪人类情绪的余温。',
  strengths: ['消息灵通，第一时间知道热点'],
  weaknesses: ['永远比庄家慢半步', '消息来时通常是出货时'],
  said: ['"这次消息很可靠的。"'],
  strategy: '先关掉五个股票群，再谈投资',
  archetype: '永远在高点接盘的人',
  dimensions: { I: 60, T: 85, A: 80, E: 95 },
  image: 'sleNWBbEqSz1qwIR0RG2X.png', color: '#1A1A1A', accentColor: '#8AC926',
  isEasterEgg: true,
  easterEggMsg: '🌱 恭喜解锁隐藏人格！'
};

// 计算最终人格
function calcPersonality(scores) {
  const dim1 = scores.S >= scores.I ? 'S' : 'I';
  const dim2 = scores.L >= scores.T ? 'L' : 'T';
  const dim3 = scores.A >= scores.G ? 'A' : 'G';
  const dim4 = scores.R >= scores.E ? 'R' : 'E';

  // Map 4 dimensions to code
  const MAP = {
    'SLGR': 'HODL', 'SLAR': 'DYOR', 'STGR': 'MACD', 'STAR': 'ALGO',
    'SLGE': 'PLAN', 'SLAE': 'FOMO', 'STGE': 'STOP', 'STAE': 'PUMP',
    'ILGR': 'SNIF', 'ILAR': 'MOON', 'ITGR': 'EXIT', 'ITAR': 'SURF',
    'ILGE': 'FEEL', 'ILAE': 'WAGM', 'ITVE': 'VIBE', 'ITAE': 'YOLO'
  };

  // Build key
  const key = dim1 + dim2 + (dim3 === 'G' ? 'G' : 'A') + dim4;

  // Fallback mapping for VIBE (ITGE)
  const codeMap = {
    SLGR: 'HODL', SLAR: 'DYOR', STGR: 'MACD', STAR: 'ALGO',
    SLGE: 'PLAN', SLAE: 'FOMO', STGE: 'STOP', STAE: 'PUMP',
    ILGR: 'SNIF', ILAR: 'MOON', ITGR: 'EXIT', ITAR: 'SURF',
    ILGE: 'FEEL', ILAE: 'WAGM', ITGE: 'VIBE', ITAE: 'YOLO'
  };

  return codeMap[key] || 'HODL';
}
