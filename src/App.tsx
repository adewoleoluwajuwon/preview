
import { Route, Routes } from 'react-router-dom'
import './App.css'
import MoonStoneRecruitmentDemo from './components/MoonstoneRecruitmentDemo'

import MoonstoneSimpleLanding from './components/MoonstoneSimpleLanding'

function App() {
 

  return (
    <>
    <Routes>
      {/* <AppShell /> */}
      <Route path="/" element= {<MoonstoneSimpleLanding />} />
      <Route path="/modern" element= {<MoonStoneRecruitmentDemo />} />
      <Route path="*" element={<MoonstoneSimpleLanding />} />
      </Routes>
    </>
  )
}

export default App
