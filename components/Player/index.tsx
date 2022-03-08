/* eslint-disable @next/next/no-img-element */
import next from 'next';
import { memo, useEffect, useState } from 'react'
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
  
  const [progress, setProgress] = useState<ProgressType>({} as ProgressType)
  const [video, setVideo] = useState(currentVideo)
  const [asAutoNextVideo, setAsAutoNextVideo] = useState(false)

  const handleDuration = (progressVideo: ProgressType) => {
    setProgress(progressVideo)
  }

  useEffect(() => {
    if(!asAutoNextVideo){
      setVideo(currentVideo)
    }
    localStorage.setItem('lastVideo', video.vimeo_id)
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

  
  return (
    <div className={styles.video}>
      {video.active ? (
        //<iframe src={`https://www.youtube.com/embed/${id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <ReactPlayer url={`https://vimeo.com/${video.vimeo_id}`}  
        controls={false} width="100%" height={600} onProgress={(event) => handleDuration(event)} onEnded={() => handleVideoEnd()}/>
      )
      :
      (
        <div className={styles.comming}>
          Em Breve  
        </div>
      )
    }   
    </div>
  )
}

export default memo(Player)