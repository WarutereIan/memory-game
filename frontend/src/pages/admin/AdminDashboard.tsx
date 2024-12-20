import React from "react";
import { HomeButton } from "../../components/ui/HomeButton";
import { AdminStats } from "../../components/admin/AdminStats";
import { AdminHeader } from "../../components/admin/AdminHeader";

export const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-rose-50/30 px-4 py-8">
      <HomeButton />
      <div className="max-w-6xl mx-auto">
        <AdminHeader />
        <AdminStats />
      </div>
    </div>
  );
};
