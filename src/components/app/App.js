/* React Router v.5+ - библиотека для создания многостраничного сайта
	link: https://v5.reactrouter.com/web/guides/quick-start
*/
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom/cjs/react-router-dom.min';

import AppHeader from '../appHeader/AppHeader';
import { MainPage, ComicsPage } from '../pages';

const App = () => {
	return (
		/* React Router. Маршрутизация */
		<Router>
			<div className='app'>
				<AppHeader />
				<main>
					{/* Switch нужен для рендера только конкретного элемента */}
					<Switch>
						{/* Маршрут. path='/' - так указывается главная страница. Exact нужен для точного отображения нужного элемента. */}
						<Route exact path='/'>
							<MainPage />
						</Route>
						{/* Маршрут. Путь к дополнительной странице */}
						<Route exact path='/comics'>
							<ComicsPage />
						</Route>
					</Switch>
				</main>
			</div>
		</Router>
	);
};

export default App;
