
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AgentStatusProps {
  status: "active" | "learning" | "idle";
  lastUpdated: string;
  currentStrategy: string;
  confidenceScore: number;
  nextAction?: string;
  models: {
    rl: string;
    sentiment: string;
    strategy: string;
  };
}

const AgentStatus: React.FC<AgentStatusProps> = ({
  status,
  lastUpdated,
  currentStrategy,
  confidenceScore,
  nextAction,
  models,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-finance-green";
      case "learning":
        return "bg-amber-500";
      case "idle":
        return "bg-slate-500";
      default:
        return "bg-slate-500";
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return "text-finance-green";
    if (score >= 50) return "text-amber-500";
    return "text-finance-red";
  };

  return (
    <Card className="bg-finance-card-bg border-none shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold">AI Agent Status</CardTitle>
            <CardDescription>Reinforcement learning portfolio manager</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${getStatusColor(status)} animate-pulse-slow`}></div>
            <span className="font-medium capitalize">{status}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Cpu className="h-6 w-6 text-primary" />
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-medium">Current Strategy</h4>
                <span className="text-sm">Last updated: {lastUpdated}</span>
              </div>
              <p className="text-sm mt-1 text-finance-chart">{currentStrategy}</p>
            </div>
          </div>
          
          <div className="bg-finance-dark-blue rounded-md p-3">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Strategy Confidence</span>
              <span className={`font-bold ${getConfidenceColor(confidenceScore)}`}>
                {confidenceScore}%
              </span>
            </div>
            
            {nextAction && (
              <div className="mt-3">
                <span className="text-sm font-medium">Next Planned Action</span>
                <p className="text-sm text-slate-300 mt-1">{nextAction}</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-primary" />
            <div className="flex-1">
              <h4 className="font-medium mb-1">Active Models</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-finance-dark-blue">RL: {models.rl}</Badge>
                <Badge variant="outline" className="bg-finance-dark-blue">Sentiment: {models.sentiment}</Badge>
                <Badge variant="outline" className="bg-finance-dark-blue">Strategy: {models.strategy}</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentStatus;
