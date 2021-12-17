import NoResults from '../NoResults'
import SimpleTable from '../SimpleTable'
import ChartReport from '../ChartReport'

function Report({ projects, gateways, report, filter }) {
  const { projectId, gatewayId } = filter

  if (!report) {
    return null
  }

  if (!report.length) {
    return <NoResults />
  } else if (projectId && gatewayId) {
    const project = projects.filter((p) => p.projectId === projectId)[0]
    const gateway = gateways.filter((g) => g.gatewayId === gatewayId)[0]
    return <SimpleTable rows={report} project={project} gateway={gateway} />
  } else if ((projectId && !gatewayId) || (!projectId && gatewayId)) {
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
    return <p>ALL</p>
  }
}

export default Report
