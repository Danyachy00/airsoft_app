import {useNavigate, useParams} from 'react-router-dom';
import {User, Phone, Square, SquareCheck,X, Info} from 'lucide-react';
import {useEffect, useState} from "react";

const Register = ({onConfirmRegistration}) => {
    const navigate = useNavigate();
    const {id} = useParams()
    const gameId = Number(id)

    const [rules, setRules] = useState(false)
    const [personal, setPersonal] = useState(false)
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const confirmRegistration = () => {
        if (!Number.isNaN(gameId)) {
            onConfirmRegistration(gameId)
            navigate(`/games/${gameId}`)
            return
        }

        navigate('/games')
    }


    return (
        <div className="register-page app-page">
            <div className='register-header app-container'>
                <div>
                    <button
                        onClick={() => navigate(-1)}
                    >
                        {'< Повернутись до деталей'}
                    </button>
                </div>

                <div className="flex flex-col mt-5 mb-3">
                    <h1 className='font-bold text-2xl'>Запис на гру</h1>
                    <h3 className='text-[#333B45]'>Заповніть дані для реєстрації</h3>
                </div>
                <hr className="mb-10"/>
            </div>
            <div className="register-form app-container">
                <div className="register-form__inner">
                    <div className="mb-6.5">
                        <div className="flex gap-2.5 mb-3">
                            <User size={24} strokeWidth={1.5} color="#596166"/>
                            <p className=" text-[#596166]">Нікнейм</p>
                        </div>
                        <div>
                            <input className="h-10 w-full rounded-[10px] border border-[#8C999E] bg-[#1F2426] pl-3"
                                   placeholder={'Ваш Нік'}
                                   type={'text'}/>
                        </div>
                    </div>
                    <div className="mb-5.5">
                        <div className="flex gap-2.5 mb-3">
                            <Phone size={24} strokeWidth={1.5} color="#596166"/>
                            <p className=" text-[#596166]">Номер телефону</p>
                        </div>
                        <div>
                            <input className="h-10 w-full rounded-[10px] border border-[#8C999E] bg-[#1F2426] pl-3"
                                   placeholder={'+380 XX XXX XXXX'}
                                   type={"tel"}/>
                        </div>
                    </div>
                    <div className="register-form__grid">
                        <div>
                            <p className="text-[#596166] pb-1">ВІК</p>
                            <input className="h-10 w-full rounded-[10px] border border-[#8C999E] bg-[#1F2426] pl-3"
                                   placeholder={'Ваш вік'}/>
                        </div>
                        <div className="mb-5.5">
                            <p className="text-[#596166] pb-1">Досвід гри</p>
                            <input className="h-10 w-full rounded-[10px] border border-[#8C999E] bg-[#1F2426] pl-3"
                                   placeholder={'Досвід гри'}/>
                        </div>
                    </div>

                    <div className="mb-5.5">
                        <p className="text-[#596166] pb-1">НОТАТКА (НЕ ОБОВ'ЯЗКОВО)</p>
                        <textarea className="h-35 w-full rounded-[10px] border border-[#8C999E] bg-[#1F2426] py-3 px-4"
                                  placeholder={'Досвід гри'}
                                  type={'text'}/>
                    </div>

                    <div className='flex gap-2.5 mb-3'>
                        <button
                            onClick={() => setRules(!rules)}>
                            {rules ? (
                                    <SquareCheck strokeWidth={2} width={23}/>

                                ) :
                                <Square strokeWidth={2} width={23}/>
                            }
                        </button>
                        <p className='text-[15px]'>Погоджуюсь з <a href={''} className='text-[#33CC66] text-[15px]'>правилами
                            гри </a></p>
                    </div>
                    <div className='flex gap-2.5  mb-3'>
                        <button
                            onClick={() => setPersonal(!personal)}>
                            {personal ? (
                                    <SquareCheck strokeWidth={2} width={23}/>

                                ) :
                                <Square strokeWidth={2} width={23}/>
                            }
                        </button>
                        <p className='text-[14px]'>Погоджуюся на обробку<a href={''} className='text-[#33CC66] text-[15px]'> персональних даних </a></p>
                    </div>
                    <div>
                        {alert && (
                            <div style={{
                                position: 'fixed',
                                inset: 0,
                                background: 'rgba(0, 0, 0, 0.75)',
                                zIndex: 100,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>

                                <div
                                    className="register-modal">
                                        <div className=" flex justify-end ">
                                            <button onClick={() => setAlert(false)}>
                                                <X/>
                                            </button>
                                        </div>
                                    <div className="flex flex-col gap-2  items-center">
                                        <p>УВАГА</p>
                                        <div className="border border-white rounded-[10px] bg-[#212121] p-4.5 ">
                                            <p>ПОВНА ЦІНА ГРИ: 600 грн
                                                Ціна запису 100 грн
                                                Залишок 500 грн
                                            </p>
                                        </div>
                                        <p>Оплата запису</p>
                                        <div>
                                            <div className="border border-white rounded-[10px] bg-[#212121] p-2.5 flex gap-1">
                                                <Info size={18} className="shrink-0 mr-0.5 mt-0.5"/>
                                                <p className="text-[#B3B3B3]">  Ми надішлемо вам платіжні дані для оплати запису. Оплата за гру здійснюється після її завершення.
                                                </p>
                                            </div>
                                        </div>

                                        <button className="mt-2 h-12 w-full rounded-[10px] border border-white text-sm"
                                                onClick={confirmRegistration}>
                                            ПІТВЕРДИТИ ЗАПИС
                                        </button>

                                    </div>
                                </div>
                            </div>
                        )}

                        <button className="mt-3 h-12 w-full rounded-[10px] border border-white text-sm"
                                onClick={() => setAlert(true)}>
                            Завершіть заповнення форми
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Register
