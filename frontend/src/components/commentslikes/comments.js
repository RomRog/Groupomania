import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BsFillTrashFill } from "react-icons/bs";
import { FaRegCommentAlt } from 'react-icons/fa'


// schema YUP
const schema = yup.object({
  comment: yup
    .string()
    .min(1, "Veuillez remplir le champ")
    .max(35, "Pas plus de 35 caractères")
    .required(),
});



const Comments = ({ id }) => {
  const [show, setShow] = useState(false);
  const [comm, setComm] = useState([]);



// ********* register ************
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


// ********** backend **********
    // post
  const handlePostComment = useCallback(async (data) => {
    await axios.post(
      `http://localhost:3000/api/posts/${id}/comments`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    fetchComm();
    reset({ comment: ""});
    setShow(true)
  }, [id]);

  // get
  const fetchComm = useCallback(async () => {
    const res = await axios.get(`http://localhost:3000/api/posts/${id}/comments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setComm(res.data.data);
}, [id])

  // delete
  const handleDelete = async (commentId) => {
    await axios.delete(
      `http://localhost:3000/api/posts/${id}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    fetchComm();
  }


// ******** useEffect recharge liste comm *********
  useEffect(() => {
    fetchComm()
  }, [fetchComm]);


  // ******** show all comments *********
  const handleShowComment = () => {
    setShow(!show);
  }

 

  return (
    <div className="comments">
       <span className="span" onClick={handleShowComment}> <FaRegCommentAlt className="logoComm"/>{comm.length} {comm.length>1? ('Commentaires') : ('Commentaire')}</span> 
       {show? (
         <div className="showComment">
           {comm.length > 0? ("") : (<p className="NoComm">Pas de commentaire</p>)}
         {comm.map((comm) => {
           return (<ul>
             <li key={comm.id} className="commentaires">
               <div className="info_user">
                 <p className="user_comment">{comm.user.username}</p>
                 {Number(comm.user.id) === Number(localStorage.getItem('userId')) || Number(localStorage.getItem("userId")) === 93? 
                 (
                  <div>
                    <div key={comm.id}>
                      <p onClick={() => handleDelete(comm.id) }><BsFillTrashFill className="trash-comm" /> </p>
                    </div>
                </div>
                  )
                : ("")}
                
               </div>
               {comm.comment}
               
             </li>
           </ul>)
 })}
       </div>
       ) : ("")}
    

      <form onSubmit={handleSubmit(handlePostComment)}>
        <textarea
          {...register("comment")}
          name="comment"
          id="comment"
          cols="25"
          rows="2"
          placeholder={
            comm.length > 0
              ? "Réagissez"
              : "Commentez le premier"
          }
        ></textarea>
         {errors.comment && (
          <div className="error-content">{errors.comment.message}</div>
        )}
        <input type="submit" id="button" value="Commentez" />
      </form>
    </div>
  );
};

export default Comments;

