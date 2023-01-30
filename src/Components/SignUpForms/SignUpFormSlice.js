import { createSlice } from "@reduxjs/toolkit"; 
const initialState = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    passwordAgain: "",
    modalState: false,
    userData : {},
    verified: false,
    emailVerified: false,
    userId: null,
}
const SignUpFormSlice = createSlice({
    name: "signUpSlice",
    initialState,
    reducers: {
        getFirstName: (state,action) => {
            state.firstName = action.payload
        },
        getLastName: (state,action) => {
            state.lastName = action.payload
        },
        getUserName: (state,action) => {
            state.userName = action.payload
        },
        getEmail: (state,action) => {
            state.email = action.payload
        },
        getPassword: (state,action) => {
            state.password = action.payload
        },
        getPasswordAgain: (state,action) => {
            state.passwordAgain = action.payload
        },
        showModal: (state,action) => {
            state.modalState = true
            console.log(`current state: ${state.modalState}`);
        },
        hideModal: (state,action) => {
            state.modalState = false
             console.log(`current state: ${state.modalState}`);
        },
        getUserData: (state,action) => {
            state.userData = action.payload
            console.log(state.userData);
        },
        getEmailVerificationState: (state,action) => {
            state.emailVerified = action.payload
        }
        ,
        confirmVerification: (state, action) => {
            state.verified = true;
        },
        getUserId: (state,action) =>{
            state.userId = action.payload
        }
    }

})
export const {
    getEmail
    ,getFirstName,
    getLastName,
    getPassword,
    getPasswordAgain,
    getUserName,
    showModal,
    hideModal,
    getUserData,
    confirmVerification,
    getEmailVerificationState,
    getUserId

} = SignUpFormSlice.actions
export default SignUpFormSlice.reducer