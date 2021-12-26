import React, { useEffect, useState } from "react";
import Comment from "./Comment";

const Account = () => {
    const user = JSON.parse(localStorage.user);
    const [comments, setComments] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {   
                const response = await fetch(`http://localhost:5000/user_comment/${user._id}`, {
                    headers: {"Authorization": `Bearer ${localStorage.token}`}
                });
                const data = await response.json();
                if (data.comment_list) {
                    setComments(data.comment_list);
                    setLoaded(true);
                } else {
                    console.log('server error');
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [user]);

    return (
        <div className="account">
            {loaded && 
                <div className="info">
                    <h1>{user.username}</h1>
                    <h2>Comment you created</h2>
                    <Comment comments={comments} />
                </div>                    
            }
        </div>
    )
}

export default Account;