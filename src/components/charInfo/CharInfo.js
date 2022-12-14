import {Component, useEffect, useState} from "react";
import './charInfo.scss';
import MarvelService from "../../services/MarveServices";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";

const CharInfo = ({charId}) => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  }

  const onCharLoading = () => setLoading(true);

  const onError = () => {
    setLoading(false);
    setError(true);
  }

  const updateChar = () => {
    if (!charId) {
      return;
    }
    onCharLoading();
    marvelService
      .getCharacter(charId)
      .then(onCharLoaded)
      .catch(onError);
  }

  useEffect(() => {
    updateChar();
  }, [charId])

  const skeleton = char || loading || error ? null : <Skeleton/>
  const spinner = loading ? <Spinner/> : null;
  const errorMessage = error ? <ErrorMessage/> : null;
  const content = !(error || loading || !char) ? <View char={char}/> : null;
  return (
    <div className="char__info">
      {skeleton}
      {spinner}
      {errorMessage}
      {content}
    </div>
  )
}

const View = ({char}) => {
  const {name, description, thumbnail, homepage, wiki, comics} = char;
  let imgStyle = {'objectFit': 'cover'};
  if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgStyle = {'objectFit': 'contain'};
  }
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle}/>
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">Homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {!!comics.length ? null : "There is no comics character"}
        {comics.map((item, i) => {
          // eslint-disable-next-line
          if (i > 9) return;
          return (
            <li className="char__comics-item" key={i}>
              {item.name}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default CharInfo;