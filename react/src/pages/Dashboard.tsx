import { SIDE_ICON_CARDS, SUMMARY_CARDS, TOP_ICON_CARDS } from '../data/examples'
import type { IconCardData, SummaryCardData } from '../data/examples'
import { LoadingOverlay, PageHeader } from './shared'

function SummaryCard({ card }: { card: SummaryCardData }) {
  return (
    <div className="col-12 col-lg-3">
      <div className="card card-body text-center mb-2">
        <p className={card.textClass}>{card.value}</p>
        <p className="m-0">{card.title}</p>
      </div>
    </div>
  )
}

function SideIconCard({ card }: { card: IconCardData }) {
  return (
    <div className="col-12 col-lg-3">
      <div className="card card-body mb-2">
        <div className="row m-0 align-items-center">
          <div className="col-auto">
            <i className={card.iconClass} aria-hidden="true"></i>
          </div>
          <div className="col">
            <p className={card.textClass}>{card.value}</p>
            <p className="m-0">{card.title}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function TopIconCard({ card }: { card: IconCardData }) {
  return (
    <div className="col-12 col-lg-3">
      <div className="card card-body text-center">
        <div className="row m-0 align-items-center">
          <div className="col-12">
            <i className={card.iconClass} aria-hidden="true"></i>
          </div>
          <div className="col-12">
            <p className={card.textClass}>{card.value}</p>
            <p className="m-0">{card.title}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Dashboard() {
  return (
    <>
      <LoadingOverlay />
      <PageHeader title="Dashboard" />

      <div className="row">
        {SUMMARY_CARDS.map((card, index) => (
          <SummaryCard card={card} key={`summary-${index}`} />
        ))}
      </div>

      <div className="row">
        {SIDE_ICON_CARDS.map((card, index) => (
          <SideIconCard card={card} key={`side-${index}`} />
        ))}
      </div>

      <div className="row">
        {TOP_ICON_CARDS.map((card, index) => (
          <TopIconCard card={card} key={`top-${index}`} />
        ))}
      </div>
    </>
  )
}
