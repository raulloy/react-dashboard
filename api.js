import axios from 'axios';
import config from './config.js';

export const getAccountInsights = async (
  accessToken,
  accountId,
  since = '2023-02-01',
  until = '2023-02-28'
) => {
  try {
    const response = await axios({
      url: `https://graph.facebook.com/v15.0/${accountId}/insights?fields=account_id,account_name,reach,clicks,impressions,spend,cpc,ctr,conversions,frequency,actions&time_range={'since':'${since}','until':'${until}'}&access_token=${accessToken}`,
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getCampaignInsights = async (
  accessToken,
  accountId,
  since = '2023-02-01',
  until = '2023-02-28'
) => {
  try {
    const response = await axios({
      url: `https://graph.facebook.com/v15.0/${accountId}?fields=name,campaigns.limit(50){name,status,objective,account_id,insights.time_range({"since":"${since}","until":"${until}"}){reach,clicks,impressions,spend,cpc,ctr,actions}}&access_token=${accessToken}`,
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAdSetsInsights = async (
  accessToken,
  accountId,
  since = '2023-02-01',
  until = '2023-02-28'
) => {
  try {
    const response = await axios({
      url: `https://graph.facebook.com/v15.0/${accountId}?fields=name,objective,adsets.limit(50){name,status,insights.time_range({"since":"${since}","until":"${until}"}){reach,clicks,impressions,spend,cpc,ctr,actions}}&access_token=${accessToken}`,
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

// export const getAdSetsInsights = async (
//   accessToken,
//   campaignID,
//   since = '2023-02-01',
//   until = '2023-02-28'
// ) => {
//   try {
//     const response = await axios({
//       url: `https://graph.facebook.com/v15.0/${campaignID}?fields=name,objective,adsets{name,status,insights.time_range({"since":"${since}","until":"${until}"}){reach,clicks,impressions,spend,cpc,ctr,actions}}&access_token=${accessToken}`,
//       method: 'GET',
//       mode: 'cors',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };

// export const getAdsInsights = async (
//   accessToken,
//   adSetID,
//   since = '2023-02-01',
//   until = '2023-02-28'
// ) => {
//   try {
//     const response = await axios({
//       url: `https://graph.facebook.com/v15.0/${adSetID}?fields=name,ads.limit(50){name,status,insights.time_range({"since":"${since}","until":"${until}"}){reach,clicks,impressions,spend,cpc,ctr,actions}}&access_token=${accessToken}`,
//       method: 'GET',
//       mode: 'cors',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };

export const getAllAdSetsInsights = async (
  accessToken,
  accountID,
  since = '2023-02-01',
  until = '2023-02-28'
) => {
  try {
    const response = await axios({
      url: `https://graph.facebook.com/v15.0/${accountID}?fields=name,campaigns.limit(50){name,status,objective,adsets{name,account_id,campaign_id,campaign{name},status,insights.time_range({"since":"${since}","until":"${until}"}){reach,clicks,impressions,spend,cpc,ctr,actions}}}&access_token=${accessToken}`,
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllAdsInsights = async (
  accessToken,
  accountID,
  since = '2023-02-01',
  until = '2023-02-28'
) => {
  try {
    const response = await axios({
      url: `https://graph.facebook.com/v15.0/${accountID}?fields=name,campaigns.limit(50){name,status,objective,adsets.limit(60){name,status,campaign{objective},ads{name,account_id,campaign{objective},adset_id,adset{name},status,insights.time_range({"since":"${since}","until":"${until}"}){reach,clicks,impressions,spend,cpc,ctr,actions}}}}&access_token=${accessToken}`,
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getContacts = async (limit, after) => {
  try {
    const response = await axios({
      url: `https://api.hubapi.com/crm/v3/objects/contacts/search`,
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${config.HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      data: {
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'createdate',
                operator: 'GTE',
                value: new Date('2023-04-01').getTime(),
              },
              {
                propertyName: 'createdate',
                operator: 'LTE',
                value: new Date('2023-04-04').getTime() + 86400000, // add 1 day in milliseconds to include contacts from this day
              },
            ],
          },
        ],
        sorts: [
          {
            propertyName: 'createdate',
            direction: 'DESCENDING',
          },
        ],
        limit: limit,
        after: after,
        properties: [
          'firstname',
          'lastname',
          'email',
          'notes_last_updated',
          'hs_lead_status',
          'hubspot_owner_id',
          'hubspot_owner_assigneddate',
          'canal_de_captacion',
          'sub_canal_de_captacion',
          'desarrollo',
          'segmento',
          'gerente_contacto',
          'lun_contacto',
          'facilitador_compra_contacto',
          'hs_content_membership_status',
          'lifecyclestage',
          'hs_analytics_source',
          'hs_analytics_first_url',
        ],
      },
    });
    return response.data.results;
  } catch (error) {
    return error;
  }
};
