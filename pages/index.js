import Head from 'next/head'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('http://178.63.13.157:8090/mock-api/api/users')
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data)
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
        <Header user={users[0]} />
      </main>
    </>
  )
}
