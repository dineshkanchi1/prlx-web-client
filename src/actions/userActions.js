import Axios from "axios";
import { USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConstants"

export const register = (name, email, password, interest) => async (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST,
        payload: { email, password}
    });
    try{
        const {data} = await Axios.post('https://prlx-web-interest.herokuapp.com/api/users/register',{name, email, password, interest});
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        });
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem('userInfo',JSON.stringify(data));
    } catch(e){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        });
    }
};

export const signin = (email, password) => async (dispatch) => {
    dispatch({
        type: USER_SIGNIN_REQUEST,
        payload: { email, password}
    });
    try{
        const {data} = await Axios.post('https://prlx-web-interest.herokuapp.com/api/users/signin',{email, password});
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem('userInfo',JSON.stringify(data));
    } catch(e){
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        });
    }
};
export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({
        type: USER_SIGNOUT
    });
    document.location.href = '/';
}

export const listUsers = () => async (dispatch) => {
    dispatch({
        type: USER_LIST_REQUEST
    });
    try{
        const {data} = await Axios.get('https://prlx-web-interest.herokuapp.com/api/users');
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data.map(user => ({id: user._id, name: user.name, email: user.email, interest: user.interest}))
        });
    } catch(e){
        dispatch({
            type: USER_LIST_FAIL,
            payload: e.message
        });
    }
};