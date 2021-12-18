import Grid from '@mui/material/Grid'
import 'chart.js/auto'
import ProjectReport from './ProjectReport'

const GatewayReport = (props) => {
  const { report, projects, projectId, gateways, gatewayId } = props
  return (
    <Grid container columns={16}>
      <Grid item xs={8}>
        Table
      </Grid>
      <Grid item xs={8}>
        Chart
      </Grid>
    </Grid>
  )
}

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
