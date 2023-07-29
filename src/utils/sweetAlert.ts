// sweetAlert
import Swal from "sweetalert2"

const mixAlert = Swal.mixin({
  position: 'center',
  icon: 'warning',
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  allowOutsideClick: false
})

export const sAlert = ($opt: object | undefined) => {
  const opt = $opt !== undefined ? $opt : {}
  return new Promise( (resolve, reject) => {
    mixAlert.fire(opt).then((res) => {
      if(resolve !== undefined) {
        resolve(res)
      }
    })
  })
}