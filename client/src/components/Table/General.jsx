import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Modal, Button } from 'react-bootstrap';
import DateRangeInput from '../DatePickers/DateRangeInput';
import { AccountsDataStoreContext } from '../../data/AccountsDataStore';
import Cards from '../Cards/Cards';
import { saveAs } from 'file-saver';
import { facilitadores } from '../../facilitadores';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { accounts, googleAccounts } from '../../data/data';
import { googleCampaignsData } from '../../data/google';
import { AccountComponent } from '../../data/GoogleCampaignsData';
import './Table.css';

export default function GeneralTable() {
  const { since, setSince, until, setUntil, accountInsights, contacts } =
    useContext(AccountsDataStoreContext);

  // Calculate Grand Total Spend
  const grandTotalSpend = accountInsights.reduce((total, element) => {
    return total + parseFloat(element?.spend);
  }, 0);

  const totalSpendByCompany = accountInsights.reduce((result, element) => {
    const { account_name, spend } = element;
    const account = accounts.find((acc) => acc.name === account_name);
    if (account) {
      const { company } = account;
      if (!result.hasOwnProperty(company)) {
        result[company] = 0;
      }
      result[company] += parseFloat(spend);
    }
    return result;
  }, {});

  if (accountInsights.length === 0) {
    return <div>Getting data...</div>;
  }

  return (
    <div>
      {/* <Cards /> */}

      <div className="Table">
        <DateRangeInput
          since={since}
          setSince={setSince}
          until={until}
          setUntil={setUntil}
        />

        <div style={{ marginBottom: '1rem' }}>
          <strong style={{ borderBottom: '1px solid black' }}>FACEBOOK</strong>
          <br />
          {Object.entries(totalSpendByCompany).map(([company, totalSpend]) => (
            <div style={{ height: '26px' }}>
              <p
                style={{
                  width: '165px',
                  display: 'inline-block',
                }}
              >
                {company}
              </p>
              ${totalSpend.toLocaleString('en-US')}
            </div>
          ))}
          <div>
            <strong>
              <p style={{ width: '165px', display: 'inline-block' }}>
                TOTAL GENERAL:
              </p>
              ${grandTotalSpend.toLocaleString('en-US')}
            </strong>
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <strong style={{ borderBottom: '1px solid black' }}>GOOGLE</strong>
          {googleAccounts.map((account) => (
            <AccountComponent
              key={account.id}
              since={since}
              until={until}
              accountId={account.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
