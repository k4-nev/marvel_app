import { useState, useEffect } from 'react';

import './randomChar.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';

const RandomChar = () => {
	const [char, setChar] = useState({});
	const {loading, error, getCharacters, clearError} = useMarvelService();

	useEffect(() => {
		updateChar();
		const timerId = setInterval(updateChar, 10000);

		/* componentWillUnmount пишется также через useEffect, но в return */
		return () => {
			clearInterval(timerId);
		} // eslint-disable-next-line
	}, []);

	const onCharLoaded = (char) => {
		setChar(char);
	};

	const updateChar = () => {
		clearError();
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		getCharacters(id).then(onCharLoaded);
	};

	const onUpdateChar = () => {
		updateChar();
	}

	const errorMessage = error ? <ErrorMessage /> : null,
		spinner = loading ? <Spinner /> : null,
		content = !(loading || error) ? <View char={char} /> : null;

	return (
		<div className='randomchar'>
			{/* Условный рендеринг */}
			{errorMessage}
			{spinner}
			{content}
			<div className='randomchar__static'>
				<p className='randomchar__title'>
					Random character for today!
					<br />
					Do you want to get to know him better?
				</p>
				<p className='randomchar__title'>Or choose another one</p>
				<button onClick={onUpdateChar} className='button button__main'>
					<div className='inner'>try it</div>
				</button>
				<img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
			</div>
		</div>
	);
}

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki } = char;

	return (
		<div className='randomchar__block'>
			<img src={thumbnail} alt='Random character' className='randomchar__img' />
			<div className='randomchar__info'>
				<p className='randomchar__name'>{name}</p>
				<p className='randomchar__descr'>{description}</p>
				<div className='randomchar__btns'>
					<a href={homepage} className='button button__main'>
						<div className='inner'>homepage</div>
					</a>
					<a href={wiki} className='button button__secondary'>
						<div className='inner'>Wiki</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default RandomChar;
