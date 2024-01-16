import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChipComponent from './ChipComponent';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<ChipComponent />}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
