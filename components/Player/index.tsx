/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { setCookie } from 'nookies';
import { memo, useEffect, useState } from 'react'
import { CgMusicNote } from 'react-icons/cg';
import ReactPlayer from 'react-player/vimeo'
import { toast } from 'react-toastify';

import { videoDef } from '../../pages/semanadoviolino'

import {videos} from '../../utils/videos'

import styles from './styles.module.css'

type ProgressType = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

interface PlayerProps {
  currentVideo : videoDef
}
function Player({currentVideo}: PlayerProps) {
  
  const [video, setVideo] = useState(currentVideo)
  const [asAutoNextVideo, setAsAutoNextVideo] = useState(false)
  const [isJourneyViolion, setIsJourneyViolion] = useState(true)

  useEffect(() => {
    if(!asAutoNextVideo){
      setVideo(currentVideo)
    }
    setCookie(undefined, 'raonemoura.videoid', video.vimeo_id)
  }, [currentVideo, video, asAutoNextVideo])

  const handleVideoEnd = () => {
    const nextVideo = videos.find(v => {
      return v.id === currentVideo.id +1
    })
    
    if(nextVideo){
      if(nextVideo.active){
        const loadNextVideo = new Promise((resolve, reject) => {
          setTimeout(() => resolve(setVideo(nextVideo)), 3000)
          setAsAutoNextVideo(true)
        })

        toast.promise(loadNextVideo, {
          pending: 'Pulando para próxima aula em 3 segundos.',
          success: 'Você ja pode assistir sua aula.',
          error: 'OPS, algo deu errado!'
        }, {
          theme: 'dark'
        })
      }
    }
  }


  const handleProgess = (progressVideo: ProgressType) => {
    const {playedSeconds} = progressVideo
    /*
    if((playedSeconds / 60) >= 8 ){
      setIsJourneyViolion(true)
      return
    }
    return
    */
  }
  
  return (
    <div className={styles.video}>
      {video.active ? (
        <>
          <header className={styles.title}>
            <h1>{video.title}</h1>
          </header>
           <ReactPlayer url={`https://vimeo.com/${video.vimeo_id}`}  
            controls={true} width="100%" height={600} onProgress={(progress) => handleProgess(progress)} onEnded={() => handleVideoEnd()}/>

          {isJourneyViolion && (
            <>
              <section className={styles.journey} >
                <header>
                  <h1><CgMusicNote /> Parabéns a Jornada do Violinista foi Desbloqueada!</h1>
                </header>
                <Link href="https://pay.hotmart.com/L67319512L">
                  <a><button>clique aqui para começar agora a sua jornada!</button></a>
                </Link>
                <p className={styles.alertHotmart} >*Você sera redirecionado para pagina de compra da <Link href="https://hotmart.com"><a>Hotmart</a></Link>!</p>
                
              </section>
            </>
          )}
        </>
       
      )
      :
      (
        <section className={styles.comming}>
          Em Breve {video.date}
        </section>
      )
    }   
    </div>
  )
}

export default memo(Player)