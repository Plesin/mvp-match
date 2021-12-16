import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import bg from '../../public/icons/no_reports.svg'

function NoResults() {
  return (
    <Box
      sx={{ pt: '7rem', display: 'flex', flexFlow: 'column' }}
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h4">No Reports</Typography>
      <Typography
        variant="subtitle1"
        paragraph
        sx={{ width: '40vw', color: '#7E8299' }}
      >
        Curenlty you have no data for the reports to be generated. Once you
        start generating traffic though the balance application the reporst will
        be shown.
      </Typography>
      <Image src={bg} alt="no reports image" width={402} height={171} />
    </Box>
  )
}

export default NoResults
