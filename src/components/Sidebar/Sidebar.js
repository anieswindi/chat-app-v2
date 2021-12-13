import React, { Component } from 'react';
import { GoogleLogout } from 'react-google-login';
import './Sidebar.css';
const clientId =
	'227618025355-tkbjoolp09vem782j99mfes9qjfjotv2.apps.googleusercontent.com';
class Sidebar extends Component {
	handleLogoutSuccess(response) {
		console.log('Logout Success ', response);
		this.props.onLogoutSuccess(null);
	}

	async handleLogoutFailure(e) {
		await this.props.onFailure(e);
	}
	render() {
		const {
			props: { user },
		} = this;
		return (
			<div className="sidebar">
				<div className="info-user">
					<img src={user?.imageUrl} alt="Info user" />
					<p>{user?.name}</p>
				</div>

				<GoogleLogout
					clientId={clientId}
					onLogoutSuccess={this.handleLogoutSuccess.bind(this)}
					onFailure={this.handleLogoutFailure.bind(this)}
					icon={false}
					buttonText='Logout'
				/>
			</div>
		);
	}
}

export default Sidebar;
