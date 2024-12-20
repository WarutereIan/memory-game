import React from "react";

interface AdminStatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple" | "amber";
}

const colorClasses = {
  blue: "bg-blue-50 text-blue-500",
  green: "bg-green-50 text-green-500",
  purple: "bg-purple-50 text-purple-500",
  amber: "bg-amber-50 text-amber-500",
};

export const AdminStatCard: React.FC<AdminStatCardProps> = ({
  title,
  value,
  icon,
  color,
}) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
    <div className="flex items-center gap-3 mb-3">
      <div className={`p-3 rounded-full ${colorClasses[color]}`}>{icon}</div>
      <h3 className="font-serif italic text-gray-600">{title}</h3>
    </div>
    <p className="text-3xl font-medium">{value.toLocaleString()}</p>
  </div>
);
