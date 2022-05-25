import React, { SyntheticEvent, useState } from 'react'
import { Autocomplete, Box, Button, Divider, Stack, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'

import { LOCATIONS, STATES } from '../../utils/constants/index'
import { FilterPropertyOptions } from '../../types'

interface ISearchPropertiesProps {
  addFilters: (filters: FilterPropertyOptions) => void
}

const SearchComponent: React.FC<ISearchPropertiesProps> = ({ addFilters }) => {
  const [location, setLocation] = useState<string | null>()
  const [state, setState] = useState<string | null>()

  const history = useNavigate()

  const onSubmit = () => {
    addFilters({
      locations: location ? [location] : [],
      states: state ? [state] : [],
      size: [0, 0],
      rent: [0, 0],
    })
    history('/explore')
  }

  return (
    <>
      <Box
        sx={{
          p: 2,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: ' translate(-50%, -50%)',
          backgroundColor: 'white',
          borderRadius: '4px',
          display: 'flex',
        }}
      >
        <Stack
          divider={
            <Divider
              orientation="horizontal"
              sx={{ marginY: '0.8rem', visibility: 'hidden' }}
              flexItem
            />
          }
        >
          <Autocomplete
            disablePortal
            id="governorate-input"
            options={STATES}
            sx={{ width: 300 }}
            data-testid="governorate-input-testid"  //  check here
            onChange={(event: SyntheticEvent<Element, Event>, newValue: string | null) => {
              setState(newValue)
            }}
            renderInput={(params) => <TextField {...params} label="Sate" />}
          />
          <Autocomplete
            disablePortal
            id="location-input"
            options={LOCATIONS}
            sx={{ width: 300 }}
            onChange={(event: React.SyntheticEvent<Element, Event>, newValue: string | null) => {
              setLocation(newValue)
            }}
            renderInput={(params) => <TextField {...params} label="Location" />}
          />

          <Button onClick={onSubmit} variant="contained" color="primary">
            <SearchIcon sx={{ marginRight: '10px' }} /> Search Amazing Properties
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default SearchComponent
