import Head from 'next/head'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'

import Header from '../components/Header'
import Menu from '../components/Menu'
import Actions from '../components/Actions'
import styles from '../styles/Home.module.css'

const apiBase = 'http://178.63.13.157:8090/mock-api/api/'

export default function Home() {
  const [user, setUser] = useState(null)
  const [projects, setProjects] = useState([])
  const [gateways, setGateways] = useState([])
  useEffect(() => {
    fetch(`${apiBase}users`)
      .then((res) => res.json())
      .then((json) => {
        const loggedUser = json.data[0]
        if (loggedUser) {
          setUser(loggedUser)
        } else {
          console.error('No logged in user')
        }
      })

    fetch(`${apiBase}projects`)
      .then((res) => res.json())
      .then((json) => {
        setProjects(json.data)
      })

    fetch(`${apiBase}gateways`)
      .then((res) => res.json())
      .then((json) => {
        setGateways(json.data)
      })
  }, [])

  const getReport = async (payload) => {
    const resp = await fetch(`${apiBase}report`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    const report = await resp.json()
    console.log(report)
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
          </Grid>
        </Grid>
      </main>
    </>
  )
}
