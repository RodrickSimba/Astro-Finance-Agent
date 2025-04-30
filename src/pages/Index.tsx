
import React, { useState, useEffect } from "react";
import PortfolioSummary from "@/components/dashboard/PortfolioSummary";
import AssetAllocation from "@/components/dashboard/AssetAllocation";
import MarketChart from "@/components/dashboard/MarketChart";
import NewsSentiment from "@/components/dashboard/NewsSentiment";
import AgentStatus from "@/components/dashboard/AgentStatus";
import ApiKeyForm from "@/components/dashboard/ApiKeyForm";
import PortfolioList from "@/components/dashboard/PortfolioList";
import { 
  portfolioData, 
  assetAllocationData, 
  generateMarketData,
  newsSentimentData,
  agentStatusData,
  portfolioAssetsData
} from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem("perplexity_api_key"));
  const [chartData, setChartData] = useState(generateMarketData(365));

  const handleSaveApiKey = (key: string) => {
    localStorage.setItem("perplexity_api_key", key);
    setApiKey(key);
  };

  return (
    <div className="min-h-screen bg-finance-dark-blue">
      <header className="border-b border-slate-800 bg-finance-card-bg">
        <div className="container py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">AstroFinance <span className="text-primary">AI</span></h1>
            <div className="text-sm text-slate-400">
              Autonomous Portfolio Management Agent
            </div>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="mb-6 bg-finance-card-bg">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <PortfolioSummary 
                  totalValue={portfolioData.totalValue} 
                  returns={portfolioData.returns} 
                  riskScore={portfolioData.riskScore} 
                />
              </div>
              <div>
                <AgentStatus 
                  status={agentStatusData.status}
                  lastUpdated={agentStatusData.lastUpdated}
                  currentStrategy={agentStatusData.currentStrategy}
                  confidenceScore={agentStatusData.confidenceScore}
                  nextAction={agentStatusData.nextAction}
                  models={agentStatusData.models}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <MarketChart data={chartData} assetName="Portfolio" />
              </div>
              <div>
                <AssetAllocation assets={assetAllocationData} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <PortfolioList assets={portfolioAssetsData} />
              </div>
              <div>
                <NewsSentiment 
                  news={newsSentimentData.news} 
                  overallSentiment={newsSentimentData.overallSentiment} 
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <PortfolioList assets={portfolioAssetsData} />
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <ApiKeyForm onSaveApiKey={handleSaveApiKey} hasApiKey={!!apiKey} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-slate-800 bg-finance-card-bg py-4">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
            <div>AstroFinance AI &copy; {new Date().getFullYear()}</div>
            <div className="text-xs mt-1 md:mt-0">
              This is a simulated environment for demonstration purposes only. Not financial advice.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
