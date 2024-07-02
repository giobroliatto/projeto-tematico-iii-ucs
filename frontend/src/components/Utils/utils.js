class Utils {

    static getRoleFromToken(token) {
        if (token !== "undefined" && token !== null) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedPayload = JSON.parse(atob(base64));
            return decodedPayload.role;
        }
        return null;
    }
}

export default Utils;
