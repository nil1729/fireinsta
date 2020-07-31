import React from 'react';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Page404 from '../../assets/404.jpg';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	btnStyle: {
		margin: '10px 0 0 0',
		left: '50%',
		transform: 'translateX(-50%)',
		fontSize: '0.75rem',
	},
});

export default function SimpleContainer(props) {
	const history = useHistory();
	const classes = useStyles();
	return (
		<React.Fragment>
			<CssBaseline />
			<Container style={{ marginTop: '2rem', height: '65vh' }} maxWidth='sm'>
				<img style={{ height: '100%', width: '100%' }} src={Page404} alt='' />
				<Button
					onClick={() => {
						history.push('/');
					}}
					className={classes.btnStyle}
					variant='outlined'
					color='secondary'
					startIcon={<ArrowBackIosIcon />}>
					Go Back
				</Button>
			</Container>
		</React.Fragment>
	);
}
