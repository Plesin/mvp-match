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

const ALL_PROJECTS = 'all-projects'
const ALL_GATEWAYS = 'all-gateways'
const datePickerStyles = {
  input: {
    backgroundColor: '#1BC5BD',
    color: 'white',
    borderRadius: '5px',
    padding: '8px 13px',
    width: '80px',
  },
  button: {
    backgroundColor: '#1BC5BD',
    borderRadius: 0,
    color: 'white',
  },
}

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

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setSelectedProject(value)
  }

  const handleChange1 = (event) => {
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
        <Typography variant="hsubtitle1" sx={{ color: '#7E8299' }}>
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
            onChange={handleChange}
            sx={{
              backgroundColor: '#1BC5BD',
              color: 'white',
              borderRadius: '5px',
              padding: '8px 13px',
            }}
          >
            <MenuItem key={ALL_PROJECTS} value={ALL_PROJECTS}>
              All Projects
            </MenuItem>
            {projects.map((project) => (
              <MenuItem key={project.projectId} value={project.projectId}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select
            variant="standard"
            value={selectedGateway}
            onChange={handleChange1}
            sx={{
              backgroundColor: '#1BC5BD',
              color: 'white',
              borderRadius: '5px',
              padding: '8px 13px',
            }}
          >
            <MenuItem key={ALL_GATEWAYS} value={ALL_GATEWAYS}>
              All Gateways
            </MenuItem>
            {gateways.map((gat) => (
              <MenuItem key={gat.gatewayId} value={gat.gatewayId}>
                {gat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="From Date"
              value={fromDate}
              onChange={(val) => {
                const formated = format(val, 'yyyy-MM-dd')
                console.log(formated)
                setFromDate(formated)
              }}
              renderInput={(params) => (
                <TextField {...params} sx={datePickerStyles} />
              )}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="To Date"
              value={toDate}
              onChange={(val) => {
                const formated = format(val, 'yyyy-MM-dd')
                console.log(formated)
                setToDate(formated)
              }}
              renderInput={(params) => (
                <TextField {...params} sx={datePickerStyles} />
              )}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl>
          <Button variant="contained" onClick={generateReport}>
            Generate Report
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default Actions
