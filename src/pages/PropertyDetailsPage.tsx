import React, { FC, useEffect } from 'react'
import { Box, Container } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'
import { fetchPropertyDetails } from '../slices/PropertyDetailsSlice'
import LandingNavbar from './LandingNavbar'
import PropertyDescription from '../components/PropertyDetails/Description'
import { useParams } from 'react-router-dom'

import PropertyGallery from '../components/PropertyDetails/PropertyGallery'

const PropertyDetailsComponent: FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { property, user, error, pending } = useAppSelector(
    (state: RootState) => state.propertyDetails
  )

  // ===========================================================================
  // Actions
  // ===========================================================================

  const dispatch = useAppDispatch()

  const _fetchPropertyDetails = (data: string) => dispatch(fetchPropertyDetails(data))

  // ===========================================================================
  // Hooks
  // ===========================================================================

  let { _id } = useParams()

  useEffect(() => {
    if (_id) {
      _fetchPropertyDetails(_id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id])

  const { images } = property

  if (pending) {
    return <div>Fetching...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <LandingNavbar />
      <Container maxWidth="xl" sx={{ marginTop: '5rem' }}>
        <Box>
          <PropertyGallery Images={images} />
          <PropertyDescription {...property} {...user} />
        </Box>
      </Container>
    </>
  )
}

export default PropertyDetailsComponent
