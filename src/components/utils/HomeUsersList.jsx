import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

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
}));

function generate(element) {
	return [0, 1, 2].map(value =>
		React.cloneElement(element, {
			key: value,
		})
	);
}

export default function InteractiveList() {
	const classes = useStyles();
	const [dense] = React.useState(false);
	const [secondary] = React.useState(false);

	return (
		<div className={classes.root}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h6' className={classes.title}>
						Suggestions For You
					</Typography>
					<div className={classes.demo}>
						<List dense={dense}>
							{generate(
								<ListItem>
									<ListItemAvatar>
										<Avatar>N</Avatar>
									</ListItemAvatar>
									<ListItemText
										// disableTypography={true}
										primary='nil1729'
										secondary={'Nilanjan Deb'}
									/>
									<ListItemSecondaryAction>
										<IconButton edge='end' aria-label='delete'>
											<DeleteIcon />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							)}
						</List>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}
