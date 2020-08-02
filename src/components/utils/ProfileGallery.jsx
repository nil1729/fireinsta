import React from 'react';
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

function CenteredTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	function TitlebarGridList() {
		return (
			<div className={classes.imgRoot}>
				<GridList
					spacing={10}
					cellHeight={250}
					className={classes.gridList}
					cols={3}>
					{[0, 1, 2, 3, 4, 5, 6, 7].map(tile => (
						<GridListTile key={tile.img}>
							<img src='https://picsum.photos/500/400' alt='lol' />
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
				<Paper className={classes.root}>
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor='primary'
						textColor='primary'
						centered>
						<Tab label='Posts' icon={<AppsIcon />} />
						<Tab label='Stars' icon={<AppsIcon />} />
					</Tabs>
				</Paper>
				<TitlebarGridList />
			</Container>
		</>
	);
}

export default CenteredTabs;
