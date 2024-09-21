import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"

function App() {
  
  return (
    <div>
      <BrowserRouter>
      <Navigate to={'/signup'} />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
