import React, { FC } from 'react'
import { Skeleton, Stack } from '@mui/material'

import Property from './Property'
import { Box } from '@mui/system'

import '../../styles/Warehouse.css'

export interface IPropertiesListState {
  properties: object[]
  loading: boolean
  error: string
}

const PropertiesList: FC<IPropertiesListState> = ({ properties = [], loading, error }) => {
  if (loading) {
    return (
      <>
        <h1>Loading</h1>
        {properties.map((property, index) => {
          return (
            <Stack spacing={1} key={index}>
              <Box
                data-testid="skeleton-nodes"
                sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
              >
                <Skeleton variant="circular" width={150} height={150} />
                <Skeleton variant="rectangular" width={600} height={140} />
              </Box>
            </Stack>
          )
        })}
      </>
    )
  }

  if (properties.length === 0 && !error) {
    return <div>No Properties to Display</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <div data-testid="warehouses-nodes">
        <Stack spacing={5}>
          {properties.map((property: any, idx) => {
            return (
              <div key={property?.id ?? idx}>
                <Box>
                  <Property {...property} />
                </Box>
              </div>
            )
          })}
        </Stack>
      </div>
    </>
  )
}

export default PropertiesList
