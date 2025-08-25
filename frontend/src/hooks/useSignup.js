const useSignup = () => {
    const signUp = async(name, username, email, password, confirmPassword , isStudent , isCompany , isAdmin) => {
        try{
            const res = await fetch('http://localhost:5000/api/mastercard/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    username,
                    email,
                    password,
                    confirmPassword,
                    isStudent,
                    isCompany,
                    isAdmin
                })
            });
            if(res.ok){
                const data = await res.json();
                console.log("Signup successful:", data);
                return data;
            }
        }catch{
            return { error: 'Failed to sign up' };
        }
    }
    return { signUp }
}

export default useSignup;