export const games = [
    {
        id: 1,
        title: 'Гра №1',
        date: '18 квіт. 15:30',
        location: 'Ужгород',
        price: 600,
        totalSpots: 32,
        freeSpots: 29,
        duration: '2 год 30 хв' ,
        players: [
            { id: 1, nickname: 'Gerero_228', handle: '@gerero', paid: true },
            { id: 2, nickname: 'Danyachy00', handle: '@Danik_kros', paid: false },
            { id: 3, nickname: 'Qutik', handle: '@Ivanchos', paid: true },
        ],
        isRegistered: true
    } ,
    {
        id: 2,
        title: 'Гра №2',
        date: '22 квіт. 10:00',
        location: 'Мукачево',
        price: 600,
        totalSpots: 20,
        freeSpots: 15,
        duration: '2 год 30 хв' ,
        players: [
            { id: 1, nickname: 'Gerero_228', handle: '@gerero', paid: true },
            { id: 2, nickname: 'Danyachy00', handle: '@Danik_kros', paid: false },
            { id: 3, nickname: 'Qutik', handle: '@Ivanchos', paid: true },
        ],
        isRegistered: false,
    },
]

export const currentUser ={
    username: 'Gerero_228',
}

