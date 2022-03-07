/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import styles from '../styles/Aulas.module.css'

import {videos as VideoData} from '../utils/videos'

import { Page } from "../components/page"
import Player from '../components/Player'
import Comment from '../components/Comments'

export type videoDef = {
  id: number;
  title: string;
  vimeo_id: string;
  date: string;
  active: boolean;
}

const Jornada: NextPage = () => {
  
  const [videos, setVideos] = useState<videoDef[]>(VideoData)
  const [currentVideo, setCurrentVideo] = useState<videoDef>({} as videoDef)

  useEffect(() => {
    if(currentVideo){
      const searchVideo = videos.find(video => video.vimeo_id == localStorage.getItem("lastVideo"))

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
      localStorage.setItem("lastVideo", video.vimeo_id)
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

            <Player currentVideo={currentVideo} />
            
            <div className={styles.menu}>
              <h2>Sua Semana</h2>
              <div className={styles.buttons}>
                {videos.map(video => (
                  <button 
                    className={`${!video.active && styles.notActive } ${currentVideo.vimeo_id === video.vimeo_id && styles.currentVideo}`} 
                    key={Math.random() * (0 - 2000) + 0} onClick={() => handleSelectVideo(video)}>
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
