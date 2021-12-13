import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Sidebar, Dashboard } from './components';
import './App.css';

const clientId =
	'227618025355-tkbjoolp09vem782j99mfes9qjfjotv2.apps.googleusercontent.com';

function App() {
	const [loading, setLoading] = useState('Loading...');
	const [user, setUser] = useState(null);

	const handleLoginSuccess = (response) => {
		console.log('Login Success ', response);
		setUser(response.profileObj);
		setLoading();
	};

	const handleLoginFailure = (error) => {
		console.log('Login Failure ', error);
		setLoading();
	};

	const handleLogoutSuccess = (response) => {
		console.log('Logout Success ', response);

		if (response == null) {
			setUser(response);
		} else {
			setUser(null);
		}
	};

	const handleLogoutFailure = (error) => {
		console.log('Logout Failure ', error);
	};

	const handleRequest = () => {
		setLoading('Loading...');
	};

	const handleAutoLoadFinished = () => {
		setLoading();
	};

	return (
		<>
			{user ? (
				<div className="content">
					<Sidebar
						user={user}
						clientId={clientId}
						onLogoutSuccess={handleLogoutSuccess}
						onFailure={handleLogoutFailure}
					/>
					<Dashboard user={user} />
				</div>
			) : (
				<div className="content-login">
					<h1>Login to Chat-app-v2</h1>
					<GoogleLogin
						clientId={clientId}
						buttonText={loading}
						onSuccess={handleLoginSuccess}
						onFailure={handleLoginFailure}
						onRequest={handleRequest}
						onAutoLoadFinished={handleAutoLoadFinished}
						isSignedIn={true}
					/>
				</div>
			)}
		</>
	);
}

export default App;
