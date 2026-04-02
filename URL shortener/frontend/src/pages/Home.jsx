

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import API from "../service/Api";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");
    try {
      const res = await API.post("/url/create", { originalUrl });
      const shortID = res.data.shortUrl || res.data.shortID;
      setShortUrl(`{https://localhost:8000/${shortID}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>URL Shortener</CardTitle>
        </CardHeader>
        <form onSubmit={handleShorten}>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="url"
              placeholder="Enter your long URL here"
              value={originalUrl}
              onChange={e => setOriginalUrl(e.target.value)}
              required
              disabled={loading}
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {shortUrl && (
              <div className="text-green-600 text-sm break-all">
                Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="underline">{shortUrl}</a>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading || !originalUrl}>
              {loading ? "Shortening..." : "Shorten URL"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}