import { useState } from "react";
import UserType from "../types/auth";
import userAPI from "../lib/userAPI";

type Props = {user:UserType|null}

export default function EspressoEditForm({user}: Props) {
    if(!user){return "Latte Login First"}

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, setFormData]=useState<UserType|null>(null)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [message, setMessage] = useState<string>('')

    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        setFormData({...formData!, [e.target.name]: e.target.value})
    }

    const handleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault()
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const {error}= await userAPI.editProfile(user,formData!)
        setMessage(error||'Espresso Successful Edit')

    }

    const handleDelete=async()=>{
        userAPI.deleteUser(user)
        setMessage("Decaffination, User Deleted")
    }

  return (
    <div>
        <h1>Espresso Edit Profile</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="first_name" onChange={handleInputChange} placeholder={user.first_name}/>
            <br/>
            <input type="text" name="last_name" onChange={handleInputChange} placeholder={user.last_name}/>
            <br/>
            <input type="text" name="email" onChange={handleInputChange} placeholder={user.email}/>
            <br/>
            <input type="password" name="password" onChange={handleInputChange} placeholder="password"/>
            <br/>
            <button type="submit">Espresso Edit Profile</button>
            <button type="button" onClick={handleDelete}>Decaffinate Delete Account</button>
            {message}
        </form>
    </div>
  )
}