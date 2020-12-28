import React from 'react';
import { connect } from 'react-redux';
import { bucketActions } from '../_actions/bucket.action';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";

const style = theme => ({
    bucket: {
        marginBottom: 2
    },
    card: {
        padding: 4
    },
    selectedCard: {
        padding: 4,
        backgroundColor: "#BBDEFB"
    },
})

class Bucket extends React.Component {

    handleSelectBucket = (ev) => {
        ev.stopPropagation();
        this.props.dispatch(bucketActions.select_bucket(this.props.index));
    }

    handleEditBucket = (ev) => {
        ev.stopPropagation();
        this.props.dispatch(bucketActions.open_bucket_dialog(this.props.bucket._id));
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid className={classes.bucket} container spacing={4}>
                <Grid item md={12}>
                    <Card onClick={this.handleSelectBucket} className={this.props.selected_bucket_index === this.props.index ? classes.selectedCard : classes.card}>
                        <Grid container>
                            <Grid item md={9}>
                                <Typography variant="h5" component="span">
                                    {this.props.bucket.name}
                                </Typography>
                            </Grid>
                            <Grid item md={2}>
                                <Button onClick={this.handleEditBucket} color="primary">Edit</Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, null)(withStyles(style)(Bucket))

