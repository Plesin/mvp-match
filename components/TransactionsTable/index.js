import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

function TransactionsTable({ rows, gatewayType }) {
  const minWidth = gatewayType ? 'auto' : 650
  return (
    <TableContainer>
      <Table
        sx={{ minWidth, '& th': { border: 0, padding: '8px' } }}
        aria-label="transations table"
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: 'white' }}>
            <TableCell>Date</TableCell>
            {gatewayType && <TableCell>Gateway ID</TableCell>}
            <TableCell>Transaction ID</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.paymentId}
              sx={{
                '& td': { border: 0, padding: '8px', fontSize: '1rem' },
                '&:nth-of-type(odd)': { backgroundColor: '#F1FAFE' },
                '&:nth-of-type(even)': { backgroundColor: 'white' },
              }}
            >
              <TableCell align="left">{row.created}</TableCell>
              {gatewayType && (
                <TableCell align="left">{row.gatewayId}</TableCell>
              )}
              <TableCell align="left">{row.paymentId.slice(-5)}</TableCell>
              <TableCell align="right">{row.amount} USD</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TransactionsTable
