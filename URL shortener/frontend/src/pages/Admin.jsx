import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import API from "@/service/Api";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await API.get("/admin/users");
        setUsers(res.data.users || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Admin Panel - All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : users.length === 0 ? (
            <div>No users found.</div>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user._id} className="border rounded p-3 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-medium break-all">{user.name}</div>
                    <div className="text-sm text-gray-500 break-all">{user.email}</div>
                  </div>
                  {/* Add more admin actions here if needed */}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
