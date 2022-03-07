/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'

import ReactPlayer from 'react-player/vimeo'
import { videoDef } from '../../pages/aulas'

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
  const handleDuration = (progressVideo: ProgressType) => {
    setProgress(progressVideo)
  }

  useEffect(() => {
    //quando o video chega em um determinado tempo disponibilizar em tela o botao de compra
  })

  const handleVideoEnd = () => {
    const currentVideo = videos.find((video) => {
      //quando o video acabar ja passa para o proximo - new Features!
    }, console.log)
  }
  
  return (
    <div className={styles.video}>
      {currentVideo.active && (
        //<iframe src={`https://www.youtube.com/embed/${id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <ReactPlayer url={`https://vimeo.com/${currentVideo.vimeo_id}`}  
        controls={false} width="100%" height={600} onProgress={(event) => handleDuration(event)} onEnded={() => handleVideoEnd()}/>
      )}   
    </div>
  )
}

export default Player
