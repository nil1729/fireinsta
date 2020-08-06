import React from 'react';
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
}));

function RecipeReviewCard({ homePostsLoading, homePosts, authdetail }) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	function PostCard({ post }) {
		return (
			<Card className={classes.root}>
				<CardHeader
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
					title={post.author.displayName}
					subheader={moment(new Date(post.createdAt._seconds * 1000)).format(
						'MMMM Do YYYY'
					)}
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
					{authdetail && post.author.username !== authdetail.username ? (
						<IconButton aria-label='add to favorites'>
							<FavoriteIcon />
						</IconButton>
					) : null}

					<IconButton aria-label='share'>
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
	authdetail: state.AUTHS.details,
});

export default connect(mapStateToProps)(RecipeReviewCard);
