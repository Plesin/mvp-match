import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Image from 'next/image'
import menu1 from '../../public/icons/menu1.svg'
import menu2 from '../../public/icons/menu2.svg'
import menu3 from '../../public/icons/menu3.svg'
import menu4 from '../../public/icons/menu4.svg'
import menu5 from '../../public/icons/menu5.svg'

function Menu() {
  return (
    <Box
      sx={{
        width: '100px',
        height: 'calc(100vh - 180px)',
        flexFlow: 'column wrap',
        textAlign: 'center',
        marginTop: '35px',
      }}
    >
      <IconButton aria-label="Nav Item 1" sx={{ marginBottom: '21px' }}>
        <Image src={menu1} alt="nav item 1" width={35} height={35} />
      </IconButton>
      <IconButton aria-label="Nav Item 1" sx={{ marginBottom: '21px' }}>
        <Image src={menu2} alt="nav item 1" width={35} height={35} />
      </IconButton>
      <IconButton aria-label="Nav Item 1" sx={{ marginBottom: '21px' }}>
        <Image src={menu3} alt="nav item 1" width={35} height={35} />
      </IconButton>
      <IconButton aria-label="Nav Item 1" sx={{ marginBottom: '21px' }}>
        <Image src={menu4} alt="nav item 1" width={35} height={35} />
      </IconButton>
      <IconButton aria-label="Nav Item 1" sx={{ marginBottom: '21px' }}>
        <Image src={menu5} alt="nav item 1" width={35} height={35} />
      </IconButton>
    </Box>
  )
}

export default Menu
