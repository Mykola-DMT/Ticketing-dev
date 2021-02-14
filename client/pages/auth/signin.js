import {useState} from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/use-request'

export default () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {errors, doRequest} = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => Router.push('/')
    })

    const onSubmit = async (event) => {
        event.preventDefault()

        await doRequest()     
    }

    return (
    <form onSubmit={onSubmit} className="container">
        <h1>Sign In</h1>
        <div className="form-group">
            <label>Email Address</label>
            <input 
                style={{width:'40%'}}
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="form-control"
            />
        </div>
        <div className="form-group">
            <label>Password</label>
            <input 
                style={{width:'40%'}}
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password" 
                className="form-control"
            />
        </div>
        {errors}
        <button className="btn btn-primary">Sign In</button>
    </form>)
}
