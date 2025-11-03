import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useNotification } from '../contexts/NotificationContext.jsx'

export default function Register() {

    const navigate = useNavigate()
    const [formData, setFormData] =  useState({
        name: '',
        email: '',
        password:'',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { showSuccess, showError } = useNotification()

    const { register } = useAuth()
    const handleChange = (e) =>{
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await register(
            formData.name,
            formData.email,
            formData.password
        )
        if (result.success) {
            showSuccess(result.message)
            navigate('/products')
        } else {
            showError(result.error)
            setError(result.error) 
        }
        setLoading(false)
    }

    return (
        <div className= 'min-h-screen flex items-center justify-center bg-black'>
            <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-md'>
                <h2 className='text-3xl font-bold mb-8 text-center text-gray-50y-800'>
                    Inscription
                </h2>
                    {error && <p className='text-red-500 text-center'>{error}</p>}
                <form 
                className='space-y-6' 
                onSubmit={handleSubmit}>
                    <div>
                        <label 
                        htmlFor='name' 
                        className='block text-sm font-medium text-gray-700 mb-2'>
                            Nom d'utilisateur
                        </label>

                        <input 
                        type='text' 
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        placeholder='Nom'/>

                    </div>

                    <div>
                        <label 
                        htmlFor='email' 
                        className='block text-sm font-medium text-gray-700 mb-2'>
                            Email
                        </label>

                        <input 
                        type='email' 
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        placeholder='Email'/>
                    </div>

                    <div>
                        <label 
                        htmlFor='password' 
                        className='block text-sm font-medium text-gray-700 mb-2'>
                            Mots de passe 
                        </label>

                        <input 
                        type='password' 
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        placeholder='Mot de passe' />

                    </div>
                    <button 
                    type='submit'
                    to='/products' 
                    className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover-bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'>
                        Inscription
                    </button>

                </form>
                <p className='mt-4 text-center text-sm text-gray-600'>
                    Vous avez déjà un compte ? 
                    <Link 
                    to='/auth/login' 
                    className='text-blue-600 hover:text-blue-700 font-medium'>
                        Connexion
                    </Link>
                </p>
            </div>
        </div>
    )
}


