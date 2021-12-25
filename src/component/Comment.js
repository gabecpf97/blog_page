import React from "react";

const Comment = ({ comments }) => {

    return (
        <div className="comments">
            {comments.map(comment => {
                return (
                    <div className="comment" key={comment._id}>
                        <h2>{comment.message}</h2>
                        <p>{comment.user.username}</p>
                        <p>{comment.date}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Comment;