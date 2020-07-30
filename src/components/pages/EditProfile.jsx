import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

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

const EditProfile = ({ authState }) => {
	const classes = useStyles();
	const [userInput, setUserInput] = useState({
		email: '',
		phone: '',
		website: '',
		bio: '',
		username: '',
		name: '',
	});

	useEffect(() => {
		if (authState.user) {
			setUserInput({
				...userInput,
				email: authState.user.email,
				name: authState.user.displayName,
			});
		}
	}, [authState]);

	return (
		<>
			<form>
				<TextField
					id='outlined-full-width'
					label='Name'
					style={{ margin: 8 }}
					placeholder='Your Name'
					helperText='You can only change your name twice within 14 days.'
					fullWidth
					margin='normal'
					value={userInput.name}
					InputLabelProps={{
						shrink: true,
					}}
					variant='outlined'
				/>
				<TextField
					required
					id='outlined-full-width'
					label='Username'
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
					id='outlined-full-width'
					label='Website'
					style={{ margin: 8 }}
					placeholder='Website URL'
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
					id='outlined-full-width'
					label='Email Address'
					style={{ margin: 8 }}
					placeholder='Email Address'
					fullWidth
					margin='normal'
					InputLabelProps={{
						shrink: true,
					}}
					value={userInput.email}
					variant='outlined'
				/>
				<TextField
					id='outlined-full-width'
					label='Phone Number'
					style={{ margin: 8 }}
					placeholder='Phone Number'
					fullWidth
					margin='normal'
					InputLabelProps={{
						shrink: true,
					}}
					variant='outlined'
				/>
				<Button
					type='submit'
					className={classes.btnStyle}
					variant='outlined'
					color='secondary'
					startIcon={<SaveIcon />}>
					Save
				</Button>
			</form>
		</>
	);
};

const mapStateToProps = state => ({
	authState: state.AUTHS,
});

export default connect(mapStateToProps)(EditProfile);
