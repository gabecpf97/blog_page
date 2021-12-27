import React, { useState } from "react";

const CommentPost = ({ handleSumbit, postID }) => {
    const [message, setMessage] = useState();
    const [addComment, setAddComment] = useState(false);

    const onMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const onClickAdd = () => {
        setAddComment(true);
    }

    const toCancel = () => {
        setAddComment(false);
    }

    const onAddMessage = (e) => {
        e.preventDefault();
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
                    // setMessage('');
                    setAddComment(false);
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
            {!addComment && 
                <button className="add_comment" onClick={() => onClickAdd()}>Add Comment</button>
            }
            {addComment &&
                <form className="comment_form" onSubmit={(e) => onAddMessage(e)}>
                    <div className="getMessage">
                        <input type="text" name="message" placeholder="comment" 
                            required={true} onChange={(e) => onMessageChange(e)} />
                    </div>
                    <input className="submit" type="submit" value="Submit" />
                    <button onClick={() => toCancel()}>Cancel</button>
                </form>
            }
        </div>
    )
}

export default CommentPost;