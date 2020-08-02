import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthAlert } from '../redux/actions/auths';
import { fetchHomeUsers } from '../redux/actions/users';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import UserList from '../components/utils/HomeUsersList';
import UploadTask from '../components/utils/UploadFile';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	mainContainer: {
		padding: '0 0 3em 0',
		marginTop: '3rem',
	},
	boxStyle: {
		display: 'flex',
		alignItems: 'flex-start',
		marginLeft: '1rem',
		flexDirection: 'column',
	},
	profleContainer: {
		padding: theme.spacing(2),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	listContainer: {
		marginTop: '1rem',
		color: theme.palette.text.secondary,
		padding: '8px',
	},
	authUsername: {
		fontSize: '1rem',
		fontWeight: '500',
		letterSpacing: '0.5px',
	},
	authName: {
		color: 'darkgrey',
		letterSpacing: '0.5px',
	},
	uploadPaper: {},
}));

const Home = ({
	authState,
	setAuthAlert,
	fetchHomeUsers,
	homeUsers,
	...rest
}) => {
	const classes = useStyles();
	const history = useHistory();
	useEffect(() => {
		if (!authState.loading && !authState.details.username) {
			setAuthAlert({
				type: 'warning',
				message: 'Please add a username to Continue with Fireinsta',
			});
			history.push('/accounts/settings');
		} else if (
			!authState.loading &&
			authState.details &&
			authState.details.username &&
			!homeUsers
		) {
			fetchHomeUsers();
		}
		// eslint-disable-next-line
	}, [authState.details]);
	return (
		<>
			<CssBaseline />
			<Container className={classes.mainContainer} maxWidth='md'>
				<div className={classes.root}>
					<Grid container spacing={3}>
						<Grid item xs={7}>
							<Paper className={classes.paper}></Paper>
						</Grid>
						<Grid item xs={5}>
							<Paper className={classes.profleContainer}>
								<Avatar
									style={{ height: '66px', width: '66px' }}
									alt={authState.details && authState.details.displayName}
									src={authState.details && authState.details.photoURL}
								/>
								<Box className={classes.boxStyle}>
									<Typography
										className={classes.authUsername}
										variant='body2'
										gutterBottom>
										{authState.details && authState.details.username}
									</Typography>
									<Typography
										className={classes.authName}
										variant='caption'
										display='block'
										gutterBottom>
										{authState.details && authState.details.displayName}
									</Typography>
								</Box>
							</Paper>
							<Paper className={classes.listContainer}>
								<UserList />
							</Paper>
							<Paper className={classes.listContainer}>
								<UploadTask />
							</Paper>
						</Grid>
					</Grid>
				</div>
			</Container>
		</>
	);
};

const mapStateToProps = state => ({
	authState: state.AUTHS,
	homeUsers: state.USERS.homeUsers,
});

export default connect(mapStateToProps, { setAuthAlert, fetchHomeUsers })(Home);
