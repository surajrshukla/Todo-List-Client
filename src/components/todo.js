import React from 'react';
import { connect } from 'react-redux';
import { bucketActions } from '../_actions/bucket.action';
import Loading from './loaing';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import Chip from '@material-ui/core/Chip';

const style = theme => ({
    todo: {
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

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.bucketId !== "0" && this.props.bucketId !== prevProps.bucketId) {
            this.props.dispatch(bucketActions.get_todo_list(this.props.bucketId));
        }
    }

    handleEditTodo = (ev) => {
        ev.stopPropagation();
        this.props.dispatch(bucketActions.open_todo_dialog(this.props.index));
    }

    handleDoneAction = (ev, action) => {
        ev.stopPropagation();
        const data = {
            bucketId: this.props.todo.bucketId,
            todoId: this.props.todo._id,
            action
        }
        this.props.dispatch(bucketActions.toggle_done(data));
    }

    handleDeleteTodo = (ev) => {
        ev.stopPropagation();
        const data = {
            bucketId: this.props.todo.bucketId,
            todoId: this.props.todo._id,
        }
        this.props.dispatch(bucketActions.delete_task(data));
    }

    render() {
        if (this.props.loading) return <Loading />
        const { classes } = this.props;
        return (
            <Grid className={classes.todo} container spacing={4}>
                <Grid style={{ margin: "auto" }} item md={8} sm={12}>
                    <Card className={classes.card}>
                        <Grid container>
                            <Grid item md={6}>
                                <Typography variant="h6" component="span">
                                    {this.props.todo.name}
                                </Typography>
                                <Chip
                                    style={{ marginLeft: 4, marginBottom: 3 }}
                                    variant="outlined"
                                    size="small"
                                    label={"Status: " + this.props.todo.status}
                                    color={this.props.todo.status === "pending" ? "secondary" : "primary"}
                                />
                            </Grid>
                            <Grid item md={6}>
                                {this.props.todo.status === "pending" ? <Button onClick={ev => this.handleDoneAction(ev, "done")} color="primary">Mark as done</Button> :
                                    <Button onClick={ev => this.handleDoneAction(ev, "undone")} color="primary">Mark as undone</Button>}
                                <Button onClick={this.handleEditTodo} color="primary">Edit</Button>
                                <Button onClick={this.handleDeleteTodo} color="primary">Delete</Button>
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

export default connect(mapStateToProps, null)(withStyles(style)(Todo))
