import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Link as LinkIcon } from "lucide-react";
import toast from "react-hot-toast";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import API from "@/service/Api";
import { AuthContext } from "@/Contexts/auth.context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/Home");
  }, [user, navigate]);

  const handleLoginForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await API.post("/users/login", { email, password });

      const userData = {
        _id: data._id,
        name: data.name,
        email: data.email,
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);

      toast.success("Logged in successfully");
      navigate("/Home");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <div className="w-full max-w-md px-6">
        <div className="flex items-center justify-center mb-8 gap-2">
          <LinkIcon className="text-black w-8 h-8" />
          <span className="text-2xl font-bold tracking-tight text-black">LinkShort</span>
        </div>

        <Card className="border-border shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="space-y-1 pb-6 pt-8 text-center bg-white">
            <CardTitle className="text-2xl font-semibold tracking-tight">Welcome back</CardTitle>
            <CardDescription className="text-gray-500">
              Enter your email to access your account
            </CardDescription>
          </CardHeader>

          <CardContent className="bg-white pb-8">
            <form onSubmit={handleLoginForm} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="rounded-lg border-gray-200 focus-visible:ring-black"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10 rounded-lg border-gray-200 focus-visible:ring-black"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full rounded-lg bg-black hover:bg-gray-800 text-white transition-colors" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-500">Don't have an account? </span>
              <Link to="/signup" className="font-semibold text-black hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}