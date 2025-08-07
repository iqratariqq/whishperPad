
import {Route, Routes} from 'react-router';
import Home from './pages/Home';
import CreateNote from './pages/CreateNote';
import NoteDetail from './pages/NoteDetail';

const App = () => {
  return (
    <div className='relative h-full w-ful'>
      <div className='absolute inset-0 -z-10 h-full w-full intems-center px-5 py-24 [background:radial-grdient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]'/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/createNote' element={<CreateNote/>}/>
        <Route path='/noteDetail/:id' element={<NoteDetail/>}/>
      </Routes>
    </div>
  )
}

export default App
