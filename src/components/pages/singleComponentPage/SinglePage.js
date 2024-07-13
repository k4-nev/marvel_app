import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import useMarvelService from '../../../services/MarvelService';
import AppBanner from '../../appBanner/AppBanner';

const SinglePage = ({Component, dataType}) => {
	const { id } = useParams();
	const [data, setData] = useState(null);
	const { loading, error, getComic, getCharacters, clearError } = useMarvelService();

	useEffect(() => {
		updateData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);
	
	const updateData = () => {
		clearError();

		// eslint-disable-next-line default-case
		switch (dataType) {
			case 'comic':
				getComic(id).then(onDataLoaded);
				break;
			case 'character':
				getCharacters(id).then(onDataLoaded);
		}
	};

	const onDataLoaded = (data) => {
		setData(data);
	};

	const errorMessage = error ? <ErrorMessage /> : null,
		spinner = loading ? <Spinner /> : null,
		content = !(loading || error || !data) ? <Component data={data} /> : null;

	return (
		<>
			<AppBanner />
			{errorMessage}
			{spinner}
			{content}
		</>
	);
};

export default SinglePage;
