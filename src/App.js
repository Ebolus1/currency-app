import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import CurrencyTable from './CurrencyTable';
import CurrencyConverter from './CurrencyConverter';
import HChart from './HChart'
import Footer from './Footer';
import Header from './Header';

const Home = () => {
  return (
      <div>
        <div className="welcomeOuter">
          <div className="welcomeInner table-dark"> 
            <h1 id="welcomeHeader" className="table-dark">Welcome!</h1>
            <p className="table-dark welcomeText">This app was designed with React for an online class. It also makes use of FontAwesome, Bootstrap, React Router, and a photo from Unsplash. </p>
          </div>
        </div>
      </div>
  )
}

const Table = () => {
  return (
    <div>
     <CurrencyTable/>
    </div>
  )
}

const Converter = () => {
  return (
    <div>
      <CurrencyConverter/>
    </div>
  )
}

const HistoryChart = () => {
  return (
    <div>
      <HChart/>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <div>
          <Route path='/' exact component={Home}/>
          <Route path='/Home/' component={Home} />
          <Route path='/Table/' component={Table} />
          <Route path='/Converter/' component={Converter} />
          <Route path='/HistoryChart/' component={HistoryChart} />
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
