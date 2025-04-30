
// Mock portfolio data
export const portfolioData = {
  totalValue: 254368.42,
  returns: {
    daily: 1.28,
    weekly: -0.57,
    monthly: 7.85,
    allTime: 24.32,
  },
  riskScore: 62,
};

// Mock asset allocation data
export const assetAllocationData = [
  { name: "Stocks", value: 152621.05, color: "#2962FF" },
  { name: "Bonds", value: 45786.32, color: "#0ECB81" },
  { name: "Crypto", value: 35611.50, color: "#F6A609" },
  { name: "Cash", value: 20349.55, color: "#9BA3AF" },
];

// Generate mock chart data without using faker
export const generateMarketData = (days: number) => {
  const data = [];
  const today = new Date();
  let portfolioValue = 100000;
  let benchmarkValue = 100000;
  
  // Helper function to generate random float within a range
  const randomFloat = (min: number, max: number, precision: number = 4) => {
    const value = Math.random() * (max - min) + min;
    return parseFloat(value.toFixed(precision));
  };
  
  // Generate data points for each day
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate random price changes within realistic bounds
    const portfolioDelta = randomFloat(-0.025, 0.027);
    const benchmarkDelta = randomFloat(-0.02, 0.022);
    
    // Update values
    portfolioValue = portfolioValue * (1 + portfolioDelta);
    benchmarkValue = benchmarkValue * (1 + benchmarkDelta);
    
    // Format the date string
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    
    // Add data point
    data.push({
      date: formattedDate,
      price: randomFloat(100, 200, 2),
      portfolio: parseFloat(portfolioValue.toFixed(2)),
      benchmark: parseFloat(benchmarkValue.toFixed(2)),
    });
  }
  
  return data;
};

// Mock news sentiment data
export const newsSentimentData = {
  news: [
    {
      id: "1",
      headline: "Fed signals potential rate cuts in coming months",
      source: "Bloomberg",
      timestamp: "2h ago",
      sentiment: "positive" as const,
      impact: 78,
    },
    {
      id: "2",
      headline: "Tech sector faces headwinds as regulatory scrutiny increases",
      source: "Wall Street Journal",
      timestamp: "4h ago",
      sentiment: "negative" as const,
      impact: 62,
    },
    {
      id: "3",
      headline: "Energy stocks rally amid geopolitical tensions",
      source: "Financial Times",
      timestamp: "6h ago",
      sentiment: "positive" as const,
      impact: 45,
    },
    {
      id: "4",
      headline: "Market volatility increases as earnings season approaches",
      source: "CNBC",
      timestamp: "8h ago",
      sentiment: "neutral" as const,
      impact: 32,
    },
    {
      id: "5",
      headline: "Semiconductor shortage expected to ease by Q3",
      source: "Reuters",
      timestamp: "10h ago",
      sentiment: "positive" as const,
      impact: 56,
    },
  ],
  overallSentiment: {
    score: 23,
    trend: "up" as const,
  },
};

// Mock agent status data
export const agentStatusData = {
  status: "active" as const,
  lastUpdated: "Today, 14:32 EST",
  currentStrategy: "Defensive pivot with selective tech exposure and increased allocation to short-term bonds.",
  confidenceScore: 78,
  nextAction: "Rebalance portfolio to reduce exposure to cyclical consumer goods and increase defensive sectors.",
  models: {
    rl: "PPO",
    sentiment: "LLama-3.1-8B",
    strategy: "RAG-Enhanced",
  },
};

// Mock portfolio assets
export const portfolioAssetsData = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 187.62,
    change: 1.23,
    changePercent: 0.66,
    holdings: 150,
    value: 28143.00,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 416.78,
    change: 2.45,
    changePercent: 0.59,
    holdings: 120,
    value: 50013.60,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 175.84,
    change: -1.62,
    changePercent: -0.92,
    holdings: 95,
    value: 16704.80,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 187.42,
    change: -0.87,
    changePercent: -0.46,
    holdings: 110,
    value: 20616.20,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 106.23,
    change: 3.42,
    changePercent: 3.32,
    holdings: 200,
    value: 21246.00,
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 67842.15,
    change: 1245.32,
    changePercent: 1.87,
    holdings: 0.35,
    value: 23744.75,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 3687.42,
    change: -78.25,
    changePercent: -2.08,
    holdings: 3.2,
    value: 11799.74,
  },
  {
    symbol: "TLT",
    name: "iShares 20+ Year Treasury",
    price: 98.76,
    change: 0.36,
    changePercent: 0.37,
    holdings: 250,
    value: 24690.00,
  },
];
