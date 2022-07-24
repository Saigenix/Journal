import React from 'react'
import Routes from './src/screens/Routes'
import {FirebaseAuth} from './src/lib/FirebaseAuth'

const App = () => {
  return (
    <FirebaseAuth>
     <Routes/> 
    </FirebaseAuth>
  )
}

export default App