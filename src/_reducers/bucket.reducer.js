import { BucketConstants } from '../_constants/bucket.constant';

export function buckets(state = {}, action) {
    switch (action.type) {
        case BucketConstants.GET_BUCKETS_REQUEST:
            return {
                ...state,
                laoding: true,
                bucket_list: []
            };
        case BucketConstants.GET_BUCKETS_SUCCESS:
            const selected_bucket_index = state.selected_bucket_index ? state.selected_bucket_index : 0
            return {
                ...state,
                laoding: false,
                bucket_list: action.payload.data.bucket_list,
                bucketId: action.payload.data.bucket_list.length > 0 ? action.payload.data.bucket_list[selected_bucket_index]._id : null,
                selected_bucket_index: state.selected_bucket_index ? state.selected_bucket_index : 0,
                todo_list: action.payload.data.bucket_list.length > 0 && action.payload.data.bucket_list[selected_bucket_index].todo_list ? action.payload.data.bucket_list[selected_bucket_index].todo_list : []
            };
        case BucketConstants.GET_BUCKETS_FAILURE:
            return {
                ...state,
                laoding: false,
                bucket_list: []
            };
        case BucketConstants.OPEN_BUCKET_DIALOG:
            return {
                ...state,
                open_dialog: true,
                bucketId: action.payload.bucketId
            }
        case BucketConstants.CLOSE_BUCKET_DIALOG:
            return {
                ...state,
                open_dialog: false,
                bucketId: 0
            }
        case BucketConstants.IN_UP_BUCKET_REQUEST:
            return {
                ...state,
                laoding: true
            }
        case BucketConstants.IN_UP_BUCKET_SUCCESS:
            return {
                ...state,
                laoding: false
            }
        case BucketConstants.IN_UP_BUCKET_FAILURE:
            return {
                ...state,
                laoding: false
            }
        case BucketConstants.GET_BUCKET_DETAIL_REQUEST:
            return {
                ...state,
                laoding: true,
                bucket_detail: {}
            }
        case BucketConstants.GET_BUCKET_DETAIL_SUCCESS:
            return {
                ...state,
                laoding: false,
                bucket_detail: action.payload.data
            }
        case BucketConstants.GET_BUCKET_DETAIL_FAILURE:
            return {
                ...state,
                laoding: false,
                bucket_detail: {}
            }
        case BucketConstants.SELECT_BUCKET:
            return {
                ...state,
                selected_bucket_index: action.payload.index,
                todo_list: state.bucket_list[action.payload.index].todo_list ? state.bucket_list[action.payload.index].todo_list : [],
                bucketId: state.bucket_list[action.payload.index]._id
            }
        case BucketConstants.GET_TODO_LIST_REQUEST:
            return {
                ...state,
                laoding: true,
                todo_list: []
            };
        case BucketConstants.GET_TODO_LIST_SUCCESS:
            return {
                ...state,
                laoding: false,
                todo_list: action.payload.data.todo_list
            };
        case BucketConstants.GET_TODO_LIST_FAILURE:
            return {
                ...state,
                laoding: false,
                todo_list: []
            };
        case BucketConstants.INSERT_TASK_REQUEST:
            return {
                ...state,
                loading: true
            }
        case BucketConstants.INSERT_TASK_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case BucketConstants.INSERT_TASK_FAILURE:
            return {
                ...state,
                loading: false
            }
        case BucketConstants.TOGGLE_DONE_REQUEST:
            return {
                ...state,
            }
        case BucketConstants.TOGGLE_DONE_SUCCESS:
            return {
                ...state,
            }
        case BucketConstants.TOGGLE_DONE_FAILURE:
            return {
                ...state,
            }
        case BucketConstants.OPEN_TODO_DIALOG:
            return {
                ...state,
                todo_detail: state.bucket_list[state.selected_bucket_index].todo_list ? state.bucket_list[state.selected_bucket_index].todo_list[action.payload.index] : {},
                selected_todo_index: action.payload.index,
                open_todo_dialog: true
            }
        case BucketConstants.CLOSE_TODO_DIALOG:
            return {
                ...state,
                todo_detail: {},
                open_todo_dialog: false
            }
        case BucketConstants.SEARCH_BUCEKT_REQUEST:
            return {
                ...state,
                searched_buckets: []
            }
        case BucketConstants.SEARCH_BUCEKT_SUCCESS:
            return {
                ...state,
                searched_buckets: action.payload.data.bucket_list
            }
        case BucketConstants.SEARCH_BUCEKT_FAILURE:
            return {
                ...state,
                searched_buckets: []
            }

        default:
            return state
    }
}