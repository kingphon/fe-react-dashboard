import Swal from 'sweetalert2'

import { CONFIRM_BUTTON_COLOR, CANCEL_BUTTON_COLOR } from '../constants/sweet-alert2';

export const ALERT_SUCCESS = (message) => Swal.fire(
    'Thành công!!',
    message,
    'success'
)

export const ALERT_ERROR = (message) => Swal.fire(
    'Thất bại!!',
    message,
    'error'
)

export const CONFIRM_DELETE = (message) => { 
    return Swal.fire({
        title: 'Bạn chắc chắn rồi chứ?',
        text: message,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ok, Xóa',
        cancelButtonText: 'Không, Hủy!',
        cancelButtonColor: CANCEL_BUTTON_COLOR,
        confirmButtonColor: CONFIRM_BUTTON_COLOR,
        reverseButtons: true
    })
}
