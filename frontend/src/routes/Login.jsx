import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase, { provider } from '../firebase/firebaseApp';
import { connect } from 'react-redux';
import { setAuthAlert, clearAuthAlerts } from '../redux/actions/auths';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link
				color='inherit'
				target='_blank'
				href='https://github.com/nil1729/instagram-clone'>
				Nilanjan Deb
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	title: {
		fontSize: '60px',
		letterSpacing: '1px',
		marginBottom: '1rem',
		fontFamily: `'Dancing Script', cursive`,
		color: 'brown',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(0),
	},
	submit: {
		margin: theme.spacing(1, 0, 1),
		letterSpacing: '1.5px',
		fontWeight: '100',
	},
	divide: {
		margin: '10px',
		fontSize: '1.3rem',
		fontWeight: '700',
	},
	gbtn: {
		marginTop: '0',
		backgroundColor: 'rgb(66, 133, 244)',
	},
	label: {
		padding: '5px 0',
		textTransform: 'capitalize',
		fontSize: '1.3em',
		letterSpacing: '1.5px',
		fontWeight: '100',
	},
	root: {
		overflow: 'visible',
	},
}));

const SignIn = ({
	authState: { isAuthenticated, details },
	setAuthAlert,
	clearAuthAlerts,
}) => {
	const classes = useStyles();
	const history = useHistory();
	const [mode, setMode] = useState('register');
	const [userInput, setUserInput] = useState({
		email: '',
		password: '',
	});
	useEffect(() => {
		if (isAuthenticated) {
			if (!details || !details.username) {
				setAuthAlert({
					type: 'info',
					message: `You are now Signed in. Please add a Username to Proceed`,
				});
				history.push('/accounts/settings');
			} else {
				setAuthAlert({
					type: 'success',
					message: `You are now Signed in`,
				});
				history.push('/');
			}
		}
		// eslint-disable-next-line
	}, [isAuthenticated]);
	const changeMode = e => {
		e.preventDefault();
		setMode(mode === 'login' ? 'register' : 'login');
	};
	const handleClick = async () => {
		try {
			await firebase.auth().signInWithPopup(provider);
		} catch (e) {
			console.log(e);
		}
	};
	const onChange = e => {
		setUserInput({
			...userInput,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = async e => {
		e.preventDefault();
		const { email, password } = userInput;
		try {
			const domain = email.split('@')[1];
			if (domain === 'gmail.com') {
				return setAuthAlert({
					type: 'info',
					message: `Please use Google Sign in`,
				});
			}
			return setAuthAlert({
				type: 'warning',
				message: `Sorry! We are working on Custom Email Authentication. Please use Google Sign in.`,
			});
			// if (mode === 'login') {
			// 	await firebase.auth().signInWithEmailAndPassword(email, password);
			// } else {
			// 	await firebase.auth().createUserWithEmailAndPassword(email, password);
			// }
			// setAuthAlert({
			// 	type: 'success',
			// 	message: `You are now Signed in`,
			// });
		} catch (e) {
			setAuthAlert({
				type: 'error',
				message: e.message,
			});
		}
	};
	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Typography className={classes.title} component='h1' variant='h5'>
					Fireinsta
				</Typography>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					{mode === 'login' ? 'Sign in' : 'Sign up'}
				</Typography>
				<form onSubmit={handleSubmit} className={classes.form} noValidate>
					<TextField
						onChange={onChange}
						value={userInput.email}
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						autoComplete='email'
						name='email'
						autoFocus
					/>
					<TextField
						onChange={onChange}
						value={userInput.password}
						name='password'
						variant='outlined'
						margin='normal'
						required
						fullWidth
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
					/>
					<FormControlLabel
						control={<Checkbox value='remember' color='primary' />}
						label='Remember me'
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						{mode === 'login' ? 'Sign In' : 'Sign Up'}
					</Button>
					<Grid container>
						<Grid item xs>
							{mode === 'login' ? (
								<Link href='#' variant='body2'>
									Forgot password?
								</Link>
							) : null}
						</Grid>
						<Grid item>
							<Link onClick={changeMode} href='#' variant='body2'>
								{mode === 'login'
									? `Don't have an account? Sign Up`
									: `Already have an account? Sign in`}
							</Link>
						</Grid>
					</Grid>
				</form>
				<Typography className={classes.divide} component='h2'>
					OR
				</Typography>
				<Button
					onClick={handleClick}
					type='button'
					variant='contained'
					color='primary'
					className={classes.gbtn}>
					<span className={classes.label}>
						<Icon
							className={`${classes.root} fab fa-google`}
							style={{ marginRight: '10px' }}
						/>
						Sign in With Google{' '}
					</span>
				</Button>
			</div>
			<Box mt={3}>
				<Copyright />
			</Box>
		</Container>
	);
};

const mapStateToProps = state => ({
	authState: state.AUTHS,
});
export default connect(mapStateToProps, { setAuthAlert, clearAuthAlerts })(
	SignIn
);
