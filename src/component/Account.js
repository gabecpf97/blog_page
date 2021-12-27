import React, { useState } from "react";
import User from "./User";

const Account = () => {
    const [user] = useState(JSON.parse(localStorage.user));

    return (
        <div className="account"> 
            <h1 className="welcome_user">Welcome {user.username}</h1> 
            <User myId={JSON.parse(localStorage.user)._id} />                
        </div>
    )
}

export default Account;