import { useRef } from 'react';
import { useList } from '../../hooks/useList.hook';

import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = (props) => {
	const { loading, error, getAllCharacters } = useMarvelService();
	const { list, offset, ended, onRequest } = useList(getAllCharacters, 732, 9);

	const itemsRefs = useRef([]);

	const focusOnChar = (id) => {
		itemsRefs.current.forEach((item) =>
			item.classList.remove('char__item_selected')
		);
		itemsRefs.current[id].classList.add('char__item_selected');
		itemsRefs.current[id].focus();
	};

	function renderCharList(arr) {
		const charItems = arr.map((char, i) => {
			const nameChar = () => {
				return (
					<div className='char__name'>
						<span className='firstLetter'>{char.name.slice(0, 1)}</span>
						{char.name.slice(1, char.name.length)}
					</div>
				);
			};
			const spinner = loading ? <Spinner /> : null,
				errorMessage = error ? <ErrorMessage /> : null,
				componentThumbnail = !loading ? (
					<img src={char.thumbnail} alt={char.name} />
				) : null,
				componentName = !loading ? nameChar() : null;

			return (
				<li
					className='char__item'
					key={char.id}
					ref={(elem) => (itemsRefs.current[i] = elem)}
					tabIndex={0}
					onClick={() => {
						props.onCharSelected(char.id);
						focusOnChar(i);
					}}
					onKeyUp={(event) => {
						if (event.key === ' ' || event.key === 'Tab') {
							props.onCharSelected(char.id);
							focusOnChar(i);
						}
					}}
				>
					{errorMessage}
					{spinner}
					{componentThumbnail}
					<div className='char__backgroundName'>{componentName}</div>
				</li>
			);
		});

		return <ul className='char__grid'>{charItems}</ul>;
	}

	const itemsChar = renderCharList(list);

	return (
		<div className='char__list'>
			{itemsChar}
			<button
				onClick={() => onRequest(offset)}
				className='button button__main button__long'
				disabled={loading}
				style={{ display: ended ? 'none' : 'block' }}
			>
				<div className='inner'>load more</div>
			</button>
		</div>
	);
};

export default CharList;