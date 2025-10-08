// About.jsx — CSS-only (no MUI)
import React, { useEffect, useState } from 'react';
import aboutBanner from '../../assets/about_banner.jpg';
import directorPhoto from '../../assets/director.jpg';
import { supabase } from '../../lib/supabaseClient';
import './about.css';

export default function About() {
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from('history')
        .select('*')
        .order('id', { ascending: false });
      if (!error && Array.isArray(data)) setHistoryList(data);
    };
    fetchHistory();
  }, []);

  return (
    <main className="ak-about">
      {/* Hero */}
      <section className="ak-hero ak-hero--about" aria-label="학원 소개 배너">
        <img className="ak-hero__img" src={aboutBanner} alt="Artful Kids 배너" />
        <div className="ak-hero__overlay" />
        <div className="ak-container ak-hero__inner">
          <h1 className="ak-hero__title">About Artful</h1>
          <p className="ak-hero__subtitle">
            창의적인 교육 방식으로 아이의 자율성과 감각을 키워가는 예술 학원
          </p>
        </div>
      </section>

      {/* 소개 */}
      <section className="ak-section">
        <div className="ak-container ak-prose">
          <p>
            <strong>Artful</strong>은 단순한 그림 수업을 넘어 아이가 즐겁게 몰입하고 자신의 속도로 성장할 수 있도록 돕는 
            <em>치료적·창의적</em> 미술 교육을 제공합니다. 심리적 안전과 자율성을 존중하는 환경에서, 감정 조절·자존감·사회성의
            긍정적 변화를 목표로 합니다.
          </p>
        </div>
      </section>

      {/* 원장 이력 */}
      <section className="ak-section" aria-labelledby="director-heading">
        <div className="ak-container">
          <h2 id="director-heading" className="ak-h2">아트풀 원장 이력</h2>
          <div className="ak-grid ak-grid--2 ak-director">
            <figure className="ak-director__photo-wrap">
              <img className="ak-director__photo" src={directorPhoto} alt="아트풀 원장 최봄비" />
              <figcaption className="ak-director__caption">
                <span className="ak-badge">최봄비</span> 원장
              </figcaption>
            </figure>

            <div className="ak-card ak-director__history">
              <ul className="ak-list ak-list--history" role="list">
                <li className="ak-list__title">주요 이력</li>
                {historyList.map((item) => (
                  <li key={item.id} className="ak-list__item">
                    <span className="ak-dot" aria-hidden="true" />
                    <span className="ak-list__text">{item.info}</span>
                  </li>
                ))}
                {historyList.length === 0 && (
                  <li className="ak-list__item ak-list__item--empty">이력이 준비 중입니다.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 오시는 길 */}
      <section className="ak-section" id="contact">
  <div className="ak-container">
    <h2 className="ak-h2">오시는 길</h2>
    <div className="ak-contact-info">
      <div className="ak-contact-card">
        <p className="ak-body"><strong>주소</strong> 경기도 안양시 동안구 학의로 44 204호 아트풀미술교습소</p>
        {/* <p className="ak-body"><strong>지하철</strong> 2호선 강남역 3번 출구 도보 5분</p> */}
        <p className="ak-body"><strong>전화</strong> 0507-1369-3038</p>
        
      </div>
    </div>
  </div>
</section>
    </main>
  );
}
