import * as yup from 'yup'

export const orgPageSchema =
    yup.object({
        "org-name": yup.string().min(2).max(50).validate("Please enter your name "),
        "org-type": yup.string().min(2).max(50).validate("Please select type")
    })