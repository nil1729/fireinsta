import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

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
}));

function CenteredTabs({ authState, userState }) {
	const classes = useStyles();
	const history = useHistory();
	const { username } = useParams();
	const [value, setValue] = useState(0);
	const [posts, setPosts] = useState([]);
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
			}
		} else if (userState.currentUser && userState.currentUser !== 'not-found') {
			if (userState.currentUser.posts) {
				setPosts(userState.currentUser.posts);
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
					{posts.map(post => (
						<GridListTile cols={posts.length == 1 ? 2 : 1} key={post.id}>
							<img
								style={{ height: '100%', width: '100%' }}
								src={post.downloadURL}
								alt={username}
							/>
						</GridListTile>
					))}
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
								<Tab label='Posts' icon={<AppsIcon />} />
								<Tab label='Stars' icon={<FavoriteIcon />} />
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
