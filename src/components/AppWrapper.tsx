import { useState, useEffect } from 'react';
import SSLCertificateCheck from './SSLCertificateCheck';

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => {
  const [certificateAccepted, setCertificateAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if certificate was previously accepted (stored in localStorage)
    const wasAccepted = localStorage.getItem('ssl-certificate-accepted');
    if (wasAccepted === 'true') {
      setCertificateAccepted(true);
    }
    setIsLoading(false);
  }, []);

  const handleCertificateAccepted = () => {
    // Store acceptance in localStorage so user doesn't need to do it again
    localStorage.setItem('ssl-certificate-accepted', 'true');
    setCertificateAccepted(true);
    
    // Reload the page to ensure the app fully initializes with the certificate accepted
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!certificateAccepted) {
    return <SSLCertificateCheck onCertificateAccepted={handleCertificateAccepted} />;
  }

  return <>{children}</>;
};

export default AppWrapper;
