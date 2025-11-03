import { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useNotification } from '../contexts/NotificationContext.jsx'




export default function Login() {
    const [formData, setFormData] =  useState({
        email: '',
        password:'',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { showSuccess, showError } = useNotification()
    const navigate = useNavigate()
    const { login } = useAuth()
    const handleChange = (e) =>{
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await login (
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
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="password"
              >
                Mot de passe:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              Se connecter
            </button>
            <p className='text-sm text-gray-500'>Pas encore de compte ? <a href='/auth/register' className='text-blue-500'>Inscrivez-vous</a></p>
          </form>
        </div>
      </div>
    );
}


// import { useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { useAuth } from '../contexts/AuthContext.jsx'
// import { useNotification } from '../contexts/NotificationContext.jsx'




// export default function Login() {
//     const [formData, setFormData] =  useState({
//         email: '',
//         password:'',
//     })
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState('')
//     const { showSuccess, showError } = useNotification()
//     const navigate = useNavigate()
//     const { login } = useAuth()
//     const handleChange = (e) =>{
//         setFormData({ ...formData, [e.target.data.name]: e.target.data.value})
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         const result = await login (
//             formData.data.email,
//             formData.data.password
//         )
//         if (result.success) {
//             showSuccess(result.message)
//             navigate('/products')
//         } else {
//             showError(result.error)
//             setError(result.error) 
//         }
//         setLoading(false)
//     }
    
    
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black">
//         <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">Login</h1>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Email:
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div>
//               <label
//                 className="block text-sm font-medium text-gray-700 mb-2"
//                 htmlFor="password"
//               >
//                 Mot de passe:
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <button
//               className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               type="submit"
//             >
//               Se connecter
//             </button>
//             <p className='text-sm text-gray-500'>Pas encore de compte ? <a href='/register' className='text-blue-500'>Inscrivez-vous</a></p>
//           </form>
//         </div>
//       </div>
//     );
// }
