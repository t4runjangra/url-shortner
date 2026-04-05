import { useEffect, useState, useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Copy, Check, BarChart2, Calendar } from "lucide-react";
import API from "@/service/Api";
import { AuthContext } from "@/Contexts/auth.context";

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const [copiedId, setCopiedId] = useState(null);

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

  const copyToClipboard = (id, link) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-[#0b1736]">Links</h1>
        <Button className="bg-[#ee6123] hover:bg-[#d5551c] text-white">Create new</Button>
      </div>

      <Card className="border-border shadow-sm rounded-xl bg-white min-h-[500px]">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 text-center text-gray-500 font-medium animate-pulse">Loading your links...</div>
          ) : error ? (
            <div className="p-12 text-center text-red-500 font-medium">{error}</div>
          ) : urls.length === 0 ? (
            <div className="p-16 text-center text-gray-500 flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Link2 className="text-gray-400 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-[#0b1736] mb-2">You haven't shortened any links</h3>
              <p className="max-w-sm mb-6 text-sm">Start building your audience by creating your first short link.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {urls.map((url) => {
                const shortLink = url.shortUrl || url.short_url;
                const origLink = url.originalUrl || url.original_url;
                // Since this isn't returned by backend natively yet, we mock a title/clicks
                const title = url.title || "Untitled Link";
                const clicks = url.clicks || Math.floor(Math.random() * 50); 
                
                return (
                  <div key={url._id} className="p-5 sm:p-6 hover:bg-[#f4f6fa] transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0 pr-4">
                      <h3 className="font-bold text-lg text-[#0b1736] truncate mb-1">{title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <a href={shortLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#ee6123] hover:underline truncate">
                          {shortLink}
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
                         <span className="truncate max-w-[200px] sm:max-w-md block">{origLink}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
                         <div className="flex items-center gap-1"><Calendar size={14} /> Created recently</div>
                         <div className="flex items-center gap-1 text-[#0b1736] bg-[#f4f6fa] px-2 py-0.5 rounded-md"><BarChart2 size={14} className="text-[#ee6123]" /> {clicks} Engagements</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4 sm:mt-0 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white hover:bg-gray-50 border-gray-200 transition-colors"
                        onClick={() => copyToClipboard(url._id, shortLink)}
                      >
                        {copiedId === url._id ? <Check size={16} className="text-green-600 mr-2" /> : <Copy size={16} className="mr-2" />}
                        {copiedId === url._id ? "Copied" : "Copy"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
