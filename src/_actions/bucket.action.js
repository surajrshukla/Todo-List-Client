import { API_URL } from './utility.action';
import { BucketConstants } from '../_constants/bucket.constant';

export const bucketActions = {
    get_buckets, in_up_bucket,
    open_bucket_dialog, close_bucket_dialog,
    get_bucket_detail, select_bucket,
    insert_task, get_todo_list, toggle_done,
    open_todo_dialog, close_todo_dialog,
    update_todo, delete_task, change_search_list,
    search_buckets
};

function get_buckets() {

    const requestOptions = {
        method: 'GET',
    };

    return dispatch => {
        dispatch(request());
        fetch(`${API_URL}/bucket_service/get_buckets`, requestOptions)
            .then(response => response.json())
            .then(function (response) {
                if (response.error_code === "0") {
                    dispatch(failure(response))
                }
                else {
                    dispatch(success(response))
                }
            });
    };
    function request() { return { type: BucketConstants.GET_BUCKETS_REQUEST } }
    function success(payload) { return { type: BucketConstants.GET_BUCKETS_SUCCESS, payload } }
    function failure(payload) { return { type: BucketConstants.GET_BUCKETS_FAILURE, payload } }
}

function in_up_bucket(formdata) {

    const request_data = { formdata }

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(request_data),
        headers: { 'Content-Type': 'application/json' }
    };

    return dispatch => {
        dispatch(request());
        fetch(`${API_URL}/bucket_service/in_up_bucket`, requestOptions)
            .then(response => response.json())
            .then(function (response) {
                if (response.error_code === "0") {
                    dispatch(failure(response))
                }
                else {
                    dispatch(get_buckets());
                    dispatch(success(response));
                    dispatch(close_bucket_dialog());
                }
            });
    };

    function request() { return { type: BucketConstants.IN_UP_BUCKET_REQUEST } }
    function success(payload) { return { type: BucketConstants.IN_UP_BUCKET_SUCCESS, payload } }
    function failure(payload) { return { type: BucketConstants.IN_UP_BUCKET_FAILURE, payload } }
}

function get_bucket_detail(bucketId) {
    const request_data = { bucketId }

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(request_data),
        headers: { 'Content-Type': 'application/json' }
    };

    return dispatch => {
        dispatch(request());
        fetch(`${API_URL}/bucket_service/get_bucket_detail`, requestOptions)
            .then(response => response.json())
            .then(function (response) {
                if (response.error_code === "0") {
                    dispatch(failure(response))
                }
                else {
                    dispatch(success(response))
                }
            });
    };

    function request() { return { type: BucketConstants.GET_BUCKET_DETAIL_REQUEST } }
    function success(payload) { return { type: BucketConstants.GET_BUCKET_DETAIL_SUCCESS, payload } }
    function failure(payload) { return { type: BucketConstants.GET_BUCKET_DETAIL_FAILURE, payload } }
}

function get_todo_list(bucketId) {

    const request_data = { bucketId }

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(request_data),
        headers: { 'Content-Type': 'application/json' }
    };

    return dispatch => {
        dispatch(request());
        fetch(`${API_URL}/todo_service/get_todo_list`, requestOptions)
            .then(response => response.json())
            .then(function (response) {
                if (response.error_code === "0") {
                    dispatch(failure(response))
                }
                else {
                    dispatch(success(response))
                }
            });
    };
    function request() { return { type: BucketConstants.GET_TODO_LIST_REQUEST } }
    function success(payload) { return { type: BucketConstants.GET_TODO_LIST_SUCCESS, payload } }
    function failure(payload) { return { type: BucketConstants.GET_TODO_LIST_FAILURE, payload } }
}

function insert_task(formdata) {

    const request_data = { formdata }

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(request_data),
        headers: { 'Content-Type': 'application/json' }
    };

    return dispatch => {
        dispatch(request());
        fetch(`${API_URL}/todo_service/insert_task`, requestOptions)
            .then(response => response.json())
            .then(function (response) {
                if (response.error_code === "0") {
                    dispatch(failure(response))
                }
                else {
                    dispatch(get_todo_list(formdata.bucketId));
                    dispatch(success(response));
                }
            });
    };

    function request() { return { type: BucketConstants.INSERT_TASK_REQUEST } }
    function success(payload) { return { type: BucketConstants.INSERT_TASK_SUCCESS, payload } }
    function failure(payload) { return { type: BucketConstants.INSERT_TASK_FAILURE, payload } }
}

