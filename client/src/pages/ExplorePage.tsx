import { Box, Container, Grid, Switch, Typography, useMediaQuery } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import FilterComponent from '../components/Filter/FilterComponent'
import LandingNavbar from './LandingNavbar'
import PropertyList from '../components/PropertiesList/PropertiesList'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'
import { addFilters, clearFilters, filterProperties } from '../slices/PropertiesFilterSlice'
import { FilterPropertyOptions } from '../types/index'
import { fetchProperties } from '../slices/PropertiesListSlice'

const ExplorePage: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const {
    properties,
    error: errProperties,
    pending: loadingProperties,
  } = useAppSelector((state: RootState) => state.propertiesList)

  const { filteredProperties, states, locations, size, rent } = useAppSelector(
    (state: RootState) => state.propertiesFilter
  )

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useAppDispatch()

  const _filterProperties = (data: FilterPropertyOptions) => dispatch(filterProperties(data))

  const _fetchProperties = () => dispatch(fetchProperties())

  const _clearFilters = () => dispatch(clearFilters())

  const _addFilters = (data: any) => dispatch(addFilters(data))

  // ===========================================================================
  // Hooks
  // ===========================================================================

  const [filterOpen, setFilterOpen] = useState<boolean>(true)

  const mySize = size && size[0] + size[1] > 0
  const myRent = rent && rent[0] + rent[1] > 0
  const filters = states.length > 0 || locations.length > 0 || mySize || myRent

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setFilterOpen(event.target.checked)

  useEffect(() => {
    if (filters) {
      _filterProperties({ locations, states, size, rent })
    } else {
      _fetchProperties()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states, locations, size, rent])

  const propertiesList: any = filters ? filteredProperties : properties
  const matches = useMediaQuery('(min-width:1000px)')

  return (
    <>
      <LandingNavbar />
      <Container>
        <Box sx={{ marginY: '3rem', width: '100%' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={3}>
              <Typography gutterBottom variant="h5" component="div" sx={{ marginY: '1rem' }}>
                Filter Amazing Properties
              </Typography>

              {!matches && (
                <Switch color="secondary" checked={filterOpen} onChange={handleChange} />
              )}
              {filterOpen && (
                <FilterComponent
                  clearFilters={_clearFilters}
                  addFilters={_addFilters}
                  states={states}
                  locations={locations}
                />
              )}
            </Grid>
            <Grid item xs={12} lg={9}>
              <Typography gutterBottom variant="h5" sx={{ marginY: '1rem' }}>
                {propertiesList.length + ' Properties for Renting & Sale'}
              </Typography>

              <PropertyList
                properties={propertiesList}
                loading={loadingProperties}
                error={errProperties}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default ExplorePage
