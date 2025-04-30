
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface PortfolioSummaryProps {
  totalValue: number;
  returns: {
    daily: number;
    weekly: number;
    monthly: number;
    allTime: number;
  };
  riskScore: number;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  totalValue,
  returns,
  riskScore,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    const formattedValue = new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);

    return value >= 0 ? `+${formattedValue}` : formattedValue;
  };

  const getReturnColorClass = (value: number) => {
    return value >= 0 ? "text-finance-green" : "text-finance-red";
  };

  return (
    <Card className="bg-finance-card-bg border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Portfolio Summary</CardTitle>
        <CardDescription>Real-time portfolio metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-sm font-medium text-muted-foreground">Total Value</h3>
            <p className="text-3xl font-bold">{formatCurrency(totalValue)}</p>
            <div className="mt-2">
              <span className={`text-sm font-medium ${getReturnColorClass(returns.daily)}`}>
                {formatPercentage(returns.daily)} today
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Weekly Return</h3>
              <p className={`text-lg font-bold ${getReturnColorClass(returns.weekly)}`}>
                {formatPercentage(returns.weekly)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Monthly Return</h3>
              <p className={`text-lg font-bold ${getReturnColorClass(returns.monthly)}`}>
                {formatPercentage(returns.monthly)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">All-Time Return</h3>
              <p className={`text-lg font-bold ${getReturnColorClass(returns.allTime)}`}>
                {formatPercentage(returns.allTime)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Risk Score</h3>
              <div className="w-12 h-12 mx-auto">
                <CircularProgressbar 
                  value={riskScore} 
                  maxValue={100} 
                  text={`${riskScore}`} 
                  styles={buildStyles({
                    textSize: '32px',
                    pathColor: riskScore > 75 ? '#F6465D' : riskScore > 50 ? '#f39c12' : '#0ECB81',
                    textColor: 'white',
                    trailColor: 'rgba(255,255,255,0.1)',
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummary;
