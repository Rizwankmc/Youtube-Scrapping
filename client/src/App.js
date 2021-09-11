import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Listing from './components/listing/listing';
import ListingDetail from "./components/listing/listingDetail";

const App = () => {
  return (
    <div className="App">
     <Router>
      <Switch>
        <Route exact path='/' component={Listing} />
        <Route path='/detail'component={ListingDetail} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
