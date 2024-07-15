import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './singleComponentLayout.scss';

const SingleCharLayout = ({ data }) => {
	const { name, description, thumbnail } = data;

	return (
		<div className='single-component'>
			<Helmet>
				<meta name='description' content={`${name} character`} />
				<title>{name}</title>
			</Helmet>
			<img
				src={thumbnail}
				alt={name}
				className='single-component__img single-component__img_char'
			/>
			<div className='single-component__info'>
				<h2 className='single-component__name'>{name}</h2>
				<p className='single-component__descr'>{description}</p>
			</div>
			<Link to='/' className='single-component__back'>
				Back to all
			</Link>
		</div>
	);
};

export default SingleCharLayout;
