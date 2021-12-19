import { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { getTotal } from '../../utils'
import TransactionsTable from '../TransactionsTable'
import { paperStyles } from '../../styles/globals'

function AccordionResults({ report, groupedReport, projectsById }) {
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
        {Object.keys(groupedReport).map((key) => {
          const name = projectsById[key].name
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
                <TransactionsTable rows={payments} gatewayType />
              </AccordionDetails>
            </Accordion>
          )
        })}
      </Paper>
      <Paper sx={paperStyles}>
        <Typography variant="h6">
          Total: {getTotal(report, true)} USD
        </Typography>
      </Paper>
    </>
  )
}

export default AccordionResults
