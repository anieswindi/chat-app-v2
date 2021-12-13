import { Component } from 'react';
import React from 'react';

class Messages extends Component {
	renderMessage(message) {
		const { user } = this.props;
		const { member, text } = message;
		const { currentMember } = this.props;
		const messageFromMe = member && member.id === currentMember.id;

		let fillMessage = messageFromMe ? (
			<li className="Messages-message currentMember">
				<img src={user?.imageUrl} alt="Profile user image" />
				<div className="Message-content">
					<div className="username">{user?.name}</div>
					<div className="text">{text}</div>
				</div>
			</li>
		) : (
			<li className="Messages-message">
				<span
					className="avatar"
					style={{ backgroundColor: '#6495ed' }}
				/>
				<div className="Message-content">
					<div className="username">client</div>
					<div className="text">{text}</div>
				</div>
			</li>
		);

		return fillMessage;
	}
	render() {
		const { messages } = this.props;
		return (
			<ul className="Messages-list">
				{messages.map((m) => this.renderMessage(m))}
			</ul>
		);
	}
}

export default Messages;
