import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StickyHeader from "./components/header";
import FeedbackForm from "./components/form";
import Submission from "./components/Submission";
function App() {
  return (
    <div className="App">
      <StickyHeader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FeedbackForm />} />
          <Route path="submission" element={<Submission />} />
          <Route path="submission/:id" element={<Submission />} />
          <Route path="submission/:id" element={<Submission />} />
          <Route path="/submission" exact component={Submission} />
          <Route path="/feedback-form" exact component={FeedbackForm} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
