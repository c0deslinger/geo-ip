const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let vercelCountry = req.headers['X-Vercel-IP-Country'];
  let vercelCountryRegion = req.headers['X-Vercel-IP-Country-Region'];
  let vercelCity = req.headers['X-Vercel-IP-City'];

  return res.json({ip, vercelCountry, vercelCountryRegion, vercelCity});

//   // For local testing, use a known IP address
//   if (ip === '::1' || ip === '127.0.0.1') {
//     ip = '8.8.8.8'; // Google's public DNS server IP address for testing
//   }

//   console.log('IP Address:', ip); // Debugging purpose

//   const geo = geoip.lookup(ip);
//   console.log('Geo Lookup Result:', geo); // Debugging purpose

//   if (geo) {
//     const { country, region, city } = geo;
//     return res.json({
//       ip,
//       country,
//       countryName: geoip.pretty(country),
//       region,
//       city,
//     });
//   } else {
//     return res.status(404).json({ message: 'Location not found' });
//   }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;