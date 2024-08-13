import logo from './logo.svg';
import {render} from "react-dom";
import{
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Books from "./pages/Books"
import Add from "./pages/Add"
import Update from "./pages/Update"
import "./books.css"

function App() {
  return (
    <body>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Books/>}/>
          <Route path='/add' element={<Add/>}/>
          <Route path='/update/:id' element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </body>
  );
}

export default App;
