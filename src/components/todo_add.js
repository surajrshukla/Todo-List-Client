import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { bucketActions } from '../_actions/bucket.action';
import Button from '@material-ui/core/Button';
import { reduxForm, Field } from 'redux-form';
import { RenderTextField } from '../_helpers/reduxFields';

const validate = (values) => {

    const errors = {};
    if (!values.name) {
        errors.name = 'Please enter todo name'
    }

    return errors;
}

class ToDoAdd extends Component {

    handleFormKeyPress = ev => {
        if (ev.keyCode === 13) {
            ev.preventDefault();
        }
    }

    onSubmit = formdata => {
        formdata.bucketId = this.props.bucketId;
        this.props.dispatch(bucketActions.insert_task(formdata))
    }

    render() {
        const onSubmit = this.onSubmit.bind(this);
        const { handleSubmit } = this.props;
        return (
            <form onKeyDown={this.handleFormKeyPress} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} style={{ marginLeft: 15, marginRight: 15 }}>
                    <Grid item md={11} sm={12}>
                        <Field
                            name="name"
                            label="Enter Task"
                            component={RenderTextField}
                            autoComplete="off"
                            margin="dense"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid style={{ marginTop: 8 }} item md={1} sm={12}>
                        <Button type="submit" variant="contained" color="primary">Add</Button>
                    </Grid>
                </Grid>
            </form>
        )
    }

}

function mapStateToProps(state) {
    let initialValues = {};
    return {
        initialValues,
        bucketId: state.buckets.bucketId
    };
}


ToDoAdd = reduxForm({
    form: 'ToDoAdd',
    enableReinitialize: true,
    validate
})(ToDoAdd);

export default connect(mapStateToProps, null)(ToDoAdd);