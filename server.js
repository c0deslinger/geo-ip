import express from "express";
import geoip from "geoip-lite";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // For local testing, use a known IP address
  if (ip === "::1" || ip === "127.0.0.1") {
    ip = "8.8.8.8"; // Google's public DNS server IP address for testing
  }

  const geo = geoip.lookup(ip);

  if (geo) {
    const { country, region, city } = geo;
    return res.json({
      ip,
      country,
      countryName: geoip.pretty(country),
      region,
      city,
    });
  } else {
    return res.status(404).json({ message: "Location not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
