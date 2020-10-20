import React, { useEffect } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
const useStyles = makeStyles(theme => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: 'deepblue',
		backgroundColor: 'rgb(250, 250, 250)',
	},
}));

function SimpleBackdrop({ loading }) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);
	useEffect(() => {
		setOpen(loading);
	}, [loading]);
	return (
		<div>
			<Backdrop className={classes.backdrop} open={open}>
				<CircularProgress
					style={{ height: '60px', width: '60px' }}
					color='inherit'
				/>
			</Backdrop>
		</div>
	);
}
const mapStateToProps = state => ({
	loading: state.AUTHS.loading,
});

export default connect(mapStateToProps)(SimpleBackdrop);
