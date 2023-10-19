import { useLoaderData } from 'react-router-dom'
import './App.css'

function App() {

  const products = useLoaderData();

  return (
    <>
     
      <h1 className='text-7xl text-center'>Products: {products.length}</h1>
      
    </>
  )
}

export default App
