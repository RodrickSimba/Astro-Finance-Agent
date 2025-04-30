
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface Asset {
  name: string;
  value: number;
  color: string;
}

interface AssetAllocationProps {
  assets: Asset[];
}

const AssetAllocation: React.FC<AssetAllocationProps> = ({ assets }) => {
  const total = assets.reduce((acc, asset) => acc + asset.value, 0);
  
  return (
    <Card className="bg-finance-card-bg border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Asset Allocation</CardTitle>
        <CardDescription>Current portfolio distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="h-[200px] w-full md:w-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assets}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {assets.map((asset, index) => (
                    <Cell key={`cell-${index}`} fill={asset.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                  labelFormatter={(name) => `${name}`}
                  contentStyle={{ backgroundColor: '#0A1929', border: '1px solid #132F4C' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="w-full md:w-auto grid grid-cols-2 md:grid-cols-1 gap-3">
            {assets.map((asset, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }}></div>
                <span className="text-sm font-medium">{asset.name}</span>
                <span className="text-sm text-muted-foreground ml-1">
                  {((asset.value / total) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetAllocation;
