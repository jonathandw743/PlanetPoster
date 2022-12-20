import React from "react";
import { useState } from "react";

const Users = ({ users }) => {
	const [expanded, setExpanded] = useState(false);
	console.log(users[0].answers);
	return (
		<div style={{ border: "1px solid green", margin: "5px", padding: "5px", display: "flex", flexFlow: "row" }}>
			Users
			{users.map((user) => (
				<div key={user.id} style={{ border: "1px solid black", margin: "5px", padding: "10px", flex: "1 1 auto" }}>
					id: {user.id}
					<br />
					nickname: {user.nickname}
					<br />
					{expanded ? (
						<>
							answers:
							{user.answers.map((answer, i) => 
								<div key={i}>
									questionId: {answer.questionId}
									<br />
									answer: {answer.answer}
								</div>
							)}
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
						>Expand</button>
					)}
				</div>
			))}
		</div>
	);
};

export default Users;
