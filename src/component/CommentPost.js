import react, { useState } from "react";

const CommentPost = ({ handleSumbit }) => {
    const [message, setMessage] = useState();

    const onMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const onAddMessage = () => {
        //fetch to POST comment
        const fetchData = () => {
            try{
                const response = await fetch(postcomment_create);
                const data = await response.json();
                if (data.error) {
                    console.log(went_wrong);
                } else {
                    setMessage('');
                    handleSumbit();
                }
            } catch(err) {
                console.log(err);
            }
        }
    }

    return (
        <div className="comment_post">
            <form onSubmit={() => onAddMessage()}>
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