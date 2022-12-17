import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Session from "./Session"
import { useSearchParams } from "react-router-dom";

const EnterASession = () => {
	const [queryParams] = useSearchParams();
	const [formState, setFormState] = useState({
		sessionId: queryParams.get("sessionId"),
		userId: queryParams.get("userId"),
		userPassword: queryParams.get("userPassword"),
	});
	const [submitted, setSubmitted] = useState(false);
	const [serverResponse, setServerResponse] = useState();
	const changeHandler = (e) => {
		setFormState((old) => ({
			...old,
			[e.target.name]: e.target.value,
		}));
	};
	const onSubmit = (e) => {
		e.preventDefault();
		setServerResponse(undefined);
		fetch("/entersession", {
			method: "POST",
			body: JSON.stringify(formState),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setServerResponse(data);
			});
		setSubmitted(true);
	};
	const form = (
		<form onSubmit={onSubmit}>
			<label>
				Session ID
				<input type="text" name="sessionId" value={formState.sessionId} onChange={changeHandler} />
			</label>
			<br />
			<label>
				User ID
				<input type="text" name="userId" value={formState.userId} onChange={changeHandler} />
			</label>
			<br />
			<label>
				User Password
				<input type="text" name="userPassword" value={formState.userPassword} onChange={changeHandler} />
			</label>
			<br />
			<button>Enter/Load Session</button>
		</form>
	);
	const resultRender = (
		<div>
			{typeof serverResponse === "undefined" ? (
				<p>Loading...</p>
			) : (
				<Session initialSessionData={{
					...serverResponse,
					userId: formState.userId,
					userPassword: formState.userPassword,
				}} />
			)}
		</div>
	);
	return (
		<div>
			EnterASession
			{form}
			{submitted && resultRender}
		</div>
	);
};

export default EnterASession;
