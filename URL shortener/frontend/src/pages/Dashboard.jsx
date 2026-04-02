import { useEffect, useState, useContext } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import API from "@/service/Api";
import { AuthContext } from "@/Contexts/auth.context";

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUrls = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await API.get("/url/user");
        setUrls(res.data.urls || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch URLs");
      } finally {
        setLoading(false);
      }
    };
    fetchUrls();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Your Shortened URLs</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : urls.length === 0 ? (
            <div>No URLs found.</div>
          ) : (
            <div className="space-y-4">
              {urls.map((url) => (
                <div key={url._id} className="border rounded p-3 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-medium break-all">{url.shortUrl || url.short_url}</div>
                    <div className="text-sm text-gray-500 break-all">{url.originalUrl || url.original_url}</div>
                  </div>
                  <Button
                    className="mt-2 md:mt-0"
                    onClick={() => navigator.clipboard.writeText(url.shortUrl || url.short_url)}
                  >
                    Copy
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
