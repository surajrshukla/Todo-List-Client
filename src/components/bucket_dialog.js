import React, { Component } from 'react';
import { DialogTitle, DialogContent, DialogActions } from '../_helpers/dialog';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { bucketActions } from '../_actions/bucket.action';
import Button from '@material-ui/core/Button';
import { formValueSelector } from 'redux-form';
import BucketSearch from './bucket_search';

class BucketDialog extends Component {
    componentDidMount() {
        if (this.props.bucketId !== "0") {
            this.props.dispatch(bucketActions.get_bucket_detail(this.props.bucketId));
        }
    }

    close_dialog = () => {
        this.props.dispatch(bucketActions.close_bucket_dialog())
    }

    handleFormKeyPress = ev => {
        if (ev.keyCode === 13) {
            ev.preventDefault();
        }
    }

    onSubmit = () => {
        const data = {
            bucketId: this.props.bucketId,
            name: this.props.bucketName
        }

        this.props.dispatch(bucketActions.in_up_bucket(data))
    }

    render() {
        return (
            <div>
                <DialogTitle id="bucket-dialog" onClose={this.close_dialog}>{this.props.bucketId === "0" ? "Create New Bucket" : "Update Bucket"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3} style={{ padding: 15 }}>
                        <Grid item md={12}>
                            <BucketSearch />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onSubmit} variant="contained" color="primary">{this.props.bucketId === "0" ? "Create" : "Save"}</Button>
                    <Button onClick={this.close_dialog} variant="outlined" color="primary">Close</Button>
                </DialogActions>
            </div>
        )
    }

}

function mapStateToProps(state) {
    const selector = formValueSelector('BucketSearch');
    let bucketName = selector(state, 'name');
    return {
        bucketId: state.buckets.bucketId,
        bucketName
    };
}

export default connect(mapStateToProps, null)(BucketDialog);