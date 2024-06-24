/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './appHeader.scss';

const AppHeader = () => {
	return (
		<header className='header'>
			<div className='app__header'>
				<h1 className='app__title'>
					{/* Link заменяет обычную ссылку. to='' указывает на какой элемент она должна направлять */}
					<Link to='/'>
						<span>Marvel</span> information portal
					</Link>
				</h1>
				<nav className='app__menu'>
					<ul>
						<li>
							{/* NavLink позволяет добавить активный класс и стиль для динамичного отображения активной ссылки */}
							<NavLink exact activeStyle={{'color': '#9f0013'}} to='/'>Characters</NavLink>
						</li>
						/
						<li>
							<NavLink exact activeStyle={{'color': '#9f0013'}} to='comics'>Comics</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default AppHeader;
