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
import Toaster from '../components/Toaster'
import api from '../utils/api'
import { getTotal } from '../utils'
import reducer, {
  initialState,
  USER_FETCH_SUCCESS,
  REPORT_LOADING,
  PROJECTS_FETCH_SUCCESS,
  GATEWAYS_FETCH_SUCCESS,
  REPORT_FETCH_SUCCESS,
  API_ERROR,
} from '../reducer'
import { ERROR_MESSAGE } from '../constants'

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { user, projects, gateways, report, filter, apiError } = state
  const apiErorrHanlder = (error) => {
    dispatch({ type: API_ERROR, payload: error })
  }

  useEffect(() => {
    api('users').then(
      (response) =>
        dispatch({ type: USER_FETCH_SUCCESS, payload: response.data[0] }),
      (error) => apiErorrHanlder
    )

    api('projects').then(
      (response) => {
        const projects = response.data
        const allIds = projects.map((p) => p.projectId)
        const byId = mapKeys(projects, 'projectId')
        dispatch({
          type: PROJECTS_FETCH_SUCCESS,
          payload: { byId, allIds },
        })
      },
      (error) => apiErorrHanlder
    )

    api('gateways').then((response) => {
      const gateways = response.data
      const allIds = gateways.map((g) => g.gatewayId)
      const byId = mapKeys(gateways, 'gatewayId')
      dispatch({
        type: GATEWAYS_FETCH_SUCCESS,
        payload: { byId, allIds },
      })
    }, apiErorrHanlder)
  }, [])

  const getReport = async (payload) => {
    dispatch({ type: REPORT_LOADING, payload: true })
    const response = await api('report', { body: payload })
    const report = response.data
    const byProjectId = groupBy(report, 'projectId')
    const byGatewayId = groupBy(report, 'gatewayId')
    dispatch({
      type: REPORT_FETCH_SUCCESS,
      payload: {
        report: {
          byProjectId,
          byGatewayId,
          total: getTotal(report, true),
        },
        filter: payload,
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
        {apiError && (
          <Toaster type={ERROR_MESSAGE} message={apiError.message} />
        )}
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
                gateways={gateways}
                report={report}
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
