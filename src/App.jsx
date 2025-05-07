import { Outlet } from 'react-router'
import { Toaster } from 'sonner'

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Outlet />
    </>
  )
}

export default App
