const express = require('express')
const { ServerConfig, Logger } = require('./config')
const apiRoutes = require('./routes')
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express()

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20, // limit each IP to 20 requests per 'window' (here 5 minutes)
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

const flightServiceApiProxy = createProxyMiddleware({
  target: ServerConfig.FLIGHT_SERVICE,
  changeOrigin: true,
  pathRewrite: { '^/flightsService': '/' },
});
app.use("/flightsService", flightServiceApiProxy);

const bookingServiceApiProxy = createProxyMiddleware({
  target: ServerConfig.BOOKING_SERVICE,
  changeOrigin: true,
  pathRewrite: { '^/bookingService': '/' },
});
app.use("/bookingService", bookingServiceApiProxy);

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Port is running on ${ServerConfig.PORT}`);
  // Logger.info("Successfully started the server", {})
})