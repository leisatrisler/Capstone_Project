import UserType from "../types/auth";
import coffeeAPI from "../lib/coffeeAPI"
import CoffeeType from "../types/coffee"
import { useState } from "react";

type Props = {user:UserType|null}
export default function CreateCoffeeForm({user}: Props) {
    if (!user){return "Latte Login Required"}

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, setFormData] = useState<CoffeeType|null>(null)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [message, setMessage] = useState<string>('')

    const handleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault();
        const {error}=await coffeeAPI.create(user, formData!)
        setMessage(error || 'Brew-ti-ful, Caffine Successfully Created')

    }

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({...formData!, [e.target.name]: e.target.value})
    }
  return (
        <div>
            <h1>Caffine Creation</h1>
            <form  onSubmit={handleSubmit}>
                <input type="text" name="title" onChange={handleInputChange} placeholder="title"/>
                <br/>
                <input type="text" name="body" onChange={handleInputChange} placeholder="body"/>
                <br/>
                <button type="submit">Caffine Creation</button>
                {message}
            </form>
        </div>
  )
}