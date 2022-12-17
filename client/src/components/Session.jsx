import React from "react";
import Board from "./Board";
import Users from "./Users";
import { useState } from "react";

const Session = ({ initialSessionData }) => {
	const [sessionData, setSessionData] = useState(initialSessionData);
	const [adminPasswordGuess, setAdminPasswordGuess] = useState("");
	const [hasAdmin, setHasAdmin] = useState(false);
	const [newQuestion, setNewQuestion] = useState("");
	const [viewingQuestionId, setViewingQuestionId] = useState();
	return (
		<div style={{ border: "1px solid black", margin: "5px", padding: "10px" }}>
			Session
			<p>{hasAdmin ? "admin activated" : "no admin privileges"}</p>
			{hasAdmin ? (
				// form for submitting a new question as an admin
				<form
					onSubmit={(e) => {
						e.preventDefault();
						fetch("/startquestion", {
							method: "POST",
							body: JSON.stringify({
								sessionId: sessionData.sessionId,
								adminPasswordGuess: adminPasswordGuess,
								newQuestion: newQuestion,
							}),
							headers: {
								"Content-Type": "application/json",
							},
						});
					}}
				>
					<textarea
						value={newQuestion}
						onChange={(e) => {
							setNewQuestion(e.target.value);
						}}
					></textarea>
					<button>Start Question</button>
				</form>
			) : (
				// form for a quick admin authentication and then activate the admin UI
				<form
					onSubmit={(e) => {
						e.preventDefault();
						fetch(`/authenticateadmin/?sessionId=${sessionData.sessionId}&adminPasswordGuess=${adminPasswordGuess}`)
							.then((res) => {
								return res.json();
							})
							.then((data) => {
								console.log(data);
								setHasAdmin(data);
							});
					}}
				>
					<input
						type="text"
						value={adminPasswordGuess}
						onChange={(e) => {
							setAdminPasswordGuess(e.target.value);
						}}
					/>
					<button>Activate Admin</button>
				</form>
			)}
			<Users users={sessionData.users} />
			<div style={{ border: "1px solid black", margin: "5px" }}>
				Questions:
				{sessionData.questions.map((question) => (
					<div key={question.id} style={{ border: "1px solid black", margin: "5px" }}>
						<p>id: {question.id}</p>
						<p>question: {question.question}</p>
						<button
							onClick={() => {
								setViewingQuestionId(question.id);
							}}
						>
							Select
						</button>
					</div>
				))}
			</div>
			<div style={{ border: "1px solid black", margin: "5px" }}>
				Current Question:
				{(() => {
					const matchingQuestions = sessionData.questions.filter((question) => question.id === viewingQuestionId);
					if (matchingQuestions.length > 0) {
						return matchingQuestions[0].question;
					} else {
						return "no question with that id";
					}
				})()}
				(id: {viewingQuestionId})
			</div>
			<Board numbers={sessionData.cards} onSubmit={(card) => {
				fetch("/submitanswer", {
					method: "POST",
					body: JSON.stringify({
						sessionId: sessionData.sessionId,
						userId: sessionData.userId,
						userPassword: sessionData.userPassword,
						questionId: viewingQuestionId,
						answer: card,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});
			}} />
		</div>
	);
};

export default Session;
