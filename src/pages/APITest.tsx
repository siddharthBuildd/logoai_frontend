import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import APITestComponent from '@/components/APITestComponent';

const APITest = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            API Endpoint Testing
          </h1>
          <p className="text-slate-300 text-lg">
            Test all logo generation endpoints to ensure SSL certificate flow works properly
          </p>
        </div>
        
        <APITestComponent />
      </div>
    </div>
  );
};

export default APITest;
