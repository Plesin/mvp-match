import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

// TODO - this could be reused
function TransactionsTable({ rows }) {
  return (
    <TableContainer>
      <Table
        sx={{ '& th': { border: 0, padding: '8px' } }}
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
              <TableCell align="left">{row.created}</TableCell>
              <TableCell align="left">{row.paymentId}</TableCell>
              <TableCell align="right">{row.amount} USD</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TransactionsTable
