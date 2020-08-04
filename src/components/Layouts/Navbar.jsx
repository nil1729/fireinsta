import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux';
import { signOut } from '../../redux/actions/auths';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import SettingsSharpIcon from '@material-ui/icons/SettingsSharp';
import { clearUsersState } from '../../redux/actions/users';

const useStyles = makeStyles(theme => ({
	grow: {
		flexGrow: 1,
	},
	toolBar: {
		minHeight: '55px',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
		fontWeight: 100,
		letterSpacing: '1.5px',
		fontSize: '2rem',
		fontFamily: `'Dancing Script', cursive`,
		color: 'brown',
		cursor: 'pointer',
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: 'rgb(250, 250, 250)',
		border: '1px solid #E2E2E2',
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
		alignItems: 'center',
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	avatarRoot: {
		marginLeft: '1em',
		cursor: 'pointer',
		border: '1px solid #E2E2E2',
	},
	appBarRoot: {
		color: '#222',
		backgroundColor: 'rgb(255, 255, 255)',
	},
	iconBtnRoot: {
		paddingLeft: 0,
	},
	menuList: {
		width: '15rem',
	},
	menuTextStyle: {
		fontSize: '1.2rem',
		fontWeight: '100',
		letterSpacing: '1px',
		'& a': {
			textDecoration: 'none',
		},
	},
}));

function PrimarySearchAppBar({ authState, signOut, clearUsersState, ...rest }) {
	const history = useHistory();
	const [myProfile, setMyProfile] = useState('');
	useEffect(() => {
		if (!authState.loading && authState.details && authState.details.username) {
			setMyProfile(authState.details.username);
		}
		// eslint-disable-next-line
	}, [authState.details]);
	const pushToHome = () => {
		history.push('/');
	};
	const pushToSettings = () => {
		history.push('/accounts/settings');
		setAnchorEl(null);
		handleMobileMenuClose();
	};
	const pushToProfile = () => {
		history.push(`/${myProfile}`);
		setAnchorEl(null);
		handleMobileMenuClose();
	};
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = event => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
			classes={{ list: classes.menuList }}>
			<MenuItem onClick={pushToProfile}>
				<IconButton
					className={classes.iconBtnRoot}
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'>
					<AccountCircleSharpIcon />
				</IconButton>
				<p className={classes.menuTextStyle}>Profile</p>
			</MenuItem>
			<MenuItem onClick={pushToSettings}>
				<IconButton
					className={classes.iconBtnRoot}
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'>
					<SettingsSharpIcon />
				</IconButton>
				<p className={classes.menuTextStyle}>Settings</p>
			</MenuItem>
			<Divider />
			<MenuItem
				onClick={() => {
					handleMenuClose();
					clearUsersState();
					signOut();
				}}>
				<p className={classes.menuTextStyle}>Logout</p>
			</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}>
			<MenuItem>
				<IconButton aria-label='show 4 new mails' color='inherit'>
					<Badge badgeContent={4} color='secondary'>
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton aria-label='show 11 new notifications' color='inherit'>
					<Badge badgeContent={11} color='secondary'>
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);
	if (!authState.isAuthenticated && !authState.loading) {
		return null;
	} else {
		return (
			<div
				style={{ position: 'sticky', top: 0, zIndex: '99' }}
				className={classes.grow}>
				<AppBar position='static' classes={{ root: classes.appBarRoot }}>
					<Toolbar className={classes.toolBar}>
						<Typography
							onClick={pushToHome}
							className={classes.title}
							variant='h6'
							noWrap>
							Fireinsta
						</Typography>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder='Search…'
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ 'aria-label': 'search' }}
							/>
						</div>
						<div className={classes.grow} />
						<div className={classes.sectionDesktop}>
							<IconButton
								onClick={pushToHome}
								aria-label='show 4 new mails'
								color='inherit'>
								<Badge color='secondary'>
									<HomeIcon />
								</Badge>
							</IconButton>
							<IconButton
								aria-label='show 17 new notifications'
								color='inherit'>
								<Badge badgeContent={17} color='secondary'>
									<NotificationsIcon />
								</Badge>
							</IconButton>
							<Avatar
								className={classes.avatarRoot}
								alt={authState.user && authState.user.displayName}
								onClick={handleProfileMenuOpen}
								src={authState.user && authState.user.photoURL}
							/>
						</div>
						<div className={classes.sectionMobile}>
							<IconButton
								aria-label='show more'
								aria-controls={mobileMenuId}
								aria-haspopup='true'
								onClick={handleMobileMenuOpen}
								color='inherit'>
								<MoreIcon />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				{renderMobileMenu}
				{renderMenu}
			</div>
		);
	}
}
const mapStateToProps = state => ({
	authState: state.AUTHS,
});

export default connect(mapStateToProps, { signOut, clearUsersState })(
	PrimarySearchAppBar
);
