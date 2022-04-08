import { Redirect, Route, Switch } from "react-router-dom";
import BookView from "./components/Books/BookView";
import { BookForm } from "./components/Books/BookForm";
import { Header } from "./components/Header";


function App() {
  return (
    <div className='p-5'>
      <Header />

      <section className='d-flex flex-column align-items-center pt-4'>
        <Switch>
          <Route path='/' component={BookView} exact />
          <Route path='/bookDetail/:id' component={BookView} />
          <Route path='/add' component={BookForm} />
          <Route path='/update/:id' component={BookForm} />
          <Redirect to='/' />
        </Switch>
      </section>
    </div>
  );
}

export default App;
