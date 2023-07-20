function getParameterCaseInsensitive(object, key) {
  return object[Object.keys(object)
    .find(k => k.toLowerCase() === key.toLowerCase())
  ];
}

// Create WebSocket connection.
const socket = new WebSocket('ws://127.0.0.1:8080');

// get messages from the CPH socket
socket.onmessage = function (event) {
	const msg = JSON.parse(event.data);
	console.log('Message from server: ', msg);

	if (msg.id === 'credits') {
		// close the socket
		socket.close();

		const headers = [
			{ section: "events", key: "follows", title: "joined the force" },
			{ section: "events", key: "cheers", title: "Gave some cred" },
			{ section: "events", key: "subs", title: "Got Their Lightsaber" },
			{ section: "events", key: "reSubs", title: "Kept their lightsaber" },
			{ section: "events", key: "giftSubs", title: "gave a lightsaber out" },
			{ section: "events", key: "giftBombs", title: "handed a few lightsabers out!" },
			{ section: "events", key: "raided", title: "Escaped the death star" },
			{ section: "events", key: "rewardRedemptions", title: "Decided to waste channel points" },
			{ section: "events", key: "goalContributions", title: "Contributed to goals!" },
			{ section: "events", key: "pyramids", title: "Managed to make some pyramids!" },
			{ section: "users", key: "editors", title: "Grand Masters" },
			{ section: "users", key: "moderators", title: "Council Members", filterExistingEntries: true },
			{ section: "users", key: "subscribers", title: "Masters" },
			{ section: "users", key: "vips", title: "Knights!", filterExistingEntries: true },
			{ section: "groups", key: "<group name>", title: "<group title>" },
			{ section: "users", key: "users", title: "Padawans", filterExistingEntries: true },
			{ section: "hypeTrain", key: "conductors", title: "Crazy ass Hype Train Conductors" },
			{ section: "hypeTrain", key: "contributors", title: "Those onboard the hype trains!" },
			{ section: "top", key: "allBits", title: "All time top crazy people with bits!" },
			{ section: "top", key: "monthBits", title: "Monthly crazy people with bits, but only by a little" },
			{ section: "top", key: "weekBits", title: "Crazy people just this week with bits!" },
			{ section: "top", key: "channelRewards", title: "Folks with Channel Points to waste" }
		];

		// Generate DOM
		const container = document.getElementById('credits');
		const existingUserMap = {};
		const elements = [];
		for (const header of headers) {
			const headerSection = getParameterCaseInsensitive(msg, header.section);
			if (headerSection) {
				let eventData = getParameterCaseInsensitive(headerSection, header.key);
				if (!eventData) continue;

				// filter existing entries in the current section
				if (header.filterExistingEntries) eventData = eventData.filter(e => !existingUserMap[header.section] || !existingUserMap[header.section].includes(e));
				if (eventData.length > 0) {
					elements.push(`
						<div class="job">${ header.title }</div>
						${Object.values(eventData).map(entry => `<div class="name">${ entry }</div>`).join('')}
					`);

					// save output users by section
					if (!existingUserMap[header.section]) existingUserMap[header.section] = [];
					existingUserMap[header.section].push(...eventData);
				}
			}
		}
		container.innerHTML = elements.join('');

		// Init animation
		const creditsHeight = Math.ceil((container.offsetHeight / window.innerHeight) * -100) - 10;
		const duration = ((container.offsetHeight / window.innerHeight * 100) + 100) * 100;
		const creditsAnimation = container.animate([
				{ top: '110%' },
				{ top: creditsHeight + '%' }
			],{
				duration: duration,
				iterations: Infinity
			}
		);
	}
}

// set "request" to 'GetCredits', or 'TestCredits' for testing
socket.onopen = function (event) {
	const msg = {
		id: 'credits',
		request: 'GetCredits'
	};
	socket.send(JSON.stringify(msg));
};