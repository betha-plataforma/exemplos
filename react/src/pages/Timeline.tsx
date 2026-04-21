import { TIMELINE_GROUPS } from '../data/examples'
import { LoadingOverlay, PageHeader } from '../components/shared'

export function Timeline() {
  return (
    <>
      <LoadingOverlay />
      <PageHeader title="Timeline" />

      <div className="row">
        {TIMELINE_GROUPS.map((group) => (
          <div className="col-12 mb-3" key={`${group.month}-${group.day}`}>
            <div className="d-flex">
              <ul className="nav nav-tabs nav-timeline flex-column">
                <li>
                  <span className="badge">{group.month}</span>
                </li>
                <li>
                  <div>
                    <p>{group.day}</p>
                  </div>
                </li>
                {group.events.map((event) => (
                  <li key={`${group.month}-${event.time}-${event.description}`}>
                    <div>
                      <small>{event.time}</small>
                    </div>
                    <p>
                      {event.hasHistoryLink && (
                        <>
                          <button type="button" className="btn btn-link p-0 align-baseline">
                            Link para o histórico
                          </button>
                          <br />
                        </>
                      )}
                      {event.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
