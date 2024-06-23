import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";


/* Предохранитель. Ловит ошибки в методе Render, жизненного цикла и конструкторах дочерних элементов. */
class ErrorBoundary extends Component {
	state = {
		error: false
	}

	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo);
		this.setState({
			error: true
		})
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage/>
		}

		return this.props.children;
	}
}

export default ErrorBoundary;