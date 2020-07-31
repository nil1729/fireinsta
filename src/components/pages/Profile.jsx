import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import LinkSharpIcon from '@material-ui/icons/LinkSharp';
import { setAuthAlert } from '../../redux/actions/auths';

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
		fontSize: 'large',
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
		height: '11rem',
		marginTop: '2rem',
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
	},
}));

function SimpleContainer({ authState, setAuthAlert }) {
	const classes = useStyles();
	const history = useHistory();
	useEffect(() => {
		if (!authState.loading && !authState.details.username) {
			setAuthAlert({
				type: 'error',
				message: 'Please add a username to view you Profile',
			});
			history.push('/settings');
		}
		// eslint-disable-next-line
	}, [authState.details]);
	return (
		<React.Fragment>
			<CssBaseline />
			<Container className={classes.container} maxWidth='lg'>
				<div className={classes.root}>
					<Grid container spacing={3}>
						<Grid item xs={4}>
							<CssBaseline />
							<Container className={classes.dpContainer} maxWidth='sm'>
								<img
									className={classes.dpStyle}
									src={authState.user && authState.user.photoURL}
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
										{authState.details && authState.details.username}
									</Typography>
									<Button
										onClick={() => {
											history.push('/settings');
										}}
										style={{ margin: '0 10px 0 1.2rem ', fontSize: '0.75rem' }}
										variant='outlined'
										color='primary'>
										Edit Profile
									</Button>
									<IconButton color='inherit'>
										<AccessibilityNewIcon />
									</IconButton>
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
								<Typography className={classes.name} variant='h6' gutterBottom>
									{authState.details && authState.details.displayName}
								</Typography>
								<Typography
									style={{ fontSize: '0.9rem', marginBottom: '10px' }}
									variant='body1'
									gutterBottom>
									{authState.details && authState.details.bio}
								</Typography>
								{authState.details && authState.details.website ? (
									<Typography
										className={classes.name}
										variant='h6'
										gutterBottom>
										<a
											className={classes.urlStyle}
											href={authState.details && authState.details.website}
											rel='noopener noreferrer'
											target='_blank'>
											<LinkSharpIcon style={{ marginRight: '10px' }} />{' '}
											{authState.details && authState.details.website}
										</a>
									</Typography>
								) : null}
							</Box>
						</Grid>
					</Grid>
				</div>
			</Container>
		</React.Fragment>
	);
}

const mapStateToProps = state => ({
	authState: state.AUTHS,
});

export default connect(mapStateToProps, { setAuthAlert })(SimpleContainer);
