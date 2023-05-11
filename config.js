import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  FB_API_TOKEN: process.env.FB_API_TOKEN,
  HUBSPOT_API_KEY: process.env.HUBSPOT_API_KEY,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  DEVELOPER_TOKEN: process.env.DEVELOPER_TOKEN,
};
