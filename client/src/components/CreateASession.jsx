import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const CreateASession = () => {
	const [formState, setFormState] = useState({
		name: "",
		cards: [],
		password: "",
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
		fetch("/startsession", {
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
				Board name
				<input type="text" name="name" onChange={changeHandler} />
			</label>
			<br />
			<label>
				Card options (separate with commas)
				<input
					type="text"
					name="cards"
					onChange={(e) => {
						setFormState((old) => ({
							...old,
							cards: e.target.value.split(","),
						}));
					}}
				/>
			</label>
			<br />
			<label>
				Password (leave blank for none)
				<input type="text" name="password" onChange={changeHandler} />
			</label>
			<br />
			<button>Create Board</button>
		</form>
	);
	const resultRender = (
		<div>
			{typeof serverResponse === "undefined" ? (
				<p>Loading...</p>
			) : (
				<>
					<p>{JSON.stringify(serverResponse)}</p>
					<p>(remember to keep the admin password)</p>
					<a href={`/joinasession?sessionId=${serverResponse.sessionId}`} target="_blank">go to join this session</a>
				</>
			)}
		</div>
	);
	return (
		<div>
			CreateASession
			{submitted ? resultRender : form}
		</div>
	);
};

export default CreateASession;
