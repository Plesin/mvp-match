import Snackbar from '@mui/material/Snackbar'
import NoResults from '../NoResults'
import TableReport from '../TableReport'
import ChartReport from '../ChartReport'
import AccordionResults from '../AccordionResults'

const Toaster = ({ message }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    open={true}
    message={message}
    sx={{
      '& .MuiPaper-root': { backgroundColor: '#F6CA65', color: 'black' },
    }}
  />
)

function Report({ projects, gateways, report, filter }) {
  const { projectId, gatewayId, from, to } = filter
  const { byProjectId, byGatewayId } = report
  const hasResults =
    Object.keys(byProjectId).length || Object.keys(byGatewayId).length

  if ((from && !to) || (!from && to)) {
    return (
      <Toaster message="Please select both From Date and To Date to filter reports by date." />
    )
  }

  if (!hasResults && (from || to)) {
    return (
      <Toaster message="No results found for the selected dates. Please try adjusting the date range." />
    )
  }

  if (!hasResults) {
    return <NoResults />
  } else if (!projectId && !gatewayId) {
    // All Projects All Gateways case
    return <AccordionResults report={report} projects={projects} />
  } else if (projectId && gatewayId) {
    // Selected Project and Selected Gateway case
    const project = projects.byId[projectId]
    const gateway = gateways.byId[gatewayId]
    const rows = report.byProjectId[projectId]
    return <TableReport rows={rows} project={project} gateway={gateway} />
  } else if ((projectId && !gatewayId) || (!projectId && gatewayId)) {
    // Ether selected Project or Selected Gateway case
    return (
      <ChartReport
        report={report}
        projects={projects}
        gateways={gateways}
        projectId={projectId}
        gatewayId={gatewayId}
      />
    )
  } else {
    return <p>Something went wrong, incorrect data passed to Report</p>
  }
}

export default Report
