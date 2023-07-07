import {apiClientNoAuth, apiClientTokenAuth} from './apiClient'
import APIResponse from '../types/apiTypes';
import { AxiosResponse } from 'axios';
import CoffeeType from '../types/coffee';
import UserType from '../types/auth';

const coffeeEndpoint = '/coffee';

async function get(): Promise<APIResponse<CoffeeType[]> > {
    let error;
    let data;
    try{
        const response: AxiosResponse<CoffeeType[]> = await apiClientNoAuth().get(coffeeEndpoint)
        data = response.data
    } catch(err) {
            error = 'Something went wrong'
    }
    return {
        error,
        data
    }
}

async function create(user: UserType, newCoffee: CoffeeType): Promise<APIResponse<CoffeeType> > {
    let error;
    let data;
    try{
        const response: AxiosResponse<CoffeeType> = await apiClientTokenAuth(user.token!)
            .post(coffeeEndpoint, newCoffee)
        data = response.data
    } catch(err) {

            error = 'Something went wrong'
        
    }
    return {
        error,
        data
    }
}

async function edit(user:UserType, changedData:Partial<CoffeeType>, id:number): Promise<APIResponse<CoffeeType> > {
    let error;
    let data;
    try{
        const response: AxiosResponse<CoffeeType> = await apiClientTokenAuth(user.token!).put(coffeeEndpoint+`/${id}`, changedData)
        data = response.data
    } catch(err){

        error = 'Something went wrong'

    }
    return {
        error,
        data
    }
}


async function del(user:UserType, coffeeID: number): Promise<APIResponse<string> > {
    let error;
    let data;
    try{
        const response: AxiosResponse<string> = await apiClientTokenAuth(user.token!).delete(coffeeEndpoint + '/' + coffeeID)
        data = response.data
    } catch(err) {

        error = 'Something went wrong'

    }
    return {
        error,
        data
    }
}

export default{
    get,
    create,
    edit,
    del
}