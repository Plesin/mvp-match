import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TransactionsTable from '../TransactionsTable'
import { formatter } from '../../utils/formater'
import { paperStyles } from '../../styles/globals'

function TableReport({ rows, project, gateway }) {
  if (!rows) {
    return null
  }

  const total = rows.reduce((a, b) => a + b.amount, 0)

  return (
    <>
      <Paper sx={paperStyles}>
        <Typography variant="h6" sx={{ mb: '1.5rem' }}>
          {project.name} | {gateway.name}
        </Typography>
        <TransactionsTable rows={rows} />
      </Paper>
      <Paper sx={{ ...paperStyles, padding: '12px 19px' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          TOTAL | {formatter.format(total)} USD
        </Typography>
      </Paper>
    </>
  )
}

export default TableReport
