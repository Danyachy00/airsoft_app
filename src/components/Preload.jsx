import scope from '../assets/scope.png'
import logo from '../assets/logo.png'
import {useEffect, useState} from 'react'
import '/src/App.css'
import {useNavigate} from 'react-router-dom'

const Preload = () => {
    const navigate = useNavigate();
    const [dots, setDots] = useState('')

    const [preload, setPreload] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPreload(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + 2
            })
        }, 90)
        return () => clearInterval(interval)
    }, [])


    useEffect(() => {
        if (preload >= 100) {
            navigate('/games')
        }
    }, [navigate, preload])



    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => {
                if (prev === '...') return ''
                return prev + '.'
             })
            }, 400)
            return () => clearInterval(interval)
        }, [])

        return (
            <section className="flex flex-col items-center justify-center w-full min-h-screen gap-14">
                <div className=" max-w-75 max-h-75 flex  items-center justify-center">
                    <img src={scope} alt="logo"/>
                </div>

                <div className="flex flex-col items-center justify-center gap-2.5">
                    <img src={logo} alt="logo" className="max-w-50.5"/>
                    <p className='text-10px text-[#596066] border-t border-[#ffffff]'>VERSION 1.0</p>
                </div>

                <div className="flex flex-col items-center justify-center gap-1">
                    <p>Завантаження{dots}</p>
                    <div className="bar">
                        <div className="fill" style={{ width: `${preload}%` }} />
                    </div>
                </div>
            </section>

        )
}
    export default Preload
