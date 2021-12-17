import { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { getTotal } from '../../utils'
import groupBy from 'lodash.groupby'
import mapKeys from 'lodash.mapKeys'
import AccordionTable from '../AccordionTable'

const paperStyles = {
  backgroundColor: '#F1FAFE',
  borderRadius: '10px',
  boxShadow: 'none',
  padding: '19px',
  marginTop: '27px',
}

function AccordionResults({ report, projects }) {
  const [expanded, setExpanded] = useState(false)
  const handleChange = (key) => (event, isExpanded) => {
    setExpanded(isExpanded ? key : false)
  }
  const groupedReport = groupBy(report, 'projectId')
  const normalizedProjects = mapKeys(projects, 'projectId')

  return (
    <>
      <Paper sx={paperStyles}>
        <Typography variant="h6" sx={{ mb: '1.5rem' }}>
          All Projects | All Gateways
        </Typography>
        {Object.keys(groupedReport).map((key) => {
          const name = normalizedProjects[key].name
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
                  TOTAL: {getTotal(payments, true)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <AccordionTable rows={payments} />
              </AccordionDetails>
            </Accordion>
          )
        })}
      </Paper>
    </>
  )
}

export default AccordionResults
