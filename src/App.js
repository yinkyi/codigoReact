import './App.css';
import { Switch,Route,Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ClassPackPage from './pages/ClassPackPage';
import AboutUsPage from './pages/AboutUsPage';
import CheckoutPage from './pages/CheckoutPage';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import { useEffect } from 'react';

function App() {
  const isAuth = useSelector(state=>state.auth.isAuth);
  const expiredIn = useSelector(state=>state.auth.expiredIn);
  const dispatch = useDispatch();
  
  useEffect(
    () => {
      if (isAuth) {
        const identity =  setTimeout(
          () => {
            dispatch(authActions.logout());
          },
          expiredIn
        );
       dispatch(authActions.setTimer(identity));
        
      }
      
    },
    // respond to changes in isLoggedIn
    [dispatch,isAuth,expiredIn]
  );
  return (
    <Layout>
        <Switch>
            <Route path='/' exact>
                <HomePage/>
            </Route>
            <Route path='/class-packs' exact>
                <ClassPackPage />
            </Route>
            <Route path='/about-us'>
                <AboutUsPage />
            </Route>
            <Route path='/checkout'>
              <CheckoutPage/>
            </Route>
            <Route path='*'>
              <Redirect to="/"/>
            </Route>
        </Switch>
    </Layout>
    
  )
}

export default App;
