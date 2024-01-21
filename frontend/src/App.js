import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import CreateAgent from "./pages/createAgent/createAgent";
import SupportTicketForm from "./pages/supportTicket/SupportTicket";
import ViewTicket from "./pages/viewTicket/viewTicket";
import { Home } from "./pages/landingPage/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-ticket" element={<SupportTicketForm />} />
        <Route path="/tickets" element={<ViewTicket />} />
        <Route path="/create-agent" element={<CreateAgent />} />
      </Routes>
    </Router>
  );
}

export default App;
