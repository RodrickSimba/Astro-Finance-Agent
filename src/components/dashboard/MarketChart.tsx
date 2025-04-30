
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Button } from "@/components/ui/button";

interface MarketDataPoint {
  date: string;
  price: number;
  portfolio: number;
  benchmark: number;
}

interface MarketChartProps {
  data: MarketDataPoint[];
  assetName: string;
}

type TimeframeOption = "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL";

const MarketChart: React.FC<MarketChartProps> = ({ data, assetName }) => {
  const [timeframe, setTimeframe] = useState<TimeframeOption>("1M");
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Filter data based on timeframe
  const filteredData = data.slice(-getTimeframeDays(timeframe));

  function getTimeframeDays(timeframe: TimeframeOption): number {
    switch (timeframe) {
      case "1D": return 1;
      case "1W": return 7;
      case "1M": return 30;
      case "3M": return 90;
      case "1Y": return 365;
      case "ALL": return data.length;
      default: return 30;
    }
  }

  return (
    <Card className="bg-finance-card-bg border-none shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold">{assetName} Performance</CardTitle>
            <CardDescription>Portfolio vs Benchmark</CardDescription>
          </div>
          <div className="flex gap-1">
            {(["1D", "1W", "1M", "3M", "1Y", "ALL"] as TimeframeOption[]).map((option) => (
              <Button
                key={option}
                variant={timeframe === option ? "default" : "outline"}
                className={`px-2 py-1 h-8 ${
                  timeframe === option ? "" : "bg-finance-dark-blue"
                }`}
                onClick={() => setTimeframe(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filteredData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                tickLine={false}
                tickFormatter={(value) => {
                  // Format based on timeframe
                  if (timeframe === "1D") {
                    return value.split(" ")[1]; // Just show time for 1D
                  } 
                  return value.split(" ")[0]; // Show date otherwise
                }}
                stroke="#888" 
              />
              <YAxis 
                tickFormatter={(value) => `$${value}`}
                domain={['dataMin - 1', 'dataMax + 1']} 
                tickLine={false}
                stroke="#888" 
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), ""]}
                contentStyle={{ backgroundColor: '#0A1929', border: '1px solid #132F4C' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="portfolio" 
                stroke="#2962FF" 
                strokeWidth={2}
                dot={false} 
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="benchmark" 
                stroke="#0ECB81" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketChart;
