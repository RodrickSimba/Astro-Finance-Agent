
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key, Shield } from "lucide-react";
import { toast } from "sonner";

interface ApiKeyFormProps {
  onSaveApiKey: (key: string) => void;
  hasApiKey: boolean;
}

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ onSaveApiKey, hasApiKey }) => {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveKey = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      onSaveApiKey(apiKey);
      setApiKey("");
      setIsLoading(false);
      toast.success("API key saved successfully");
    }, 1000);
  };

  return (
    <Card className="bg-finance-card-bg border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">API Configuration</CardTitle>
        <CardDescription>
          {hasApiKey 
            ? "Your API key is configured" 
            : "Enter your Perplexity API key to enable AI features"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <div>
              <h4 className="font-medium">Security Notice</h4>
              <p className="text-sm text-muted-foreground">
                Your API key is stored locally in your browser and never sent to our servers
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Key className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="password"
              placeholder={hasApiKey ? "●●●●●●●●●●●●●●●●●●" : "Enter your Perplexity API key"}
              className="pl-9 bg-finance-dark-blue border-slate-700"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSaveKey}
          disabled={isLoading || !apiKey.trim()}
        >
          {isLoading ? "Saving..." : hasApiKey ? "Update API Key" : "Save API Key"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApiKeyForm;
