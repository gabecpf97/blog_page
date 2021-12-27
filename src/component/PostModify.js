import React from "react";
import { Link } from "react-router-dom";

const PostModify = ({ Pid, refresh }) => {

    const handleDelete = () => {
        const deletePost = async () => {
            try {
                const response = await fetch(`http://localhost:5000/post/${Pid}/delete`, {
                    method:'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }

                });
                const data = await response.json();
                if (data.errors) {
                    console.log(data.errors.msg);
                } else {
                    refresh();
                }
            } catch (err) {
                console.log(err);
            }
        }
        deletePost();
    }

    return(
        <div className="post_modify">
            <Link className="page" to={`/post/${Pid}/edit`}>Update Post</Link>
            <button onClick={() => handleDelete()}>Delete Post</button>
        </div>
    )
}

export default PostModify;