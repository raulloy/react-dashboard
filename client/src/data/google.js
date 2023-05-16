import axios from 'axios';

export const googleCampaignsData = async (since, until) => {
  const response = await axios.get(
    // `/api/account-insights?since=${since}&until=${until}`
    '/api/google-campaigns'
  );
  return response.data;
};
