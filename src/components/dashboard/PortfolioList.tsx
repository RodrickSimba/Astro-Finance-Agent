
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface PortfolioItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  holdings: number;
  value: number;
}

interface PortfolioListProps {
  assets: PortfolioItem[];
}

const PortfolioList: React.FC<PortfolioListProps> = ({ assets }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) {
      return <ArrowUpIcon className="h-4 w-4 text-finance-green" />;
    } else if (change < 0) {
      return <ArrowDownIcon className="h-4 w-4 text-finance-red" />;
    }
    return null;
  };

  const getTrendClass = (change: number) => {
    return change >= 0 ? "text-finance-green" : "text-finance-red";
  };

  return (
    <Card className="bg-finance-card-bg border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Portfolio Assets</CardTitle>
        <CardDescription>Holdings managed by AI agent</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 text-sm font-medium text-muted-foreground">Asset</th>
                <th className="text-right py-3 text-sm font-medium text-muted-foreground">Price</th>
                <th className="text-right py-3 text-sm font-medium text-muted-foreground">24h</th>
                <th className="text-right py-3 text-sm font-medium text-muted-foreground">Holdings</th>
                <th className="text-right py-3 text-sm font-medium text-muted-foreground">Value</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.symbol} className="border-b border-slate-800">
                  <td className="py-3">
                    <div className="flex flex-col">
                      <span className="font-medium">{asset.symbol}</span>
                      <span className="text-xs text-slate-400">{asset.name}</span>
                    </div>
                  </td>
                  <td className="text-right py-3">{formatCurrency(asset.price)}</td>
                  <td className="text-right py-3">
                    <div className="flex items-center justify-end">
                      {getTrendIcon(asset.change)}
                      <span className={`ml-1 ${getTrendClass(asset.change)}`}>
                        {formatPercentage(asset.changePercent)}
                      </span>
                    </div>
                  </td>
                  <td className="text-right py-3">{asset.holdings.toFixed(4)}</td>
                  <td className="text-right py-3 font-medium">{formatCurrency(asset.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioList;
