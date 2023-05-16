import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableFooter } from '@mui/material';
import Paper from '@mui/material/Paper';
import { statusStyle } from './utils';
import { googleCampaignsData } from '../../data/google';
import './Table.css';

export default function GoogleCampaignsTable() {
  const [since, setSince] = useState('2023-04-01');
  const [until, setUntil] = useState('2023-04-15');

  const [googleCampaignInsights, setGoogleCampaignInsights] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Campaign Insights
        const campaignsResponse = await googleCampaignsData(since, until);

        setGoogleCampaignInsights(campaignsResponse);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [since, until]);

  console.log(googleCampaignInsights);

  return (
    <div className="Table">
      <h3>Campaign Insights</h3>

      <TableContainer
        component={Paper}
        style={{
          boxShadow: '0px 13px 20px 0px #80808029',
          overflow: 'auto',
          backgroundColor: 'transparent',
        }}
        sx={{ maxHeight: 350 }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Campaña</TableCell>
              <TableCell align="center">Objetivo</TableCell>
              <TableCell align="left">Gastado</TableCell>
              <TableCell align="left">Resultados</TableCell>
              <TableCell align="left">Costo</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="left">Asignaciones</TableCell>
              <TableCell align="left">Alcance</TableCell>
              <TableCell align="left">Impresiones</TableCell>
              <TableCell align="left">Clics</TableCell>
              <TableCell align="left">CPC</TableCell>
              <TableCell align="left">CTR</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: 'white' }}>
            {googleCampaignInsights.map((row) => (
              <TableRow
                key={row.campaign.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.campaign.name}
                </TableCell>
                <TableCell align="center">
                  {row.metrics.all_conversions}
                </TableCell>
                <TableCell align="center">
                  $
                  {parseFloat(
                    row.insights ? row.insights.data[0].spend : 0
                  ).toLocaleString('en-US')}
                </TableCell>
                <TableCell align="center">
                  {row.objective === 'MESSAGES' &&
                  row.insights &&
                  row.insights.data &&
                  row.insights.data[0].actions
                    ? (
                        row.insights.data[0].actions.find(
                          (element) =>
                            element.action_type ===
                            'onsite_conversion.messaging_conversation_started_7d'
                        ) || {}
                      ).value + ' Msgs'
                    : row.objective === 'OUTCOME_ENGAGEMENT' &&
                      row.insights &&
                      row.insights.data &&
                      row.insights.data[0].actions
                    ? (
                        row.insights.data[0].actions.find(
                          (element) => element.action_type === 'like'
                        ) || {}
                      ).value + ' Likes'
                    : (row.objective === 'OUTCOME_LEADS' ||
                        row.objective === 'LEAD_GENERATION') &&
                      row.insights &&
                      row.insights.data &&
                      row.insights.data[0].actions
                    ? (
                        row.insights.data[0].actions.find(
                          (element) => element.action_type === 'lead'
                        ) || {}
                      ).value + ' Leads'
                    : (row.objective === 'LINK_CLICKS' ||
                        row.objective === 'OUTCOME_TRAFFIC') &&
                      row.insights &&
                      row.insights.data &&
                      row.insights.data[0].actions
                    ? (
                        row.insights.data[0].actions.find(
                          (element) => element.action_type === 'link_click'
                        ) || {}
                      ).value + ' Clicks'
                    : 0}
                </TableCell>
                <TableCell align="center">
                  $
                  {(
                    (row.insights ? row.insights.data[0].spend : 0) /
                    parseFloat(
                      row.objective === 'MESSAGES' &&
                        row.insights &&
                        row.insights.data &&
                        row.insights.data[0].actions
                        ? (
                            row.insights.data[0].actions.find(
                              (element) =>
                                element.action_type ===
                                'onsite_conversion.messaging_conversation_started_7d'
                            ) || {}
                          ).value
                        : row.objective === 'OUTCOME_ENGAGEMENT' &&
                          row.insights &&
                          row.insights.data &&
                          row.insights.data[0].actions
                        ? (
                            row.insights.data[0].actions.find(
                              (element) => element.action_type === 'like'
                            ) || {}
                          ).value
                        : (row.objective === 'OUTCOME_LEADS' ||
                            row.objective === 'LEAD_GENERATION') &&
                          row.insights &&
                          row.insights.data &&
                          row.insights.data[0].actions
                        ? (
                            row.insights.data[0].actions.find(
                              (element) => element.action_type === 'lead'
                            ) || {}
                          ).value
                        : (row.objective === 'LINK_CLICKS' ||
                            row.objective === 'OUTCOME_TRAFFIC') &&
                          row.insights &&
                          row.insights.data &&
                          row.insights.data[0].actions
                        ? (
                            row.insights.data[0].actions.find(
                              (element) => element.action_type === 'link_click'
                            ) || {}
                          ).value
                        : 1
                    )
                  ).toFixed(2)}
                </TableCell>
                <TableCell align="left">
                  <span className="status" style={statusStyle(row.status)}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell align="center">
                  {parseInt(
                    row.insights ? row.insights.data[0].reach : 0
                  ).toLocaleString('en-US')}
                </TableCell>
                <TableCell align="center">
                  {parseInt(
                    row.insights ? row.insights.data[0].impressions : 0
                  ).toLocaleString('en-US')}
                </TableCell>
                <TableCell align="center">
                  {parseInt(
                    row.insights ? row.insights.data[0].clicks : 0
                  ).toLocaleString('en-US')}
                </TableCell>
                <TableCell align="center">
                  {parseFloat(
                    row.insights ? row.insights.data[0].cpc : 0
                  ).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  {parseFloat(
                    row.insights ? row.insights.data[0].ctr : 0
                  ).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align="left" style={{ fontWeight: 'bold' }}>
                Grand Total
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
