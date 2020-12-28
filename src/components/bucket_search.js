import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Field, reduxForm, change } from 'redux-form';
import InputAdornment from '@material-ui/core/InputAdornment';
import { RenderTextField } from '../_helpers/reduxFields';
import MenuItem from '@material-ui/core/MenuItem';
import { bucketActions } from '../_actions/bucket.action';

const validate = (values) => {

    const errors = {};
    if (!values.name) {
        errors.name = 'Please enter bucket name'
    }

    return errors;
}
const style = theme => ({
    searchDisplay: {
        zIndex: 1
    },
});
class BucketSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            folders: [],
            files: [],
            anchorEl: null
        }
    }

    handleChange = (ev) => {
        this.props.dispatch(bucketActions.search_buckets(ev.currentTarget.value));
        this.setState({
            anchorEl: ev.target.value === "" ? null : ev.target.parentElement
        });
    }

    handleClose = (ev) => {
        if (!this.state.anchorEl || this.state.anchorEl.contains(ev.target)) {
            return;
        }
        this.handleSearchTreyClose();
    }

    handleSearchTreyClose = () => {
        this.setState({
            anchorEl: null
        })
    }

    handleBucketSelected = (ev) => {
        debugger
        this.props.dispatch(change('BucketSearch', 'name', ev.currentTarget.getAttribute("value")));
        this.handleSearchTreyClose()
    }

    render() {
        const { classes } = this.props;
        let width = null
        if (this.state.anchorEl) {
            width = this.state.anchorEl.offsetWidth
        }
        return (
            <div className="searchbar_wrapper">
                <Field
                    name="name"
                    label="Bucket Name"
                    component={RenderTextField}
                    onChange={this.handleChange}
                    fullWidth={true}
                    autoComplete="off"
                    margin="dense"
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                X
                            </InputAdornment>
                        ),
                    }}
                />
                <Popper
                    style={{ width: width }}
                    className={classes.searchDisplay}
                    open={Boolean(this.state.anchorEl)}
                    disablePortal
                    anchorEl={this.state.anchorEl}
                    transition>
                    {({ TransitionProps, placement }) => (
                        <Grow {...TransitionProps}
                            id="menu-list-grow"
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                            <Paper>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <div>
                                        {this.props.searched_buckets && this.props.searched_buckets.length > 0 && this.props.searched_buckets.map((bucket, index) => {
                                            return <MenuItem key={index} value={bucket.name} onClick={this.handleBucketSelected} >{bucket.name}</MenuItem>
                                        })}
                                    </div>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let initialValues = {};
    if (state.buckets.bucket_detail) {
        initialValues = state.buckets.bucket_detail
    }
    return {
        initialValues,
        searched_buckets: state.buckets.searched_buckets,
    };
}


BucketSearch = reduxForm({
    form: 'BucketSearch',
    enableReinitialize: true,
    validate
})(BucketSearch);

export default connect(mapStateToProps, null)(withStyles(style)(BucketSearch))
