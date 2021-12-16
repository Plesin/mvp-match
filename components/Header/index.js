import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

import Image from 'next/image'
import logo from '../../public/icons/logo.svg'
import hamburger from '../../public/icons/hamburger.svg'

const getInitials = (user) => {
  const { firstName, lastName } = user
  const first = [...firstName][0]
  const last = [...lastName][0]
  return `${first ? first.toUpperCase() : ''}${last ? last.toUpperCase() : ''}`
}

function Header({ user }) {
  const initials = getInitials(user)
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: '1rem 2rem',
        borderBottom: '2px solid #F3F6F9',
      }}
    >
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8} sx={{ display: 'inline-flex' }} alignItems="center">
          <IconButton aria-label="Home icon">
            <Image src={logo} alt="company logo" />
          </IconButton>
          <IconButton aria-label="menu icon">
            <Image src={hamburger} alt="menu icon" />
          </IconButton>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{ display: 'inline-flex' }}
          justifyContent="end"
          alignItems="center"
        >
          <Avatar sx={{ bgcolor: '#F6CA65', borderRadius: '5px' }}>
            {initials}
          </Avatar>
          <Typography
            variant="subtitle1"
            sx={{ color: '#005B96', paddingLeft: '11px' }}
          >
            {user.firstName} {user.lastName}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Header
