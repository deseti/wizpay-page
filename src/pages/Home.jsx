import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../index.css'

function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Background Effects */}
      <div className="background-glow">
        <div className="glow-circle glow-purple"></div>
        <div className="glow-circle glow-blue"></div>
      </div>

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <div className="logo">
            <img src="/favicon.ico" alt="WizPay Logo" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
            <span>WizPay</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://app.wizpay.xyz" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
              Launch App
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: '160px', paddingBottom: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '2rem' }}>
          
          <div className="fade-in-up" style={{ 
            background: 'rgba(139, 92, 246, 0.1)', 
            border: '1px solid rgba(139, 92, 246, 0.2)',
            padding: '0.5rem 1rem', 
            borderRadius: '9999px',
            color: 'var(--primary)',
            fontWeight: '600',
            fontSize: '0.875rem'
          }}>
            ✨ V2 Now Live on Arc Testnet
          </div>

          <h1 className="fade-in-up delay-100" style={{ fontSize: '4.5rem', maxWidth: '800px', margin: '0' }}>
            The Web3 Universal <br/>
            <span className="text-gradient">Payroll Solution</span>
          </h1>
          
          <p className="fade-in-up delay-200" style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0' }}>
            Process instant, cross-chain cryptocurrency payments to your global workforce. Seamless liquidity, automated bridging, and enterprise-grade auditing.
          </p>

          <div className="fade-in-up delay-300" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <a href="https://app.wizpay.xyz" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              Start Paying Now
            </a>
            <Link to="/docs" className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              Read the Docs
            </Link>
          </div>

          {/* Dashboard Mockup via generate_image */}
          <div className="fade-in-up delay-300 glass-panel" style={{ marginTop: '4rem', padding: '10px', width: '100%', maxWidth: '900px' }}>
            <img 
              src="/hero-mockup.png" 
              alt="WizPay Dashboard Preview" 
              style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem' }}>
            Built for <span className="text-gradient-secondary">Modern Teams</span>
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                🔄
              </div>
              <h3>Universal Liquidity</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Pay in any token. Get paid in any token. Our integrated routing engine automatically handles all necessary swaps.
              </p>
            </div>

            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                ⚡️
              </div>
              <h3>Batch Processing</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Execute thousands of global payroll transactions in a single click, with minimum gas overhead.
              </p>
            </div>

            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(20, 184, 166, 0.1)', color: '#14b8a6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                📊
              </div>
              <h3>Enterprise Auditing</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Rich on-chain metadata allows mapping of off-chain invoices directly to payment proofs for seamless KYC/AML.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: 'var(--glass-border)', padding: '3rem 0', marginTop: '4rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div className="logo" style={{ fontSize: '1.2rem' }}>
            <img src="/favicon.ico" alt="WizPay Logo" style={{ width: '24px', height: '24px', borderRadius: '6px' }} />
            WizPay
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a href="https://x.com/wizpay_arc" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              @wizpay_arc
            </a>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
            © 2026 WizPay. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Home
