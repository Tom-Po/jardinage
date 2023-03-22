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
import store from './redux/store'
import { Provider } from 'react-redux'
import Initializer from './component/Initializer';

axios.defaults.withCredentials = false;

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Initializer>
          <div className={styles.App}>
            <Header />
            <AppRouter />
          </div>
        </Initializer>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;