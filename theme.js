import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  components: {
    // currenlty cannot override globally since dropdown using Paper too
    MuiPaper: {
      styleOverrides: {
        // root: {
        //   backgroundColor: '#F1FAFE',
        //   borderRadius: '10px',
        //   boxShadow: 'none',
        //   padding: '19px',
        //   marginTop: '27px',
        // },
      },
    },
  },
})

export default theme
