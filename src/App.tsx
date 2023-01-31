import './App.css';
import SearchForm from './components/SearchForm';

function App() {
    return (
        <div className="App">
            <header className="App-header"></header>
            <main>
              <SearchForm />
               </main>
            <footer className="App-footer">
                &copy;{2023} All rights reserved
            </footer>
        </div>
    );
}

export default App;
