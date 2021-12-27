import { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { getTotal } from '../../utils'
import TransactionsTable from '../TransactionsTable'
import {
  paperStyles,
  accordionStyles,
  accordionSummaryStyles,
  accordionDetailsStyles,
} from '../../styles/globals'

function AccordionResults({ report, projects }) {
  const [expanded, setExpanded] = useState(false)
  const handleChange = (key) => (event, isExpanded) => {
    setExpanded(isExpanded ? key : false)
  }

  return (
    <>
      <Paper sx={paperStyles}>
        <Typography variant="h6" sx={{ mb: '1.5rem' }}>
          All Projects | All Gateways
        </Typography>
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
              <AccordionDetails sx={accordionDetailsStyles}>
                <TransactionsTable rows={payments} gatewayType />
              </AccordionDetails>
            </Accordion>
          )
        })}
      </Paper>
      <Paper sx={paperStyles}>
        <Typography variant="h6">Total: {report.total} USD</Typography>
      </Paper>
    </>
  )
}

export default AccordionResults
