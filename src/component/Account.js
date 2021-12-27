import React, { useEffect, useState } from "react";
import Comment from "./Comment";

const Account = () => {
    const [user] = useState(JSON.parse(localStorage.user));
    const [comments, setComments] = useState();
    const [loaded, setLoaded] = useState(false);
    const [toReload, setToReload] = useState(false);

    useEffect(() => {
        if (toReload || comments === undefined) {
            const fetchData = async () => {
                try {   
                    const response = await fetch(`http://localhost:5000/user_comment/${user._id}`, {
                        headers: {"Authorization": `Bearer ${localStorage.token}`}
                    });
                    const data = await response.json();
                    if (data.comment_list) {
                        setComments(data.comment_list);
                        setLoaded(true);
                        setToReload(false);
                    } else {
                        console.log('server error');
                    }
                } catch (err) {
                    console.log(err);
                }
            };
            fetchData();
        }
    }, [user, toReload, comments]);

    const onReload = () => {
        setToReload(true);
    }

    return (
        <div className="account">
            {loaded && 
                <div className="info">
                    <h1>Welcome {user.username}</h1>
                    <h2>Comment you created: </h2>
                    <Comment comments={comments} reload={onReload} />
                </div>                    
            }
        </div>
    )
}

export default Account;