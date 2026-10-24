import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {User, Phone} from 'lucide-react'
import {useUser} from '../context/useUser.js'
import {getProfile, updateProfile} from '../helpers/profile.js'

const PHONE_PREFIX = '+380'
const PHONE_PATTERN = /^\+380\d{9}$/

// Приводить будь-яке введення до формату +380#########
const maskPhone = (raw) => {
    let digits = raw.replace(/\D/g, '')

    if (digits.startsWith('380')) {
        digits = digits.slice(3)
    } else if ('380'.startsWith(digits)) {
        // користувач стер частину префікса
        digits = ''
    } else if (digits.startsWith('0')) {
        digits = digits.slice(1)
    }

    return PHONE_PREFIX + digits.slice(0, 9)
}

const toForm = (user) => ({
    name: user?.name ?? '',
    phone: user?.phone ? maskPhone(user.phone) : '',
    age: user?.age ?? '',
    exp: user?.exp ?? '',
})

const ProfileEdit = () => {
    const navigate = useNavigate()
    const {user, setUser} = useUser()

    const [form, setForm] = useState(() => toForm(user))
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0)

        getProfile()
            .then(fresh => {
                setUser(fresh)
                setForm(toForm(fresh))
            })
            .catch(err => console.error(err))
    }, [setUser])

    const handleChange = (field) => (e) => {
        setForm(prev => ({...prev, [field]: e.target.value}))
    }

    const handleSave = async () => {
        if (!form.name.trim()) {
            setError('Вкажіть нікнейм')
            return
        }

        const phone = form.phone === PHONE_PREFIX ? '' : form.phone
        if (phone && !PHONE_PATTERN.test(phone)) {
            setError('Номер телефону має бути у форматі +380XXXXXXXXX')
            return
        }

        setSaving(true)
        setError('')
        try {
            const updated = await updateProfile({
                name: form.name.trim(),
                phone: phone || null,
                age: form.age === '' ? null : Number(form.age),
                exp: form.exp.trim() || null,
            })
            setUser(updated)
            navigate('/profile')
        } catch (err) {
            console.error(err)
            const errors = err.response?.data?.errors
            setError(errors
                ? Object.values(errors).flat().join(' ')
                : 'Не вдалось зберегти профіль. Спробуйте ще раз')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="register-page app-page">
            <div className='register-header app-container'>
                <div>
                    <button onClick={() => navigate(-1)}>
                        {'< Повернутись до профілю'}
                    </button>
                </div>

                <div className="flex flex-col mt-5 mb-3">
                    <h1 className='font-bold text-2xl'>Редагування профілю</h1>
                    <h3 className='text-[#333B45]'>Ці дані використовуються для запису на ігри</h3>
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
                        <input className="h-10 w-full rounded-[10px] border border-[#8C999E] bg-[#1F2426] pl-3"
                               placeholder={'Ваш Нік'}
                               type={'text'}
                               value={form.name}
                               onChange={handleChange('name')}/>
                    </div>
                    <div className="mb-5.5">
                        <div className="flex gap-2.5 mb-3">
                            <Phone size={24} strokeWidth={1.5} color="#596166"/>
                            <p className=" text-[#596166]">Номер телефону</p>
                        </div>
                        <input className="h-10 w-full rounded-[10px] border border-[#8C999E] bg-[#1F2426] pl-3"
                               placeholder={'+380XXXXXXXXX'}
                               type={"tel"}
                               inputMode={'numeric'}
                               value={form.phone}
                               onFocus={() => !form.phone && setForm(prev => ({...prev, phone: PHONE_PREFIX}))}
                               onBlur={() => form.phone === PHONE_PREFIX && setForm(prev => ({...prev, phone: ''}))}
                               onChange={e => setForm(prev => ({...prev, phone: maskPhone(e.target.value)}))}/>
                    </div>
                    <div className="register-form__grid">
                        <div>
                            <p className="text-[#596166] pb-1">ВІК</p>
                            <input className="h-10 w-full rounded-[10px] border border-[#8C999E] bg-[#1F2426] pl-3"
                                   placeholder={'Ваш вік'}
                                   type={'number'}
                                   inputMode={'numeric'}
                                   value={form.age}
                                   onChange={handleChange('age')}/>
                        </div>
                        <div className="mb-5.5">
                            <p className="text-[#596166] pb-1">Досвід гри</p>
                            <input className="h-10 w-full rounded-[10px] border border-[#8C999E] bg-[#1F2426] pl-3"
                                   placeholder={'Досвід гри'}
                                   value={form.exp}
                                   onChange={handleChange('exp')}/>
                        </div>
                    </div>

                    <div>
                        {error && <p className="text-[#ff6b6b] text-sm normal-case">{error}</p>}

                        <button className="mt-3 h-12 w-full rounded-[10px] border border-white text-sm"
                                disabled={saving}
                                onClick={handleSave}>
                            {saving ? 'ЗБЕРІГАЄМО...' : 'ЗБЕРЕГТИ'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileEdit
