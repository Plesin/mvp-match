import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

const sx = { color: '#005B96', fontWeight: 'bold' }

function Footer() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: '1rem 124px',
      }}
    >
      <Link sx={sx} underline="none" href="#">
        Terms & Conditions
      </Link>
      <span> | </span>
      <Link sx={sx} underline="none" href="#">
        Privacy Policy
      </Link>
    </Box>
  )
}

export default Footer
