import Snackbar from '@mui/material/Snackbar'
import { WARNING_MESSAGE, ERROR_MESSAGE } from '../../constants'

function Toaster({ type = WARNING_MESSAGE, message }) {
  // WARNING_MESSAGE
  let backgroundColor = '#F6CA65'
  let color = 'black'

  if (type === ERROR_MESSAGE) {
    backgroundColor = 'rgb(211, 47, 47)'
    color = 'white'
  }

  const styles = {
    '& .MuiPaper-root': { backgroundColor, color },
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={true}
      message={message}
      sx={styles}
    />
  )
}

export default Toaster
