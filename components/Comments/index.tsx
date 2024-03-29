/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import {FaHourglassEnd} from 'react-icons/fa'
import {MdOutlineAlternateEmail} from 'react-icons/md'
import {AiOutlineClose} from 'react-icons/ai'

import api from '../../services/api'

import styles from './styles.module.css'
import { CommentType } from '../../pages/api/comments'

interface ResponseCommentsType {
  comments: CommentType[]
  totalcomment: number
}

interface CommentsPageProps {
  currentVideoId: string
}

import Comment from "./comment"

const LIMIT_COMMENT = 5

export default function Comments({currentVideoId} : CommentsPageProps) {

  const [comments, setComments] = useState<CommentType[]>([])
  const [totalComment, setTotalComment] = useState(0)
  const [countComments, setCountComments] = useState(LIMIT_COMMENT)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")

  const [question, setQuestion] = useState("")
  const [name, setName] = useState("")
  const [localName, setlocalName] = useState("")

  useEffect(() =>{
    LoadComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideoId, countComments])


  const LoadComments = () => {

    if(currentVideoId !== undefined){
      try{
        api.get<ResponseCommentsType>(`api/comments?limit=${countComments}&videoId=${currentVideoId}`).then(response => {
          setComments(response.data.comments)
          setTotalComment(response.data.totalcomment)
        }).finally(() => {
          setLoading(false)
        })
      } catch(error){
        console.log(error)
      }
      return
    }
  }

  useEffect(() => {
    const username = localStorage.getItem('username')
    if(username){
      setlocalName(username)
      setName(username)
    }
  }, []) 


  const LoadMoreComments = () => {
    let newCount = countComments + LIMIT_COMMENT

    if(newCount > totalComment){
      newCount = totalComment
    }

    setCountComments(newCount)
  }

  const handleSubmitQuestion = async () => {

    if(localName != ''){
      setName(localName)
    }

    if(question === ''){
      setMessage("Descreva sua duvida!")
      return
    }

    if(name === ''){
      setMessage("Nos diga seu nome")
      return
    }

    if(question.length < 3){
      setMessage("Escreva mais um pouco")
      return
    }

    if(name.length < 3){
      setMessage("Tem certeza que seu nome tem menos de 3 caracteres?")
      return
    }

    if(question != '' && name != ''){
      
      try{
        const comment = await api.post('api/comments', {
          name,
          message: question,
          currentVideoId
        })

        localStorage.setItem('username', name)
        setlocalName(name)

        if(comment){
          LoadMoreComments()
          setQuestion("")
          setMessage("")
          return
        }else{
          setMessage("Ops, algo não planejado ocorreu, tente novamente mais tarde! #132")
          return
        }
      } catch(error){
        setMessage("Ops, algo não planejado ocorreu, tente novamente mais tarde! #133")
      }
    }
    setMessage("Todos os campos deve ser preenchido!")

  }

  const handleEditName = () => {
    localStorage.removeItem("username")
    setlocalName("")
  }

  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Tire Suas Dúvidas!</h1>  
      </header>

      <div className={styles.inputInsertComment}>
        <p>{message && message}</p>
        <div className={styles.inputName}>
          <MdOutlineAlternateEmail />
          {localName === "" ? (
            <input type="text" placeholder='digite seu nome' minLength={3} min={3} onChange={e => setName(e.target.value)}/>
          )
          : (
            <>
              <span>{localName}</span>
              <button onClick={() => handleEditName()}><AiOutlineClose /></button>
            </>
          )
        }
        </div>
        <textarea placeholder='tire suas dúvidas...' minLength={3} onChange={(e) => setQuestion(e.target.value)}/>
        <button onClick={() => handleSubmitQuestion()}>Enviar Duvida</button>
      </div>

      <div className={styles.comments}>
        {
          loading ? (
            <p><FaHourglassEnd />Carregando</p>
          ) 
          :
          comments.map(comment => (
            <Comment key={comment._id}
              name={comment.name}
              message={comment.message}
              date={comment.date}
            />
          ))
        }

        {countComments < totalComment && (
          <div className={styles.loadMoreComments}>
            <button onClick={() => LoadMoreComments()}>Carregar Mais</button>
          </div>
        ) }
      </div>
    </div>
  )
}
