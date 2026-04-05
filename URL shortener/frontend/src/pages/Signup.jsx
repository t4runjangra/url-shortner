import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Link as LinkIcon } from "lucide-react";
import toast from "react-hot-toast";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import API from "@/service/Api";
import { AuthContext } from "@/Contexts/auth.context";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/Home");
  }, [user, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const { data } = await API.post("/users/register", { name, email, password });
      
      const userData = {
        _id: data._id,
        name: data.name,
        email: data.email,
      };
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      
      toast.success("Account created successfully");
      navigate("/Home");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <div className="w-full max-w-md px-6 my-10">
        <div className="flex items-center justify-center mb-8 gap-2">
          <LinkIcon className="text-black w-8 h-8" />
          <span className="text-2xl font-bold tracking-tight text-black">LinkShort</span>
        </div>

        <Card className="border-border shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="space-y-1 pb-6 pt-8 text-center bg-white">
            <CardTitle className="text-2xl font-semibold tracking-tight">Create an account</CardTitle>
            <CardDescription className="text-gray-500">
              Sign up to start shortening your URLs
            </CardDescription>
          </CardHeader>

          <CardContent className="bg-white pb-8">
            <form onSubmit={handleSignup} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  disabled={loading}
                  className="rounded-lg border-gray-200 focus-visible:ring-black"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="rounded-lg border-gray-200 focus-visible:ring-black"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="pr-10 rounded-lg border-gray-200 focus-visible:ring-black"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pr-10 rounded-lg border-gray-200 focus-visible:ring-black"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirm ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full rounded-lg bg-black hover:bg-gray-800 text-white transition-colors mt-2" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-500">Already have an account? </span>
              <Link to="/login" className="font-semibold text-black hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}