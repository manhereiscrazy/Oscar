import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import News from './News'

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

export default function FeaturedNews({ newsdata }) {
  const classes = useStyles();

  return (
    <Grid>
      <Typography variant="h6" gutterBottom>
        Club Managers
      </Typography>
      <Divider />
      {newsdata.map((news, i) => (
          <News news={news} key={i}/>
      ))}
      {/* <News/> */}
    </Grid>
  );
}

FeaturedNews.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};