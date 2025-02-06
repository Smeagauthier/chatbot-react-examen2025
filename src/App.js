import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ChatbotPage from './pages/ChatbotPage';
import PresentationPage from './pages/PresentationPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage'; 
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
    <Router>
      <Navbar />
      <main className="flex-grow">
      <Routes>
        <Route 
        path="/" 
        element={
            <>
              <title>Accueil</title>
              <HomePage />
            </>
          } 
        />
        <Route 
          path="/chatbot" 
          element={
            <>
              <title>Chatbot</title>
              <ChatbotPage />
            </>
          } 
        />
        <Route 
          path="/presentation" 
          element={
            <>
              <title>Présentation</title>
              <PresentationPage />
            </>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <>
              <title>Contact</title>
              <ContactPage />
            </>
          } 
        />
        <Route 
          path="*" 
          element={
            <>
              <title>Page Introuvable</title>
              <NotFoundPage />
            </>
          } 
        />
      </Routes>
      </main>
      <Footer />
    </Router>
    </div>
  );
};

export default App;
