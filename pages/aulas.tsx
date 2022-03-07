/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import styles from '../styles/Aulas.module.css'

import {videos as VideoData} from '../utils/videos'

import { Page } from "../components/page"
import Player from '../components/Player'
import Comment from '../components/Comments'

export type videoDef = {
  id: string
  title: string
  url: string
  thumb: string
  date: string
  active: boolean
}

const Jornada: NextPage = () => {
  

  const [videos, setVideos] = useState<videoDef[]>(VideoData)

  const [currentVideo, setCurrentVideo] = useState<videoDef>({} as videoDef)

  useEffect(() => {
    if(currentVideo){
      const searchVideo = videos.find(video => video.url == localStorage.getItem("lastVideo"))

      if(searchVideo){
        setCurrentVideo(searchVideo)
        return
      }

      handleSelectVideo(videos[0])
    }
  }, [currentVideo, videos])

  const handleSelectVideo = (video: videoDef) => {
    if(video.active){
      setCurrentVideo(video)
      localStorage.setItem("lastVideo", video.url)
    }
  }

  return (
    <Page title="Semana do Violino - Raone Moura" description="Sua semana começa agora!" path="/">
      <div className={styles.container}>
        
        <header className={styles.header}>
          <img className={styles.logo} src={`images/logo.png`} alt="Semana do Violino" />
          <img className={styles.semanadoviolino} src={`images/semanadoviolino.png`} alt="Semana do Violino" />
        </header>

        <div className={styles.content}>
          <header className={styles.title}>
            <h1>{currentVideo.title}</h1>
          </header>

          <div className={styles.box}>

            <Player id={currentVideo.id} active={currentVideo.active} />
            
            <div className={styles.menu}>
              <h2>Sua Semana</h2>
              <div className={styles.buttons}>
                {videos.map(video => (
                  <button 
                    className={`${!video.active && styles.notActive } ${currentVideo.url === video.url && styles.currentVideo}`} 
                    key={video.id} onClick={() => handleSelectVideo(video)}>
                    <p>{video.title}</p>
                    {video.active != true ? (<span>Disponivel apartir do dia {video.date} ás 18h</span>) : ""}
                  </button>
                ))}
                
                
              </div>
            </div>
          </div>
        </div>

        <Comment currentVideo={currentVideo.title}/>
      </div>
    </Page>
  )
}

export default Jornada
