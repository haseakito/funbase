export type RegisterFormProps = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

export type LoginFormProps = {
    email: string,
    password: string
}

export type ResetPasswordProps = {
    email: string,
    newPassword: string,
    confirmPassword: string
}

export type ContactFormProps = {
    email: string,
    subject: string,
    details: string,     
}