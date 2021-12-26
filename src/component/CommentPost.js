import React, { useState } from "react";

const CommentPost = ({ handleSumbit, postID }) => {
    const [message, setMessage] = useState();

    const onMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const onAddMessage = (e) => {
        e.preventDefault();
        console.log(postID);
        // fetch to POST comment
        const fetchData = async () => {
            try{
                const response = await fetch(`http://localhost:5000/post/${postID}/comment/create`, {
                    method: 'post',
                    body: JSON.stringify({
                        post: postID,
                        message: message,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                const data = await response.json();
                if (data.errors) {
                    console.log(data.errors.msg);
                } else {
                    console.log(data);
                    setMessage('');
                    handleSumbit();
                }
            } catch(err) {
                console.log(err);
            }
        }

        fetchData();
    }

    return (
        <div className="comment_post">
            <form onSubmit={(e) => onAddMessage(e)}>
                <div className="getMessage">
                    <input type="text" name="message" placeholder="comment" 
                        required={true} onChange={(e) => onMessageChange(e)} />
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CommentPost;