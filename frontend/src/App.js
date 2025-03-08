import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

/* Components */
import Alert from './components/layout/Alert';
import Loader from './components/layout/Loader';
import Layout from './components/layout/Layout';
import NoMatch from './components/routing/NoMatch';
import ValidateSession from './components/routing/ValidateSession';
import PrivateRoute from './components/routing/PrivateRoute';

/* Views */

//Home
import Home from './views/home/Home';

//Providers
import Providers from './views/providers/Providers';

/* Redux */
import store from './store';
import { loadUser } from './actions/home';
import setAuthToken from './utils/setAuthToken';

function App() {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<BrowserRouter>
				<Fragment>
					<Layout></Layout>
					<section className="principal-section">
						<Alert></Alert>
						<Loader></Loader>
						
						<Routes>
							{/* Home */}
							<Route exact path="/" element={<ValidateSession><Home /></ValidateSession>}/>
							<Route exact path="/home" element={<ValidateSession><Home /></ValidateSession>}/>

							{/* Providers */}
							<Route path="/providers" element={<PrivateRoute><Providers /></PrivateRoute>}/>

							{/* Not found */}
							<Route path="*" element={<NoMatch />}/>
						</Routes>
					</section>
				</Fragment>
			</BrowserRouter>
		</Provider>
	);
}

export default App;