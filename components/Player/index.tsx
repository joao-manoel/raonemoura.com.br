/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { videoDef } from '../../pages/jornada'
import styles from './styles.module.css'

type PlayerProps = {
    url: string
}

function Player({url}: PlayerProps) {
  
  return (
    <div className={styles.video}>
        <video src={url} controls/>   
    </div>
  )
}

export default Player
