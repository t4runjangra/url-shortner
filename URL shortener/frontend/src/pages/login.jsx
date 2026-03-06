import { useEffect, useState, useContext } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// import API from "../utils/api";
// import { AuthContext } from "../context/AuthContext";
import API from "@/service/Api";
import { AuthContext } from "@/Contexts/auth.context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/Home");
  }, [user, navigate]);

  const handleLoginForm = async (e) => {
    e.preventDefault();

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

      toast.success("Login successfully");

      navigate("/todos");
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    // <div className="min-h-screen grid item-center ">
    <div className="min-h-screen grid ">
      <form onSubmit={handleLoginForm}>
        {/* <div className="hidden md:flex items-center justify-center bg-slate-100">
          <img
            src="/lsvg.svg"
            alt="illustration"
            className="w-[400px]"
          />
        </div> */}

        <div className="flex items-center justify-center bg-white px-6">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center space-y-1">
              <CardTitle className="text-2xl font-semibold">
                Login
              </CardTitle>

              <CardDescription>
                Access your dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="example@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label>Password</Label>

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button className="w-full">Login</Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}