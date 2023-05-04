import { BrowserRouter,Route,Routes } from "react-router-dom"
import Dashboard from "./layout/MainLayout/Sidebar/SideBar";


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Dashboard />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
