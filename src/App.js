import './App.css';
import Mainpage from './mainpage';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Test from './test_example';


function App() {
  return (
    <div className="App">

      <Route exact path='/'><Mainpage></Mainpage></Route>
      <Route exact path='/start'><Test> </Test></Route>
    </div>
  );
}

export default App;
