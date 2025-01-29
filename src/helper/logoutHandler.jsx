export const logoutHandler = (setValues) => {
    setValues({ isAuth: false, token: null, userId: null });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
};
