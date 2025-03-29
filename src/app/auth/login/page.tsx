"use client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { MdAssessment } from "react-icons/md";

export default function LoginPage() {
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  const handleGoogleLogin = () => {
    window.location.href = `${backendUrl}/auth/login`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl transform transition duration-500">
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <div className="relative">
              <MdAssessment className="text-6xl text-blue-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                J88
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">J88</h1>
          <h2 className="text-xl font-semibold text-blue-600 mb-6">
            Employee Assessment System
          </h2>
          <p className="text-gray-600 mb-8">
            Đăng nhập để tiếp tục sử dụng hệ thống
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <FcGoogle className="h-6 w-6 bg-white rounded-full" />
          </span>
          Đăng nhập với Google
        </button>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© 2025 J88 - Employee Assessment System</p>
        </div>
      </div>
    </div>
  );
}
