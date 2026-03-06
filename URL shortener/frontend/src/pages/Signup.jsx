import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

export default function Signup() {

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="min-h-screen grid"> 

      {/* LEFT SIDE FORM  md:grid-cols-2*/}
      <div className="flex items-center justify-center bg-white px-6">

        <Card className="w-full max-w-md shadow-lg">

          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-semibold">
              Create Account
            </CardTitle>

            <CardDescription>
              Sign up to start shortening your URLs
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">

            {/* Name */}
            <div className="space-y-2">
              <Label>Name</Label>
              <Input placeholder="Your name" />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="example@email.com" />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label>Confirm Password</Label>

              <div className="relative">
                <Input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirm ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>

            <Button className="w-full">
              Create Account
            </Button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <span className="font-medium text-black cursor-pointer hover:underline">
                Login
              </span>
            </p>

          </CardContent>
        </Card>

      </div>


      {/* RIGHT SIDE IMAGE */}
      {/* <div className="hidden md:flex items-center justify-center bg-gray-100">

        <img
          src="/public/lsvg.svg"
          alt="URL Shortener"
          className="w-[420px]"
        />

      </div> */}

    </div>
  )
}