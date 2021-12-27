import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { format } from 'date-fns'
import { UI_DATE_FORMAT } from '../../constants'
import { tableStyles, tableRowStyles } from '../../styles/globals'

function TransactionsTable({ rows, gatewayType }) {
  const minWidth = gatewayType ? 'auto' : 650
  return (
    <TableContainer>
      <Table
        sx={{
          minWidth,
          ...tableStyles,
        }}
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
            <TableRow key={row.paymentId} sx={tableRowStyles}>
              <TableCell align="left">
                {format(new Date(row.created), UI_DATE_FORMAT)}
              </TableCell>
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
