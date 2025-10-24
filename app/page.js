"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./store/authStore";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const { login, isAuthenticated, loading, error, clearError } = useAuthStore();
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/user");
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    const result = await login(formData);

    if (result.success) {
      router.push("/user");
    }
  };

  return (
    <div
      style={{ direction: "rtl" }}
      className="flex min-h-screen items-center justify-center bg-gray-50"
    >
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            تسجيل الدخول
          </h1>
          <p className="text-gray-600">أدخل بياناتك للوصول إلى النظام</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008E9B] focus:border-transparent"
              placeholder="أدخل بريدك الإلكتروني"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              كلمة المرور
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008E9B] focus:border-transparent"
              placeholder="أدخل كلمة المرور"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              فشل في تسجيل الدخول. يرجى التحقق من البيانات المدخلة.
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#008E9B] text-white py-2 px-4 rounded-md hover:bg-[#007A85] focus:outline-none focus:ring-2 focus:ring-[#008E9B] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
}
