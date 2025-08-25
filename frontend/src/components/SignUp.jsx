import React from 'react'
import {useState} from 'react'
import useSignup from '../hooks/useSignup';

const SignUp = () => {
   const [name, setName] = useState("");
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [isStudent, setIsStudent] = useState(false);
   const [isCompany, setIsCompany] = useState(false);
   const [isAdmin, setIsAdmin] = useState(false);

   const {signUp} = useSignup();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signUp(name, username, email, password, confirmPassword , isStudent , isCompany , isAdmin);
        localStorage.setItem("user", JSON.stringify(result));
        if (result.error) {
            console.error("Signup failed:", result.error);
        } else {
            console.log("Signup successful:", result);
        }
    }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignUp