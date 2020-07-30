import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

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

const CustomizedSnackbars = ({ authState }) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	useEffect(() => {
		if (authState.alerts) {
			setOpen(true);
		} else {
			setOpen(false);
		}
		// eslint-disable-next-line
	}, [authState]);

	return (
		<div className={classes.root}>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={open}
				autoHideDuration={5500}
				onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity={authState.alerts && authState.alerts.type}>
					{authState.alerts && authState.alerts.message}
				</Alert>
			</Snackbar>
		</div>
	);
};

const mapStateToProps = state => ({
	authState: state.AUTHS,
});

export default connect(mapStateToProps)(CustomizedSnackbars);
