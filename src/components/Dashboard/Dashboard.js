import React, { Component } from 'react';
import Messages from '../Messages';
import Input from '../Input';
import './Dashboard.css';
// import { pushDataToClient } from '../../api/Api';

function randomName() {
	const adjectives = [
		'autumn',
		'hidden',
		'bitter',
		'misty',
		'silent',
		'empty',
		'dry',
		'dark',
		'summer',
		'icy',
		'delicate',
		'quiet',
		'white',
		'cool',
		'spring',
		'winter',
		'patient',
		'twilight',
		'dawn',
		'crimson',
		'wispy',
		'weathered',
		'blue',
		'billowing',
		'broken',
		'cold',
		'damp',
		'falling',
		'frosty',
		'green',
		'long',
		'late',
		'lingering',
		'bold',
		'little',
		'morning',
		'muddy',
		'old',
		'red',
		'rough',
		'still',
		'small',
		'sparkling',
		'throbbing',
		'shy',
		'wandering',
		'withered',
		'wild',
		'black',
		'young',
		'holy',
		'solitary',
		'fragrant',
		'aged',
		'snowy',
		'proud',
		'floral',
		'restless',
		'divine',
		'polished',
		'ancient',
		'purple',
		'lively',
		'nameless',
	];
	const nouns = [
		'waterfall',
		'river',
		'breeze',
		'moon',
		'rain',
		'wind',
		'sea',
		'morning',
		'snow',
		'lake',
		'sunset',
		'pine',
		'shadow',
		'leaf',
		'dawn',
		'glitter',
		'forest',
		'hill',
		'cloud',
		'meadow',
		'sun',
		'glade',
		'bird',
		'brook',
		'butterfly',
		'bush',
		'dew',
		'dust',
		'field',
		'fire',
		'flower',
		'firefly',
		'feather',
		'grass',
		'haze',
		'mountain',
		'night',
		'pond',
		'darkness',
		'snowflake',
		'silence',
		'sound',
		'sky',
		'shape',
		'surf',
		'thunder',
		'violet',
		'water',
		'wildflower',
		'wave',
		'water',
		'resonance',
		'sun',
		'wood',
		'dream',
		'cherry',
		'tree',
		'fog',
		'frost',
		'voice',
		'paper',
		'frog',
		'smoke',
		'star',
	];
	const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
	const noun = nouns[Math.floor(Math.random() * nouns.length)];
	return adjective + noun;
}

function randomColor() {
	return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

export class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: 'Chat-App-V2',
			messages: [
				{
					text: 'This is a test message!',
					member: {
						color: 'blue',
						username: 'bluemoon',
					},
				},
			],
			member: {
				username: randomName(),
				color: randomColor(),
			},
		};

		this.drone = new window.Scaledrone('uec0t5tt0uS2gAyV', {
			data: this.state.member,
		});
		this.drone.on('open', (error) => {
			if (error) {
				return console.error(error);
			}
			const member = { ...this.state.member };
			member.id = this.drone.clientId;
			this.setState({ member });
		});

		const room = this.drone.subscribe('observable-room');

		room.on('data', (data, member) => {
			if (member) {
				console.log('room !', data, member);
				const messages = this.state.messages;
				messages.push({ member: member, text: data });
				this.setState({ messages });
			} else {
				console.log('error');
			}
		});
	}

	componentDidMount() {
		this.assignProps();
	}

	assignProps() {
		const user = { ...(this.props.user || {}) };
		this.setState({
			user,
			messages: [
				{
					...this.state.messages,
					text: 'Hi, ' + user?.name + '!',
				},
			],
		});
	}

	onSendMessage = (message) => {
		this.drone.publish({
			room: 'observable-room',
			message: message,
		});
	};

	render() {
		return (
			<div className="container">
				<div className="row">
					<Messages
						messages={this.state.messages}
						currentMember={this.state.member}
						user={this.state.user}
					/>
					<Input onSendMessage={this.onSendMessage} />
				</div>
			</div>
		);
	}
}

export default Dashboard;
