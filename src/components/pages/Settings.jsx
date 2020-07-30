import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}>
			{value === index && <Box>{children}</Box>}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
		height: 'auto',
		padding: '2em',
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
	container: {
		marginTop: '1.5rem',
	},
	tabPanel: {
		width: '80%',
		paddingLeft: '2.5em',
	},
	cmdText: {
		fontWeight: '100',
		letterSpacing: '1px',
		marginLeft: '8px',
	},
	btnStyle: {
		marginLeft: '8px',
		fontWeight: '100',
		letterSpacing: '1px',
		textTransform: 'capitalize',
		fontSize: '1.1rem',
	},
}));

export default function VerticalTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			<CssBaseline />
			<Container maxWidth='md' className={classes.container}>
				<div className={classes.root}>
					<Tabs
						orientation='vertical'
						variant='scrollable'
						value={value}
						onChange={handleChange}
						aria-label='Vertical tabs example'
						className={classes.tabs}>
						<Tab label='Edit Profile' {...a11yProps(0)} />
					</Tabs>
					<TabPanel className={classes.tabPanel} value={value} index={0}>
						<TextField
							id='outlined-full-width'
							label='Name'
							style={{ margin: 8 }}
							placeholder='Your Name'
							helperText='You can only change your name twice within 14 days.'
							fullWidth
							margin='normal'
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
						/>
						<TextField
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
							defaultValue='nilanjan172nsvian@gmail.com'
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
							className={classes.btnStyle}
							variant='contained'
							color='primary'
							startIcon={<SaveIcon />}>
							Save
						</Button>
					</TabPanel>
				</div>
			</Container>
		</>
	);
}
