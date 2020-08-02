import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinkSharpIcon from '@material-ui/icons/LinkSharp';
import { setAuthAlert } from '../../redux/actions/auths';
import { fetchProfile } from '../../redux/actions/users';
import NotFound from './NotFound';
import ProfileGallery from '../utils/ProfileGallery';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	container: {
		marginTop: '1.5rem',
	},
	headDiv: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '25rem',
	},
	username: {
		fontSize: '22px',
		fontWeight: '100',
		lineHeight: '32px',
		marginBottom: '0',
	},
	stats: {
		fontSize: '1rem',
		fontWeight: '400',
		letterSpacing: '0.5px',
		margin: 0,
	},
	name: {
		fontSize: '1.2rem',
		fontWeight: '400',
		letterSpacing: '1px',
	},
	dpStyle: {
		height: '100%',
		margin: 'auto',
		borderRadius: '50%',
	},
	dpContainer: {
		height: '9rem',
		marginTop: '1rem',
		display: 'flex',
		justifyContent: 'center',
	},
	urlStyle: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		textDecoration: 'none',
		fontSize: '0.9rem',
		letterSpacing: '0.5px',
		color: 'chocolate',
		width: 'fit-content',
	},
	loaderStyle: {
		left: 'calc(50% - 60px)',
		marginTop: '2rem',
		position: 'relative',
	},
}));

function SimpleContainer({
	authState,
	setAuthAlert,
	fetchProfile,
	userState,
	...rest
}) {
	const classes = useStyles();
	const history = useHistory();
	const { username } = useParams();
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (!authState.loading && !authState.details.username) {
			setAuthAlert({
				type: 'error',
				message: 'Please add a username to view you Profile',
			});
			history.push('/accounts/settings');
		} else if (
			!authState.loading &&
			authState.details &&
			username === authState.details.username
		) {
			setUser(authState.details);
		} else if (
			!authState.loading &&
			authState.details.username &&
			!userState.currentUser &&
			username !== authState.details.username
		) {
			fetchProfile(username);
		} else if (
			!authState.loading &&
			authState.details.username &&
			userState.currentUser &&
			username !== userState.username
		) {
			fetchProfile(username);
		} else if (userState.currentUser && userState.currentUser !== 'not-found') {
			setUser(userState.currentUser);
		}
		// eslint-disable-next-line
	}, [authState.details, userState.currentUser, username]);
	return (
		<React.Fragment>
			<CssBaseline />
			<Container className={classes.container} maxWidth='lg'>
				<div className={classes.root}>
					{userState.loading ? (
						<CircularProgress
							style={{ height: '60px', width: '60px' }}
							className={classes.loaderStyle}
						/>
					) : userState.currentUser === 'not-found' &&
					  username !== authState.details.username ? (
						<NotFound />
					) : (
						<Grid container spacing={3}>
							<Grid item xs={4}>
								<CssBaseline />
								<Container className={classes.dpContainer} maxWidth='sm'>
									<img
										className={classes.dpStyle}
										src={user && user.photoURL}
										alt=''
									/>
								</Container>
							</Grid>
							<Grid item xs={8}>
								<Box>
									<div className={classes.headDiv}>
										<Typography
											className={classes.username}
											variant='h5'
											gutterBottom>
											{user && user.username}
										</Typography>
										{authState.details &&
										authState.details.username &&
										authState.details.username === username ? (
											<>
												<Button
													onClick={() => {
														history.push('/accounts/settings');
													}}
													style={{
														margin: '0 10px 0 1.2rem ',
														fontSize: '0.75rem',
													}}
													variant='outlined'
													color='primary'>
													Edit Profile
												</Button>
												<IconButton color='inherit'>
													<SettingsEthernetIcon />
												</IconButton>{' '}
											</>
										) : (
											<Button
												style={{
													margin: '0 10px 0 1.2rem ',
													fontSize: '0.75rem',
												}}
												variant='outlined'
												color='secondary'>
												Follow
											</Button>
										)}
									</div>
								</Box>
								<Box style={{ padding: '10px 0' }}>
									<div className={classes.headDiv}>
										<Typography
											className={classes.stats}
											variant='h6'
											gutterBottom>
											0 posts
										</Typography>
										<Typography
											className={classes.stats}
											style={{ margin: '0 2rem' }}
											variant='h6'
											gutterBottom>
											0 followers
										</Typography>
										<Typography
											className={classes.stats}
											variant='h6'
											gutterBottom>
											0 following
										</Typography>
									</div>
								</Box>
								<Box>
									<Typography
										className={classes.name}
										variant='h6'
										gutterBottom>
										{user && user.displayName}
									</Typography>
									<Typography
										style={{ fontSize: '0.9rem', marginBottom: '10px' }}
										variant='body1'
										gutterBottom>
										{user && user.bio}
									</Typography>
									{user && user.website ? (
										<Typography
											className={classes.name}
											variant='h6'
											gutterBottom>
											<a
												className={classes.urlStyle}
												href={user && user.website}
												rel='noopener noreferrer'
												target='_blank'>
												<LinkSharpIcon style={{ marginRight: '10px' }} />{' '}
												{user && user.website}
											</a>
										</Typography>
									) : null}
								</Box>
							</Grid>
						</Grid>
					)}
				</div>
			</Container>
			<ProfileGallery />
		</React.Fragment>
	);
}

const mapStateToProps = state => ({
	authState: state.AUTHS,
	userState: state.USERS,
});

export default connect(mapStateToProps, { setAuthAlert, fetchProfile })(
	SimpleContainer
);
