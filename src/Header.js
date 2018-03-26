import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import "./css/Header.css";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
});

function FullWidthGrid(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <Grid container spacing={24} className="Header">
                <Grid item xs={12}>
                    <p className={classes.p}>xs=12</p>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <p className={classes.p}>xs=12 sm=6</p>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <p className={classes.p}>xs=12 sm=6</p>
                </Grid>
            </Grid>
        </div>
    );
}

FullWidthGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullWidthGrid);