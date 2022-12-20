import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const JoinASession = () => {
	const [queryParams] = useSearchParams();
	const [formState, setFormState] = useState({
		sessionId: queryParams.get("sessionId"),
		nickname: "",
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
		fetch("/joinsession", {
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
				Nickname
				<input type="text" name="nickname" value={formState.nickname} onChange={changeHandler} />
			</label>
			<br />
			<button>Join Session</button>
		</form>
	);
	const resultRender = (
		<div>
			{typeof serverResponse === "undefined" ? (
				<p>Loading...</p>
			) : (
				<>
					<p>{JSON.stringify(serverResponse)}</p>
					<a href={`/enterasession?sessionId=${serverResponse.sessionId}&userId=${serverResponse.userId}&userPassword=${serverResponse.userPassword}`} target="_blank">go to enter session</a>
				</>
			)}
		</div>
	);
	return (
		<div>
			JoinASession
			{submitted ? resultRender : form}
		</div>
	);
};

export default JoinASession;
