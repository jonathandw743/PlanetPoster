import React from "react";
import { useState } from "react";

const AdminControls = ({sessionId}) => {
    const [adminPasswordGuess, setAdminPasswordGuess] = useState("");
	const [newQuestion, setNewQuestion] = useState("");

	const [hasAdmin, setHasAdmin] = useState(false);
	return (
		<div style={{
            border: "1px solid red",
            margin: "5px",
            padding: "5px",
        }}>
            Admin Controls
			<p>{hasAdmin ? "admin activated" : "no admin privileges"}</p>
			{hasAdmin ? (
				// form for submitting a new question as an admin
				<form
					onSubmit={(e) => {
						e.preventDefault();
						fetch("/startquestion", {
							method: "POST",
							body: JSON.stringify({
								sessionId: sessionId,
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
						fetch(`/authenticateadmin/?sessionId=${sessionId}&adminPasswordGuess=${adminPasswordGuess}`)
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
		</div>
	);
};

export default AdminControls;
