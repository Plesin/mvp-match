import { useState, useMemo, Fragment } from 'react'
import Grid from '@mui/material/Grid'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'
import { formatter } from '../../utils/formater'
import { getTotal, getColor } from '../../utils'
import {
  paperStyles,
  accordionStyles,
  accordionSummaryStyles,
} from '../../styles/globals'

import TransactionsTable from '../TransactionsTable'

const getChartData = (projects, report) => {
  const labels = []
  const colors = []
  const total = []
  projects.allIds.forEach((key) => {
    labels.push(projects.byId[key].name)
    colors.push(getColor())
    total.push(getTotal(report.byProjectId[key], false))
  })
  return {
    labels,
    datasets: [
      {
        data: total,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  }
}

const GatewayReport = (props) => {
  const { report, projects } = props
  const [expanded, setExpanded] = useState(false)
  const handleChange = (key) => (event, isExpanded) => {
    setExpanded(isExpanded ? key : false)
  }
  const chartData = useMemo(
    () => getChartData(projects, report),
    [projects, report]
  )
  const totals = chartData.datasets[0].data
  const gatewayTotal = totals ? totals.reduce((a, b) => a + b, 0) : 0

  return (
    <Grid container columns={16} spacing={3}>
      <Grid item xs={9}>
        <Paper sx={paperStyles}>
          {projects.allIds.map((key) => {
            const name = projects.byId[key].name
            const payments = report.byProjectId[key]
            return (
              <Accordion
                key={key}
                expanded={expanded === key}
                onChange={handleChange(key)}
                sx={accordionStyles}
              >
                <AccordionSummary
                  aria-controls={`${name}-content`}
                  id={`${name}-header`}
                  sx={accordionSummaryStyles}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ flexGrow: 1, fontWeight: 'bold' }}
                  >
                    {name}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    TOTAL: {getTotal(payments, true)} USD
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TransactionsTable rows={payments} />
                </AccordionDetails>
              </Accordion>
            )
          })}
        </Paper>
      </Grid>
      <Grid item xs={7}>
        <Paper sx={paperStyles}>
          <Stack
            alignItems="left"
            sx={{
              display: 'inline-flex',
              flexDirection: 'row',
              alignItems: 'start',
            }}
          >
            {projects.allIds.map((key, index) => {
              const name = projects.byId[key].name
              const color = chartData.datasets[0].backgroundColor[index]
              return (
                <Fragment key={key}>
                  <Box
                    key={key}
                    sx={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: color,
                      borderRadius: '5px',
                      margin: '5px 10px',
                    }}
                  ></Box>
                  <Typography variant="subtitle1">{name}</Typography>
                </Fragment>
              )
            })}
          </Stack>
        </Paper>
        <Box sx={{ p: '7rem' }}>
          <Doughnut
            data={chartData}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </Box>
        <Paper sx={paperStyles}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            GATEWAY TOTAL | {formatter.format(gatewayTotal)} USD
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default GatewayReport
