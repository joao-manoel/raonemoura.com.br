/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { videoDef } from '../../pages/aulas'
import styles from './styles.module.css'

type PlayerProps = {
  id: string
  active: boolean
}

function Player({id, active}: PlayerProps) {
  
  return (
    <div className={styles.video}>
      {active && (
        <iframe src={`https://www.youtube.com/embed/${id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      )}   
    </div>
  )
}

export default Player
