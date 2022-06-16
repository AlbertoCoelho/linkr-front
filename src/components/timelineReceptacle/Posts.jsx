import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ReactHashtag from "@mdnm/react-hashtag";

import noImage from "./noimage.png"

export default function Posts({ link, description, image, name, urlTitle, urlImage, urlDescription }) {
  const navigate = useNavigate();

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
    const hastag = value.replace("#", "");
    navigate(`/hashtag/${hastag}`);
  }

  return (
    <ContainerPost>
      <DivPost>
        <ImageLikes>
          <img
            src={image}
            alt="foto" />
        </ImageLikes>

        <PostInfos>
          <h3>{name}</h3>
          <p><ReactHashtag onHashtagClick={(value) => handlHashtag(value)}>{description}</ReactHashtag></p>
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
  )
};

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
  img {
    width: 40px;
    height: 40px;
    border-radius: 26.5px;

    @media(min-width: 800px){
      width: 50px;
      height: 50px;
    }
  }

  
`
const PostInfos = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 503px;

  h3 {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #FFFFFF;
    margin-bottom: 7px;
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