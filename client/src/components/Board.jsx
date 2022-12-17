import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";

const Board = ({ numbers, onSubmit }) => {

	const [selectedNumber, setSelectedNumber] = useState();

	const changeHandler = (e) => {
		setSelectedNumber(e.target.value);
	};

	useEffect(() => {
		console.log(selectedNumber);
	}, [selectedNumber]);

	return (
		<div
			style={{
				border: "1px solid black",
				padding: "10px",
				margin: "5px",
			}}
		>
			{numbers.map((number, i) => (
				<div key={i}>
					<input type="radio" value={number} name="number" onChange={changeHandler}/> {number}
				</div>
			))}
			<button onClick={(event) => {
				onSubmit(selectedNumber);
				console.log(selectedNumber);
			}}>Submit</button>
		</div>
	);
};

export default Board;
