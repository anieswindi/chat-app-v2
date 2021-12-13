import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

export class Logintbygoogle extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	signup(res) {
		const googleresponse = {
			Name: res.profileObj.name,
			email: res.profileObj.email,
			token: res.googleId,
			Image: res.profileObj.imageUrl,
			ProviderId: 'Google',
		};

		debugger;

		axios
			.post(
				'http://localhost:2/Api/Login/SocialmediaData',
				googleresponse
			)
			.then((result) => {
				let responseJson = result;
				sessionStorage.setItem('userData', JSON.stringify(result));
				this.props.history.push('/Dashboard');
			});
	}

	render() {
		const responseGoogle = (response) => {
			var res = response.profileObj;
			debugger;
			this.signup(response);
		};

		return (
			<div className="App">
				test
				<div className="row">
					<div className="col-sm-12 btn btn-info">
						Login With Google Using ReactJS
					</div>
				</div>
				<div className="row">
					<div style={{ paddingTop: '2px' }} className="col-sm-12">
						<div className="col-sm-4"></div>

						<div className="col-sm-4">
							<GoogleLogin
								clientId="227618025355-tkbjoolp09vem782j99mfes9qjfjotv2.apps.googleusercontent.com"
								buttonText="Login with Google"
								onSuccess={responseGoogle}
								onFailure={responseGoogle}
							></GoogleLogin>
						</div>

						<div className="col-sm-4"></div>
					</div>
				</div>
			</div>
		);
	}
}

export default Logintbygoogle;
