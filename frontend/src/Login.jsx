import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { FiFolder } from "react-icons/fi";
import { loginWithGoogle } from "./api/authApi";
import { loginUser } from "./api/userApi";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (serverError) setServerError("");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setIsSubmitting(true);
    try {
      const data = await loginUser(formData);
      if (data.error) setServerError(data.error);
      else navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setServerError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasError = Boolean(serverError);

  return (
    <main className="grid min-h-dvh place-items-center bg-teal-50/60 px-4 py-10 text-slate-900">
      <section
        aria-labelledby="login-title"
        className="w-full max-w-md rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-950/5 sm:p-9"
      >
        <header className="mb-7">
          <div className="mb-5 flex items-center gap-3 text-sm font-semibold text-teal-900">
            <span className="rounded-xl bg-teal-100 p-2.5">
              <FiFolder aria-hidden="true" size={20} />
            </span>
            Storage App
          </div>
          <h1
            id="login-title"
            className="text-3xl font-semibold tracking-tight"
          >
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to pick up where you left off with your files.
          </p>
        </header>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-semibold"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              aria-describedby={hasError ? "login-error" : undefined}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-teal-700 focus:outline-2 focus:outline-teal-700"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              aria-describedby={hasError ? "login-error" : undefined}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-teal-700 focus:outline-2 focus:outline-teal-700"
            />
          </div>

          {hasError && (
            <p
              id="login-error"
              role="alert"
              className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
            >
              {serverError}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-teal-700 px-4 py-2.5 font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          New to Storage App?{" "}
          <Link
            className="font-semibold text-teal-800 underline-offset-4 hover:underline"
            to="/register"
          >
            Create an account
          </Link>
        </p>

        {import.meta.env.VITE_GOOGLE_CLIENT_ID && (
          <div className="mt-5 flex justify-center border-t border-slate-200 pt-5">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const data = await loginWithGoogle(
                    credentialResponse.credential,
                  );
                  if (data.error) setServerError(data.error);
                  else navigate("/");
                } catch (err) {
                  console.error("Google login failed:", err);
                  setServerError(
                    err.response?.data?.error ||
                      "Google sign-in failed. Try again.",
                  );
                }
              }}
              onError={() =>
                setServerError("Google sign-in failed. Try again.")
              }
              theme="outline"
              text="continue_with"
              useOneTap
            />
          </div>
        )}
      </section>
    </main>
  );
};

export default Login;
