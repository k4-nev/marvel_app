import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';
import img from '../../resources/img/Page404.jpg';

const Page404 = () => {
	return (
		<div>
			<p
				style={{
					textAlign: 'center',
					fontWeight: '500',
					fontSize: '40px',
					color: '#9F0013',
				}}
			>
				404 Error
			</p>
			<p
				style={{
					textAlign: 'center',
					marginTop: '20px',
					fontWeight: '200',
					fontSize: '20px',
					color: 'black',
				}}
			>
				This page doesn't exist
			</p>
			<Link
				style={{
					display: 'block',
					textAlign: 'center',
					marginTop: '15px',
					fontWeight: '200',
					fontSize: '20px',
					color: '#9F0013',
				}}
				to={'/'}
			>
				Would you like to back to main page?
			</Link>
			<img
				style={{
					display: 'block',
					height: '250px',
					objectFit: 'contain',
					margin: '40px auto',
				}}
				src={img}
				alt='Error404'
			/>
		</div>
	);
};

export default Page404;
