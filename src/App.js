import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Header from './components/Header'
import level1 from './components/level1'
import SelectLevel from './components/SelectLevel'
function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
<Switch>
  <Route path="/" exact component={SelectLevel}  />
  <Route path="/level1/:id"  component={level1} />
</Switch>
</Router>
    </div>
  );
}

export default App;
