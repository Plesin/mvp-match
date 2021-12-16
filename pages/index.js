import Head from 'next/head'
import { useState, useEffect } from 'react'

import Header from '../components/Header'
import Menu from '../components/Menu'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    fetch('http://178.63.13.157:8090/mock-api/api/users')
      .then((res) => res.json())
      .then((json) => {
        const loggedUser = json.data[0]
        if (loggedUser) {
          setUser(loggedUser)
        } else {
          console.error('No logged in user')
        }
      })
  }, [])

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>MVP Match Test</title>
        </Head>
      </div>
      <main>
        <Header user={user} />
        <Menu />
      </main>
    </>
  )
}
