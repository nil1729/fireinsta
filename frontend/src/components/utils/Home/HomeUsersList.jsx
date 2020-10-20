import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Link as RouterLink } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		maxWidth: 752,
	},
	demo: {
		backgroundColor: theme.palette.background.paper,
	},
	title: {
		margin: '0',
		textAlign: 'center',
		fontSize: '1rem',
		color: 'darkgrey',
		fontWeight: '300',
	},
	userLink: {
		fontSize: '0.9rem',
		letterSpacing: '0.5px',
		fontWeight: '600',
		margin: '0',
	},
	userFullName: {
		fontWeight: '100',
		letterSpacing: '0.5px',
		margin: '0',
		color: 'darkgrey',
	},
	followText: {
		fontSize: '0.9rem',
		letterSpacing: '0.5px',
		color: '#3AACF7',
		fontWeight: '500',
		cursor: 'pointer',
	},
}));

function InteractiveList({ homeUsers, loading, ...rest }) {
	const classes = useStyles();
	const [dense] = React.useState(false);

	function ListItemLink(props) {
		const { icon, primary, to } = props;

		const renderLink = React.useMemo(
			() =>
				React.forwardRef((itemProps, ref) => (
					<RouterLink to={to} ref={ref} {...itemProps} />
				)),
			[to]
		);

		return (
			<Box>
				<ListItem style={{ padding: '0' }} button component={renderLink}>
					<ListItemText
						className={classes.userLink}
						disableTypography={true}
						primary={primary}
					/>
				</ListItem>
			</Box>
		);
	}

	ListItemLink.propTypes = {
		primary: PropTypes.string.isRequired,
		to: PropTypes.string.isRequired,
	};
	return (
		<div className={classes.root}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h6' className={classes.title}>
						Suggestions For You
					</Typography>
					<Divider style={{ margin: '10px 0' }} />
					{loading ? (
						<Box style={{ textAlign: 'center' }}>
							<CircularProgress />
						</Box>
					) : (
						<div className={classes.demo}>
							<List dense={dense}>
								{homeUsers &&
									homeUsers.map(user => (
										<ListItem key={user.username}>
											<ListItemAvatar>
												<Avatar alt={user.displayName} src={user.photoURL} />
											</ListItemAvatar>
											<Box>
												<ListItemLink
													to={`/${user.username}`}
													primary={user.username}
												/>
												<ListItemText
													className={classes.userFullName}
													disableTypography={true}
													primary={user.displayName}
												/>
											</Box>
											{/* <ListItemSecondaryAction>
												<Typography
													className={classes.followText}
													variant='caption'
													gutterBottom>
													Follow
												</Typography>
											</ListItemSecondaryAction> */}
										</ListItem>
									))}
							</List>
						</div>
					)}
				</Grid>
			</Grid>
		</div>
	);
}

const mapStateToProps = state => ({
	homeUsers: state.USERS.homeUsers,
	loading: state.USERS.homeUserLoading,
});

export default connect(mapStateToProps)(InteractiveList);
