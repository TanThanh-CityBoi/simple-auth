import { BrowserRouter } from 'react-router-dom';
import Routers from "./routers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routers />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
