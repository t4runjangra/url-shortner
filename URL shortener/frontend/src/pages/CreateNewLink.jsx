import API from '@/service/Api'
import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Link2, Copy, Check, Navigation } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



function CreateNewLink() {
    const [createUrl, setCreateurl] = useState("")
    const [shortUrl, setShortUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [copied, setCopied] = useState(false);
    const [qr, setQr] = useState(false)
    const [qrCode, setQRCode] = useState("")
    const [showQrId, setShowQrId] = useState(null);

    async function handleShorten(e) {
        e.preventDefault()
        setLoading(true);
        setError("");
        setShortUrl("");
        setQr(false)
        try {
            const res = await API.post("/url/create", {
                originalUrl: createUrl,
                qrcode: qr
            })
            setQRCode(res.data.newUrl?.Qrcode);
            console.log(

                res?.newUrl?.Qrcode
            );


            const shortID = res.data.newUrl.shortID;
            setShortUrl(`http://localhost:8000/${shortID}`)
        } catch (error) {
            setError(error.response?.data?.message || "Failed to shorten URL");
            console.log(error.message);

        }
        finally {
            setLoading(false)
        }
    }

    const copyToClipboard = () => {
        if (shortUrl) {
            navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <>
            <Card className="w-full max-w-3xl border-border shadow-lg rounded-2xl overflow-hidden bg-white mx-4">
                <form onSubmit={handleShorten} className="p-4 sm:p-6">
                    <h2 className="text-2xl font-bold text-navy mb-4">Shorten a long link</h2>
                    <div className="flex flex-col sm:flex-row gap-4 items-center mb-2">
                        <div className="relative w-full flex-1">
                            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6" />
                            <Input
                                type="url"
                                placeholder="Paste your long URL here (e.g. https://example.com/very/long/url)"
                                value={createUrl}
                                onChange={e => setCreateurl(e.target.value)}
                                required
                                disabled={loading}
                                className="pl-12 h-16 text-lg rounded-xl border-gray-300 focus-visible:ring-orange"
                            />
                        </div>
                        <Button type="submit" disabled={loading || !createUrl} className="h-16 px-10 w-full sm:w-auto rounded-xl bg-navy hover:bg-[#15274d] text-white font-bold text-lg transition-colors shrink-0">
                            {loading ? "Shortening..." : "Get your link"}
                        </Button>
                    </div>
                    <input
                        type="checkbox"
                        checked={qr}
                        onChange={(e) => setQr(e.target.checked)}
                    /> {" "}
                    <span>Also create a QR Code for this link</span>

                    {error && <div className="text-red-500 text-sm font-medium mt-2">{error}</div>}


                    {shortUrl && (
                        <div className="mt-6 animate-in slide-in-from-bottom-2 fade-in duration-300">
                            <div className="bg-orange-50 rounded-xl border border-orange-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="overflow-hidden w-full">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Your new short link</p>
                                    <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-orange font-bold text-xl hover:underline truncate block">
                                        {shortUrl}
                                    </a>
                                </div>
                                <Button type="button" onClick={copyToClipboard} className="shrink-0 flex items-center gap-2 bg-orange hover:bg-[#d5551c] text-white transition-colors w-full sm:w-auto h-12 px-6">
                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                    {copied ? "Copied!" : "Copy"}
                                </Button>
                                <Button
                                    type="button"
                                    variant='outline'
                                    className="shrink-0 flex items-center gap-2 bg-orange-400 hover:bg-[#d5551c] text-white transition-colors w-full sm:w-auto h-12 px-6"
                                    onClick={()=>{setShowQrId(showQrId === qrCode? null: qrCode)}}
                                >

                            {showQrId  === qrCode ? "Hide QR" : "Show Qr"}
                                </Button>
                            </div>
                        </div>
                    )}
                    {
                        showQrId === qrCode &&  (
                            <img
                                src={qrCode}
                                alt="QR Code"
                                className="w-72 h-72 rounded-lg items-center border"
                            />
                        )
                    }
                </form>
            </Card>
        </>
    )
}

export default CreateNewLink
