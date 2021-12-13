import axios from 'axios';

const pushDataToClient = async (params) => {
	const { channel_id, room_name } = params;
	const data = await axios
		.post(
			`https://api2.scaledrone.com/${channel_id}/${room_name}/publish`,
			{ hello: 'from REST' }
		)
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});

	return data;
};

export { pushDataToClient };
