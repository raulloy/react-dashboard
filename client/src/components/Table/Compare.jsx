import React, { useEffect, useState } from 'react';
import { accountsData } from '../../data/facebook';
// import { contactsData } from '../../data/hubspot';
import { accounts } from '../../data/data';
import DateDropdown from '../DatePickers/DateDropdown';
import DateRangeInput from '../DatePickers/DateRangeInput';

const Compare = () => {
  const [since1, setSince1] = useState(
    localStorage.getItem('since1') || '2023-06-01'
  );
  const [until1, setUntil1] = useState(
    localStorage.getItem('until1') || '2023-06-30'
  );
  const [since2, setSince2] = useState(
    localStorage.getItem('since2') || '2023-06-01'
  );
  const [until2, setUntil2] = useState(
    localStorage.getItem('until2') || '2023-06-30'
  );
  const [selectedAccount1, setSelectedAccount1] = useState(
    localStorage.getItem('selectedAccount1') || accounts[0].id
  );

  const [accountInsights1, setAccountInsights1] = useState([]);
  const [accountInsights2, setAccountInsights2] = useState([]);
  //   const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Account Insights 1
        const accountsResponse1 = await accountsData(since1, until1);
        setAccountInsights1(
          accountsResponse1.filter(
            (element) => element?.account_id === selectedAccount1.substring(4)
          )
        );

        // Fetch Account Insights 2
        const accountsResponse2 = await accountsData(since2, until2);
        setAccountInsights2(
          accountsResponse2.filter(
            (element) => element?.account_id === selectedAccount1.substring(4)
          )
        );

        // Fetch Contacts
        // const contactsResponse = await contactsData(since, until);
        // setContacts(contactsResponse);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [since1, until1, selectedAccount1, since2, until2]);

  //   console.log(accountInsights1);
  //   console.log(accountInsights2);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '10px' }}>
          <DateDropdown
            since={since1}
            setSince={setSince1}
            until={until1}
            setUntil={setUntil1}
            accounts={accounts}
            selectedAccount={selectedAccount1}
            setSelectedAccount={setSelectedAccount1}
          />
        </div>

        <div>
          <DateRangeInput
            since={since2}
            setSince={setSince2}
            until={until2}
            setUntil={setUntil2}
          />
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <div style={{ width: '50%', textAlign: 'center' }}>
            <h2>Date Range 1</h2>
            {/* Display account insights for date range 1 */}
            <p>
              {(
                accountInsights1[0]?.actions.find(
                  (element) => element.action_type === 'lead'
                ) || {}
              ).value ?? 0}
            </p>
          </div>
          <div style={{ width: '50%', textAlign: 'center' }}>
            <h2>Date Range 2</h2>
            {/* Display account insights for date range 2 */}
            <p>
              {(
                accountInsights2[0]?.actions.find(
                  (element) => element.action_type === 'lead'
                ) || {}
              ).value ?? 0}
            </p>
          </div>
        </div>
        {/* Add additional comparison elements here */}
      </div>
    </div>
  );
};

export default Compare;
