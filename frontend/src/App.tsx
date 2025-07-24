import { Header } from './components/organisms/Header';
import { Footer } from './components/organisms/Footer';
import { Content } from './components/organisms/Content';

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Content />
            <Footer />
        </div>
    );
}

export default App;
