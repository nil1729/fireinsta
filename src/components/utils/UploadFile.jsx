import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import TextField from '@material-ui/core/TextField';
import './UploadCSS.css';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';

import { connect } from 'react-redux';
import { setAuthAlert } from '../../redux/actions/auths';
import { uploadImageToStorage } from '../../redux/actions/files';

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
	boxStyle: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	dialogTitle: {
		fontSize: '1.5rem',
		fontWeight: '100',
		textAlign: 'center',
		padding: '10px 24px 5px',
	},
	btnContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	wrapper: {
		margin: theme.spacing(1),
		position: 'relative',
	},
	buttonSuccess: {
		backgroundColor: green[500],
		'&:hover': {
			backgroundColor: green[700],
			color: '#ffffff',
			borderColor: '#ffffff',
		},
		color: '#ffffff',
		borderColor: '#ffffff',
	},
	fabProgress: {
		color: green[500],
		position: 'absolute',
		top: -6,
		left: -6,
		zIndex: 1,
	},
	buttonProgress: {
		color: green[500],
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
	uploadBtnStyle: {
		textTransform: 'capitalize',
		fontWeight: '100',
		letterSpacing: '1px',
		fontSize: '0.99rem',
	},
}));
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='down' ref={ref} {...props} />;
});
function IconLabelButtons({ setAuthAlert, fileState, uploadImageToStorage }) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState('Choose a File');
	const [postTitle, setPostTitle] = useState('');
	const [loading, setLoading] = React.useState(fileState.fileUploading);
	const [success, setSuccess] = React.useState(false);
	const [uploadStatus, setUploadStatus] = useState('Upload Image');
	useEffect(() => {
		setLoading(fileState.fileUploading);
		if (fileState.status) {
			setLoading(false);
			setUploadStatus('Image Uploaded');
			setSuccess(true);
		}
		// eslint-disable-next-line
	}, [fileState]);
	const handleFile = e => {
		e.persist();
		const fileType = new RegExp('image/');
		if (!fileType.test(e.target.files[0].type)) {
			return setAuthAlert({
				type: 'error',
				message: 'Please select a Image file',
			});
		}
		setFile(e.target.files[0]);
		setFileName(e.target.files[0].name);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setFile(null);
		setFileName('Choose a File');
		setPostTitle('');
		setLoading(fileState.fileUploading);
		setSuccess(false);
		setUploadStatus('Upload Image');
	};

	const buttonClassname = clsx({
		[classes.buttonSuccess]: success,
	});

	const handleSubmitButtonClick = async () => {
		if (!file) {
			return setAuthAlert({
				type: 'warning',
				message: 'Please Select a File to Upload',
			});
		}
		if (!postTitle) {
			return setAuthAlert({
				type: 'warning',
				message: 'Please write Something about the Post',
			});
		}
		await uploadImageToStorage({ file, postTitle });
		setFile(null);
		setFileName('Choose a File');
		setPostTitle('');
	};
	return (
		<>
			<div className={classes.boxStyle}>
				<Button
					onClick={handleClickOpen}
					variant='outlined'
					color='primary'
					className={classes.button}>
					Upload Photo
				</Button>
				<IconButton
					onClick={handleClickOpen}
					color='primary'
					aria-label='upload picture'
					component='span'>
					<AddAPhotoOutlinedIcon />
				</IconButton>
			</div>
			<Dialog
				fullWidth={true}
				maxWidth='sm'
				disableBackdropClick={loading}
				disableEscapeKeyDown={loading}
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle
					disableTypography
					className={classes.dialogTitle}
					id='alert-dialog-slide-title'>
					Upload a Image
				</DialogTitle>
				<DialogContent style={{ overflowY: 'visible' }}>
					<form>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Paper className={classes.paper}>
									<div className='box'>
										<input
											required
											onChange={handleFile}
											type='file'
											name='file-5[]'
											id='file-5'
											className='inputfile inputfile-4'
										/>
										<label htmlFor='file-5'>
											<figure>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='20'
													height='17'
													viewBox='0 0 20 17'>
													<path d='M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z' />
												</svg>
											</figure>{' '}
											<span style={{ fontWeight: '100', letterSpacing: '1px' }}>
												{' '}
												{fileName}{' '}
											</span>
										</label>
									</div>
								</Paper>
							</Grid>
							<Grid item xs={12}>
								<Paper className={classes.paper}>
									<TextField
										required
										id='standard-textarea'
										label='Post Title'
										placeholder='Write Something about this Post'
										onChange={e => {
											setPostTitle(e.target.value);
										}}
										name='post'
										value={postTitle}
										multiline
										fullWidth
										variant='outlined'
										rowsMax={4}
									/>
								</Paper>
							</Grid>
							<div className={classes.btnContainer}>
								<div className={classes.wrapper}>
									<Fab
										style={{
											height: '60px',
											width: '60px',
											pointerEvents: 'none',
											userSelect: 'none',
										}}
										aria-label='upload'
										color='primary'
										className={buttonClassname}>
										{success ? (
											<CheckIcon fontSize='large' />
										) : (
											<CloudUploadOutlinedIcon fontSize='large' />
										)}
									</Fab>
									{loading && (
										<CircularProgress
											size={68}
											className={classes.fabProgress}
										/>
									)}
								</div>
								<div className={classes.wrapper}>
									<Button
										style={{
											textTransform: 'capitalize',
											fontWeight: '100',
											letterSpacing: '1px',
											fontSize: '0.99rem',
										}}
										variant='outlined'
										color='primary'
										className={buttonClassname}
										disabled={uploadStatus === 'Upload Image' ? false : true}
										onClick={handleSubmitButtonClick}>
										{uploadStatus}
									</Button>
									{loading && (
										<CircularProgress
											size={24}
											className={classes.buttonProgress}
										/>
									)}
								</div>
							</div>
						</Grid>
					</form>
				</DialogContent>
				<Divider style={{ margin: '1rem' }} />
				<DialogActions style={{ padding: '0px 24px 10px' }}>
					<Button
						disabled={loading}
						onClick={handleClose}
						variant='outlined'
						color='secondary'>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

const mapStateToProps = state => ({
	fileState: state.AUTHS.fileState,
});

export default connect(mapStateToProps, { uploadImageToStorage, setAuthAlert })(
	IconLabelButtons
);
