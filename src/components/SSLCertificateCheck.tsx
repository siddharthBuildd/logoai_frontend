import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';

interface SSLCertificateCheckProps {
  onCertificateAccepted: () => void;
}

const SSLCertificateCheck = ({ onCertificateAccepted }: SSLCertificateCheckProps) => {
  const [isChecking, setIsChecking] = useState(false);
  const [certificateStatus, setCertificateStatus] = useState<'pending' | 'accepted' | 'rejected'>('pending');
  
  const API_HEALTH_URL = 'https://43.205.236.159/api/health';

  const checkCertificate = async () => {
    setIsChecking(true);
    try {
      const response = await fetch(API_HEALTH_URL, {
        method: 'GET',
        mode: 'cors',
      });
      
      if (response.ok) {
        setCertificateStatus('accepted');
        setTimeout(() => {
          onCertificateAccepted();
        }, 1500);
      } else {
        setCertificateStatus('rejected');
      }
    } catch (error) {
      console.log('Certificate check failed:', error);
      setCertificateStatus('rejected');
    } finally {
      setIsChecking(false);
    }
  };

  const openCertificatePage = () => {
    // Open the API health endpoint in a new tab for certificate acceptance
    window.open(API_HEALTH_URL, '_blank', 'width=800,height=600');
  };

  useEffect(() => {
    // Auto-check certificate on component mount
    checkCertificate();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-blue-500/20 rounded-full w-fit">
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Security Certificate Setup
          </CardTitle>
          <CardDescription className="text-slate-300">
            We need to establish a secure connection to our AI servers
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {certificateStatus === 'pending' && (
            <>
              <div className="text-center space-y-4">
                <p className="text-slate-300 text-sm">
                  To ensure secure communication with our AI logo generation service, 
                  please accept our security certificate.
                </p>
                
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div className="text-left">
                      <p className="text-amber-200 text-sm font-medium">
                        One-time setup required
                      </p>
                      <p className="text-amber-300/80 text-xs mt-1">
                        You'll see a security warning - this is normal for our development server
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={openCertificatePage}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Accept Security Certificate
                </Button>
                
                <Button 
                  onClick={checkCertificate}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                  disabled={isChecking}
                >
                  {isChecking ? 'Checking...' : 'I\'ve Accepted - Continue'}
                </Button>
              </div>
              
              <div className="text-xs text-slate-400 text-center space-y-2">
                <p>
                  <strong>Steps:</strong>
                </p>
                <ol className="text-left space-y-1 ml-4">
                  <li>1. Click "Accept Security Certificate"</li>
                  <li>2. Click "Advanced" on the warning page</li>
                  <li>3. Click "Proceed to 43.205.236.159 (unsafe)"</li>
                  <li>4. Return here and click "Continue"</li>
                </ol>
              </div>
            </>
          )}

          {certificateStatus === 'accepted' && (
            <div className="text-center space-y-4">
              <div className="mx-auto p-3 bg-green-500/20 rounded-full w-fit">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Certificate Accepted!
                </h3>
                <p className="text-slate-300 text-sm">
                  Secure connection established. Redirecting to LogoAI...
                </p>
              </div>
            </div>
          )}

          {certificateStatus === 'rejected' && (
            <div className="text-center space-y-4">
              <div className="mx-auto p-3 bg-red-500/20 rounded-full w-fit">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Certificate Not Accepted
                </h3>
                <p className="text-slate-300 text-sm mb-4">
                  Please accept the security certificate to continue
                </p>
                <Button 
                  onClick={() => {
                    setCertificateStatus('pending');
                    openCertificatePage();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SSLCertificateCheck;
