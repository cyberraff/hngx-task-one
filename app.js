const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api', (req, res) => {
	// Get query params
	const slack_name = req.query.slack_name;
	const track = req.query.track;

	// Get current day and time in UTC with validation of +/-2 hours
	const currentTime = new Date();
	const offset = currentTime.getTimezoneOffset() / 60;
	const isValidOffset = offset >= -2 && offset <= 2;
	const utcTime = isValidOffset
		? new Date(
				currentTime.getTime() - offset * 60 * 60 * 1000,
		  ).toISOString()
		: null;

	const resData = {
		slack_name: slack_name,
		current_day: new Date().toLocaleString('en-US', { weekday: 'long' }),
		utc_time: utcTime,
		track: track,
		github_file_url:
			'https://github.com/cyberraff/hngx-task-one/blob/main/app.js',
		github_repo_url: 'https://github.com/cyberraff/hngx-task-one.git',
		status_code: res.statusCode,
	};

	res.send(resData);
});
app.listen(port, () => console.log(`App is listening on port ${port}!`));
