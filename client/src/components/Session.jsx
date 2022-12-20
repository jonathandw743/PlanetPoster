import React from "react";
import Board from "./Board";
import Users from "./Users";
import AdminControls from "./AdminControls";
import { useState } from "react";
import Questions from "./Questions";

const Session = ({ initialSessionData }) => {
	const [sessionData, setSessionData] = useState(initialSessionData);
	const [viewingQuestionId, setViewingQuestionId] = useState();
	return (
		<div style={{ border: "1px solid black", margin: "5px", padding: "10px" }}>
			Session
			<br />
			//todo
			<button>Reload</button>
			<AdminControls sessionId={sessionData.sessionId} />
			<Users
				users={sessionData.users.map((user) => {
					const userAnswers = sessionData.answers.filter((answer) => answer.userId === user.id);
					console.log(userAnswers);
					return {
						...user,
						answers: userAnswers,
					};
				})}
			/>
			<Questions
				questions={sessionData.questions.map((question) => {
					const questionAnswers = sessionData.answers.filter((answer) => answer.questionId === question.id);
					return { ...question, answers: questionAnswers };
				})}
				setViewingQuestionId={setViewingQuestionId}
			/>
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
			<Board
				numbers={sessionData.cards}
				onSubmit={(card) => {
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
				}}
			/>
		</div>
	);
};

export default Session;
