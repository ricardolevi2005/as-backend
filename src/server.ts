import "dotenv/config";
import express from "express";
import fs from "fs";
import cors from "cors";
import https from "https";
import http from "http";
import siteRoutes from "./routes/site";
import adminRoutes from "./routes/admin";
import { requestInterceptor } from "./utils/requestInterceptor";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("*", requestInterceptor);

app.use("/admin", adminRoutes);
app.use("/", siteRoutes);

const runServer = (port: number, server: http.Server) => {
  server.listen(port, () => {
    console.log(`🚀 Running on PORT ${port}`);
  });
};

const regularServer = http.createServer(app);
if (process.env.NODE_ENV === "production") {
  const options = {
    key: fs.readFileSync(process.env.SSS_KEY as string),
    cert: fs.readFileSync(process.env.SSS_CERT as string),
  };

  const secServer = https.createServer(options, app);

  runServer(80, regularServer);
  runServer(443, secServer);
} else {
  const serverPort: number = process.env.PORT
    ? parseInt(process.env.PORT)
    : 9000;
  runServer(serverPort, regularServer);
}
