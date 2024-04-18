import { Form, Link, useActionData, useNavigation } from 'react-router-dom';



function ProfileForm({ userDetail }) {
    const data = useActionData();
    const navigation = useNavigation();

    const isSubmitting = navigation.state === 'submitting'

    return (
        <>
        <Form method='post'>
            <h1>Profile</h1>
            {data && data.errors &&
                <ul>
                    {Object.values(data.errors).map((err) => (
                        <li key={err}>{err}</li>
                    ))}
                </ul>
            }
            {data && data.message && <p>{data.message}</p>}
    
            {/* name */}
            <div>
                {data && data.errors.firstName && <span> * </span>}
                <label htmlFor="firstName">
                    First Name
                </label>
                <input id='firstName' type='firstName' name='firstName' defaultValue={userDetail.first_name} required />
            </div>
            <div>
                {data && data.errors.lastName && <span> * </span>}
                <label htmlFor="lastName">Last Name</label>
                <input id='lastName' type='lastName' name='lastName'  defaultValue={userDetail.last_name} required />
            </div> 

            {/* email */}
            <div>
                {data && data.errors.email && <span> * </span>
                }
                <label htmlFor="email">Email</label>
                <input id='email' type='email' name='email'  defaultValue={userDetail.email} required />
            </div>

            {/* password */}
            <div>
                {data && (data.errors.length || data.errors.simbol || data.errors.num)
                    && <span> * </span>
                }
                <label htmlFor="password">Password</label>
                <input id='password' type='password' name='password' defaultValue={userDetail.email} required />
            </div>
            
            <button disabled={isSubmitting}>Edit Profile</button>
            {isSubmitting && <p>Submitting...</p>}
            <Link to='../'>Back</Link>
        </Form>
        </>
    )
}

export default ProfileForm;

