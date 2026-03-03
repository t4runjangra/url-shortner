import {UAParser} from "ua-parser-js";
import {isbot} from "isbot";
import {Click} from "../model/click.model.js";
import {URL} from "../model/url.model.js";

export const trackClick = async (urlDoc, req) => {
  try {
    const userAgent = req.headers["user-agent"];

    // 1️⃣ Ignore bots
    if (isbot(userAgent)) return;

    // 2️⃣ Get IP
    // 3️⃣ Parse device info
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    const browser = result.browser.name || "Unknown";
    const os = result.os.name || "Unknown";
    const device = result.device.type || "desktop";

   

    // 5️⃣ Save Click record
    await Click.create({
      urlId: urlDoc._id,
      browser,
      os,
      device,
    });

   
    // await URL.updateOne(
    //   { _id: urlDoc._id },
    //   { $inc: { totalClicks: 1 } }
    // );
  } catch (error) {
    console.log("Tracking Error:", error.message);
  }
};                                                                 