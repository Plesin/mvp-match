import NoResults from '../NoResults'
import TableReport from '../TableReport'
import ChartReport from '../ChartReport'
import AccordionResults from '../AccordionResults'

function Report({ projects, gateways, report, filter }) {
  const { projectId, gatewayId } = filter

  if (!report) {
    return null
  }

  if (!report.length) {
    return <NoResults />
  } else if (!projectId && !gatewayId) {
    // All Projects All Gateways case
    return <AccordionResults report={report} projects={projects} />
  } else if (projectId && gatewayId) {
    // Selected Project and Selected Gateway case
    const project = projects.filter((p) => p.projectId === projectId)[0]
    const gateway = gateways.filter((g) => g.gatewayId === gatewayId)[0]
    return <TableReport rows={report} project={project} gateway={gateway} />
  } else if ((projectId && !gatewayId) || (!projectId && gatewayId)) {
    // Ether selected Project or Selected Gateway case
    return (
      <ChartReport
        report={report}
        projects={projects}
        projectId={projectId}
        gateways={gateways}
        gatewayId={gatewayId}
      />
    )
  } else {
    return <p>Something went wrong, incorrect data passed to Report</p>
  }
}

export default Report
