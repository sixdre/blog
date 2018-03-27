import $storage from './storage'

export default {
    login({username,avatar,token}) {
        $storage.user.setToken(token)
        $storage.user.setUserName(username)
        $storage.user.setAvatar(avatar)
    },
    authenticated() {
        var t = $storage.user.getToken();
        return t && t.length > 0
    },
    logout() {
        $storage.user.setUserName(null)
        $storage.user.setToken(null)
        $storage.user.setAvatar(null)
    }
}