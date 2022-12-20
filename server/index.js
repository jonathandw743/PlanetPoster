const express = require("express");
const bodyParser = require("body-parser");
const { readFile, writeFile } = require("fs").promises;

const app = express();
app.use(bodyParser.json());

const generatePassword = () => [...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");

app.post("/entersession", async (req, res) => {
	console.log(req.body);
	const sessions = JSON.parse(await readFile("./sessions.json"));
	const matchingSessions = sessions.filter((session) => session.id === req.body.sessionId && session.active);
	for (const session of matchingSessions) {
		for (const user of session.users) {
			if (user.id === req.body.userId) {
				if (user.password === req.body.userPassword) {
					res.json({
						sessionId: session.id,
						cards: session.cards,
						// don;t give password
						users: session.users.map((user) => ({
							id: user.id,
							nickname: user.nickname,
						})),
						questions: session.questions,
						answers: session.answers,
					});
					return;
				}
			}
		}
	}
});

app.post("/startsession", async (req, res) => {
	let sessions = JSON.parse(await readFile("./sessions.json"));
	const adminPassword = generatePassword();
	const session = { ...req.body, id: `${sessions.length}`, adminPassword: adminPassword, active: true, users: [], questions: [], answers: [] };
	sessions.push(session);
	await writeFile("./sessions.json", JSON.stringify(sessions), "utf-8");
	res.json({ sessionId: session.id, adminPassword: adminPassword });
});

app.post("/joinsession", async (req, res) => {
	let sessions = JSON.parse(await readFile("./sessions.json"));
	const matchingSessions = sessions.filter((session) => session.id === req.body.sessionId && session.active);
	// exit and throw if none left
	if (matchingSessions.length < 1) {
		//todo send no sessions with matching id error
		return;
	}
	let session = matchingSessions[0];
	const password = generatePassword();
	const newUser = {
		id: `${session.users.length}`,
		password: password,
		nickname: req.body.nickname,
	};
	session.users.push(newUser);
	await writeFile("./sessions.json", JSON.stringify(sessions), "utf-8");
	res.json({ sessionId: session.id, userId: newUser.id, userPassword: newUser.password });
});

app.get("/authenticateadmin", async (req, res) => {
	const sessions = JSON.parse(await readFile("./sessions.json"));
	const matchingSessions = sessions.filter((session) => session.id === req.query.sessionId && session.active);
	if (matchingSessions.length > 0 && req.query.adminPasswordGuess === matchingSessions[0].adminPassword) {
		res.json(true);
	} else {
		res.json(false);
	}
});

app.post("/startquestion", async (req, res) => {
	let sessions = JSON.parse(await readFile("./sessions.json"));
	const matchingSessions = sessions.filter((session) => session.id === req.body.sessionId && session.active);
	if (matchingSessions.length > 0 && req.body.adminPasswordGuess === matchingSessions[0].adminPassword) {
		let session = matchingSessions[0];
		session.questions.push({
			id: `${session.questions.length}`,
			question: req.body.newQuestion,
		});
		console.log("added q");
		await writeFile("./sessions.json", JSON.stringify(sessions), "utf-8");
	} else {
		res.json(false);
	}
});

app.post("/submitanswer", async (req, res) => {
	let sessions = JSON.parse(await readFile("./sessions.json"));
	console.log(req.body);
	const matchingSessions = sessions.filter((session) => session.id === req.body.sessionId && session.active);
	if (matchingSessions.length > 0) {
		console.log("there are matching sessions");
		let session = matchingSessions[0];
		let matchingUsers = session.users.filter((user) => user.id === req.body.userId);
		if (matchingUsers.length > 0) {
			console.log("there are matching users");
			let user = matchingUsers[0];
			if (user.password === req.body.userPassword) {
				console.log("that is the right password");
				const matchingAnswers = session.answers.filter((answer) => (answer.userId === req.body.userId && answer.questionId === req.body.questionId));
				if (matchingAnswers.length > 0) {
					matchingAnswers[0].answer = req.body.answer;
				} else {
					session.answers.push({
						userId: user.id,
						questionId: req.body.questionId,
						answer: req.body.answer,
					});
				}
				await writeFile("./sessions.json", JSON.stringify(sessions), "utf-8");
			}
		}
	}
	res.json(false);
});

app.listen(5000, () => {
	console.log("server listening on port 5000");
});
