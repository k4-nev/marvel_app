import { useState, useEffect } from 'react';

export const useList = (getList, valueOffset, limitList) => {
	const [list, setList] = useState([]);
	const [offset, setOffset] = useState(valueOffset);
	const [ended, setEnded] = useState(false);
	
	const onRequest = (offset) => {
		getList(offset, limitList).then(comicsLoaded);
	};

	useEffect(() => {
		onRequest(offset);
		// eslint-disable-next-line
	}, []);

	const comicsLoaded = (newComicsList) => {
		let ended = false;
		if (newComicsList.length < limitList) {
			ended = true;
		}

		setList(newComicsList);
		setOffset((offset) => offset + limitList);
		setEnded(ended);
	};

	return {list, offset, ended, onRequest};
};
