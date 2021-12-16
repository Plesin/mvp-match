import NoResults from '../NoResults'
import SimpleTable from '../SimpleTable'

function Report({ projects, gateways, report, filter }) {
  const { projectId, gatewayId } = filter
  if (!report.length) {
    return <NoResults />
  } else if (projectId && gatewayId) {
    const project = projects.filter((p) => p.projectId === projectId)[0]
    const gateway = gateways.filter((g) => g.gatewayId === gatewayId)[0]
    return <SimpleTable rows={report} project={project} gateway={gateway} />
  } else {
    return <p>HOLLA</p>
  }
}

export default Report
