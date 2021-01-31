export const requiredField = (value)=> value ? undefined : 'required field!'

const maxLength = (max) => (value)=> value && value.length > max ? 'Max is '+max+ 'symbols' : undefined
export const maxLength15 = maxLength(15)