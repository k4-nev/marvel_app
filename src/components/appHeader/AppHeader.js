/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, NavLink } from 'react-router-dom';
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
							{/* NavLink позволяет добавить активный класс и стиль для динамичного отображения активной ссылки. 
								В v6 activeStyle заменен на просто style в которую передается callback с тернарным оператором */}
							<NavLink 
							end 
							style={({ isActive }) => ({color: isActive ? '#9f0013' : 'inherit'})} 
							to='/'>Characters</NavLink>
						</li>
						/
						<li>
							<NavLink
							style={({ isActive }) => ({color: isActive ? '#9f0013' : 'inherit'})} 
							to='comics'>Comics</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default AppHeader;
