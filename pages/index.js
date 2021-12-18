import Head from 'next/head'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

import Header from '../components/Header'
import Menu from '../components/Menu'
import Actions from '../components/Actions'
import Report from '../components/Report'
import styles from '../styles/Home.module.css'
import api from '../utils/api'

const API_BASE = 'http://178.63.13.157:8090/mock-api/api/'

export default function Home() {
  const [user, setUser] = useState(null)
  const [projects, setProjects] = useState([])
  const [gateways, setGateways] = useState([])
  const [report, setReport] = useState([])
  const [filter, setFilter] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api('users').then(
      (response) => setUser(response.data[0]),
      (error) => console.log('api error', error)
    )

    api('projects').then(
      (response) => setProjects(response.data),
      (error) => console.log('api error', error)
    )

    api('gateways').then(
      (response) => setGateways(response.data),
      (error) => console.log('api error', error)
    )
  }, [])

  const getReport = async (payload) => {
    setLoading(true)
    const response = await api('report', { body: payload })
    setLoading(false)
    setReport(response.data)
    setFilter(payload)
  }

  return (
    <>
      <div className={styles.container}>
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
            {loading ? (
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
      </main>
    </>
  )
}
