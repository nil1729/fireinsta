import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { clearAuthAlerts } from '../../redux/actions/auths';

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));

const CustomizedSnackbars = ({ authState, clearAuthAlerts }) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
		clearAuthAlerts();
	};

	useEffect(() => {
		if (Object.keys(authState.alerts).length !== 0) {
			setOpen(true);
		} else {
			setOpen(false);
		}
		// eslint-disable-next-line
	}, [authState.alerts]);

	return (
		<div className={classes.root}>
			{Object.keys(authState.alerts).length !== 0 ? (
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					open={open}
					autoHideDuration={5000}
					onClose={handleClose}>
					<Alert
						onClose={handleClose}
						severity={authState.alerts && authState.alerts.type}>
						{authState.alerts && authState.alerts.message}
					</Alert>
				</Snackbar>
			) : null}
		</div>
	);
};

const mapStateToProps = state => ({
	authState: state.AUTHS,
});

export default connect(mapStateToProps, { clearAuthAlerts })(
	CustomizedSnackbars
);
