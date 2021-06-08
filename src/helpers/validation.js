

export const isEmpty = value => value.trim().length === 0

export const isEmailValid = value => {
    return !!value.includes('@');

}