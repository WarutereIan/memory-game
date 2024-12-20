import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { adminService } from "../../services/adminService";
import { useAdminStore } from "../../store/adminStore";
import { AdminLoginData } from "../../types/admin";

interface AdminLoginFormProps {
  onSuccess?: () => void;
}

const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AdminLoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const setUser = useAdminStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const user = await adminService.login(formData);
      setUser(user);
      onSuccess?.();
      navigate("/admin"); // Navigate to admin dashboard after successful login
    } catch (err: any) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-500 rounded-lg text-sm italic">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-serif italic mb-1 text-gray-600">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:border-rose-400 outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-serif italic mb-1 text-gray-600">
          Password
        </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:border-rose-400 outline-none"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition-colors flex items-center justify-center gap-2"
      >
        <LogIn className="w-4 h-4" />
        <span className="font-serif italic">Login as Admin</span>
      </button>
    </form>
  );
};

export default AdminLoginForm;
