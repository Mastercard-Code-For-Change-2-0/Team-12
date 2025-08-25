const useLogin = () => {
    const login = async(username , password) => {
        try{
            const res = await fetch('http://localhost:5000/api/mastercard/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            if(res.ok){
                const data = await res.json();
                console.log("Login successful:", data);
                return data;
            }
        }catch{
            return { error: 'Failed to log in' };
        }
    }
    return { login }
}

export default useLogin;