
import React from 'react';
import mainBanner from '../../assets/main_banner.jpg';
import './home.css';

export default function HomePage() {
  return (
    <main className="ak-page">
      {/* Hero */}
      <section className="ak-hero-home">
        <img className="ak-hero__img" src={mainBanner} alt="Artful Kids 메인 배너" />
        <div className="ak-hero__overlay" />
        <div className="ak-container ak-hero__inner-home">
          <span className="ak-chip">Artful</span>
          <h1 className="ak-hero__title">아이의 발달과 성장을 돕는<br/>특별한 미술교육</h1>
          <p className="ak-hero__subtitle">
            아트풀 미술교습소는 단순한 그림 수업을 넘어, 치료적 접근과 창의적 표현을 결합한 전문 미술 프로그램을 운영합니다.
            전문 미술치료사가 직접 기획하고 지도하며, 아이의 발달 수준과 성향에 맞춘 섬세한 수업으로 변화와 성장을 이끌어냅니다.
          </p>
          <div className="ak-actions">
            <a className="ak-btn ak-btn--primary" href="/program">프로그램 보기</a>
            <a className="ak-btn ak-btn--ghost" href="http://pf.kakao.com/_lwUWn/friend" target="_blank">상담 신청</a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="ak-section">
        <div className="ak-container">
          <div className="ak-grid ak-grid--2">
            <div>
              <h2 className="ak-h2">아이들의 창의력을 키우는 공간</h2>
              <p className="ak-lead">
                Artful Kids는 아이들의 상상력과 감성을 예술로 표현할 수 있도록 돕는 미술 학원입니다.
                아이가 즐겁게 몰입하며 자신의 속도로 성장할 수 있도록, 심리적 안전과 자율성을 존중하는 환경을 조성합니다.
              </p>
            </div>
            <div>
              <div className="ak-card">
                <div className="ak-card__item">
                  <h3 className="ak-overline">치료적 접근</h3>
                  <p className="ak-body">감정 조절, 자존감, 사회성 발달을 돕는 치료적 미술 활동을 정교하게 설계합니다.</p>
                </div>
                <hr className="ak-divider"/>
                <div className="ak-card__item">
                  <h3 className="ak-overline">개인 맞춤 지도</h3>
                  <p className="ak-body">발달 단계와 기질을 고려한 목표를 세우고, 작은 성취를 꾸준히 경험하도록 돕습니다.</p>
                </div>
                <hr className="ak-divider"/>
                <div className="ak-card__item">
                  <h3 className="ak-overline">전문성 있는 운영</h3>
                  <p className="ak-body">임상 경험이 있는 미술치료사가 직접 기획·지도하여 수업의 깊이와 안전성을 보장합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="ak-section" id="programs">
        <div className="ak-container">
          <div className="ak-grid ak-grid--3">
            {[{
              title: '관찰 기반 진단',
              desc: '첫 만남에서 아이의 강점/과제 영역을 섬세하게 관찰해 수업 방향을 설정합니다.'
            },{
              title: '과정 중심 평가',
              desc: '결과물보다 과정의 태도·집중·표현 변화를 중점적으로 기록하고 피드백합니다.'
            },{
              title: '가정 연계 가이드',
              desc: '부모 상담과 홈 액티비티 제안을 통해 교실 밖에서도 성장이 이어지도록 돕습니다.'
            }].map(({title, desc}) => (
              <article className="ak-card ak-card--hover" key={title}>
                <h3 className="ak-h5">{title}</h3>
                <p className="ak-body">{desc}</p>
              </article>
            ))}
          </div>

          <div className="ak-cta" aria-labelledby="cta-title">
            <div className="ak-cta__text">
              <h3 id="cta-title" className="ak-h4">우리 아이에게 맞는 수업이 궁금하신가요?</h3>
              <p className="ak-body">간단한 상담을 통해 아이의 현재 상태와 목표에 맞춘 맞춤 프로그램을 제안드립니다.</p>
            </div>
            <div className="ak-cta__actions">
              <a className="ak-btn ak-btn--primary ak-btn--full" href="http://pf.kakao.com/_lwUWn/friend" target="_blank">상담 예약</a>
              <a className="ak-btn ak-btn--outline ak-btn--full" href="/program">프로그램 안내</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
