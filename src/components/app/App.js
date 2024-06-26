/* React Router v.5+ - библиотека для создания многостраничного сайта
	link: https://v5.reactrouter.com/web/guides/quick-start
*/
import {
	BrowserRouter as Router,
	Route,
	Routes /* в React Router v.5 - это Switch */,
} from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import { MainPage, ComicsPage, Page404, SingleComicPage } from '../pages';

const App = () => {
	return (
		/* React Router. Маршрутизация */
		<Router>
			<div className='app'>
				<AppHeader />
				<main>
					{/* Switch (в v6+ Rotes) нужен для рендера только конкретного элемента. */}
					{/* Маршрут. path='/' - так указывается главная страница. Exact нужен для точного отображения нужного элемента. */}
					{/* В версии v6+ нужный для отображения элемент помещается в element  */}
					<Routes>
						<Route path='/' element={<MainPage />} />
						<Route path='/comics' element={<ComicsPage />}/>
						<Route path='/comics/:comicId' element={<SingleComicPage />}/>
						<Route path='*' element={<Page404 />}/>
					</Routes>
				</main>
			</div>
		</Router>
	);
};

export default App;
