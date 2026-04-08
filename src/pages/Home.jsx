import { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import '../index.css'

/* ── Scroll-reveal hook ── */
function useScrollReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    // Observe all .reveal and .reveal-scale children
    const targets = node.querySelectorAll('.reveal, .reveal-scale')
    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return ref
}

/* ── Feature data ── */
const features = [
  {
    icon: '⇄',
    color: 'rgba(99, 102, 241, 0.12)',
    borderColor: 'rgba(99, 102, 241, 0.2)',
    textColor: '#818cf8',
    title: 'Universal Liquidity',
    desc: 'Pay in any stablecoin. Recipients choose their payout token. Our StableFX engine routes swaps automatically.',
  },
  {
    icon: '⚡',
    color: 'rgba(139, 108, 247, 0.12)',
    borderColor: 'rgba(139, 108, 247, 0.2)',
    textColor: '#a78bfa',
    title: 'Batch Processing',
    desc: 'Send to 50+ recipients in a single transaction with gas-optimized routing and on-chain reference IDs.',
  },
  {
    icon: '🛡',
    color: 'rgba(52, 211, 153, 0.12)',
    borderColor: 'rgba(52, 211, 153, 0.2)',
    textColor: '#34d399',
    title: 'Enterprise Auditing',
    desc: 'Every batch emits rich on-chain metadata. Map off-chain invoices to immutable payment proofs.',
  },
  {
    icon: '🔐',
    color: 'rgba(251, 191, 36, 0.12)',
    borderColor: 'rgba(251, 191, 36, 0.2)',
    textColor: '#fbbf24',
    title: 'Multi-Auth Login',
    desc: 'Sign in with Google, X, email, or any Web3 wallet via Privy. No seed phrase headaches.',
  },
  {
    icon: '💧',
    color: 'rgba(34, 211, 238, 0.12)',
    borderColor: 'rgba(34, 211, 238, 0.2)',
    textColor: '#22d3ee',
    title: 'DeFi Liquidity Vault',
    desc: 'Provide USDC or EURC liquidity and earn cross-swap fees. Manage positions from the built-in vault.',
  },
  {
    icon: '📊',
    color: 'rgba(244, 114, 182, 0.12)',
    borderColor: 'rgba(244, 114, 182, 0.2)',
    textColor: '#f472b6',
    title: 'Live Telemetry',
    desc: 'Real-time balance tracking, transaction history with search and pagination, and live FX engine monitoring.',
  },
]

/* ── Stats ── */
const stats = [
  { value: '$0 Fees', label: 'On Testnet' },
  { value: '50+', label: 'Recipients/Batch' },
  { value: '2', label: 'Tokens Supported' },
  { value: '<3s', label: 'Settlement Time' },
]

