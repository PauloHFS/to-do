import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <header>
        <h1>To-do</h1>
      </header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/taskform">Create new Task</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
