import React, { useState } from 'react'
import { Box } from '@mui/system'
import { CircularProgress, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'

import Logo from '../components/Navbar/Logo'

const LandingNavbar: React.FC = () => {

  const Position =
    window.location.pathname === '/' || window.location.pathname === '' ? 'absolute' : 'relative'

  const matches = useMediaQuery('(min-width:750px)')

  const ImgSize = matches ? undefined : 2.5

  return (
    <>
      <Box
        sx={{
          position: Position,
          backgroundColor: '#0000002c',
          zIndex: 1,
          width: '100%',
          p: '20px',
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/">
              <Logo ImgSize={ImgSize} />
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default LandingNavbar
