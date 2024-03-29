import { redirect, json } from "react-router-dom";
import AuthForm from "../../components/forms/AuthForm";
import { API_URL } from "../../App";

function LoginPage() {
    

    return (
         <div><AuthForm /></div>
    )
};

export default LoginPage;



export async function action ({ request }) {
   const data = await request.formData();
    const loginData = {
        email: data.get('email'),
        password: data.get('password')
    };
    console.log(loginData);

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    console.log(response.data);
    
    //error handling
    if (response.status === 422 || response.status === 401) {
        return response;
    };

    if (!response.ok){
        throw json({ message: 'Could not authenticate user.'}, { status: 500 });
    }

    // TODO: setup token
    const token = Math.floor(Math.random() * 10);

    localStorage.setItem('token', token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem('expiration', expiration.toISOString());

    return redirect('/');
}

