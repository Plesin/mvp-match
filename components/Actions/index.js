import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import { useState } from 'react'
import { format } from 'date-fns'
import { UI_DATE_FORMAT, API_DATE_FORMAT } from '../../constants'
import { datePickerStyles, selectStyles } from '../../styles/globals'

const ALL_PROJECTS = 'all-projects'
const ALL_GATEWAYS = 'all-gateways'

function Actions({ projects, gateways, onSubmit }) {
  const [selectedProject, setSelectedProject] = useState(ALL_PROJECTS)
  const [selectedGateway, setSelectedGateway] = useState(ALL_GATEWAYS)
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)

  const generateReport = () => {
    if (!fromDate && !toDate) {
      // alert('Please select date range')
    }
    const payload = {
      from: fromDate,
      to: toDate,
      projectId: selectedProject,
      gatewayId: selectedGateway,
    }
    if (selectedProject === ALL_PROJECTS) {
      delete payload.projectId
    }
    if (selectedGateway === ALL_GATEWAYS) {
      delete payload.gatewayId
    }
    onSubmit(payload)
  }

  const handleProjectChange = (event) => {
    const {
      target: { value },
    } = event
    setSelectedProject(value)
  }

  const handleGatewayChange = (event) => {
    const {
      target: { value },
    } = event
    setSelectedGateway(value)
  }

  return (
    <Grid container columns={16}>
      <Grid item xs={4}>
        <Typography variant="h5" sx={{ display: 'block' }}>
          Reports
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#7E8299' }}>
          Easily generate a report of your transactions
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: 'inline-flex', paddingLeft: 0, gap: '23px' }}
        alignItems="center"
        justifyContent="end"
      >
        <FormControl>
          <Select
            variant="standard"
            value={selectedProject}
            onChange={handleProjectChange}
            disableUnderline
            sx={selectStyles}
          >
            <MenuItem key={ALL_PROJECTS} value={ALL_PROJECTS}>
              All Projects
            </MenuItem>
            {projects.allIds.map((key) => {
              const project = projects.byId[key]
              return (
                <MenuItem key={project.projectId} value={project.projectId}>
                  {project.name}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl>
          <Select
            variant="standard"
            value={selectedGateway}
            onChange={handleGatewayChange}
            disableUnderline
            sx={selectStyles}
          >
            <MenuItem key={ALL_GATEWAYS} value={ALL_GATEWAYS}>
              All Gateways
            </MenuItem>
            {gateways.allIds.map((key) => {
              const gateway = gateways.byId[key]
              return (
                <MenuItem key={gateway.gatewayId} value={gateway.gatewayId}>
                  {gateway.name}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="From Date"
              value={fromDate}
              onChange={(val) => {
                const formated = format(val, API_DATE_FORMAT)
                setFromDate(formated)
              }}
              renderInput={(params) => (
                <TextField {...params} sx={datePickerStyles} />
              )}
              maxDate={new Date()}
              inputFormat={UI_DATE_FORMAT}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="To Date"
              value={toDate}
              onChange={(val) => {
                // TODO - fix for manual input change
                const formated = format(val, API_DATE_FORMAT)
                setToDate(formated)
              }}
              renderInput={(params) => (
                <TextField {...params} sx={datePickerStyles} />
              )}
              minDate={new Date(fromDate)}
              maxDate={new Date()}
              inputFormat={UI_DATE_FORMAT}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl>
          <Button
            variant="contained"
            onClick={generateReport}
            sx={{
              boxShadow: 'none',
              textTransform: 'capitalize',
              backgroundColor: '#005B96',
              padding: '5px 16px',
            }}
          >
            Generate Report
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default Actions
