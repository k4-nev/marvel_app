import { Link } from 'react-router-dom';

import './singleComponentLayout.scss';

const SingleComicLayout = ({ data }) => {
	const { title, description, pageCount, thumbnail, language, price } = data;

	return (
		<div className='single-component'>
			<img src={thumbnail} alt={title} className='single-component__img single-component__img_comic' />
			<div className='single-component__info'>
				<h2 className='single-component__name'>{title}</h2>
				<p className='single-component__descr'>{description}</p>
				<p className='single-component__descr'>{pageCount}</p>
				<p className='single-component__descr'>Language: {language}</p>
				<div className='single-component__price'>{price}</div>
			</div>
			<Link to='/comics' className='single-component__back'>
				Back to all
			</Link>
		</div>
	);
};

export default SingleComicLayout;
