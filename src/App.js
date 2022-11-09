import './App.css';
import { Router } from './routes';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className="App">
      <Router/>
    </div>
  );
}

export default App;
