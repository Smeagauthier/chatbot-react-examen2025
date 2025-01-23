import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'; // Votre page d'accueil
import Chatbot from './pages/Chatbot'; // Votre page chatbot
import Navbar from './components/Navbar'; // Votre composant Navbar
import NotFound from './components/NotFound'; // Votre composant NotFound

const App = () => {
  return (
    <>
    <Router>
      <Routes>
      <Navbar /> 
        <Route exact path="/" component={Home} /> {/* Page d'accueil */}
        <Route path="/chatbot" component={Chatbot} /> {/* Page du chatbot */}
        <Route component={NotFound}/>
      </Routes>
    </Router>
    </>
  );
};

export default App;
