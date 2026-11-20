import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { TeamProvider } from './context/TeamContext'
import { CreateTeam } from './pages/CreateTeam'
import { Final } from './pages/Final'
import { Hub } from './pages/Hub'
import { JoinTeam } from './pages/JoinTeam'
import { Landing } from './pages/Landing'
import { LeaderboardPage } from './pages/LeaderboardPage'
import { Station } from './pages/Station'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export default function App() {
  return (
    <BrowserRouter basename={basename === '/' ? undefined : basename}>
      <TeamProvider>
        <AppShell>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/create" element={<CreateTeam />} />
            <Route path="/join" element={<JoinTeam />} />
            <Route path="/hub" element={<Hub />} />
            <Route path="/station/:stationId" element={<Station />} />
            <Route path="/final" element={<Final />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>
      </TeamProvider>
    </BrowserRouter>
  )
}
