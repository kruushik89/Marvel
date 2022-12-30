import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarveServices";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const RandomChar = () => {
  const [char, setChar] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  useEffect(() => {
    updateChar()
  }, [])

  const {error, loading, getCharacter} = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
    // setLoading(false);
  }

  // const onCharLoading = () => setLoading(true);

  // const onError = () => {
  //   setLoading(false);
  //   setError(true);
  // }

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    // onCharLoading();
      getCharacter(id)
      .then(onCharLoaded);
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(error || loading) ? <View char={char}/> : null;
  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!<br/>
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">
          Or choose another one
        </p>
        <button className="button button__main" onClick={updateChar}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
      </div>
    </div>
  )
}

const View = ({char}) => {
  const {name, homepage, thumbnail, wiki, description} = char;
  const textDescription = description ? description : "Description not found!!!";
  let thumbnailCheck = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
  let imgStyle = !thumbnailCheck ? "randomchar__img" : "randomchar__no__img";

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className={imgStyle}/>
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{textDescription}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default RandomChar;