import { Link, useRouteMeta } from 'dumi';
import React from 'react';

export default function Hero() {
  const { frontmatter } = useRouteMeta();

  if (!('hero' in frontmatter)) return null;

  return (
    <section className="gg-home-hero">
      <div className="gg-home-glow gg-home-glow-blue" aria-hidden="true" />
      <div className="gg-home-glow gg-home-glow-violet" aria-hidden="true" />

      <div className="gg-home-shell">
        <div className="gg-home-copy">
          <div className="gg-home-kicker">
            <span className="gg-home-kicker-dot" />
            GZ FRONTEND TOOLCHAIN
          </div>

          <h1>
            <span>Build once.</span>
            <br />
            Ship <em>consistently.</em>
          </h1>

          <p>
            gg-cli 把 React、Garfish、gg-ui、gz-pc 和多环境构建装进统一模板，
            让每个新项目从第一行代码开始就保持一致。
          </p>

          <div className="gg-home-actions">
            <Link className="gg-home-action-primary" to="/getting-started">
              开始创建项目 <span aria-hidden="true">↗</span>
            </Link>
            <Link className="gg-home-action-secondary" to="/commands">
              查看项目命令 <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="gg-home-stack" aria-label="内置技术能力">
            <span>React</span>
            <i />
            <span>TypeScript</span>
            <i />
            <span>Vite</span>
            <i />
            <span>Garfish</span>
          </div>
        </div>

        <div className="gg-home-terminal-wrap" aria-label="gg-cli 创建项目示例">
          <div className="gg-home-terminal-orbit gg-home-orbit-one" aria-hidden="true" />
          <div className="gg-home-terminal-orbit gg-home-orbit-two" aria-hidden="true" />

          <div className="gg-home-terminal">
            <div className="gg-home-terminal-bar">
              <div className="gg-home-terminal-controls" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span className="gg-home-terminal-title">gg-cli / create-project</span>
              <span className="gg-home-terminal-status">● LIVE</span>
            </div>

            <div className="gg-home-terminal-body">
              <div className="gg-home-terminal-line gg-home-terminal-command">
                <span className="gg-home-prompt">❯</span>
                <span>gg-cli init customer-center</span>
              </div>

              <div className="gg-home-terminal-gap" />

              <div className="gg-home-terminal-line gg-home-terminal-muted">
                <span>?</span>
                <span>Select a template</span>
                <strong>micro-app</strong>
              </div>
              <div className="gg-home-terminal-line">
                <span className="gg-home-check">✓</span>
                <span>React + TypeScript + Vite</span>
              </div>
              <div className="gg-home-terminal-line">
                <span className="gg-home-check">✓</span>
                <span>gg-ui + gz-pc + Mock</span>
              </div>
              <div className="gg-home-terminal-line">
                <span className="gg-home-check">✓</span>
                <span>DEV + SIT + PROD builds</span>
              </div>

              <div className="gg-home-terminal-success">
                <span>PROJECT READY</span>
                <strong>cd customer-center &amp;&amp; npm run dev</strong>
              </div>

              <div className="gg-home-terminal-line gg-home-terminal-command">
                <span className="gg-home-prompt">❯</span>
                <span className="gg-home-caret" />
              </div>
            </div>
          </div>

          <div className="gg-home-float-card gg-home-float-card-top">
            <span>01</span>
            <strong>CREATE</strong>
          </div>
          <div className="gg-home-float-card gg-home-float-card-bottom">
            <span>03</span>
            <strong>SHIP</strong>
          </div>
        </div>
      </div>

      <div className="gg-home-coordinate gg-home-coordinate-left">CLI — 01</div>
      <div className="gg-home-coordinate gg-home-coordinate-right">GZ / 2026</div>
    </section>
  );
}
