/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { Page } from "../components/page"

const Home: NextPage = () => {
  return (
    <Page title="Semana do Violino - Convite do Telegram" description="" path="/">

      <Head>
      <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '673446030684111');
      fbq('track', 'PageView');`}} />
            
          <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=673446030684111&ev=PageView&noscript=1"
/>` }}
        /> 
      </Head>

      <div className={styles.container}>

        <main className={styles.main}>
          
          <div className={styles.box}>
            <header>
              <img src={`images/logo.png`} alt="raone moura" />
            </header>
            <figure>
              <img src={`images/0001.jpg`}  alt="semana do violino" />
            </figure>
            
            <Link href="tg://join?invite=hwEB-A9Yr79mMmVh">
              <a className={styles.button_container}>
                <button>
                  <span>
                    <img src={`images/telegram-icone-icon.png`} alt="telegram icon" />
                  </span>
                  Clique Aqui Para Acessar O Grupo No Telegram
                </button>
              </a>
            </Link>

            <div className={styles.donthavetelegram}>
              <p>
                Você não tem o telegram? 
                <span>
                  <Link href="https://telegram.org/apps"><a>Clique aqui</a></Link> para baixar no site oficial do telegram!
                </span>
              </p>
            </div>
          </div>
        </main>
      </div>
      </Page>
  )
}

export default Home
