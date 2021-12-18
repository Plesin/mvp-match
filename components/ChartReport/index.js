import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Chart, PieSeries, Title } from '@devexpress/dx-react-chart-material-ui'
import groupBy from 'lodash.groupby'
import mapKeys from 'lodash.mapKeys'
import { formatter } from '../../utils/formater'
import { getTotal } from '../../utils'

import TransactionsTable from '../TransactionsTable'

const paperStyles = {
  backgroundColor: '#F1FAFE',
  borderRadius: '10px',
  boxShadow: 'none',
  padding: '19px',
  marginTop: '27px',
}

const getChartData = (gateways, report) => {
  return Object.keys(gateways).map((key) => {
    return { name: gateways[key].name, amount: getTotal(report[key], false) }
  })
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
  console.log(chartData)

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
      <Grid item xs={7}>
        <Paper sx={paperStyles}>{}</Paper>
        <Chart data={chartData}>
          <PieSeries
            valueField="amount"
            argumentField="name"
            innerRadius={0.6}
          />
        </Chart>
        <Paper sx={paperStyles}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            PROJECT TOTAL | {formatter.format(getTotal(chartData))} USD
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

const GatewayReport = (props) => {
  const { report, projects, projectId, gateways, gatewayId } = props
  return (
    <Grid container columns={16}>
      <Grid item xs={8}>
        Table
      </Grid>
      <Grid item xs={8}>
        Chart
      </Grid>
    </Grid>
  )
}

function ChartReport(props) {
  const { projectId, gatewayId } = props
  if (projectId) {
    return <ProjectReport {...props} />
  } else if (gatewayId) {
    return <GatewayReport {...props} />
  } else {
    return <p>Error: neither projectId not gatewayId was passed.</p>
  }
}

export default ChartReport
