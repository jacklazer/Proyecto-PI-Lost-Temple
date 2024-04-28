import { BrowserRouter, Route, Routes } from "react-router-dom";
import Level1 from "../pages/level1/Level1";
import Level3 from "../pages/level3/Level3";
import Login from "../pages/login/Login";

export default function RoutesLostTemple() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/level1" element={<Level1 />} />
                <Route path="/level3" element={<Level3 />} />
            </Routes>
        </BrowserRouter>
    )
}
