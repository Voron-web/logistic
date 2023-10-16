function auth(logpass) {
    let url = 'https://id.entera.pro/api/v1/login/'
    let data = JSON.stringify(logpass)
    return response = fetch(url, {
        // mode: 'no-cors',
        method: 'POST',
        headers: {
            // "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Origin": 'spegat.com',
            "Access-Control-Allow-Origin": '127.0.0.1:5500',
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Origin",
            'Content-Type': 'application/json',
        },
        body: data
        // body: `{
        //     "login": "victor.makarov@axiom24.ru",
        //     "password": "gM!FKt2pUbEAWxS"
        // }`,
    }).then((data) => {
        return data.response
    }).then((data2) => {
        console.log(data2);
    }).catch((err => {
        console.log(err);
    }))
}

// auth(, 'https://app.entera.pro/api/v1/currentUser')