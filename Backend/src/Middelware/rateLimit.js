import ratelimit from "../config/upstash.js";

const rateLimit = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-api-key");
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }
    next();
  } catch (error) {
    console.error("Rate limit error:", error);
    next(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default rateLimit;
