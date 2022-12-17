import React from "react";

const Users = ({ users }) => {
	return (

			<div style={{ display: "flex", flexFlow: "row" }}>
                Users
				{users.map((user) => (
					<div key={user.id} style={{ border: "1px solid black", margin: "5px", padding: "10px", flex: "1 1 auto" }}>
						{Object.keys(user).map((key) => (
							<p key={key}>
								{key}: {user[key]}
							</p>
						))}
					</div>
				))}
			</div>
	);
};

export default Users;
