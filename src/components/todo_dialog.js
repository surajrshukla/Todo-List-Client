import React, { Component } from 'react';
import { DialogTitle, DialogContent, DialogActions } from '../_helpers/dialog';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { bucketActions } from '../_actions/bucket.action';
import Button from '@material-ui/core/Button';
import { reduxForm, Field } from 'redux-form';
import { RenderTextField, RenderSelectField } from '../_helpers/reduxFields';
import MenuItem from '@material-ui/core/MenuItem';


const validate = (values) => {

    const errors = {};
    if (!values.name) {
        errors.name = 'Please enter task name'
    }

    return errors;
}

class TodoDialog extends Component {

    close_dialog = () => {
        this.props.dispatch(bucketActions.close_todo_dialog())
    }

    handleFormKeyPress = ev => {
        if (ev.keyCode === 13) {
            ev.preventDefault();
        }
    }

    onSubmit = formdata => {
        formdata.todoId = this.props.todo_detail._id;
        formdata.bucketId = this.props.todo_detail.bucketId;
        this.props.dispatch(bucketActions.update_todo(formdata))
    }

    render() {
        const onSubmit = this.onSubmit.bind(this);
        const { handleSubmit } = this.props;
        return (
            <form onKeyDown={this.handleFormKeyPress} onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle id="bucket-dialog" onClose={this.close_dialog}>Edit Task</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item md={12}>
                            <Field
                                name="name"
                                label="Task Name"
                                component={RenderTextField}
                                fullWidth={true}
                                autoComplete="off"
                                margin="dense"
                                variant="outlined"
                            />
                            <Field
                                name="status"
                                component={RenderSelectField}
                                label="Status"
                                autoComplete="off"
                                margin="dense"
                                fullWidth={true}
                                variant="outlined"
                            >
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="complete">Complete</MenuItem>
                            </Field>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" variant="contained" color="primary">Save</Button>
                    <Button onClick={this.close_dialog} variant="outlined" color="primary">Close</Button>
                </DialogActions>
            </form>
        )
    }

}

function mapStateToProps(state) {
    let initialValues = {
        status: "pending"
    };
    if (state.buckets.todo_detail) {
        initialValues = state.buckets.todo_detail
    }
    return {
        initialValues,
        todo_detail: state.buckets.todo_detail
    };
}


TodoDialog = reduxForm({
    form: 'TodoDialog',
    enableReinitialize: true,
    validate
})(TodoDialog);

export default connect(mapStateToProps, null)(TodoDialog);