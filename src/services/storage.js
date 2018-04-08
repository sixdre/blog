export default {
    user: {
        setUserId(data) {
            if (data) {
                localStorage.setItem('uid', data);
            } else {
                localStorage.removeItem('uid')
            }
        },
        getUserId() {
            return localStorage.getItem('uid')
        },
        setToken(data) {
            if (data) {
                localStorage.setItem('token', data);
            } else {
                localStorage.removeItem('token')
            }
        },
        getToken() {
            return localStorage.getItem('token')
        },
        setUserName(data) {
            if (data) {
                localStorage.setItem('username', data)
            } else {
                localStorage.removeItem('username')
            }
        },
        getUserName() {
            return localStorage.getItem('username')
        },
        setAvatar(data) {
            if (data) {
                localStorage.setItem('avatar', data)
            } else {
                localStorage.removeItem('avatar')
            }
        },
        getAvatar() {
            return localStorage.getItem('avatar')
        },
    }

}