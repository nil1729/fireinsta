import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import moment from 'moment';
import { likePost } from '../../../redux/actions/users';
import cryptoJS from 'crypto-js';

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 'none',
		backgroundColor: 'cornsilk',
		marginBottom: '2rem',
	},
	media: {
		height: 0,
		margin: '0 1rem',
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
	loaderStyle: {
		width: '50px',
		height: '50px',
	},
	postAuthor: {
		textAlign: 'left',
		fontSize: '1rem',
		letterSpacing: '0.5px',
		fontWeight: '500',
		cursor: 'pointer',
		'& a': {
			textDecoration: 'none',
			color: 'inherit',
		},
	},
}));

function RecipeReviewCard({
	homePostsLoading,
	homePosts,
	authState,
	likePost,
}) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const [authID, setAuthID] = useState('');

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	useEffect(() => {
		if (authState.user) {
			var bytes = cryptoJS.AES.decrypt(authState.user.authID, 'Nilanjan Deb');
			var decryptedData = JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
			setAuthID(decryptedData);
		}
	}, [authState.user]);
	function linkToUser(username) {
		return <Link to={`/${username}`}>{username}</Link>;
	}
	function PostCard({ post }) {
		return (
			<Card className={classes.root}>
				<CardHeader
					classes={{ title: classes.postAuthor }}
					avatar={
						<Avatar
							aria-label='user-dp'
							src={post.author.photoURL}
							alt={post.author.displayName}
							className={classes.avatar}
						/>
					}
					action={
						<IconButton aria-label='settings'>
							<MoreVertIcon />
						</IconButton>
					}
					title={linkToUser(post.author.username)}
				/>
				<Divider style={{ margin: '0 5px 10px' }} />
				<CardMedia
					className={classes.media}
					image={post.downloadURL}
					title={post.postContent}
				/>
				<CardContent>
					<Typography variant='body2' color='textSecondary' component='p'>
						This impressive paella is a perfect party dish and a fun meal to
						cook together with your guests. Add 1 cup of frozen peas along with
						the mussels, if you like.
					</Typography>
				</CardContent>
				<Divider style={{ margin: '0 5px' }} />
				<CardActions disableSpacing>
					{authState.details &&
					post.author.username !== authState.details.username ? (
						<IconButton
							color={
								authID && post.likes.includes(authID) ? 'secondary' : 'inherit'
							}
							onClick={() => {
								likePost({ id: post.id, likes: post.likes });
							}}
							aria-label='add to favorites'>
							<FavoriteIcon />
						</IconButton>
					) : null}

					<IconButton color='primary' aria-label='share'>
						<ShareIcon />
					</IconButton>
					{/* <IconButton
						className={clsx(classes.expand, {
							[classes.expandOpen]: expanded,
						})}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label='show more'>
						<ExpandMoreIcon />
					</IconButton> */}
				</CardActions>
				<Collapse in={expanded} timeout='auto' unmountOnExit>
					<CardContent>
						<></>
					</CardContent>
				</Collapse>
			</Card>
		);
	}
	return (
		<>
			{homePostsLoading ? (
				<Box style={{ textAlign: 'center' }}>
					<CircularProgress color='secondary' className={classes.loaderStyle} />
				</Box>
			) : (
				<Box>
					{homePosts &&
						homePosts.map(post => <PostCard key={post.id} post={post} />)}
				</Box>
			)}
		</>
	);
}

const mapStateToProps = state => ({
	homePostsLoading: state.USERS.homePostsLoading,
	homePosts: state.USERS.homePosts,
	authState: state.AUTHS,
});

export default connect(mapStateToProps, { likePost })(RecipeReviewCard);
