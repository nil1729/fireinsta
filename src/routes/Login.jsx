import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase, { provider } from '../firebase/firebaseApp';
import { connect } from 'react-redux';
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
			<Link color='inherit' target='_blank' href='https://github.com/nil1729'>
				Nilanjan Deb
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		letterSpacing: '1.5px',
		fontWeight: '100',
	},
	divide: {
		marginTop: '1.5rem',
		fontSize: '1.3rem',
		fontWeight: '700',
	},
	gbtn: {
		marginTop: '1rem',
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

const SignIn = ({ authState: { isAuthenticated } }) => {
	const classes = useStyles();
	const history = useHistory();
	const [mode, setMode] = useState('register');
	const [userInput, setUserInput] = useState({
		email: '',
		password: '',
	});
	useEffect(() => {
		if (isAuthenticated) {
			history.push('/');
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
			if (mode === 'login') {
				await firebase.auth().signInWithEmailAndPassword(email, password);
			} else {
				await firebase.auth().createUserWithEmailAndPassword(email, password);
			}
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
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
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
};

const mapStateToProps = state => ({
	authState: state.AUTHS,
});
export default connect(mapStateToProps)(SignIn);
