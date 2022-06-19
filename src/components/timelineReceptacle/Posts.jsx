import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ReactHashtag from "@mdnm/react-hashtag";
import { FiHeart } from "react-icons/fi";
import { IconContext } from "react-icons";
import { useState, useRef, useEffect } from 'react';
import { updatePost , deletePost } from "../../services/api";
import ReactModal from "react-modal";

import noImage from "./noimage.png"
import Loading from "../Loading";

export default function Posts({ id, link, description, image, name, urlTitle, urlImage, urlDescription, postId }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(description)
  const [isLoading, setIsLoading] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [delPostId, setDelPostId] = useState()

  const inputRef = useRef(null);

  const loggedUserId = localStorage.getItem("id");
  let urlDescriptionSplice = urlDescription.slice(0, 150);

  console.log(link)
  const pattern =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/


  if (urlDescription.length > 150) {
    urlDescriptionSplice += "..."
  }

  if (!urlImage || !urlImage.match(pattern)) {
    urlImage = noImage;
  }

  function handlHashtag(value) {
    const hashtag = value.replace("#", "");
    navigate(`/hashtag/${hashtag}`);
  };

  async function editPost(){
    setIsEditing(!isEditing);
    setEditedDescription(editedDescription);
  }
  useEffect(() => {
    if (isEditing) {
      inputRef.current.select();
    }
  }, [isEditing]);

  async function update(e, id, descriptions){
    if(e.keyCode===13){
      try {
        setIsLoading(true)
        await updatePost(id, descriptions)
        setIsLoading(false)
        setIsEditing(false)
        navigate("/timeline")
      } catch (error) {
        alert(error)
      }
      
    }
  }
  function handleModal(id){
    setModalIsOpen(!modalIsOpen);
    setDelPostId(id);
  }
  async function confirmed(){
    setIsLoading(true)
    try {
      await deletePost(delPostId);
      setIsLoading(false);
      setModalIsOpen(false);
      window.location.reload();
    } catch (error) {
      
    }
    navigate("/timeline")
  }

  return (
    <>
    <ContainerPost>
      <DivPost>
        <ImageLikes>
          <img
            src={image}
            alt="foto"
            onClick={() => navigate(`/users/${id}`)}
          />
          <IconContext.Provider value={{ color: "#FFFFFF", className: "heart-icon", size: "25px" }}>
            <FiHeart />
          </IconContext.Provider>
          <p>15 Likes</p>
        </ImageLikes>

        <PostInfos>
          <h3 onClick={() => navigate(`/users/${id}`)}>{name}</h3>
          {id==loggedUserId ?
            <>
              <ion-icon onClick={editPost} class="edit" name="pencil"></ion-icon>
              <ion-icon onClick={()=>handleModal(postId)} class="delete" name="trash"></ion-icon>
            </>:<></>}
            {isEditing ?
              <>
                <input
                  type="text"
                  ref={inputRef}
                  value={editedDescription}
                  placeholder="Awesome article about #javascript"
                  name="description"
                  onChange={(e)=>setEditedDescription(e.target.value)}
                  onKeyDown={(e)=>update(e, postId, editedDescription)}
                  disabled={isLoading}
                />
              </>:
              <p><ReactHashtag onHashtagClick={(value) => handlHashtag(value)}>{editedDescription}</ReactHashtag></p>
            }
          <UrlInfos href={link} target="blank">
            <div>
              <h4>{urlTitle}</h4>
              <p>{urlDescriptionSplice}</p>
              <span>{link}</span>
            </div>

            <div>
              <img src={urlImage} alt="url" />
            </div>
          </UrlInfos>

        </PostInfos>
      </DivPost>
    </ContainerPost>
    <ReactModal 
      isOpen={ modalIsOpen}
      shouldCloseOnEsc={true}
      preventScroll={true}
      style={{ overlay: {
        overflowY: 'hidden',
        height: '100%'
      }, 
      content: {
        margin: 'auto',
        padding: '0',
        width: 'calc(59700px/1440%)',
        maxWidth: '597px',
        height: '262px',
        borderRadius: '50px'
      } }}
      ariaHideApp={false}
      >
      {isLoading ?
        <Loading/>
        :<Delete>
            <p>Are you sure you want to delete this post?</p>
            <button onClick={()=>setModalIsOpen(false)} className="cancel">No, go back</button>
            <button onClick={confirmed} className="confirm">Yes, delete it</button>
        </Delete>
    }
</ReactModal>
</>
  )
};

const Delete = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: #333333;
    width: calc(59700px/1440%);
    height: 262px;
    font-weight: 700;
    font-size: 18px;
    line-height: 21.6px;
    border-radius: 50px;
    p{
        width: 458px;
        height: 82px;
        color: #ffffff;
        text-align: center;
        font-size: 34px;
        line-height: 40.8px;
    }
    button{
      font-weight: 700;
      width: 120px;
      height: 37px;
      border: none;
      border-radius: 5px;
    }
    .cancel{
        background-color: #fff;
        color: #1877F2;
        margin-right: 27px;
    }
    .confirm{
        background-color: #1877F2;
        color: #fff;
    }
`

const ContainerPost = styled.article`
  width: 100%;
  height: 232px;
  margin-top: 16px;
  padding: 10px 15px 15px 15px;
  background-color: #171717;

  @media(min-width: 800px){
      border-radius: 16px;
      height: 276px;
    }
`

const DivPost = styled.div`
  display:flex;
  width: 100%;
  height: 100%;
`

const ImageLikes = styled.div`
  margin-right: 18px;
  display:flex;
  flex-direction:column;
  align-items:center;
  img {
    width: 40px;
    height: 40px;
    border-radius: 26.5px;
    cursor:pointer;

    @media(min-width: 800px){
      width: 50px;
      height: 50px;
    }
  }

  .heart-icon {
    margin-top: 20px;
  }

  p {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    text-align: center;
    color: #FFFFFF;
    margin-top: 12px;
  }
`
const PostInfos = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 503px;
  position: relative;

  .delete{
    right: 5px;
  }
  .edit{
    right: 25px;
  }
  ion-icon{
    position: absolute;
    top: 5px;
    color: white;
  }

  h3 {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #FFFFFF;
    margin-bottom: 7px;
    cursor: pointer;
  }

  p {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    color: #B7B7B7;
    margin-bottom: 7px;

    span{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
    margin-bottom: 7px;
    cursor: pointer;
    }
  };

  @media(min-width: 800px){
    h3 {
      font-size: 19px;
      line-height: 23px;
    }

    p {
      font-size: 17px;
      line-height: 20px;
    }
  }
`

const UrlInfos = styled.a`
  position: relative;
  display:flex;
  flex-direction: column;
  padding: 8px 0 8px 11px;
  justify-content: space-between;
  width: 100%;
  height: 116px;
  border: 1px solid #4D4D4D;
  border-radius: 11px;
  flex-wrap: wrap;
  overflow: hidden;
  color: inherit;
  text-decoration: none;

  @media(min-width: 800px){
    height: 155px;
  }

  div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    max-width: 178px; 
    overflow: hidden;

    @media(min-width: 800px){
      max-width: 320px; 
      justify-content: center;
    }

    h4 {
      font-family: 'Lato';
      font-style: normal;
      font-weight: 400;
      font-size: 11px;
      line-height: 13px;
      color: #CECECE;
      margin-bottom: 5px;

      @media(min-width: 800px){
        font-size: 16px;
        line-height: 19px;
      }
    }

    p {
      font-family: 'Lato';
      font-style: normal;
      font-weight: 400;
      font-size: 9px;
      line-height: 11px;
      color: #9B9595;
      margin-bottom: 5px;

      @media(min-width: 800px){
        font-size: 11px;
        line-height: 13px;
        margin-bottom: 10px;
      }
    }

    span{
      font-family: 'Lato';
      font-style: normal;
      font-weight: 400;
      font-size: 9px;
      line-height: 11px;
      color: #CECECE;

      @media(min-width: 800px){
        font-size: 11px;
        line-height: 13px;
      }
    }
  };

  div:last-child{
    position: absolute;
    top: 0;
    right: 0;
    img {
      width: 95px;
      height: 115px;
      border-radius: 0px 12px 13px 0px;

      @media(min-width: 800px){
        width: 153.44px;
        height: 155px;
      }
    }
  }
`