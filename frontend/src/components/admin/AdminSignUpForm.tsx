import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { adminService } from "../../services/adminService";
import { useAdminStore } from "../../store/adminStore";
import { AdminSignUpData } from "../../types/admin";
import { z } from "zod";

const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  adminCode: z.string().min(1, "Admin code is required"),
});

interface AdminSignUpFormProps {
  onSuccess?: () => void;
}

const AdminSignUpForm: React.FC<AdminSignUpFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AdminSignUpData>({
    username: "",
    email: "",
    password: "",
    adminCode: "",
  });
  const [error, setError] = useState<string>("");
  const setUser = useAdminStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const validatedData = signUpSchema.parse(formData);
      const user = await adminService.signup(validatedData);
      setUser(user);
      onSuccess?.();
      navigate("/admin"); // Auto-navigate to admin dashboard
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
        return;
      }
      setError(err.response?.data?.msg || "Sign up failed");
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
          Username
        </label>
        <input
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:border-rose-400 outline-none"
          required
        />
      </div>

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

      <div>
        <label className="block text-sm font-serif italic mb-1 text-gray-600">
          Admin Code
        </label>
        <input
          type="password"
          value={formData.adminCode}
          onChange={(e) =>
            setFormData({ ...formData, adminCode: e.target.value })
          }
          className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:border-rose-400 outline-none"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition-colors flex items-center justify-center gap-2"
      >
        <UserPlus className="w-4 h-4" />
        <span className="font-serif italic">Register as Admin</span>
      </button>
    </form>
  );
};

export default AdminSignUpForm;
