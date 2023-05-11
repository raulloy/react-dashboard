import { GoogleAdsApi } from 'google-ads-api';
import config from './config.js';

const clientID = config.CLIENT_ID;
const clientSecret = config.CLIENT_SECRET;
const devToken = config.DEVELOPER_TOKEN;

const client = new GoogleAdsApi({
  client_id: clientID,
  client_secret: clientSecret,
  developer_token: devToken,
});

const customer = client.Customer({
  customer_id: '7462269823',
  refresh_token:
    '1//04e_MFe36n2f1CgYIARAAGAQSNwF-L9Irc6Ei3DUh52uFXZu_NBdIcOklJKjTsATNzRByqwIBaQvk8T5_02SdpTmPv3V3Hc4qd3c',
});

export const campaigns = await customer.query(`
  SELECT 
    campaign.id, 
    campaign.name,
    campaign.bidding_strategy_type,
    campaign_budget.amount_micros,
    metrics.cost_micros,
    metrics.clicks,
    metrics.impressions,
    metrics.all_conversions
  FROM 
    campaign
  WHERE
    campaign.status = "ENABLED"
  LIMIT 20
`);