function toggle_done(data) {
    const request_data = { data }

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(request_data),
        headers: { 'Content-Type': 'application/json' }
    };

    return dispatch => {
        dispatch(request());
        fetch(`${API_URL}/todo_service/toggle_done`, requestOptions)
            .then(response => response.json())
            .then(function (response) {
                if (response.error_code === "0") {
                    dispatch(failure(response))
                }
                else {
                    dispatch(get_todo_list(data.bucketId));
                    dispatch(success(response));
                }
            });
    };

    function request() { return { type: BucketConstants.TOGGLE_DONE_REQUEST } }
    function success(payload) { return { type: BucketConstants.TOGGLE_DONE_SUCCESS, payload } }
    function failure(payload) { return { type: BucketConstants.TOGGLE_DONE_FAILURE, payload } }
}

function update_todo(formdata) {
    const request_data = { formdata }

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(request_data),
        headers: { 'Content-Type': 'application/json' }
    };

    return dispatch => {
        dispatch(request());
        fetch(`${API_URL}/todo_service/update_todo`, requestOptions)
            .then(response => response.json())
            .then(function (response) {
                if (response.error_code === "0") {
                    dispatch(failure(response))
                }
                else {
                    dispatch(get_todo_list(formdata.bucketId));
                    dispatch(success(response));
                    dispatch(close_todo_dialog());
                }
            });
    };

    function request() { return { type: BucketConstants.UPDATE_TODO_REQUEST } }
    function success(payload) { return { type: BucketConstants.UPDATE_TODO_SUCCESS, payload } }
    function failure(payload) { return { type: BucketConstants.UPDATE_TODO_FAILURE, payload } }
}

function delete_task(data) {
    debugger
    const request_data = { taskId: data.todoId }

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(request_data),
        headers: { 'Content-Type': 'application/json' }
    };

    return dispatch => {
        dispatch(request());
        fetch(`${API_URL}/todo_service/delete_task`, requestOptions)
            .then(response => response.json())
            .then(function (response) {
                if (response.error_code === "0") {
                    dispatch(failure(response))
                }
                else {
                    dispatch(get_todo_list(data.bucketId));
                    dispatch(success(response));
                    dispatch(close_todo_dialog());
                }
            });
    };

    function request() { return { type: BucketConstants.UPDATE_TODO_REQUEST } }
    function success(payload) { return { type: BucketConstants.UPDATE_TODO_SUCCESS, payload } }
    function failure(payload) { return { type: BucketConstants.UPDATE_TODO_FAILURE, payload } }
}

function open_bucket_dialog(bucketId) {
    return {
        type: BucketConstants.OPEN_BUCKET_DIALOG,
        payload: { bucketId }
    };
}

function open_todo_dialog(index) {
    return {
        type: BucketConstants.OPEN_TODO_DIALOG,
        payload: { index }
    }
}

function close_todo_dialog() {
    return {
        type: BucketConstants.CLOSE_TODO_DIALOG,
    }
}

function close_bucket_dialog() {
    return {
        type: BucketConstants.CLOSE_BUCKET_DIALOG,
    }
}

function select_bucket(index) {
    return {
        type: BucketConstants.SELECT_BUCKET,
        payload: { index }
    };
}

function change_search_list(searched_bucket_list) {
    return {
        type: BucketConstants.CHANGE_SEARCH_LIST,
        payload: { searched_bucket_list }
    }
}

function search_buckets(term) {
    const requestOptions = {
        method: 'GET',
    };

    return dispatch => {
        dispatch(request());
        fetch(`${API_URL}/bucket_service/search_buckets/${term}`, requestOptions)
            .then(response => response.json())
            .then(function (response) {
                if (response.error_code === "0") {
                    dispatch(failure(response))
                }
                else {
                    dispatch(success(response))
                }
            });
    };
    function request() { return { type: BucketConstants.SEARCH_BUCEKT_REQUEST } }
    function success(payload) { return { type: BucketConstants.SEARCH_BUCEKT_SUCCESS, payload } }
    function failure(payload) { return { type: BucketConstants.SEARCH_BUCEKT_FAILURE, payload } }
}