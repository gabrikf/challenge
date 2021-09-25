import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Questions from "./pages/Questions";
import Report from "./pages/Report";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/questions' component={Questions}/>
        <Route path='/report' component={Report}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
