import { useState } from "react";
import { Link2, Copy, Check, Navigation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import API from "@/service/Api";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleShorten = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");
    setCopied(false);
    try {
      const res = await API.post("/url/create", { originalUrl });
      const shortID = res.data.shortUrl || res.data.shortID;
      setShortUrl(`http://localhost:8000/${shortID}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6fa]">
      {/* Guest Navigation */}
      <nav className="w-full bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
           <div className="flex items-center gap-2">
             <div className="bg-[#ee6123] rounded p-1">
               <Navigation size={24} className="text-white" />
             </div>
             <span className="text-2xl font-bold tracking-tight text-[#0b1736]">LinkShort</span>
           </div>
           <div className="flex items-center gap-4">
             <Link to="/login" className="text-sm font-semibold text-[#0b1736] hover:text-[#ee6123] transition-colors">Log in</Link>
             <Link to="/signup">
               <Button className="bg-[#ee6123] hover:bg-[#d5551c] text-white">Sign up Free</Button>
             </Link>
           </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="text-center mb-10 w-full max-w-3xl px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#0b1736] mb-6">
            Build stronger digital <span className="text-[#ee6123]">connections</span>
          </h1>
          <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
            Use our URL shortener to create neat and memorable links. Sign up for advanced analytics and link management.
          </p>
        </div>

        <Card className="w-full max-w-3xl border-border shadow-lg rounded-2xl overflow-hidden bg-white mx-4">
          <form onSubmit={handleShorten} className="p-4 sm:p-6">
            <h2 className="text-2xl font-bold text-[#0b1736] mb-4">Shorten a long link</h2>
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-2">
               <div className="relative w-full flex-1">
                 <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6" />
                 <Input
                   type="url"
                   placeholder="Paste your long URL here (e.g. https://example.com/very/long/url)"
                   value={originalUrl}
                   onChange={e => setOriginalUrl(e.target.value)}
                   required
                   disabled={loading}
                   className="pl-12 h-16 text-lg rounded-xl border-gray-300 focus-visible:ring-[#ee6123]"
                 />
               </div>
               <Button type="submit" disabled={loading || !originalUrl} className="h-16 px-10 w-full sm:w-auto rounded-xl bg-[#0b1736] hover:bg-[#15274d] text-white font-bold text-lg transition-colors shrink-0">
                 {loading ? "Shortening..." : "Get your link"}
               </Button>
            </div>
            
            {error && <div className="text-red-500 text-sm font-medium mt-2">{error}</div>}
            
            {shortUrl && (
              <div className="mt-6 animate-in slide-in-from-bottom-2 fade-in duration-300">
                 <div className="bg-orange-50 rounded-xl border border-orange-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                   <div className="overflow-hidden w-full">
                     <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Your new short link</p>
                     <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-[#ee6123] font-bold text-xl hover:underline truncate block">
                       {shortUrl}
                     </a>
                   </div>
                   <Button type="button" onClick={copyToClipboard} className="shrink-0 flex items-center gap-2 bg-[#ee6123] hover:bg-[#d5551c] text-white transition-colors w-full sm:w-auto h-12 px-6">
                     {copied ? <Check size={18} /> : <Copy size={18} />}
                     {copied ? "Copied!" : "Copy"}
                   </Button>
                 </div>
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}