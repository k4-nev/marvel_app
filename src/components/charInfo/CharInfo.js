/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {
	const [char, setChar] = useState(null);
	const {loading, error, getCharacters, clearError} = useMarvelService();

	useEffect(() => {
		updateChar();
	}, [props.charId]);

	const onCharLoaded = (char) => {
		setChar(char);
	};

	const updateChar = () => {
		const { charId } = props;
		if (!charId) {
			return;
		}
		clearError();
		getCharacters(charId).then(onCharLoaded);
	};

	const skeleton = char || loading || error ? null : <Skeleton />,
		errorMessage = error ? <ErrorMessage /> : null,
		spinner = loading ? <Spinner /> : null,
		content = !(loading || error || !char) ? <View char={char} /> : null;

	return (
		<div className='char__info'>
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	);
};

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = char;

	return (
		<>
			<div className='char__basics'>
				<img src={thumbnail} alt={name} />
				<div>
					<div className='char__info-name'>{name}</div>
					<div className='char__btns'>
						<a href={homepage} className='button button__main'>
							<div className='inner'>homepage</div>
						</a>
						<a href={wiki} className='button button__secondary'>
							<div className='inner'>Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className='char__descr'>{description}</div>
			<div className='char__comics'>Comics:</div>
			<ul className='char__comics-list'>
				{comics.length > 0 ? null : (
					<li className='char__comics-item'>No comics information</li>
				)}
				{comics.map((item, i) => {
					// eslint-disable-next-line
					if (i >= 5) return;
					return (
						<li key={i} className='char__comics-item'>
							{item.name}
						</li>
					);
				})}
			</ul>
		</>
	);
};

CharInfo.propTypes = {
	charId: PropTypes.number,
};

export default CharInfo;
