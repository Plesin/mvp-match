import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

function Loader() {
  return (
    <Stack alignItems="center">
      <CircularProgress size="100px" thickness={1} sx={{ mt: '10%' }} />
    </Stack>
  )
}

export default Loader
