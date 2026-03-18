import './App.css'
import { Header } from './components/Header';
import { Sections } from './components/Sections';
import { Footer } from './components/Footer';

function App() {

  return (
    <>
      <Header />
      <main id="main" className="container-regular">
        <Sections />
      </main>
      <Footer />


    </>
  )
}

export default App
