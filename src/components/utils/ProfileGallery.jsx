import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import AppsIcon from '@material-ui/icons/Apps';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: '#FAFAFA',
	},
	container: {
		margin: '2rem 0 0 0',
		'@media only screen and (min-width: 1024px)': {
			padding: '0 8rem',
		},
	},
	imgRoot: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		marginTop: '10px',
		backgroundColor: theme.palette.background.paper,
	},
	gridList: {
		width: 'auto',
		padding: '2rem',
	},
	icon: {
		color: 'rgba(255, 255, 255, 0.54)',
	},
	coverStyle: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transition: 'ease-in 0.2s',
		transform: 'translate(-50%, -50%)',
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
		textAlign: 'center',
		color: 'white',
		backgroundColor: '#18161649',
		height: '100%',
		width: '100%',
		opacity: '0',
		'&:hover': {
			opacity: '1',
		},
	},
}));

function CenteredTabs({ authState, userState }) {
	const classes = useStyles();
	const history = useHistory();
	const { username } = useParams();
	const [value, setValue] = useState(0);
	const [posts, setPosts] = useState([]);
	const [likedPosts, setLikedPosts] = useState([]);
	const [tab, setTab] = useState('posts');
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	useEffect(() => {
		if (
			!authState.loading &&
			authState.details &&
			username === authState.details.username
		) {
			if (authState.details.posts) {
				setPosts(authState.details.posts);
				setLikedPosts(
					authState.details.posts.filter(post => post.likes.length > 0)
				);
			}
		} else if (userState.currentUser && userState.currentUser !== 'not-found') {
			if (userState.currentUser.posts) {
				setPosts(userState.currentUser.posts);
				setLikedPosts(
					userState.currentUser.posts.filter(post => post.likes.length > 0)
				);
			}
		}
		// eslint-disable-next-line
	}, [authState.details, userState.currentUser, username]);
	function TitlebarGridList() {
		return (
			<div className={classes.imgRoot}>
				<GridList
					spacing={10}
					cellHeight={250}
					className={classes.gridList}
					cols={3}>
					{posts.length === 0 ? (
						<Typography
							style={{ color: 'darkgrey', display: 'contents' }}
							variant='body1'
							gutterBottom>
							No Posts to show
						</Typography>
					) : tab === 'posts' ? (
						posts.map(post => (
							<GridListTile cols={posts.length === 1 ? 3 : 1} key={post.id}>
								<img
									style={{ height: '100%', width: '100%' }}
									src={post.downloadURL}
									alt={username}
								/>
							</GridListTile>
						))
					) : likedPosts.length === 0 ? (
						<Typography
							style={{ color: 'darkgrey', display: 'contents' }}
							variant='body1'
							gutterBottom>
							{username === authState.details.username
								? `You Don't have any Liked Posts yet`
								: `User has no Liked Posts yet`}
						</Typography>
					) : (
						likedPosts.map(post => (
							<GridListTile
								cols={likedPosts.length === 1 ? 3 : 1}
								key={post.id}>
								<img
									style={{ height: '100%', width: '100%' }}
									src={post.downloadURL}
									alt={username}
								/>
								<Box className={classes.coverStyle}>
									<FavoriteIcon fontSize='large' />
									<Typography
										style={{ margin: '0 10px', fontWeight: '500' }}
										variant='h5'>
										{post.likes.length}
									</Typography>
								</Box>
							</GridListTile>
						))
					)}
				</GridList>
			</div>
		);
	}
	return (
		<>
			<CssBaseline />
			<Container className={classes.container} maxWidth='lg'>
				<Divider />
				{userState.loading ? (
					<LinearProgress style={{ marginTop: '3rem' }} color='secondary' />
				) : userState.currentUser === 'not-found' &&
				  username !== authState.details.username ? null : (
					<>
						<Paper className={classes.root}>
							<Tabs
								value={value}
								onChange={handleChange}
								indicatorColor='secondary'
								textColor='secondary'
								centered>
								<Tab
									onClick={() => {
										setTab('posts');
									}}
									label='Posts'
									icon={<AppsIcon />}
								/>
								<Tab
									onClick={() => {
										setTab('starts');
									}}
									label='Stars'
									icon={<FavoriteIcon />}
								/>
							</Tabs>
						</Paper>
						<TitlebarGridList />
					</>
				)}
			</Container>
		</>
	);
}

const mapStateToProps = state => ({
	authState: state.AUTHS,
	userState: state.USERS,
});

export default connect(mapStateToProps)(CenteredTabs);
