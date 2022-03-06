/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import styles from '../styles/Jornada.module.css'

import { Page } from "../components/page"
import Player from '../components/Player'
import Comment from '../components/Comments'

export type videoDef = {
  id: number
  title: string
  url: string
  thumb: string
  date: string
  active: boolean
}

const Jornada: NextPage = () => {
  

  const [videos, setVideos] = useState<videoDef[]>([
    {
      id: 1,
      title: "Jornada 01",
      url: "videos/jornada01.mp4",
      thumb: "",
      date: "07/03",
      active: true
    }, 
    {
      id: 2,
      title: "Jornada 02",
      url: "videos/jornada02.mp4",
      thumb: "",
      date: "08/03",
      active: true
    },
    {
      id: 3,
      title: "Jornada 03",
      url: "videos/jornada03.mp4",
      thumb: "",
      date: "09/03",
      active: false
    },
    {
      id: 4,
      title: "Jornada 04",
      url: "videos/jornada04.mp4",
      thumb: "",
      date: "10/03",
      active: false
    }
  ])

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
    setCurrentVideo(video)
    localStorage.setItem("lastVideo", video.url)
  }

  return (
    <Page title="Semana do Violino - Raone Moura" description="" path="/">
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

            <Player url={currentVideo.url} />
            
            <div className={styles.menu}>
              <h2>Sua Jornada</h2>
              <div className={styles.buttons}>
                {videos.map(video => (
                  <button 
                    className={`${!video.active && styles.notActive } ${currentVideo.url === video.url && styles.currentVideo}`} 
                    key={video.id} onClick={() => handleSelectVideo(video)}>
                    <p>{video.title}</p>
                    {video.active != true ? (<span>{video.date}</span>) : ""}
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
