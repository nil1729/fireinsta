import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';
import { addComment } from '../../../redux/actions/users';
import { setAuthAlert } from '../../../redux/actions/auths';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	imgPaper: {
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	commentPaper: {
		padding: '5px',
		backgroundColor: 'rgba(240, 230, 140, 0.3)',
	},
	commentListItem: {
		padding: '10px 5px 10px 10px',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	commentPaperBox: {
		padding: '10px',
		minHeight: '20rem',
		maxHeight: '21rem',
		overflowY: 'scroll',
		backgroundColor: 'rgba(240, 248, 255, 0.7)',
		marginBottom: '1rem',
	},
	button: {
		fontSize: '1rem',
		fontWeight: '100',
		letterSpacing: '0.5px',
		textTransform: 'capitalize',
	},
	formBox: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '0 5px',
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function CommentDialog({
	homePosts,
	clearComment,
	addComment,
	authDetail,
	setAuthAlert,
	...rest
}) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [buttonText, setButtonText] = useState('Send');
	const [text, setText] = useState('');
	const [post, setPost] = useState(null);
	useEffect(() => {
		if (rest.post) {
			const currentPost = homePosts.find(post => post.id === rest.post.id);
			setPost(currentPost);
			setOpen(true);
		}
		// eslint-diasable-next-line
	}, [rest.post, homePosts]);

	const handleComment = async () => {
		if (text.trim().length === 0) {
			return setAuthAlert({
				type: 'warning',
				message: 'Please Enter some Text to post a Comment',
			});
		}
		setText('');
		setButtonText('Loading');
		const { displayName, username, photoURL } = authDetail;
		await addComment({
			id: post.id,
			text,
			author: {
				displayName,
				username,
				photoURL,
			},
		});
		setButtonText('Send');
	};
	const handleClose = () => {
		setOpen(false);
		clearComment();
	};

	function CommentList({ comment, index }) {
		return (
			<Paper
				style={{ margin: `${index === 0 ? '0 0 10px 0' : '10px 0'}` }}
				className={classes.commentListItem}>
				<Avatar src={comment.author.photoURL} alt={comment.author.username} />
				<Box style={{ marginLeft: '10px' }}>
					<Typography variant='subtitle2' color='textSecondary'>
						{comment.author.username}
					</Typography>
					<Typography variant='body2'>{comment.text}</Typography>
				</Box>
			</Paper>
		);
	}

	return (
		<div>
			<Dialog
				fullWidth
				maxWidth='md'
				open={open}
				disableBackdropClick={false}
				disableEscapeKeyDown={true}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle id='alert-dialog-slide-title'>
					Comment on {post && post.author.displayName}'s Post
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={5}>
							<Paper className={classes.imgPaper}>
								<img
									style={{ height: '100%', width: '100%' }}
									src={post && post.downloadURL}
									alt={post && post.postContent}
								/>
							</Paper>
						</Grid>
						<Grid item xs={7}>
							<Paper className={classes.commentPaperBox}>
								<Box>
									{post && post.comments.length === 0 ? (
										<Typography
											style={{ textAlign: 'center', fontWeight: '100' }}
											variant='h5'
											gutterBottom>
											No comments found for this Post
										</Typography>
									) : (
										post &&
										post.comments.map((c, i) => (
											<CommentList key={c.id} index={i} comment={c} />
										))
									)}
								</Box>
							</Paper>
							<Paper className={classes.commentPaper}>
								<Box className={classes.formBox}>
									<TextField
										label='Comment'
										style={{ margin: 8 }}
										placeholder='Write Comment here ...'
										fullWidth
										multiline
										margin='normal'
										value={text}
										onChange={e => {
											setText(e.target.value);
										}}
									/>
									<Button
										onClick={handleComment}
										variant='outlined'
										color='primary'
										className={classes.button}
										endIcon={<Icon>send</Icon>}>
										{buttonText}
									</Button>
								</Box>
							</Paper>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

const mapStateToProps = state => ({
	authDetail: state.AUTHS.details,
	homePosts: state.USERS.homePosts,
});

export default connect(mapStateToProps, { addComment, setAuthAlert })(
	CommentDialog
);
