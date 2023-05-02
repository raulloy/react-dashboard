import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Accounts from '../Table/Accounts';
import Campaigns from '../Table/Campaigns';
import AdSets from '../Table/AdSets';
import Ads from '../Table/Ads';
import { AccountsDataStore } from '../../data/AccountsDataStore';
import { CampaignsDataStore } from '../../data/CampaignsDataStore';
import { AdSetsDataStore } from '../../data/AdSetsDataStore';
import { AdsDataStore } from '../../data/AdsDataStore';
import './MainDash.css';

const MainDash = () => {
  return (
    <div className="MainDash">
      <h2>Admin Dashboard</h2>
      <Routes>
        <Route
          path="/"
          element={
            <AccountsDataStore>
              <Accounts />
            </AccountsDataStore>
          }
        />
        <Route
          path="/accounts"
          element={
            <AccountsDataStore>
              <Accounts />
            </AccountsDataStore>
          }
        />
        <Route
          path="/campaigns"
          element={
            <CampaignsDataStore>
              <Campaigns />
            </CampaignsDataStore>
          }
        />
        <Route
          path="/ad-sets"
          element={
            <AdSetsDataStore>
              <AdSets />
            </AdSetsDataStore>
          }
        />
        <Route
          path="/ads"
          element={
            <AdsDataStore>
              <Ads />
            </AdsDataStore>
          }
        />
      </Routes>
    </div>
  );
};

export default MainDash;
