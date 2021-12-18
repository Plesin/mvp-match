import { useState } from 'react'
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

import TransactionsTable from '../TransactionsTable'

const paperStyles = {
  backgroundColor: '#F1FAFE',
  borderRadius: '10px',
  boxShadow: 'none',
  padding: '19px',
  marginTop: '27px',
}

const getChartData = (gateways, report) => {
  const labels = []
  const colors = []
  const total = []
  Object.keys(gateways).forEach((key) => {
    labels.push(gateways[key].name)
    colors.push(getColor())
    total.push(getTotal(report[key], false))
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
  const [expanded, setExpanded] = useState(false)
  const handleChange = (key) => (event, isExpanded) => {
    setExpanded(isExpanded ? key : false)
  }
  const { report, projects, projectId, gateways, gatewayId } = props
  const groupedReport = groupBy(report, 'gatewayId')
  // TODO - do this ones loaded
  const normalizedGateways = mapKeys(gateways, 'gatewayId')
  const chartData = getChartData(normalizedGateways, groupedReport)
  const totals = chartData.datasets[0].data
  const projectTotal = totals ? totals.reduce((a, b) => a + b, 0) : 0

  return (
    <Grid container columns={16} spacing={3}>
      <Grid item xs={9}>
        <Paper sx={paperStyles}>
          {Object.keys(groupedReport).map((key) => {
            const name = normalizedGateways[key].name
            const payments = groupedReport[key]
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
