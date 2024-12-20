import React from "react";
import { HomeButton } from "../../components/ui/HomeButton";
import { AdminAuthModal } from "../../components/admin/AdminAuthModal";

export const AdminAuth: React.FC = () => {
  return (
    <div className="min-h-screen bg-rose-50/30 flex items-center justify-center px-4">
      <HomeButton />
      <AdminAuthModal isOpen={true} onClose={() => {}} />
    </div>
  );
};
