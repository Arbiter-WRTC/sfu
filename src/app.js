import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import SFU from './classes/SFU';
import 'dotenv/config';

/*
run this to run SFU locally to generate self-signed certificates
UBUNTU: openssl req -new -neopenssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout server.key -out server.crt
MACOS: openssl req -newkey rsa:2048 -days 365 -nodes -x509 -keyout server.key -out server.crt
*/

const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app = express();
const httpsServer = https.createServer(credentials, app);

app.use(cors());
const RTC_CONFIG = JSON.parse(process.env.RTC_CONFIG) || null;
// const SIGNAL_SERVER_URL = process.env.SIGNAL_SERVER_URL;

const SIGNAL_SERVER_URL =
  'wss://rufdlv7k6k.execute-api.us-east-2.amazonaws.com/production';

const sfu = new SFU(SIGNAL_SERVER_URL, RTC_CONFIG);

export default httpsServer;
