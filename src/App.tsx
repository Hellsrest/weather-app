import { Route,Routes,BrowserRouter as Router } from 'react-router-dom'
import Homepage from './Homepage'
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  

  return (
 <>
  <Router>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
    </Routes>
  </Router>

 </>
  )
}

export default App
