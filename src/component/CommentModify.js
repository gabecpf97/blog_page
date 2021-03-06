import React, { useState } from "react";

const CommentModify = ({ Pid, Cid, refresh }) => {
    const [message, setMessage] = useState();
    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(true);
    }

    const onMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const onCancel = () => {
        setEdit(false);
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://my-blog-api-29.herokuapp.com/post/${Pid}/comment/${Cid}/update`, {
                        method: 'post',
                        body: JSON.stringify({message}),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        } 
                    });
                const res_data = await response.json();
                if (res_data.errors) {
                    console.log(res_data.errors);
                } else {
                    setEdit(false);
                    refresh();
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }
    
    const handleDelete = () => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://my-blog-api-29.herokuapp.com/post/${Pid}/comment/${Cid}/delete`, {
                        method: 'post',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        } 
                    });
                const res_data = await response.json();
                if (res_data.errors) {
                    console.log(res_data.errors.msg);
                } else {
                    refresh();
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }

    return (
        <div className="comment_modify">
            {!edit && <button onClick={() => handleEdit()}>Edit Comment</button>}
            {edit &&
                <form className="edit_form" onSubmit={(e) => handleSumbit(e)}>
                    <input className="edit_text" type="text" required={true} 
                        onChange={(e) => onMessageChange(e)} />
                    <input className="submit" type="submit" value="Submit" />
                    <button onClick={() => onCancel()}>Cancel</button>
                </form>
            }
            <button onClick={() => handleDelete()}>Delete Comment</button>
        </div>
    )
}

export default CommentModify;