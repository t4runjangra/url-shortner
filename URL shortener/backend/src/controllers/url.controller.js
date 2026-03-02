import { URL } from "../model/url.model.js";
import  {nanoid}  from "nanoid";

export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl || originalUrl.trim() === "") {
      return res.status(400).json({ message: "Original URL is required" });
    }
    let shortID;
    let existing;
   
    do {
      shortID = nanoid(7);
      existing = await URL.findOne({ shortID });
    } while (existing);

    const newUrl = await URL.create({
      shortID,
      originalUrl: originalUrl.trim(),
      userID: req.user._id, 
    });

    return res.status(201).json({
      message: "Short URL created successfully",
      newUrl
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { shortID } = req.params;

    const urlDoc = await URL.findOne({ shortID });

    // console.log(urlDoc);

    if (!urlDoc) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    urlDoc.totalClicks += 1;
    await urlDoc.save();

    return res.redirect(urlDoc.originalUrl);

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMyUrl = async (req, res) => {
  try {
    const urls = await URL.find({ userID: req.user._id });

    return res.status(200).json({ urls });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};