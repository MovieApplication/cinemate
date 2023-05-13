export const hangulRegExp = ($value: string) => {
  const regExp = /^[ㄱ-ㅎㅏ-ㅣ가-힣]/g

  return regExp.test($value)
}