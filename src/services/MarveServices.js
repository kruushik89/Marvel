import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
  const {loading, request, error} = useHttp();
  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=2d865dafbddb0cd80b24bac07712d720";
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res?.data.results[0]);
  }

  const _transformCharacter = (char) => {
    const {name, description, thumbnail, urls, id, comics} = char;
    return {
      id,
      name,
      description,
      thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
      homepage: urls[0].url,
      wiki: urls[1].url,
      comics: comics.items,
    };
  }

  return {loading, error, getAllCharacters, getCharacter}
}

export default useMarvelService;