import { useState, useMemo } from 'react'
import Grid from '@mui/material/Grid'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'
import groupBy from 'lodash.groupby'
import mapKeys from 'lodash.mapKeys'
import { formatter } from '../../utils/formater'
import { getTotal, getColor } from '../../utils'
import { paperStyles } from '../../styles/globals'

import TransactionsTable from '../TransactionsTable'

const getChartData = (gateways, report) => {
  const labels = []
  const colors = []
  const total = []
  gateways.allIds.forEach((key) => {
    labels.push(gateways.byId[key].name)
    colors.push(getColor())
    total.push(getTotal(report.byGatewayId[key], false))
  })
  return {
    labels,
    datasets: [
      {
        data: total,
        backgroundColor: colors,
        borderWidth: 2,
      },
    ],
  }
}

const ProjectReport = (props) => {
  const { report, gateways } = props
  const [expanded, setExpanded] = useState(false)
  const handleChange = (key) => (event, isExpanded) => {
    setExpanded(isExpanded ? key : false)
  }
  const chartData = useMemo(
    () => getChartData(gateways, report),
    [gateways, report]
  )
  const totals = chartData.datasets[0].data
  const projectTotal = totals ? totals.reduce((a, b) => a + b, 0) : 0

  return (
    <Grid container columns={16} spacing={3}>
      <Grid item xs={9}>
        <Paper sx={paperStyles}>
          {gateways.allIds.map((key) => {
            const name = gateways.byId[key].name
            const payments = report.byGatewayId[key]
            return (
              <Accordion
                key={key}
                expanded={expanded === key}
                onChange={handleChange(key)}
                sx={{
                  marginBottom: '1rem',
                  boxShadow: 'none',
                }}
              >
                <AccordionSummary
                  aria-controls={`${name}-content`}
                  id={`${name}-header`}
                  sx={{
                    borderRadius: '18px',
                  }}
                >
                  <Typography sx={{ flexGrow: 1 }}>{name}</Typography>
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
      <Grid item xs={7} sx={{ mt: '1rem' }}>
        <Doughnut data={chartData} />
        <Paper sx={paperStyles}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            PROJECT TOTAL | {formatter.format(projectTotal)} USD
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ProjectReport
