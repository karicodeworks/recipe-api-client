import { Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { HomePage, LoginPage, VerifyPage, RecipePage } from './pages'
import { Footer, NavBar } from './components'
import { useGlobalContext } from './context'
import { AddRecipes, AllRecipes, StatsPage } from './pages/Dashboard'
import { ToastContainer } from 'react-toastify'

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
    <div className="container">
      <NavBar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="recipe/:id" element={<RecipePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="user/verify-email" element={<VerifyPage />} />
          <Route path="dashboard" element={<ProtectedRoutes />}>
            <Route index element={<StatsPage />} />
            <Route path="all-recipes" element={<AllRecipes />} />
            <Route path="add-recipe" element={<AddRecipes />} />
          </Route>
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
        <ToastContainer position="top-center" />
      </div>
      <Footer />
    </div>
  )
}

export default App
