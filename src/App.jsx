import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Maincontent from "./components/maincontent";
import Footer from "./components/footer";
import Grammar from "./components/Grammar";
import Weekquizes from "./components/Weekquizes";
import Keynote from "./components/Keynote";
import QuizPage from "./components/Quizpages";
export default function App(){
  return(
    <Router>
      {/* <Header/> */}
    <Routes>
      <Route path="/" element={<Maincontent/>}/>
      <Route path="/grammar" element={<Grammar/>}/>
      <Route path="/weekquizes" element={<Weekquizes/>}/>
      <Route path="/keynote" element={<Keynote/>}/>
      <Route path="/quiz/:id" element={<QuizPage/>}/>
    </Routes>
    {/* <Footer/> */}
    </Router>
    
  );
}