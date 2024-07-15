import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
	Formik,
	Form,
	Field,
	ErrorMessage as FormikErrorMessage,
} from 'formik';
import * as Yup from 'yup';

import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charSearchForm.scss';

const CharSearchForm = () => {
	const { getCharactersByName, loading, error, clearError } =
		useMarvelService();
	const [characters, setCharacters] = useState(null);
	const [loadedChar, setLoadedChar] = useState(false);

	const searchCharByName = (name) => {
		clearError();
		getCharactersByName(name).then(onCharLoaded);
	};

	const onCharLoaded = (char) => {
		setCharacters(char);
		console.log(char);
		setLoadedChar(true);
	};

	const onInputSymbol = () => {
		setLoadedChar(false);
	};

	const charactersSearchFondList = (arr) => {
		const charactersArrayElem = arr.map((char) => {
			return (
				<Link to={`/characters/${char.id}`} className='char__search-character'>
					<img
						src={char.thumbnail}
						alt={char.name}
						className='char__search-character_background'
					/>
					<div className='char__search-character_brightness'>
						<div className='char__search-character_name'>{char.name}</div>
					</div>
				</Link>
			);
		});

		return <ul className='char__search_list'>{charactersArrayElem}</ul>;
	};

	const errorMessage = error ? <ErrorMessage /> : null;

	const resultsMessage = !characters ? null : characters.length > 0 ? (
		charactersSearchFondList(characters)
	) : (
		<div className='char__search-notfound'>
			The character was not found. Check the name and try again.
		</div>
	);

	return (
		<Formik
			initialValues={{
				charName: '',
			}}
			validationSchema={Yup.object({
				charName: Yup.string().required('This field is required'),
			})}
			onSubmit={({ charName }) => searchCharByName(charName)}
		>
			<div className='char__search'>
				<label htmlFor='name' className='char__search-label'>
					Or find a character by name:
				</label>
				<Form className='char__search-form'>
					<Field
						id='charName'
						name='charName'
						type='text'
						placeholder='Enter name'
						className='char__search-input'
						onInput={loadedChar ? onInputSymbol : null}
					/>
					<button
						className='button button__main'
						type='submit'
						disabled={loading}
					>
						<div className='inner'>Find</div>
					</button>
				</Form>
				<div className='char__search-result'>
					<FormikErrorMessage
						component='div'
						className='char__search-notfound'
						name='charName'
					/>
					{loadedChar ? resultsMessage : null}
					{errorMessage}
				</div>
			</div>
		</Formik>
	);
};

export default CharSearchForm;
