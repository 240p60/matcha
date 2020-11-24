import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  ul: {
    display: 'flex',
    justifyContent: 'center',
  }
}));

export default function PaginationOutlined({ changePage, pages }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination className={classes.ul} onChange={(event, page) => changePage(page)} count={pages} variant="outlined" color="secondary" />
    </div>
  );
}