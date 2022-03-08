/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, memo } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter} from 'next/router'
import {setCookie, destroyCookie, parseCookies} from 'nookies'

import {DEFAULT_COOKIES_SAVE_VIDEO_ID, videos as VideoData} from '../utils/videos'

import { Page } from "../components/page"
import Player from '../components/Player'
import Comment from '../components/Comments'

import styles from '../styles/Aulas.module.css'

export type videoDef = {
  id: number;
  title: string;
  vimeo_id: string;
  date: string;
  active: boolean;
}

interface SemanaDoViolinoProps {
  CookiesVideoId: string
}

export default function SemanaDoViolino({CookiesVideoId}: SemanaDoViolinoProps) {
  const router = useRouter()
  const {lessonid} = router.query
  
  const [currentVideo, setCurrentVideo] = useState<videoDef>({} as videoDef)
  const [asClickVideo, setAsClickVideo] = useState(false)

  //procurar video se caso for passando uma lessonid na url
  useEffect(() => {

    const SetNewVideo = (v: videoDef) => {
      setCurrentVideo(v)
      setCookie(undefined, 'raonemoura.videoid', v.vimeo_id)
    }

    if(lessonid && !asClickVideo) {
      const loadVideo = VideoData.find(video => video.vimeo_id == lessonid)

      if(loadVideo){
        SetNewVideo(loadVideo)
        return 
      }

      SetNewVideo(VideoData[0])
    }
  }, [lessonid, currentVideo, asClickVideo])

  //verifica se algum video esta ja disponivel em tela se nao procura se ta salvo lo storage caso contrario set um video padrao
  useEffect(() => {

    const SetNewVideo = (v: videoDef) => {
      setCurrentVideo(v)
      setCookie(undefined, 'raonemoura.videoid', v.vimeo_id)      
    }

    if(lessonid === undefined && currentVideo.id === undefined){
      if(CookiesVideoId){
        const findVideo = VideoData.find(v => v.vimeo_id === CookiesVideoId)
        if(findVideo){
          SetNewVideo(findVideo)
          return
        }

        SetNewVideo(VideoData[0])
        return
      }
      SetNewVideo(VideoData[0])
      return
    }

  }, [currentVideo, lessonid, CookiesVideoId])

  const handleSelectVideo = (video: videoDef) => {
    if(video.active){
      setAsClickVideo(true)
      setCurrentVideo(video)
      setCookie(undefined, 'raonemoura.videoid', video.vimeo_id)
    }
  }

  return (
    <Page title="Semana do Violino - Raone Moura" description='Semana do violino ja começou!' path="/">
      <div className={styles.container}>
        
        <header className={styles.header}>
          <img className={styles.logo} src={`images/logo.png`} alt="Semana do Violino" />
          <img className={styles.semanadoviolino} src={`images/semanadoviolino.png`} alt="Semana do Violino" />
        </header>

        <div className={styles.content}>
          <div className={styles.box}>

            <Player currentVideo={currentVideo} />
            
            <div className={styles.menu}>
              <h2>Sua Semana</h2>
              <div className={styles.buttons}>
                {VideoData.map(video => (
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

        <Comment currentVideoId={currentVideo.vimeo_id}/>
      </div>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const {'raonemoura.videoid': videoid} = parseCookies(ctx)
  return {
    props: {
      CookiesVideoId: videoid
    }
  }
}