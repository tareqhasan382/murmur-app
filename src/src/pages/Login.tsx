import { useState } from "react";
import { useLoginMutation } from "../redux/auth/authApi";

export default function Login() {
  const [login, { isLoading, isError }] = useLoginMutation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccess(null);

    try {
      await login({
        email: form.email,
        password: form.password,
      }).unwrap();

      setSuccess("Account created successfully");
      setForm({email: "", password: "" });
    } catch (err) {
        console.log(err)
      // error handled by isError
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center">Login Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          

          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {(localError || isError) && (
            <p className="text-sm text-red-600">
              {localError || "Signup failed"}
            </p>
          )}

          {success && <p className="text-sm text-green-600">{success}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            {isLoading ? "Loging..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          New user? <span className="text-blue-600 cursor-pointer">Register</span>
        </p>
      </div>
    </div>
  );
}
