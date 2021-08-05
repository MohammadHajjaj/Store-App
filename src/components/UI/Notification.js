import { Alert } from 'react-bootstrap'
const Notification = (props) => {
	let variant = '';

	if (props.status === 'error') {
		variant = 'danger';
	}
	if (props.status === 'success') {
		variant = 'success';
	}

	return (
		<Alert className="mt-5 text-center" variant={variant}>
			{props.message}
		</Alert>
	);
};

export default Notification;
