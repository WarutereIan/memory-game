import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
    <div className="flex items-center gap-3 mb-3">
      <div className="text-rose-400 p-2 bg-rose-50 rounded-full">
        {icon}
      </div>
      <h3 className="font-serif italic text-gray-600">{title}</h3>
    </div>
    <p className="text-3xl font-medium">{value}</p>
  </div>
);