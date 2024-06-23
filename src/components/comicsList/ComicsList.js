import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useList } from '../../hooks/useList.hook';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {
	const { loading, error, getAllComics } = useMarvelService();
	const { list, offset, ended, onRequest } = useList(getAllComics, 104, 8);

	function renderComicsList(array) {
		const comicItems = array.map((comics) => {
			const spinner = loading ? <Spinner /> : null;
			const errorMessage = error ? <ErrorMessage /> : null;
			const componentThumbnail = !loading ? (
					<img
						src={comics.thumbnail}
						alt={comics.title}
						className='comics__item-img'
					/>
				) : null;

			return (
				<li className='comics__item' key={comics.id}>
					{/* eslint-disable-next-line */}
					<a href='#'>
						{spinner}
						{errorMessage}
						{componentThumbnail}
						<div className='comics__item-name'>{comics.title}</div>
						<div className='comics__item-price'>{comics.price}</div>
					</a>
				</li>
			);
		});

		return <ul className='comics__grid'>{comicItems}</ul>;
	}

	return (
		<div className='comics__list'>
			{renderComicsList(list)}
			<button
				style={{ display: ended ? 'none' : 'block' }}
				onClick={() => onRequest(offset)}
				className='button button__main button__long'
			>
				<div className='inner'>load more</div>
			</button>
		</div>
	);
};

export default ComicsList;
