/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Semana do violino - Raone Moura</title>
        <meta name="description" content="Semana do violino" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
        <div className={styles.box}>
          <header>
            <img src={`images/logo.png`} alt="raone moura" />
          </header>
          <figure>
            <img src={`images/0001.jpg`}  alt="semana do violino" />
          </figure>
          <Link href="https://t.me/+hwEB-A9Yr79mMmVh">
            <a>
              <button>
                <span>
                  <img src={`images/telegram-icone-icon.png`} alt="telegram icon" />
                </span>
                Clique Aqui Para Acessar O Grupo No Telegram
              </button>
            </a>
          </Link>
          
        </div>
      </main>
    </div>
  )
}

export default Home
