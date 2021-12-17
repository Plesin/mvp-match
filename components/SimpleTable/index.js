import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { formatter } from '../../utils/formater'

// TODO - shared in multiple files, reuse
const paperStyles = {
  backgroundColor: '#F1FAFE',
  borderRadius: '10px',
  boxShadow: 'none',
  padding: '19px',
  marginTop: '27px',
}

function SimpleTable({ rows, project, gateway }) {
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
        <TableContainer>
          <Table
            sx={{ minWidth: 650, '& th': { border: 0, padding: '8px' } }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: 'white' }}>
                <TableCell>Date</TableCell>
                <TableCell>Transaction ID</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.paymentId}
                  sx={{
                    '& td': { border: 0, padding: '8px' },
                    '&:nth-child(odd)': { backgroundColor: '#F1FAFE' },
                    '&:nth-child(even)': { backgroundColor: 'white' },
                  }}
                >
                  <TableCell align="left">{row.modified}</TableCell>
                  <TableCell align="left">{row.paymentId}</TableCell>
                  <TableCell align="right">{row.amount} USD</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Paper sx={{ ...paperStyles, padding: '12px 19px' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          TOTAL | {formatter.format(total)} USD
        </Typography>
      </Paper>
    </>
  )
}

export default SimpleTable
