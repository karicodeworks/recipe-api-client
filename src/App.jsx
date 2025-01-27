import { Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { HomePage, LoginPage, DashboardPage, VerifyPage } from './pages'
import { NavBar } from './components'
import { useGlobalContext } from './context'

function App() {
  const { isLoading } = useGlobalContext()
  if (isLoading) {
    return (
      <section className="page page-center">
        <div className="loading"></div>
      </section>
    )
  }
  return (
    <div className="w-screen h-screen">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/verify-email" element={<VerifyPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
