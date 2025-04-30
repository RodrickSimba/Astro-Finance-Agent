
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronUp, ChevronDown, Newspaper, TrendingUp, TrendingDown } from "lucide-react";

interface NewsItem {
  id: string;
  headline: string;
  source: string;
  timestamp: string;
  sentiment: "positive" | "negative" | "neutral";
  impact: number; // 0-100 scale
}

interface NewsSentimentProps {
  news: NewsItem[];
  overallSentiment: {
    score: number; // -100 to 100
    trend: "up" | "down" | "neutral";
  };
}

const NewsSentiment: React.FC<NewsSentimentProps> = ({ news, overallSentiment }) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-finance-green";
      case "negative":
        return "text-finance-red";
      default:
        return "text-white";
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <ChevronUp className="h-4 w-4 text-finance-green" />;
      case "negative":
        return <ChevronDown className="h-4 w-4 text-finance-red" />;
      default:
        return null;
    }
  };

  const getSentimentTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-5 w-5 text-finance-green" />;
      case "down":
        return <TrendingDown className="h-5 w-5 text-finance-red" />;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-finance-card-bg border-none shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">News Sentiment</CardTitle>
            <CardDescription>AI-analyzed market sentiment</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {getSentimentTrendIcon(overallSentiment.trend)}
              <span className={`ml-1 font-medium ${
                overallSentiment.score > 0 
                  ? "text-finance-green" 
                  : overallSentiment.score < 0 
                  ? "text-finance-red" 
                  : ""
              }`}>
                {overallSentiment.score > 0 ? "+" : ""}{overallSentiment.score}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
          {news.map((item) => (
            <div key={item.id} className="flex items-start gap-3 border-b border-slate-800 pb-3">
              <div className="mt-0.5 bg-slate-800 rounded p-1">
                <Newspaper className="h-4 w-4 text-slate-400" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">{item.headline}</h4>
                  <div className="flex items-center gap-1 whitespace-nowrap">
                    {getSentimentIcon(item.sentiment)}
                    <span className={`text-xs ${getSentimentColor(item.sentiment)}`}>
                      {item.impact}%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-slate-400">{item.source}</span>
                  <span className="text-xs text-slate-500">{item.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsSentiment;
