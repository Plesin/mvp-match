import Head from 'next/head'
import { useEffect, useReducer } from 'react'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import groupBy from 'lodash.groupby'
import mapKeys from 'lodash.mapKeys'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import Actions from '../components/Actions'
import Report from '../components/Report'
import api from '../utils/api'
import reducer, {
  initialState,
  USER_FETCH_SUCCESS,
  REPORT_LOADING,
  PROJECTS_FETCH_SUCCESS,
  GATEWAYS_FETCH_SUCCESS,
  REPORT_FETCH_SUCCESS,
} from '../reducer'

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    user,
    projects,
    projectsById,
    gateways,
    gatewaysById,
    report,
    groupedReport,
    filter,
  } = state

  useEffect(() => {
    api('users').then(
      (response) =>
        dispatch({ type: USER_FETCH_SUCCESS, payload: response.data[0] }),
      (error) => console.log('api error', error)
    )

    api('projects').then(
      (response) => {
        const projects = response.data
        const projectsById = mapKeys(projects, 'projectId')
        dispatch({
          type: PROJECTS_FETCH_SUCCESS,
          payload: { projects, projectsById },
        })
      },
      (error) => console.log('api error', error)
    )

    api('gateways').then(
      (response) => {
        const gateways = response.data
        const gatewaysById = mapKeys(gateways, 'gatewayId')
        dispatch({
          type: GATEWAYS_FETCH_SUCCESS,
          payload: { gateways, gatewaysById },
        })
      },
      (error) => console.log('api error', error)
    )
  }, [])

  const getReport = async (payload) => {
    dispatch({ type: REPORT_LOADING, payload: true })
    const response = await api('report', { body: payload })
    const report = response.data
    const groupedReport = groupBy(report, 'projectId')
    dispatch({
      type: REPORT_FETCH_SUCCESS,
      payload: {
        report: report,
        filter: payload,
        groupedReport: groupedReport,
      },
    })
  }

  return (
    <>
      <div>
        <Head>
          <title>MVP Match Test</title>
        </Head>
      </div>
      <main>
        <Header user={user} />
        <Grid container columns={16}>
          <Grid item xs={1}>
            <Menu />
          </Grid>
          <Grid item xs={15} sx={{ padding: '36px 24px' }}>
            <Actions
              projects={projects}
              gateways={gateways}
              onSubmit={getReport}
            />
            {state.isLoading ? (
              <Stack alignItems="center">
                <CircularProgress
                  size="100px"
                  thickness={1}
                  sx={{ mt: '10%' }}
                />
              </Stack>
            ) : (
              <Report
                projects={projects}
                projectsById={projectsById}
                gateways={gateways}
                gatewaysById={gatewaysById}
                report={report}
                groupedReport={groupedReport}
                filter={filter}
              />
            )}
          </Grid>
        </Grid>
        <Footer />
      </main>
    </>
  )
}
