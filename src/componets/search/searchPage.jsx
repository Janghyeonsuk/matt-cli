import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchClassByKeyword } from '../../api/class/class'
import styles from './searchPage.module.css'
import { nowDate } from '@/utils'
import { useSelector } from 'react-redux'

const SearchPage = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState(
    useSelector((state) => state.search.searchKey)
  )
  const [status, setStatus] = useState(
    useSelector((state) => state.search.status)
  )
  const [classes, setClasses] = useState([])
  useEffect(() => {
    console.log(props)
    // fetchClassByKeyword(keyword).then((res) => {
    //   setKeyword(keyword)
    //   setClasses(res.data)
    // })
    console.log('rkawl')
  }, [status])

  const toClassInfo = (classId) => {
    navigate(`/class/${classId}`, { state: { classId: classId } })
  }

  const classSt = (startDate, endDate) => {
    if (startDate > nowDate)
      return <div className={`${styles.classSt} ${styles.will}`}>진행예정</div>
    if (endDate > nowDate)
      return <div className={`${styles.classSt} ${styles.ing}`}>진행중</div>
    return <div className={`${styles.classSt} ${styles.done}`}>종료</div>
  }

  return (
    <>
      <h4>🔍'{keyword}' 로 검색한 결과 </h4>
      <div className={styles.container}>
        {classes.map((classes) => (
          <div
            className={styles.card}
            onClick={() => toClassInfo(classes.classId)}
            key={classes.classId}
          >
            {classSt(classes.startDate, classes.endDate)}

            <div className={styles.classTitle}>{classes.title}</div>
            <div className={styles.contents}>
              <div className={styles.etc}>김가정 멘토</div>
              <div className={styles.etc}>
                {classes.startDate} ~ {classes.endDate}
              </div>
              <div className={styles.etc}>
                모집인원 {classes.numberOfStudents}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
export default SearchPage
