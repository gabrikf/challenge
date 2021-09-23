import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Questions from "./pages/Questions";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
      <Route path='/' exact component={Home}/>
      <Route path='/questions' component={Questions}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
