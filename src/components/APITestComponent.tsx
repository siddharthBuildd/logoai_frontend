import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { logoApi } from '@/services/logoApi';

interface TestResult {
  endpoint: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  duration?: number;
}

const APITestComponent = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([
    { endpoint: '/api/health', status: 'pending', message: 'Not tested' },
    { endpoint: '/api/logo/generate', status: 'pending', message: 'Not tested' },
    { endpoint: '/api/logo/enhance', status: 'pending', message: 'Not tested' },
    { endpoint: '/api/logo/reference', status: 'pending', message: 'Not tested' },
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const updateResult = (endpoint: string, status: TestResult['status'], message: string, duration?: number) => {
    setTestResults(prev => prev.map(result => 
      result.endpoint === endpoint 
        ? { ...result, status, message, duration }
        : result
    ));
  };

  const testHealthEndpoint = async () => {
    const startTime = Date.now();
    try {
      await logoApi.healthCheck();
      const duration = Date.now() - startTime;
      updateResult('/api/health', 'success', 'Health check passed', duration);
    } catch (error: any) {
      const duration = Date.now() - startTime;
      updateResult('/api/health', 'error', error.message || 'Health check failed', duration);
    }
  };

  const testGenerateEndpoint = async () => {
    const startTime = Date.now();
    try {
      await logoApi.generateLogo('test logo', {
        business_type: 'Technology',
        style: 'modern',
        colors: ['blue', 'white']
      });
      const duration = Date.now() - startTime;
      updateResult('/api/logo/generate', 'success', 'Generate endpoint working', duration);
    } catch (error: any) {
      const duration = Date.now() - startTime;
      updateResult('/api/logo/generate', 'error', error.message || 'Generate failed', duration);
    }
  };

  const testEnhanceEndpoint = async () => {
    const startTime = Date.now();
    try {
      // Create a small test image file
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#3B82F6';
        ctx.fillRect(0, 0, 100, 100);
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('TEST', 25, 55);
      }
      
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), 'image/png');
      });
      
      const file = new File([blob], 'test-logo.png', { type: 'image/png' });
      
      await logoApi.enhanceLogo(file, {
        enhancement_type: 'quality',
        style: 'modern'
      });
      const duration = Date.now() - startTime;
      updateResult('/api/logo/enhance', 'success', 'Enhance endpoint working', duration);
    } catch (error: any) {
      const duration = Date.now() - startTime;
      updateResult('/api/logo/enhance', 'error', error.message || 'Enhance failed', duration);
    }
  };

  const testReferenceEndpoint = async () => {
    const startTime = Date.now();
    try {
      // Create a small test image file
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#10B981';
        ctx.fillRect(0, 0, 100, 100);
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText('REF', 30, 55);
      }
      
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), 'image/png');
      });
      
      const file = new File([blob], 'test-reference.png', { type: 'image/png' });
      
      await logoApi.createFromReference(file, {
        business_name: 'Test Company',
        style: 'modern',
        modifications: ['Change colors']
      });
      const duration = Date.now() - startTime;
      updateResult('/api/logo/reference', 'success', 'Reference endpoint working', duration);
    } catch (error: any) {
      const duration = Date.now() - startTime;
      updateResult('/api/logo/reference', 'error', error.message || 'Reference failed', duration);
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    
    // Reset all results
    setTestResults(prev => prev.map(result => ({ 
      ...result, 
      status: 'pending' as const, 
      message: 'Testing...' 
    })));

    // Run tests sequentially
    await testHealthEndpoint();
    await testGenerateEndpoint();
    await testEnhanceEndpoint();
    await testReferenceEndpoint();
    
    setIsRunning(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    const variants = {
      success: 'bg-green-500/20 text-green-400 border-green-500/20',
      error: 'bg-red-500/20 text-red-400 border-red-500/20',
      pending: 'bg-gray-500/20 text-gray-400 border-gray-500/20'
    };
    
    return (
      <Badge className={`${variants[status]} border`}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white">API Endpoint Test</CardTitle>
        <CardDescription className="text-slate-300">
          Test all logo generation endpoints with SSL certificate flow
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={runAllTests} 
          disabled={isRunning}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isRunning ? 'Running Tests...' : 'Run All Tests'}
        </Button>
        
        <div className="space-y-3">
          {testResults.map((result) => (
            <div 
              key={result.endpoint}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(result.status)}
                <div>
                  <p className="text-white font-medium">{result.endpoint}</p>
                  <p className="text-slate-400 text-sm">{result.message}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {result.duration && (
                  <span className="text-slate-400 text-xs">
                    {result.duration}ms
                  </span>
                )}
                {getStatusBadge(result.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default APITestComponent;
