/* React Router v.5+ - библиотека для создания многостраничного сайта
	link: https://v5.reactrouter.com/web/guides/quick-start
*/
/* Lazy, библиотека для динамического импорта. Suspense - показывает объект, пока грузится динамический импорт */
import { lazy, Suspense } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes /* в React Router v.5 - это Switch */,
} from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

/* Динамические импорты должны стоять после статических. Позволяют подгружать страницу постепенно, не нагружая ее сразу  */
const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SinglePage = lazy(() =>
	import('../pages/singleComponentPage/SinglePage')
);
const SingleComicLayout = lazy(() =>
	import('../pages/singleComponentPage/singleComponentLayout/SingleComicLayout')
);
const SingleCharLayout = lazy(() =>
	import('../pages/singleComponentPage/singleComponentLayout/SingleCharLayout')
);

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
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route path='/' element={<MainPage />} />
							<Route path='/comics' element={<ComicsPage />} />
							<Route path='/comics/:id' 
								element={<SinglePage Component={SingleComicLayout} dataType={'comic'}/>} />
							<Route path='/characters/:id' 
								element={<SinglePage Component={SingleCharLayout} dataType={'character'}/>} />
							<Route path='*' element={<Page404 />} />
						</Routes>
					</Suspense>
				</main>
			</div>
		</Router>
	);
};

export default App;
