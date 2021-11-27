import './App.css';
import React from 'react';
import Mainpage from './components/mainpage';
import { Route } from 'react-router-dom';
import Test from './components/test_example';
import Question_1 from './components/test1';
import Question_2 from './components/test2';
import Question_3 from './components/test3';
import Question_4 from './components/test4';
import Question_5 from './components/test5';
import Question_6 from './components/test6';
import PrevResult from './components/prev_result';
import Result from './components/result';

function App() {
  return (
    <div className="App">
      <Route exact path='/'><Mainpage></Mainpage></Route>
      <Route path='/start'><Test></Test></Route>
      <Route path='/test1'><Question_1></Question_1></Route>
      <Route path='/test2'><Question_2></Question_2></Route>
      <Route path='/test3'><Question_3></Question_3></Route>
      <Route path='/test4'><Question_4></Question_4></Route>
      <Route path='/test5'><Question_5></Question_5></Route>
      <Route path='/test6'><Question_6></Question_6></Route>
      <Route path='/prevresult'><PrevResult></PrevResult></Route>
      <Route path='/result'><Result></Result></Route>
    </div>
  );
}

export default App;
