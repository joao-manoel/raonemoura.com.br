/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { Page } from "../components/page"

const Home: NextPage = () => {
  return (
    <Page title="Semana do Violino - Grupo Exclusivo do Whatsapp" description="" path="/">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '296599255738250');
        fbq('track', 'PageView');`}} />
              
            <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=296599255738250&ev=PageView&noscript=1"
  />` }}
          /> 
        <meta name="facebook-domain-verification" content="srvn25jc8hyh3z91fgv3kf509p7o1q" />
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
            
            <Link href="https://chat.whatsapp.com/JCaMFzKZc19GgLYWwQn6FC">
              <a className={styles.button_container}>
                <button>
                  <span>
                    <img src={`images/whatsapp-icone-icon.png`} alt="telegram icon" />
                  </span>
                  Clique Aqui Para Acessar O Grupo No Whatsapp!
                </button>
              </a>
            </Link>

           
          </div>
        </main>
      </div>
      </Page>
  )
}

export default Home
