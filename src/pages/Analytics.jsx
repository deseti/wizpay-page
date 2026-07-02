import { useEffect, useState } from 'react'

const LINKS = {
  app: 'https://app.wizpay.xyz',
  docs: 'https://docs.wizpay.xyz',
  githubCore: 'https://github.com/deseti/wizpay-core',
  githubNano: 'https://github.com/deseti/nano-wizpay',
  x: 'https://x.com/wizpay_arc',
  arcscan:
    'https://testnet.arcscan.app/address/0x87ACE45582f45cC81AC1E627E875AE84cbd75946',
  api: 'https://api.wizpay.xyz',
}

const CONTRACT_ADDRESS = '0x87ACE45582f45cC81AC1E627E875AE84cbd75946'

const LIVE_ANALYTICS_URL = '/analytics-live.json'

function formatNumber(value) {
  if (value === null || value === undefined || value === '') return '—'
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return String(value)
  return new Intl.NumberFormat('en-US').format(numeric)
}

function formatLiveUpdatedAt(value) {
  if (!value) return 'Pending seed load'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function buildArcscanMetrics(liveAnalytics) {
  const payroll = liveAnalytics?.contracts?.payrollRouter || liveAnalytics
  const totals = liveAnalytics?.volume?.totals

  if (!payroll?.transactions && !payroll?.transfers && !totals) return ARCSCAN_METRICS

  return [
    {
      label: 'Contract Transactions',
      value: formatNumber(payroll?.transactions),
      detail: 'Verified WizPay Payroll Router Arcscan transaction count',
      href: payroll?.arcscanUrl || liveAnalytics?.arcscanUrl || LINKS.arcscan,
    },
    {
      label: 'Token Transfers',
      value: formatNumber(payroll?.transfers),
      detail: 'Verified Arcscan token transfer count for the Payroll Router',
      href: payroll?.arcscanUrl || liveAnalytics?.arcscanUrl || LINKS.arcscan,
    },
    {
      label: 'Settled Stablecoin Volume',
      value: totals?.settledVolumeDisplay || ARCSCAN_METRICS[2].value,
      detail: 'USDC/EURC outflow settled from Arcscan CSV token transfers',
    },
    {
      label: 'Gross Token Movement',
      value: totals?.grossMovementDisplay || ARCSCAN_METRICS[3].value,
      detail: 'Combined USDC/EURC inbound and outbound token movement',
    },
  ]
}


const VERIFIED_USAGE_METRICS = [
  {
    label: 'Settled Stablecoin Volume',
    value: '373.5M+',
    detail: 'USDC/EURC outflow settled from Arcscan CSV token transfers',
  },
  {
    label: 'Gross Token Movement',
    value: '747.1M+',
    detail: 'Combined inbound and outbound USDC/EURC token movement',
  },
  {
    label: 'USDC Flow',
    value: '187.1M In / 187.1M Out',
    detail: 'Normalized USDC display amounts from Arcscan export',
  },
  {
    label: 'EURC Flow',
    value: '186.5M In / 186.4M Out',
    detail: 'Normalized EURC display amounts from Arcscan export',
  },
  {
    label: 'Net Stablecoin Position',
    value: '100K',
    detail: 'EURC net balance delta in normalized token display amounts',
  },
]

const ARCSCAN_METRICS = [
  {
    label: 'Contract Transactions',
    value: '20,996',
    detail: 'Verified WizPay Payroll Router Arcscan transaction count',
    href: LINKS.arcscan,
  },
  {
    label: 'Token Transfers',
    value: '336,994',
    detail: 'Verified Arcscan token transfer count for the Payroll Router',
    href: LINKS.arcscan,
  },
  {
    label: 'Settled Stablecoin Volume',
    value: '373.5M+',
    detail: 'USDC/EURC outflow settled from Arcscan CSV token transfers',
  },
  {
    label: 'Gross Token Movement',
    value: '747.1M+',
    detail: 'Combined USDC/EURC inbound and outbound token movement',
  },
]

const PRODUCTS = [
  {
    name: 'WizPay Core',
    description:
      'Institutional-grade task execution engine for batched USDC payroll, Circle orchestration, and Arc settlement.',
    tone: 'cyan',
  },
  {
    name: 'WizPay Nano',
    description:
      'Non-custodial paid orchestration API for autonomous agents. Agents request quotes or plans, pay a USDC service fee, and receive calldata or Circle CLI commands.',
    tone: 'emerald',
  },
  {
    name: 'WizPay App',
    description:
      'Operator-facing payment interface for wallet-based stablecoin payment execution.',
    tone: 'sky',
  },
]

const ENDPOINTS = [
  { method: 'GET', path: '/services', access: 'Public' },
  { method: 'GET', path: '/contracts/status', access: 'Public' },
  { method: 'POST', path: '/swap/quote', access: 'Public' },
  { method: 'POST', path: '/payroll/plan', access: 'Public' },
  { method: 'POST', path: '/swap/prepare', access: 'Payment proof required' },
  { method: 'POST', path: '/payroll/prepare', access: 'Payment proof required' },
]

const SWAP_PROOFS = [
  {
    label: 'Service fee',
    href: 'https://testnet.arcscan.app/tx/0x58632caae2d2a13724c6e85c5d31ecce548eca0328f8d97946402b468f358897',
  },
  {
    label: 'Approve',
    href: 'https://testnet.arcscan.app/tx/0xc19400a869f2b78a16b468b3432fd3f9b9fff1302e68530f7261dde69d56c3a3',
  },
  {
    label: 'executeSwap',
    href: 'https://testnet.arcscan.app/tx/0xaa58ede3ce79805c229ab1885efdb480f0addd5137e73dc43213b28a9a0a5e5d',
  },
]

const PAYROLL_PROOFS = [
  {
    label: 'Service fee',
    href: 'https://testnet.arcscan.app/tx/0xbe95a87f42e16bb3c59ffa295ca3c99f2ed5ac136fe199283a0fecd365a63655',
  },
  {
    label: 'Approve',
    href: 'https://testnet.arcscan.app/tx/0x3899f11e353738a7cc6301b14a44ee0e508cc8bda3b2e18a806a1e5997a4cde3',
  },
  {
    label: 'Payout 1',
    href: 'https://testnet.arcscan.app/tx/0x02eef1a5f53fc24d1f935d35ee427e1c66a3c3dfe7cb7068ca625004bdc3366e',
  },
  {
    label: 'Payout 2',
    href: 'https://testnet.arcscan.app/tx/0xe93ba7285bbf83f917dfc4bbacfa04878a02086404f1cc88c6c40ff6e4e24222',
  },
  {
    label: 'Payout 3',
    href: 'https://testnet.arcscan.app/tx/0x44b462fbb251e0d65e0123efde2aae6bcbd2b80b52129f58846d501f21b2a96a',
  },
  {
    label: 'Payout 4',
    href: 'https://testnet.arcscan.app/tx/0x1ae880b08928c9cc6a290c14340dd035c104da41bd07929a7014df5773b436aa',
  },
  {
    label: 'Payout 5',
    href: 'https://testnet.arcscan.app/tx/0xdfb50aaabcf0d5419426e275fb8a9bf33198e2cfc50530ce0df6af8a5c0adde2',
  },
]

const CIRCLE_ITEMS = [
  { title: 'USDC settlement on Arc Testnet', status: 'Integrated' },
  {
    title: 'Circle CLI wallet executor used for verified Nano WizPay proofs',
    status: 'Integrated',
  },
  {
    title: 'Circle Programmable Wallets integration path in WizPay Core',
    status: 'Integration path',
  },
  { title: 'Gas Station for sponsored agent transactions', status: 'Planned' },
  { title: 'CCTP for cross-chain agent payroll settlement', status: 'Planned' },
]

function ExternalIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 4h5v5" />
      <path d="m20 4-9 9" />
      <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
    </svg>
  )
}

function CheckIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  )
}

function TraceIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 7h11" />
      <path d="m13 4 3 3-3 3" />
      <path d="M19 17H8" />
      <path d="m11 14-3 3 3 3" />
    </svg>
  )
}

function ExternalLink({ href, className = '', children, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={className}
    >
      {children}
    </a>
  )
}

function SectionHeader({ title, description }) {
  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">{description}</p>
      )}
    </div>
  )
}

function ProofPanel({ title, subtitle, facts, items }) {
  return (
    <article className="surface-card overflow-hidden rounded-[28px]">
      <div className="border-b border-white/8 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/8 text-cyan-300">
            <TraceIcon />
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
          </div>
        </div>
        {facts && (
          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {facts.map((fact) => (
              <div
                key={fact}
                className="rounded-xl border border-white/8 bg-white/[0.025] px-3 py-2 text-xs leading-5 text-slate-300"
              >
                {fact}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-5 py-2 sm:px-6">
        {items.map((item, index) => (
          <ExternalLink
            key={item.href}
            href={item.href}
            label={`View ${item.label} transaction on Arcscan`}
            className="group flex items-center gap-4 border-b border-white/7 py-3.5 last:border-b-0"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-300/25 bg-emerald-300/10 text-emerald-300">
              <CheckIcon size={14} />
            </span>
            <span className="w-5 text-xs tabular-nums text-slate-500">{index + 1}</span>
            <span className="flex-1 text-sm font-medium text-slate-200 transition group-hover:text-white">
              {item.label}
            </span>
            <span className="hidden font-mono text-[11px] text-cyan-300/70 sm:block">
              {item.href.slice(-12)}
            </span>
            <span className="text-slate-500 transition group-hover:text-cyan-300">
              <ExternalIcon size={15} />
            </span>
          </ExternalLink>
        ))}
      </div>
    </article>
  )
}

function ArcscanMetricCard({ metric, index }) {
  const content = (
    <>
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            index === 2 ? 'bg-emerald-300' : 'bg-cyan-300'
          }`}
        />
        {metric.label}
        {metric.href && (
          <span className="ml-auto text-slate-600 transition group-hover:text-cyan-300">
            <ExternalIcon size={14} />
          </span>
        )}
      </div>
      <p
        className={`mt-4 font-display text-2xl font-semibold tracking-tight ${
          index === 2 ? 'text-emerald-300' : 'text-slate-100'
        }`}
      >
        {metric.value}
      </p>
      <p className="mt-2 text-xs leading-5 text-slate-500">{metric.detail}</p>
    </>
  )

  const className = `rounded-2xl border bg-[#060a18]/55 px-5 py-5 ${
    metric.href
      ? 'group border-white/8 transition hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-cyan-300/[0.045]'
      : 'border-white/8'
  }`

  if (metric.href) {
    return (
      <ExternalLink
        href={metric.href}
        label={`View ${metric.label} for the WizPay Payroll Router on Arcscan`}
        className={className}
      >
        {content}
      </ExternalLink>
    )
  }

  return <article className={className}>{content}</article>
}

function Analytics() {
  const [liveAnalytics, setLiveAnalytics] = useState(null)
  const [liveError, setLiveError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadLiveAnalytics() {
      try {
        const response = await fetch(LIVE_ANALYTICS_URL, { cache: 'no-store' })
        if (!response.ok) throw new Error(`Live analytics fetch failed: ${response.status}`)
        const data = await response.json()
        if (!cancelled) {
          setLiveAnalytics(data)
          setLiveError(false)
        }
      } catch {
        if (!cancelled) setLiveError(true)
      }
    }

    loadLiveAnalytics()

    return () => {
      cancelled = true
    }
  }, [])

  const liveArcscanMetrics = buildArcscanMetrics(liveAnalytics)
  const liveUpdatedAt = formatLiveUpdatedAt(liveAnalytics?.updatedAt)

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030510]">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="soft-grid absolute inset-x-0 top-0 h-[58rem] opacity-45" />
        <div className="absolute -left-40 top-56 h-80 w-80 rounded-full bg-cyan-400/10 blur-[150px]" />
        <div className="absolute -right-32 top-[32rem] h-80 w-80 rounded-full bg-emerald-400/8 blur-[150px]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/8 bg-[#030510]/82 backdrop-blur-xl">
        <div className="section-shell flex min-h-18 items-center justify-between gap-5 py-3">
          <a href="/" className="flex items-center gap-3" aria-label="WizPay home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 shadow-[0_0_28px_rgba(34,211,238,0.13)]">
              <img src="/favicon.ico" alt="" width="21" height="21" className="rounded-md" />
            </span>
            <span>
              <span className="block font-display text-base font-semibold text-white">WizPay</span>
              <span className="block text-[11px] text-slate-500">Public analytics</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-slate-400 lg:flex">
            <a href="#overview" className="text-cyan-300 transition hover:text-cyan-200">
              Analytics
            </a>
            <ExternalLink href={LINKS.docs} className="transition hover:text-white">
              Docs
            </ExternalLink>
            <ExternalLink href={LINKS.githubCore} className="transition hover:text-white">
              GitHub
            </ExternalLink>
            <ExternalLink href={LINKS.x} className="transition hover:text-white">
              X
            </ExternalLink>
          </nav>

          <ExternalLink
            href={LINKS.app}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2.5 text-sm font-semibold text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-300/16"
          >
            Open App
            <ExternalIcon size={14} />
          </ExternalLink>
        </div>
      </header>

      <main>
        <section
          id="overview"
          className="section-shell grid gap-8 pb-10 pt-12 sm:pt-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(440px,1.05fr)] lg:items-center lg:gap-12 lg:pt-22"
        >
          <div className="animate-rise">
            <h1 className="font-display max-w-3xl text-5xl font-bold tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl lg:leading-[0.98]">
              WizPay Public Analytics
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              WizPay is an Arc-native payment execution and orchestration layer for autonomous
              AI agents, enabling USDC/EURC payroll, swap preparation, service-fee-gated
              execution plans, and non-custodial on-chain settlement using Circle-based wallet
              tooling.
            </p>

            <div className="mt-8 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:gap-8">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                Verified on-chain activity snapshot
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
                Verified Arcscan CSV seed data
              </span>
            </div>
          </div>

          <article className="animate-rise delay-1 surface-card rounded-[28px] p-5 sm:p-7">
            <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Primary contract
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-white">
                  WizPay Payroll Router
                </h2>
              </div>
              <span className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-300/10">
                  <CheckIcon size={15} />
                </span>
                Verified
              </span>
            </div>

            <dl className="divide-y divide-white/8">
              <div className="grid gap-2 py-5 sm:grid-cols-[130px_1fr] sm:items-center">
                <dt className="text-sm text-slate-500">Network</dt>
                <dd className="text-sm font-medium text-cyan-300 sm:text-right">Arc Testnet</dd>
              </div>
              <div className="grid gap-2 py-5 sm:grid-cols-[130px_1fr]">
                <dt className="text-sm text-slate-500">Address</dt>
                <dd className="break-all font-mono text-xs leading-6 text-slate-200 sm:text-right">
                  {CONTRACT_ADDRESS}
                </dd>
              </div>
              <div className="grid gap-2 pt-5 sm:grid-cols-[130px_1fr] sm:items-center">
                <dt className="text-sm text-slate-500">Explorer</dt>
                <dd className="sm:text-right">
                  <ExternalLink
                    href={LINKS.arcscan}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
                  >
                    View on Arcscan
                    <ExternalIcon size={14} />
                  </ExternalLink>
                </dd>
              </div>
            </dl>
          </article>
        </section>

        <section className="section-shell pb-20 pt-4 sm:pb-24">
          <div className="relative overflow-hidden rounded-[32px] border border-cyan-300/15 bg-gradient-to-br from-cyan-300/[0.07] via-white/[0.025] to-emerald-300/[0.04] p-5 shadow-[0_24px_80px_rgba(3,5,16,0.45)] sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-300/10 blur-[100px]" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Recent Verified Usage
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Verified WizPay contract activity
              </h2>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 sm:text-base">
                WizPay has settled 373.5M+ in USDC/EURC stablecoin outflow and recorded
                747.1M+ in gross token movement across the verified Payroll Router contract
                from deployment through the Arcscan export timestamp.
              </p>
            </div>

            <div className="relative mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {VERIFIED_USAGE_METRICS.map((metric, index) => (
                <article
                  key={metric.label}
                  className={`rounded-2xl border p-5 backdrop-blur-sm ${
                    index === 0
                      ? 'border-cyan-300/30 bg-cyan-300/[0.09] shadow-[0_0_32px_rgba(34,211,238,0.08)]'
                      : 'border-white/9 bg-[#060a18]/65'
                  }`}
              >
                  <p
                    className={`font-display text-3xl font-semibold tracking-tight sm:text-4xl ${
                      index === 0 ? 'text-cyan-200' : 'text-white'
                    }`}
                  >
                    {metric.value}
                  </p>
                  <h3 className="mt-4 text-sm font-semibold leading-5 text-slate-100">
                    {metric.label}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{metric.detail}</p>
                </article>
              ))}
            </div>

            <p className="relative mt-6 border-t border-white/8 pt-5 text-xs leading-6 text-slate-500 sm:text-sm">
              Metrics are derived from the verified Arcscan token transfer CSV export using
              normalized USDC and EURC display amounts with 6 token decimals.
            </p>
          </div>
        </section>

        <section className="section-shell pb-20 sm:pb-24">
          <SectionHeader
            title="Arcscan Snapshot"
            description="Verified public activity indicators for the WizPay Payroll Router on Arc Testnet."
          />

          <div className="mt-5 flex flex-col gap-2 rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.035] px-4 py-3 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Static verified seed data is served from the public analytics JSON.
            </span>
            <span className="font-mono text-xs text-cyan-200">
              Last updated: {liveUpdatedAt}
              {liveError ? ' · fallback active' : ''}
            </span>
          </div>

          <div className="mt-7 grid gap-3 overflow-hidden rounded-[24px] border border-white/9 bg-white/[0.02] p-3 sm:grid-cols-2 lg:grid-cols-4">
            {liveArcscanMetrics.map((metric, index) => (
              <ArcscanMetricCard key={metric.label} metric={metric} index={index} />
            ))}
          </div>
        </section>

        <section className="section-shell pb-20 sm:pb-24">
          <SectionHeader
            title="Product and API coverage"
            description="The public surface spans execution infrastructure, paid agent orchestration, and an operator-facing application."
          />

          <div className="mt-8 divide-y divide-white/8 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025]">
            {PRODUCTS.map((product, index) => (
              <article
                key={product.name}
                className="group grid gap-5 px-5 py-6 transition hover:bg-white/[0.025] sm:px-7 lg:grid-cols-[250px_1fr] lg:items-center"
              >
                <div className="flex items-center gap-5">
                  <span
                    className={`h-px w-10 ${
                      product.tone === 'emerald'
                        ? 'bg-emerald-300'
                        : product.tone === 'sky'
                          ? 'bg-sky-300'
                          : 'bg-cyan-300'
                    }`}
                  />
                  <div>
                    <span className="text-xs tabular-nums text-slate-600">0{index + 1}</span>
                    <h3 className="mt-1 font-display text-xl font-semibold text-white">
                      {product.name}
                    </h3>
                  </div>
                </div>
                <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                  {product.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell pb-20 sm:pb-24">
          <div className="surface-card overflow-hidden rounded-[28px]">
            <div className="flex flex-col gap-5 border-b border-white/8 px-5 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-7">
              <SectionHeader
                title="Public API endpoints"
                description="Published interfaces for service discovery, planning, and paid execution preparation."
              />
              <ExternalLink
                href={LINKS.api}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-300/7 px-4 py-3 font-mono text-sm text-cyan-300 transition hover:bg-cyan-300/12"
              >
                api.wizpay.xyz
                <ExternalIcon size={14} />
              </ExternalLink>
            </div>

            <div className="overflow-x-auto px-5 sm:px-7">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/8 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                    <th className="py-4 pr-5 font-semibold">Method</th>
                    <th className="py-4 pr-5 font-semibold">Endpoint</th>
                    <th className="py-4 font-semibold">Access</th>
                  </tr>
                </thead>
                <tbody>
                  {ENDPOINTS.map((endpoint) => (
                    <tr key={endpoint.path} className="border-b border-white/7 last:border-b-0">
                      <td className="py-4 pr-5">
                        <span
                          className={`inline-flex min-w-15 justify-center rounded-lg border px-2.5 py-1 font-mono text-xs ${
                            endpoint.method === 'GET'
                              ? 'border-cyan-300/25 bg-cyan-300/7 text-cyan-300'
                              : 'border-emerald-300/25 bg-emerald-300/7 text-emerald-300'
                          }`}
                        >
                          {endpoint.method}
                        </span>
                      </td>
                      <td className="py-4 pr-5 font-mono text-sm text-slate-100">{endpoint.path}</td>
                      <td className="py-4 text-sm text-slate-400">{endpoint.access}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="m-5 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.045] px-4 py-4 text-sm leading-6 text-slate-300 sm:m-7">
              Read-only endpoints are publicly accessible. Paid prepare endpoints require a USDC
              payment proof before executable plans are returned.
            </div>
          </div>
        </section>

        <section className="section-shell pb-20 sm:pb-24">
          <SectionHeader
            title="Verified execution proofs"
            description="Direct Arcscan traces for completed swap and payroll execution flows on Arc Testnet."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:items-start">
            <ProofPanel
              title="Swap proof"
              subtitle="5 USDC to EURC swap"
              items={SWAP_PROOFS}
            />
            <ProofPanel
              title="Payroll proof"
              subtitle="5-recipient payroll"
              facts={[
                '3 direct USDC payouts',
                '2 USDC to EURC routed payouts',
                'Service-fee-gated prepare flow',
              ]}
              items={PAYROLL_PROOFS}
            />
          </div>
        </section>

        <section className="section-shell pb-20 sm:pb-24">
          <div className="grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
            <article className="surface-card rounded-[28px] p-5 sm:p-7">
              <SectionHeader
                title="Circle integration"
                description="Current integration evidence and clearly separated forward-looking work."
              />
              <div className="mt-7 divide-y divide-white/8">
                {CIRCLE_ITEMS.map((item) => (
                  <div key={item.title} className="flex items-start gap-4 py-4 first:pt-0">
                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                        item.status === 'Planned'
                          ? 'border-slate-600 bg-white/[0.025] text-slate-500'
                          : 'border-emerald-300/25 bg-emerald-300/8 text-emerald-300'
                      }`}
                    >
                      <CheckIcon size={14} />
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-6 text-slate-200">{item.title}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-500">
                        {item.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="surface-card rounded-[28px] p-5 sm:p-7">
              <SectionHeader
                title="Data sources"
                description="Public and reproducible sources used for this snapshot."
              />
              <div className="mt-7 space-y-3">
                {[
                  ['Arcscan public explorer', LINKS.arcscan],
                  ['WizPay public API', LINKS.api],
                  ['WizPay GitHub proof docs', LINKS.githubNano],
                  ['WizPay deployed contracts', LINKS.githubCore],
                ].map(([label, href]) => (
                  <ExternalLink
                    key={label}
                    href={href}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-4 text-sm text-slate-300 transition hover:border-cyan-300/20 hover:bg-cyan-300/[0.035] hover:text-white"
                  >
                    <span>{label}</span>
                    <span className="text-slate-600 transition group-hover:text-cyan-300">
                      <ExternalIcon size={15} />
                    </span>
                  </ExternalLink>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-5 rounded-[24px] border border-white/9 bg-white/[0.025] px-5 py-5 sm:px-7">
            <p className="text-sm leading-7 text-slate-300">
              Analytics are sourced from Arcscan public explorer data, WizPay public API
              endpoints, and verified WizPay execution proofs.
            </p>
            <p className="mt-2 text-xs leading-6 text-slate-500">
              Dune Arc schema was tested, but current WizPay contract activity is more completely
              reflected through Arcscan.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8 bg-[#030510]/82">
        <div className="section-shell py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <img src="/favicon.ico" alt="" width="20" height="20" className="rounded-md" />
              </span>
              <div>
                <p className="font-display font-semibold text-white">WizPay</p>
                <p className="text-xs text-slate-500">Arc-native payment execution</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-400">
              {[
                ['App', LINKS.app],
                ['Docs', LINKS.docs],
                ['GitHub Core', LINKS.githubCore],
                ['GitHub Nano', LINKS.githubNano],
                ['X', LINKS.x],
                ['Arcscan', LINKS.arcscan],
                ['API', LINKS.api],
              ].map(([label, href]) => (
                <ExternalLink key={label} href={href} className="transition hover:text-cyan-300">
                  {label}
                </ExternalLink>
              ))}
            </div>
          </div>
          <p className="mt-8 border-t border-white/8 pt-6 text-xs text-slate-600">
            Verified public activity snapshot for WizPay on Arc Testnet.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Analytics
