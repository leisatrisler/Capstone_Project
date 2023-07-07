import { useEffect, useState } from "react"
import CoffeeType from "../types/coffee"
import coffeeAPI from "../lib/coffeeAPI"


type Props = {}
// eslint-disable-next-line no-empty-pattern
export default function ShowCoffees({}: Props) {
    const [coffees, setCoffees]=useState<CoffeeType[]|null>(null)

    useEffect(()=>{
        const fetchData = async()=>{
            const {data} = await coffeeAPI.get()
            if(data){
                setCoffees(data)
            }
        }
        fetchData()

    },[])

  return (
    <div>
        <h1>Latte Labryinth</h1>
        {
            coffees?.map((r)=>(
                <div key={r.id}>
                    Title: &emsp; &nbsp; {r.title}<br/>
                    Body: &emsp;&nbsp; {r.body}<br/>
                    Author:&emsp;{r.author}<br/>
                </div>
                )
            )
        }
    </div>
  )
}