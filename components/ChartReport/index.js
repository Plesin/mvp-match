import Grid from '@mui/material/Grid'
import 'chart.js/auto'
import ProjectReport from './ProjectReport'
import GatewayReport from './GatewayReport'

function ChartReport(props) {
  const { projectId, gatewayId } = props
  if (projectId) {
    return <ProjectReport {...props} />
  } else if (gatewayId) {
    return <GatewayReport {...props} />
  } else {
    return <p>Error: neither projectId nor gatewayId was passed.</p>
  }
}

export default ChartReport
