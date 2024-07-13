import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/'; // Лодыш _ означает неформальное обозначение переменной, что ее нельзя менять.
	const _apiKey = 'apikey=beb9721fa12955978f1d6af3a6639d1f';
	const _baseOffsetCharacters = 54;
	const _baseOffsetComics = 80;

	const getAllCharacters = async (offset = _baseOffsetCharacters, limit = 6) => {
		const res = await request(
			`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformCharacter);
	};

	const getCharacters = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	};

	const getCharactersByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	};

	const getAllComics = async (offset = _baseOffsetComics, limit = 8) => {
		const res = await request(
			`${_apiBase}comics?limit=${limit}&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformComics);
	};

	const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

	const _transformCharacter = (char) => {
		const imgNotAvailable =
			'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
		const thumbnail = char.thumbnail.path + '.' + char.thumbnail.extension;
		const changImgNotAvailable =
			thumbnail === imgNotAvailable
				? 'https://avatars.dzeninfra.ru/get-zen_doc/10425803/pub_647df60b9373300bcb513cc7_647dfe9cf185ed4dabe1fe97/scale_1200'
				: thumbnail;

		return {
			id: char.id,
			name: char.name,
			description: char.description
				? char.description
				: 'No character information.',
			thumbnail: changImgNotAvailable,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items,
		};
	};

	const _transformComics = (comics) => {
		const imgNotAvailable =
			'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
		const thumbnailComics =
			comics.thumbnail.path + '.' + comics.thumbnail.extension;
		const changImgNotAvailable =
			thumbnailComics === imgNotAvailable
				? 'https://w0.peakpx.com/wallpaper/567/525/HD-wallpaper-not-found-advisory-black-funny-minimal-simple-texxt-warning.jpg'
				: thumbnailComics;

		const priceRUB = comics.prices[0].price
			? `${Math.round(comics.prices[0].price * 87.5)} RUB`
			: 'No price';

		return {
			id: comics.id,
			title: comics.title,
			price: priceRUB,
			thumbnail: changImgNotAvailable,

			description: comics.description || 'There is no description',
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: 'No info about the number pages',
			language: comics.textObjects.language || 'en-us',
		};
	};

	return {
		loading,
		error,
		getAllCharacters,
		getCharacters,
		getCharactersByName,
		clearError,
		getAllComics,
		getComic,
	};
};

export default useMarvelService;
