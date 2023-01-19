import axios from 'axios';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import styles from './App.module.css';
import IconList from './component/IconList';
import "./index.css";
import Header from './layout/Header';
import { AppRouter } from './routes/Router';
axios.defaults.withCredentials = false;

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.App}>
        <Header />
        <AppRouter />
        <IconList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
