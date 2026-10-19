import { Provider } from 'react-redux'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { store } from './app/store'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import BooksPage from './pages/BooksPage'
import StatsPage from './pages/StatsPage'

function AppLayout() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={`app app--${theme}`}>
      <header className="app-header">
        <Link to="/" className="brand">Mini Library</Link>
        <nav aria-label="Main navigation">
          <Link to="/">Books</Link>
          <Link to="/stats">Statistics</Link>
          <button type="button" onClick={toggleTheme}>
            Use {theme === 'light' ? 'dark' : 'light'} theme
          </button>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App
