import React from 'react';
import { CubeIcon, CodeBracketIcon, AcademicCapIcon, MapIcon } from '@heroicons/react/24/outline';

interface StartupNode {
  id: number;
  name: string;
  icon: JSX.Element;
  gradient: string;
}

const GalaxyView = () => {
  const startups: StartupNode[] = [
    {
      id: 1,
      name: 'Crystal View',
      icon: <CubeIcon className="h-6 w-6" />,
      gradient: 'bg-gradient-to-r from-cyan-500 to-blue-600',
    },
    {
      id: 2,
      name: 'Script&Style',
      icon: <CodeBracketIcon className="h-6 w-6" />,
      gradient: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    },
    {
      id: 3,
      name: 'ImmersiveLearn',
      icon: <AcademicCapIcon className="h-6 w-6" />,
      gradient: 'bg-gradient-to-r from-violet-500 to-purple-600',
    },
    {
      id: 4,
      name: 'ExploreExpo',
      icon: <MapIcon className="h-6 w-6" />,
      gradient: 'bg-gradient-to-r from-amber-500 to-orange-600',
    },
  ];

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Center Logo */}
      <div className="relative">
        <div className="h-40 w-40 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-lg">
          <div className="text-white text-3xl font-bold">ORIVOX</div>
        </div>
      </div>

      {/* Startup Nodes */}
      <div className="absolute inset-0">
        {startups.map((startup, index) => {
          const angle = (index / startups.length) * Math.PI * 2;
          const radius = 180;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <div
              key={startup.id}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <div className={`${startup.gradient} rounded-full p-0.5`}>
                <div className="bg-gray-900 rounded-full p-3">
                  {React.cloneElement(startup.icon, { className: 'h-6 w-6 text-white' })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GalaxyView;
