// Program.jsx — CSS-only (no MUI)
import React, { useEffect, useMemo, useState } from 'react';
import aboutBanner from '../../assets/about_banner.jpg'; // 배너 이미지는 About와 동일 사용
import { supabase } from '../../lib/supabaseClient';
import './program.css';

// type: 0 = 정규 프로그램, 1 = 특별/이벤트성 프로그램
const TYPE_MAP = { 0: '정규', 1: '이벤트' };

export default function Program() {
  const [programList, setProgramList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all | regular | event
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchProgram = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('program')
        .select('*')
        .order('id', { ascending: false });
      if (!error && Array.isArray(data)) setProgramList(data);
      setLoading(false);
    };
    fetchProgram();
  }, []);

  const filtered = useMemo(() => {
    const byType = programList.filter((p) => {
      if (filter === 'regular') return p.type === 0;
      if (filter === 'event') return p.type === 1;
      return true;
    });
    const q = query.trim().toLowerCase();
    if (!q) return byType;
    return byType.filter((p) =>
      (p.title || '').toLowerCase().includes(q) || (p.info || '').toLowerCase().includes(q)
    );
  }, [programList, filter, query]);

  return (
    <main className="ak-program ak-page">
      {/* Hero */}
      <section className="ak-hero ak-hero--program" aria-label="프로그램 배너">
        <img className="ak-hero__img" src={aboutBanner} alt="프로그램 안내 배너" />
        <div className="ak-hero__overlay" />
        <div className="ak-container ak-hero__inner">
          <h1 className="ak-hero__title">프로그램 안내</h1>
          <p className="ak-hero__subtitle">유아부터 초등까지, 발달 단계에 맞춘 창의·치료적 미술 수업</p>
        </div>
      </section>

      {/* Controls */}
      <section className="ak-section" aria-label="프로그램 필터">
        <div className="ak-container">
          <div className="ak-toolbar">
            <div className="ak-segment" role="tablist" aria-label="분류 선택">
              <button
                className={`ak-segment__btn ${filter === 'all' ? 'is-active' : ''}`}
                role="tab"
                aria-selected={filter === 'all'}
                onClick={() => setFilter('all')}
              >전체</button>
              <button
                className={`ak-segment__btn ${filter === 'regular' ? 'is-active' : ''}`}
                role="tab"
                aria-selected={filter === 'regular'}
                onClick={() => setFilter('regular')}
              >정규</button>
              <button
                className={`ak-segment__btn ${filter === 'event' ? 'is-active' : ''}`}
                role="tab"
                aria-selected={filter === 'event'}
                onClick={() => setFilter('event')}
              >이벤트</button>
            </div>

            <label className="ak-search" aria-label="프로그램 검색">
              <svg className="ak-search__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 3a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm9.78 14.22-3.25-3.25 1.42-1.42 3.25 3.25a1 1 0 0 1-1.42 1.42Z"/></svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="ak-search__input"
                placeholder="프로그램 검색"
              />
            </label>
          </div>
        </div>
      </section>

      {/* List */}
      <section className="ak-section">
        <div className="ak-container">
          {loading ? (
            <div className="ak-grid ak-grid--3">
              {Array.from({ length: 6 }).map((_, i) => (
                <article className="ak-card ak-card--skeleton" key={i}>
                  <div className="ak-skel ak-skel--title" />
                  <div className="ak-skel ak-skel--line" />
                  <div className="ak-skel ak-skel--line" />
                  <div className="ak-skel ak-skel--line short" />
                </article>
              ))}
            </div>
          ) : (
            <div className="ak-grid ak-grid--3">
              {filtered.map((p) => (
                <article className="ak-card ak-card--hover ak-program__card" key={p.id}>
                  <div className="ak-program__head">
                    <h3 className="ak-h5 ak-program__title">{p.title}</h3>
                    <span className={`ak-badge ${p.type === 1 ? 'ak-badge--event' : 'ak-badge--regular'}`}>
                      {TYPE_MAP[p.type] || '프로그램'}
                    </span>
                  </div>
                  <div className="ak-prose" dangerouslySetInnerHTML={{ __html: p.info }} />
                </article>
              ))}
              {filtered.length === 0 && (
                <div className="ak-empty">
                  <p className="ak-body">조건에 맞는 프로그램이 없습니다.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
