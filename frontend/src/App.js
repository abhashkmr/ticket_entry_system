import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import CreateAgent from "./pages/createAgent/createAgent";
import ViewTickets from "./pages/viewTicket/viewTicket";
import CreateTicket from "./components/CreateTicket/CreateTicket";
import SupportTicketForm from "./pages/supportTicket/SupportTicket";
import ViewTicket from "./pages/viewTicket/viewTicket";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateAgent />} />
        <Route path="/createTicket" element={<SupportTicketForm />} />
        <Route path="/tickets" element={<ViewTicket />} />
      </Routes>
    </Router>
  );
}

export default App;
