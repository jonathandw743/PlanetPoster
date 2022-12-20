import React from "react";
import { useState } from "react";

const Questions = ({ questions, setViewingQuestionId }) => {
	const [expanded, setExpanded] = useState(false);
	return (
		<div style={{ border: "1px solid blue", margin: "5px", padding: "5px", display: "flex", flexFlow: "row" }}>
			Questions
			{questions.map((question) => (
				<div key={question.id} style={{ border: "1px solid black", margin: "5px", padding: "5px", flex: "1 1 auto" }}>
					<button
						onClick={() => {
							setViewingQuestionId(question.id);
						}}
					>
						Select
					</button>
					<br />
					id: {question.id}
					<br />
					question: {question.question}
					<br />
					{expanded ? (
						<>
							answers:
							{question.answers.map((answer, i) => (
								<div key={i}>
									userId: {answer.userId}
									<br />
									answer: {answer.answer}
								</div>
							))}
							<br />
							<button
								onClick={() => {
									setExpanded(false);
								}}
							>
								Collapse
							</button>
						</>
					) : (
						<button
							onClick={() => {
								setExpanded(true);
							}}
						>
							Expand
						</button>
					)}
				</div>
			))}
		</div>
	);
};

export default Questions;
