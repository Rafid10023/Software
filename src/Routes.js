import Chat from "./chat";
import History from "./history";
import Appointment from "./appointment"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home";
import ConfirmPage from "./ConfirmPage";
export default function AppRoutes() {
    return (
        <div>
        <Router>
            <Routes>
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/history" element={<History />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/" element={<Home/>}/>
                <Route path="/confirm" element={<ConfirmPage/>}/>
                {/*<Route path="/logout" element={<Logout />} />   If you have a Logout component 
                ... other routes */}
            </Routes>
        </Router>
        </div>
    );
}