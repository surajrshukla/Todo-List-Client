import React from 'react';
import { connect } from 'react-redux';
import { bucketActions } from '../_actions/bucket.action';
import Loading from './loaing';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import BucketDialog from './bucket_dialog';
import TodoDialog from './todo_dialog';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import Bucket from './bucket';
import Todo from './todo';
import Divider from '@material-ui/core/Divider';
import TodoAdd from './todo_add';


const style = theme => ({
    dashboard: {
        padding: 30
    },
    bucketWrapper: {
        padding: 30,
        border: "1px solid #4285F4"
    }
})

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(bucketActions.get_buckets());
    }

    handleCreateBucket = () => {
        this.props.dispatch(bucketActions.open_bucket_dialog("0"))
    }

    handleSelectBucket = (ev, index) => {
        ev.stopPropagation();
        this.props.dispatch(bucketActions.select_bucket(index));
    }

    handleEditBucket = (ev, index) => {
        ev.stopPropagation();
        this.props.dispatch(bucketActions.open_bucket_dialog(this.props.bucket_list[index]._id));
    }

    render() {
        if (this.props.loading) return <Loading />
        const { classes } = this.props;

        return (
            <div className={classes.dashboard}>
                <Grid container spacing={6}>
                    <Grid className={classes.bucketWrapper} item md={4}>
                        <Grid container spacing={2}>
                            <Grid style={{ padding: 4 }} item md={12}>
                                <Typography variant="h5" component="span">
                                    Buckets
                             </Typography>
                            </Grid>
                            {this.props.bucket_list && this.props.bucket_list.map((bucket, index) => (<Bucket key={index} index={index} bucket={bucket} selected_bucket_index={this.props.selected_bucket_index} />))}
                            <Button style={{ marginTop: this.props.bucket_list && this.props.bucket_list.length > 0 ? 15 : 0 }} onClick={this.handleCreateBucket} fullWidth variant="contained" color="primary">
                                Create New Bucket
                        </Button>
                        </Grid>
                    </Grid>
                    <Grid item md={8}>
                        <Grid container spacing={3}>
                            <Grid style={{ padding: 4 }} item md={12}>
                                <Typography variant="h5" component="span">
                                    To Do List
                                 </Typography>
                                <Divider />
                            </Grid>
                            <Grid style={{ padding: 4, margin: "auto" }} item md={6} sm={12}>
                                <TodoAdd />
                            </Grid>
                            {this.props.todo_list && this.props.todo_list.length > 0 ? this.props.todo_list.map((todo, index) => (
                                <Todo key={index} index={index} todo={todo} selected_todo_index={this.props.selected_todo_index} />
                            )) : null}
                        </Grid>
                    </Grid>
                </Grid>
                <Dialog
                    open={this.props.open_dialog}
                    aria-labelledby="bucket dialog"
                    maxWidth="sm"
                    fullWidth>
                    <BucketDialog />
                </Dialog>
                <Dialog
                    open={this.props.open_todo_dialog}
                    aria-labelledby="todo dialog"
                    maxWidth="xs"
                    fullWidth>
                    <TodoDialog />
                </Dialog>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.buckets.loading,
        bucket_list: state.buckets.bucket_list,
        todo_list: state.buckets.todo_list,
        open_dialog: state.buckets.open_dialog,
        open_todo_dialog: state.buckets.open_todo_dialog,
        selected_bucket_index: state.buckets.selected_bucket_index
    };
}

export default connect(mapStateToProps, null)(withStyles(style)(Dashboard))
