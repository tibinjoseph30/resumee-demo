import React from 'react';

interface InactivityAlertProps {
    remainingTime: number;
}

const SessionTimeoutAlert: React.FC<InactivityAlertProps> = ({ remainingTime }) => {
    const seconds = Math.floor(remainingTime / 1000);
  return (
    <div className="fixed bg-black/25 inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-12 w-1/3 text-center">
        <div className="text-gray-700 text-2xl font-semibold mb-4">
          Your session will expire soon!
        </div>
        <div className="text-gray-500">
        You are going to logged out due to inactivity.
        </div>
        <div className='mt-2 text-sm'><span className='text-red-500 text-2xl font-semibold'>{seconds}</span> (seconds)</div>
      </div>
    </div>
  );
};

export default SessionTimeoutAlert;
