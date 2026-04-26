import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoadingOverlay } from './components/shared'

const Configuracoes = lazy(() =>
  import('./pages/Configuracoes').then((m) => ({ default: m.Configuracoes })),
)
const Dashboard = lazy(() =>
  import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })),
)
const Formulario = lazy(() =>
  import('./pages/Formulario').then((m) => ({ default: m.Formulario })),
)
const ListaDeCards = lazy(() =>
  import('./pages/ListaDeCards').then((m) => ({ default: m.ListaDeCards })),
)
const Listagem = lazy(() =>
  import('./pages/Listagem').then((m) => ({ default: m.Listagem })),
)
const SelecaoContexto = lazy(() =>
  import('./pages/SelecaoContexto').then((m) => ({ default: m.SelecaoContexto })),
)
const SemRegistros = lazy(() =>
  import('./pages/SemRegistros').then((m) => ({ default: m.SemRegistros })),
)
const Timeline = lazy(() =>
  import('./pages/Timeline').then((m) => ({ default: m.Timeline })),
)
const VisaoGeral = lazy(() =>
  import('./pages/VisaoGeral').then((m) => ({ default: m.VisaoGeral })),
)
const Wizard = lazy(() =>
  import('./pages/Wizard').then((m) => ({ default: m.Wizard })),
)

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <Routes>
        <Route path="/" element={<Navigate to="/visao-geral" replace />} />
        <Route path="/visao-geral" element={<VisaoGeral />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listagem" element={<Listagem />} />
        <Route path="/lista-de-cards" element={<ListaDeCards />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/sem-registros" element={<SemRegistros />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/wizard" element={<Wizard />} />
        <Route path="/contexto" element={<SelecaoContexto />} />
        <Route path="*" element={<Navigate to="/visao-geral" replace />} />
      </Routes>
    </Suspense>
  )
}
