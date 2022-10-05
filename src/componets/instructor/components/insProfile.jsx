import React, { useEffect, useState } from 'react'
import styles from './insProfile.module.css'
import { fetchInstructorByInsId } from '../../../api/instructor/instructor'

const InsProfile = (props) => {
  const [ins, setIns] = useState({})
  useEffect(() => {
    const insId = props?.insId

    fetchInstructorByInsId(insId).then((res) => {
      setIns(res.data[0])
    })
  }, [])
  return (
    <section className={styles.infoGroup}>
      <section className={styles.insProfile}>
        <h3>🧑‍🎓 멘토 프로필</h3>
        <div className={styles.insContainer}>
          <li className={styles.item}>
            <dd>멘토명</dd>
            <dl>{ins.name}</dl>
          </li>
          <li className={styles.item}>
            <dd>전공</dd>
            <dl> {ins.major}</dl>
          </li>
          <li className={styles.item}>
            <dd>이메일</dd>
            <dl>{ins.email}</dl>
          </li>
          <li className={styles.item}>
            <dd>성별</dd>
            <dl>{ins.gender === 'MAN' ? '남' : '여'}</dl>
          </li>
          <li className={styles.item}>
            <dd>평점</dd>
            <dl>{ins.score === -1 ? '점수없음' : `⭐ ${ins.score}점`}</dl>
          </li>
        </div>
      </section>
      <section className={styles.info}>
        <h4>📢 멘토 소개</h4>
        <div className={styles.intro}> {ins.introduction}</div>
      </section>
    </section>
  )
}

export default InsProfile
