import { Route, Routes } from 'react-router-dom'
import './App.css'
import { LandingPage } from './pages/LandingPage'
import { Login } from './pages/Login'
import { Chat } from './pages/Chat'
import { TicTocToe } from './pages/TicTocToe'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />}>
          <Route path='chat' element={<Chat />}/>
          <Route path='game' element={<TicTocToe />}/>
        </Route>
        
        
        <Route path='/login' element={<Login />}></Route>
        
      </Routes>
    </>
  )
}

export default App
