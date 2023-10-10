
"use strict";


document.addEventListener('DOMContentLoaded', () => {

    // Burger

    function burgerClick() {
        const burger = document.querySelector('.header__burger');
        const menu = document.querySelector('.header__nav');
        const btn = document.querySelector('.header__btn');
        const body = document.body;

        const menuMobile = document.createElement('div');
        menuMobile.classList.add('menu-mobile');

        if (burger) {
            burger.addEventListener('click', () => {
                burger.classList.toggle('_active');
                body.classList.toggle('_active');
                menuMobile.classList.toggle('_active');
            });

            if (document.documentElement.clientWidth <= 992) {
                burger.insertAdjacentElement('afterend', menuMobile);
                menuMobile.insertAdjacentElement('beforeend', menu);
            }
            if (document.documentElement.clientWidth <= 425) {
                menuMobile.insertAdjacentElement('beforeend', btn);
            }
        }
    }
    burgerClick();

    //========================================================================


    // About Photo Sort

    function aboutFotoSort() {
        const items = document.querySelectorAll('.about-content__photo-item');
        if (items.length > 0) {
            for (let index = 0; index < items.length; index++) {
                const item = items[index];
                const img = item.querySelector('.about-content__photo-img img');
                if (document.documentElement.clientWidth <= 992) {
                    if (!img) {
                        item.classList.add('_none');
                    }
                }
            }
        }
    }
    aboutFotoSort();

    //=============================================================================


    // Modal Open

    function bodyActiveNotMobile(body) {
        if (document.documentElement.clientWidth > 425) {
            body.classList.remove('_active');
        }
    }

    function btnHeaderClick() {
        const btnHeader = document.querySelector('.header__btn');
        const modal = document.querySelector('.modal');
        const modalClose = document.querySelector('.modal__close');
        const body = document.body;
        if (modal) {
            btnHeader.addEventListener('click', () => {
                modal.classList.add('_active');
                if (document.documentElement.clientWidth > 425) {
                    body.classList.add('_active');
                }
            });
            modalClose.addEventListener('click', () => {
                modal.classList.remove('_active');
                bodyActiveNotMobile(body);
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('_active');
                    bodyActiveNotMobile(body);
                }
            });
        }
    }
    btnHeaderClick();

    //=======================================================================================

    // Google Api

    function removeActiveClassInfo(placeMapGps) {
        for (let index = 0; index < placeMapGps.length; index++) {
            const element = placeMapGps[index];
            element.classList.remove('_active');
        }
    }

    function addPlaceGoogleApi(position, map, title, element, placeMapGps, searchText) {
        const marker = new google.maps.Marker({
            position: position,
            map: map,
            title: title,
        });
        marker.addListener("click", () => {
            console.log(marker.title);
            if (element.dataset.coord === marker.title) {
                removeActiveClassInfo(placeMapGps);
                element.classList.add('_active');
                searchText.textContent = marker.title;
            }
        });
    }

    function initMap() {
        const placeMap = document.querySelector('.contacts-content__map-item');
        const placeMapGps = document.querySelectorAll('.contacts-content__search-item');
        const searchText = document.querySelector('.contacts-content__search-text');

        if (placeMap) {
            const map = new google.maps.Map(
                placeMap,
                {
                    zoom: 3,
                    center: { lat: 53.37502789122289, lng: 83.7547769982523 },
                    mapTypeControl: true,
                }
            );
            for (let index = 0; index < placeMapGps.length; index++) {
                const element = placeMapGps[index];
                const gps = element.querySelector('.contacts-content__info-coord');
                const title = element.dataset.coord;
                let str = gps.textContent.split(',');

                addPlaceGoogleApi({ lat: Number(str[0]), lng: Number(str[1]) }, map, title, element, placeMapGps, searchText);
            }
        }
    }
    initMap();

    //=======================================================================================


    // Contacts Search Item
    const search = document.querySelector('.contacts-content__search-header'); //Поле ввода
    function infoSortItems(infoItems, searchBodyItem) {
        for (let index = 0; index < infoItems.length; index++) {
            const infoItem = infoItems[index];

            if (infoItem.dataset.coord === searchBodyItem.textContent.trim()) {
                removeActiveClassInfo(infoItems);
                infoItem.classList.add('_active');
            }
        }
    }

    function clickContactsSearch() {

        const searchBody = document.querySelector('.contacts-content__search-body');   //Выпадающий список
        const searchBodyList = document.querySelector('.contacts-content__search-body-items');   // список городов
        // const searchBodyItems = document.querySelectorAll('.contacts-content__search-body-item'); //список городов в выпадающем списке
        const infoItems = document.querySelectorAll('.contacts-content__search-item'); // массив данных города
        const arrowWrap = document.querySelector('.contacts-content__search-img');
        const arrowList = document.querySelector('.contacts-content__search-img>img');

        let cityListItems = []; //Список объектов городов
        let cityList = []; //Список городов (string)
        infoItems.forEach((item) => {
            cityList.push(item.dataset.coord);
        })
        cityList.sort();


        // Генерация списка городов на странице
        function ListShow(array) {
            searchBodyList.innerHTML = '';

            array.forEach((item) => {
                let li = document.createElement('li');
                li.classList.add('contacts-content__search-body-item');
                li.textContent = item;
                searchBodyList.append(li);
                cityListItems.push(li);
            })
        }
        ListShow(cityList);


        function openList() {
            searchBody.classList.add('_active');
            arrowWrap.classList.add('active')
        }

        function closeList() {
            searchBody.classList.remove('_active');
            arrowWrap.classList.remove('active')
        }

        function searchCity() {
            searchBodyList.innerHTML = '';
            if (search.value == '') {
                ListShow(cityList);
            }
            else {
                let cityListFilter = cityList.filter((item) => {
                    return (new RegExp(`^${search.value}`, 'ig').test(item));
                })
                ListShow(cityListFilter);
            }
        }



        if (search.value == '') {
            infoItems[0].classList.add('_active');
        }

        search.addEventListener('input', () => {
            openList();
            searchCity();
        });

        document.addEventListener('click', (event) => {
            if (event.target == arrowList || event.target == search) {
                searchBody.classList.toggle('_active');
                arrowWrap.classList.toggle('active');
                search.value = '';
                setTimeout(() => ListShow(cityList), 500);
            } else if (cityListItems.find((item) => item == event.target) !== undefined) {
                closeList();
                infoSortItems(infoItems, event.target);
                search.value = event.target.textContent
            }
            else {
                if (searchBody.classList.contains('_active')) {
                    search.value = '';
                }
                closeList();
                setTimeout(() => ListShow(cityList), 500);
            }
        })

        // Старый код выбора города

        // if (search) {
        //     infoItems[0].classList.add('_active');
        //     search.addEventListener('focus', () => {
        //         searchBody.classList.toggle('_active');
        //     });
        //     for (let index = 0; index < searchBodyItems.length; index++) {
        //         const searchBodyItem = searchBodyItems[index];

        //         searchBodyItem.addEventListener('click', () => {
        //             searchText.textContent = searchBodyItem.textContent;
        //             searchBody.classList.remove('_active');
        //             infoSortItems(infoItems, searchBodyItem);
        //         });
        //     }
        // }

    }
    if (search) {
        clickContactsSearch();
    }

    //===========================================================================================


    // Send MAil

    function sendMailCatalog() {
        const forms = document.querySelectorAll('form');
        const succes = document.querySelectorAll('.modal__success');

        if (forms.length > 0) {
            for (let index = 0; index < forms.length; index++) {
                const form = forms[index];

                form.addEventListener('submit', formSend);
                async function formSend(e) {
                    e.preventDefault();

                    let formData = new FormData(form);
                    let response = await fetch('mail.php', {
                        method: 'POST',
                        body: formData
                    });
                    if (response.ok) {
                        form.reset();
                        succes[index].classList.add('_active');
                    } else {
                        // alert("Ошибка");
                        succes[index].classList.add('_active');
                    }
                }
            }
        }
    }
    sendMailCatalog();

    //===========================================================================

    // animation Star

    const star = document.querySelector('.star');

    star.addEventListener('pointermove', startAnimation);

    function startAnimation() {
        star.classList.add('animate');
        star.removeEventListener('pointermove', startAnimation);
        setTimeout(() => {
            star.classList.remove('animate');
            star.addEventListener('pointermove', startAnimation);
        }, 9000);
    }



});