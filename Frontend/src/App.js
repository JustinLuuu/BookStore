import { Redirect, Route, Switch } from "react-router-dom";
import BookList from "./components/Books/BookList";
import { BookForm } from "./components/Books/BookForm";
import { Header } from "./components/Header";
import { BookDetail } from "./components/Books/BookDetail";


function App() {
  return (
    <div className='p-5'>
      <Header />

      <section className='d-flex flex-column align-items-center pt-4'>
        <Switch>
          <Route path='/' component={BookList} exact />
          <Route path='/add' component={BookForm} />
          <Route path='/update/:id' component={BookForm} />
          <Route path='/bookDetail/:id' component={BookDetail} />
          <Redirect to='/' />
        </Switch>
      </section>
    </div>
  );
}

export default App;