function Home() {
  const [scrolled, setScrolled] = useState(false)
  const pageRef = useScrollReveal()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={pageRef}>
      {/* ── Background Effects ── */}
      <div className="grid-bg" />
      <div className="background-glow">
        <div className="glow-circle glow-purple" />
        <div className="glow-circle glow-blue" />
        <div className="glow-circle glow-cyan" />
      </div>

      {/* ══════════ Navbar ══════════ */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <div className="logo">
            <div className="logo-icon animate-glow-pulse">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
                <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
            </div>
            <span className="logo-text">WizPay</span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Link to="/docs" className="btn btn-outline" style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}>
              Docs
            </Link>
            <a href="https://app.wizpay.xyz" className="btn btn-primary" style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}>
              Launch App
            </a>
          </div>
        </div>
      </nav>

      {/* ══════════ Hero Section ══════════ */}
      <section style={{ paddingTop: '140px', paddingBottom: '60px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.75rem' }}>

          {/* Status badge */}
          <div className="fade-in-up badge-pill" style={{
            background: 'rgba(139, 108, 247, 0.08)',
            borderColor: 'rgba(139, 108, 247, 0.20)',
            color: 'var(--primary-bright)',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-emerald)', boxShadow: '0 0 8px rgba(52,211,153,0.5)' }} />
            V2 Live on Arc Testnet
          </div>

          {/* Headline */}
          <h1 className="fade-in-up delay-100 hero-title">
            The Web3 Universal{' '}
            <span className="neon-text">Payroll Solution</span>
          </h1>

          {/* Sub-headline */}
          <p className="fade-in-up delay-200 hero-subtitle">
            Process instant, cross-token stablecoin payments to your global workforce.
            Automated FX routing, batch settlement, and enterprise-grade on-chain auditing.
          </p>

          {/* CTA Buttons */}
          <div className="fade-in-up delay-300 hero-buttons">
            <a href="https://app.wizpay.xyz" className="btn btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
              Start Paying Now
            </a>
            <Link to="/docs" className="btn btn-outline">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
              Read the Docs
            </Link>
          </div>

          {/* Dashboard Mockup */}
          <div className="fade-in-up delay-400 mockup-wrapper" style={{ marginTop: '3rem', width: '100%', maxWidth: '920px' }}>
            <div className="glass-card" style={{ padding: '8px', borderRadius: '1.25rem' }}>
              <img
                src="/hero-mockup.png"
                alt="WizPay Dashboard Preview"
                style={{ width: '100%', height: 'auto', borderRadius: '0.85rem', display: 'block' }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ Stats Section ══════════ */}
      <section style={{ padding: '3rem 0 4rem' }}>
        <div className="container">
          <div className="stats-row stagger-reveal">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="reveal glass-card stat-card"
              >
                <div className="stat-value text-gradient">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ Features Section ══════════ */}
      <section style={{ padding: '4rem 0 5rem' }}>
        <div className="container">
          <div className="section-heading reveal">
            <h2>
              Built for{' '}
              <span className="text-gradient">Modern Teams</span>
            </h2>
            <p>
              Everything you need to run a Web3-native payroll — from multi-auth login to on-chain audit trails.
            </p>
          </div>

          <div className="features-grid stagger-reveal">
            {features.map((feat) => (
              <div key={feat.title} className="reveal glass-card feature-card">
                <div
                  className="icon-box"
                  style={{
                    background: feat.color,
                    border: `1px solid ${feat.borderColor}`,
                    color: feat.textColor,
                    boxShadow: `0 0 20px ${feat.color}`,
                  }}
                >
                  {feat.icon}
                </div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ How It Works ══════════ */}
      <section style={{ padding: '4rem 0 5rem' }}>
        <div className="container">
          <div className="section-heading reveal">
            <h2>
              How <span className="text-gradient">WizPay</span> Works
            </h2>
            <p>Three steps to global, cross-token payroll on the blockchain.</p>
          </div>

          <div className="features-grid stagger-reveal" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {[
              {
                step: '01',
                title: 'Connect & Compose',
                desc: 'Sign in via Google, X, email, or wallet. Add recipients manually or upload a CSV batch.',
                color: 'var(--primary)',
              },
              {
                step: '02',
                title: 'Approve & Simulate',
                desc: 'WizPay simulates the batch on-chain, calculates fees, and requests exact token approval.',
                color: 'var(--accent-cyan)',
              },
              {
                step: '03',
                title: 'Submit & Settle',
                desc: 'One click sends the batch. Each recipient receives their chosen token — USDC or EURC — instantly.',
                color: 'var(--accent-emerald)',
              },
            ].map((item) => (
              <div key={item.step} className="reveal glass-card feature-card" style={{ position: 'relative' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: item.color,
                  opacity: 0.7,
                  letterSpacing: '0.1em',
                }}>
                  STEP {item.step}
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                {/* Decorative number */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1.25rem',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '3.5rem',
                  fontWeight: 800,
                  color: item.color,
                  opacity: 0.06,
                  lineHeight: 1,
                  pointerEvents: 'none',
                }}>
                  {item.step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA Section ══════════ */}
      <section className="cta-section">
        <div className="container reveal-scale" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
            Ready to <span className="neon-text">modernize payroll?</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '480px', fontSize: '1.05rem', textAlign: 'center' }}>
            Join teams already using WizPay to process cross-token salary payments on Arc Testnet.
          </p>
          <div className="hero-buttons" style={{ marginTop: '0.5rem' }}>
            <a href="https://app.wizpay.xyz" className="btn btn-primary">
              Launch WizPay App
            </a>
            <a href="https://x.com/wizpay_arc" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Follow on X
            </a>
          </div>
        </div>
      </section>

      {/* ══════════ Footer ══════════ */}
      <footer className="site-footer">
        <div className="container footer-content">
          <div className="logo" style={{ fontSize: '1.15rem' }}>
            <img src="/favicon.ico" alt="WizPay" style={{ width: '22px', height: '22px', borderRadius: '6px' }} />
            <span className="logo-text" style={{ fontSize: '1.1rem' }}>WizPay</span>
          </div>

          <div className="footer-links">
            <Link to="/docs" className="footer-link">Docs</Link>
            <a href="https://x.com/wizpay_arc" target="_blank" rel="noopener noreferrer" className="footer-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              @wizpay_arc
            </a>
          </div>

          <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', margin: 0 }}>
            © 2026 WizPay. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
