import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { setAuthAlert, sendUpdateReq } from '../../redux/actions/auths';
import validator from 'validator';

const useStyles = makeStyles(theme => ({
	cmdText: {
		fontWeight: '100',
		letterSpacing: '1px',
		marginLeft: '8px',
	},
	btnStyle: {
		margin: '1rem 0 0 8px',
		fontWeight: '100',
		letterSpacing: '1px',
		textTransform: 'capitalize',
		fontSize: '1.1rem',
	},
}));

const EditProfile = ({ authState, setAuthAlert, sendUpdateReq }) => {
	const classes = useStyles();
	const [userInput, setUserInput] = useState({
		email: '',
		phone: '',
		website: '',
		bio: '',
		username: '',
		name: '',
	});
	const [initialState, setInitialState] = useState({});
	const [submitted, setSubmitted] = useState(false);
	useEffect(() => {
		if (authState.user) {
			setUserInput({
				email: authState.details.email
					? authState.details.email
					: authState.user.email,
				name: authState.details.displayName
					? authState.details.displayName
					: authState.user.displayName,
				phone: authState.details.phoneNumber
					? authState.details.phoneNumber
					: '',
				website: authState.details.website ? authState.details.website : '',
				bio: authState.details.bio ? authState.details.bio : '',
				username: authState.details.username ? authState.details.username : '',
			});
			setInitialState({
				email: authState.details.email ? authState.details.email : '',
				name: authState.details.displayName
					? authState.details.displayName
					: '',
				phone: authState.details.phoneNumber
					? authState.details.phoneNumber
					: '',
				website: authState.details.website ? authState.details.website : '',
				bio: authState.details.bio ? authState.details.bio : '',
				username: authState.details.username ? authState.details.username : '',
			});
		}
		// eslint-disable-next-line
	}, [authState]);

	const validateData = () => {
		const phoneRes = validator.isMobilePhone(userInput.phone, 'en-IN');

		const urlRes =
			userInput.website === ''
				? true
				: validator.isURL(userInput.website, {
						require_protocol: true,
						protocols: ['http', 'https'],
				  });
		const usernameRes = validator.matches(
			userInput.username,
			/^[A-Za-z0-9_]*$/
		);
		if (!phoneRes) {
			setAuthAlert({
				type: 'error',
				message: 'Please enter a valid phone number',
			});
		} else if (!urlRes) {
			setAuthAlert({
				type: 'error',
				message: 'Please enter a valid Website URL eg: https://example.com',
			});
		} else if (!usernameRes) {
			setAuthAlert({
				type: 'info',
				message:
					'Please enter a Username which only Contains alphanumeric charecters and underscores only',
			});
		} else {
			return true;
		}
	};
	const validateInitial = () => {
		let keysLen = Object.keys(initialState).length;
		Object.keys(initialState).forEach(key => {
			if (initialState[key] === userInput[key]) {
				keysLen--;
			}
		});
		if (keysLen > 0) {
			return true;
		}
		setAuthAlert({
			type: 'info',
			message: 'Please change Some Information to update your Profile',
		});
	};
	const handleSubmit = async e => {
		e.preventDefault();
		if (!validateInitial()) {
			return;
		}
		setSubmitted(true);
		if (!validateData()) {
			setSubmitted(false);
			return;
		}
		const data = {
			displayName: userInput.name,
			phoneNumber: userInput.phone,
			website: userInput.website,
			bio: userInput.bio,
			username: userInput.username,
			email: userInput.email,
		};
		setUserInput({
			email: '',
			phone: '',
			website: '',
			bio: '',
			username: '',
			name: '',
		});
		await sendUpdateReq({
			...data,
		});
		setSubmitted(false);
	};
	const onChange = e => {
		setUserInput({
			...userInput,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<TextField
					label='Name'
					style={{ margin: 8 }}
					placeholder='Your Name'
					helperText='You can only change your name twice within 14 days.'
					fullWidth
					margin='normal'
					onChange={onChange}
					name='name'
					value={userInput.name}
					InputLabelProps={{
						shrink: true,
					}}
					type='text'
					variant='outlined'
				/>
				<TextField
					required
					label='Username'
					helperText='Username contains alphanumeric charecters and underscores only'
					onChange={onChange}
					name='username'
					value={userInput.username}
					style={{ margin: 8 }}
					placeholder='Username'
					fullWidth
					margin='normal'
					InputLabelProps={{
						shrink: true,
					}}
					variant='outlined'
				/>
				<TextField
					label='Website'
					style={{ margin: 8 }}
					placeholder='Website URL'
					onChange={onChange}
					name='website'
					value={userInput.website}
					fullWidth
					margin='normal'
					InputLabelProps={{
						shrink: true,
					}}
					variant='outlined'
				/>
				<TextField
					id='outlined-textarea'
					label='Bio'
					placeholder='Write Something about yourself'
					onChange={onChange}
					name='bio'
					value={userInput.bio}
					multiline
					fullWidth
					style={{ margin: 8 }}
					variant='outlined'
				/>
				<Divider style={{ margin: '8px 0 8px 8px' }} />
				<Typography className={classes.cmdText} variant='h6' gutterBottom>
					Personal Information
				</Typography>
				<TextField
					disabled
					label='Email Address'
					style={{ margin: 8 }}
					placeholder='Email Address'
					fullWidth
					margin='normal'
					InputLabelProps={{
						shrink: true,
					}}
					onChange={onChange}
					name='email'
					value={userInput.email}
					variant='outlined'
				/>
				<TextField
					label='Phone Number'
					style={{ margin: 8 }}
					placeholder='Phone Number'
					fullWidth
					margin='normal'
					InputLabelProps={{
						shrink: true,
					}}
					onChange={onChange}
					name='phone'
					value={userInput.phone}
					variant='outlined'
				/>
				<Button
					type='submit'
					className={classes.btnStyle}
					variant='outlined'
					color='secondary'
					startIcon={<SaveIcon />}>
					{submitted ? 'Loading ...' : 'Save'}
				</Button>
			</form>
		</>
	);
};

const mapStateToProps = state => ({
	authState: state.AUTHS,
});

export default connect(mapStateToProps, { setAuthAlert, sendUpdateReq })(
	EditProfile
);
