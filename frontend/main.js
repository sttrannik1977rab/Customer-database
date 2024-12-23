( async() => {
    ///Вызываем необходимые элементы и задаем переменные:
    const body = document.body;
    const formSearchClient = document.querySelector('.header__form'); //форма поиска клиента
    const inputSearchClient = document.querySelector('.header__input'); //поле поиска для ввода данных клиента
    const buttonCreatingClient = document.querySelector('.btn'); // кнопка создания нового клиента
    const table = document.querySelector('.table'); //таблица с данными клиентов
    const tbody = document.querySelector('.table__body'); //сам элемент, куда будут записываются данные клиента(таблица)

    const baseUrl = 'http://localhost:3000/api/clients'; //Задаем переменную на адрес сервера

    const todayDate = new Date(); //текущая дата

    let clientsList = []; //Создаем пустой массив, в который будут передаваться данные с сервера (записываться данные)

    
    // //Функция запроса данных с сервера
    // async function getClientServer() {
    //     //Отправляем запрос на сервер
    //     let response = await fetch(baseUrl);

    //     //Получаем данные с сервера в формате JSON
    //     let data = await response.json();
    //     return data;
    // }

    // //Записываем полученные данные в наш массив
    // clientsList = await getClientServer();

    // //Функция добавления данных студента на сервер
    // async function addClientServer(clientObj) {
    //     let response = await fetch(baseUrl, {
    //         method: "POST",
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(clientObj)
    //     })

    //     let data = await response.json();
    //     return data;
    // }

    // //Функция удаления карточки студента с сервера
    // async function deleteClientServer(id) {
    //     let response = await fetch(`${baseUrl}/${id}`, {
    //         method: "DELETE",
    //     });

    //     let data = await response.json()

    //     return data;
    // }

    // //Функция изменения данных в карточке студента
    // async function changeClientServer(clientObj) {

    //     let response = await fetch(`${baseUrl}/${clientObj.id}`, {
    //         method: 'PATCH',
    //         body: JSON.stringify(clientObj),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     })

    //     let data = await response.json()

    //     return data;
    // }

    //Функция создания и запуска модального окна.
    function createModalWindow() {
        //Создаем блок (он же фон) для модального окна и присваиваем ему класс:
        const modalWindowBlock = document.createElement('modal');
        modalWindowBlock.classList.add('modal');

        //Создаем HTML-элемент модального окна и присваиваем ему класс:
        const modalWindow = document.createElement('div');
        modalWindow.classList.add('modal__window');

        //Создаем элемент закрытия модального окна (крестик) и присваиваем ему класс
        const modalWindowClose = document.createElement('div');
        modalWindowClose.classList.add('modal__close');

        //Создаем элемент, в котором будет содержаться контент модального окна.
        //Для удобной верстки внутреннего содержимого устанавливаем относительное
        //позиционирование относительно нашего модального окна. Присваиваем ему класс
        const modalWindowContent = document.createElement('div');
        modalWindowContent.classList.add('modal__content');

        //Добавляем элемент закрытия в модальное окно:
        modalWindow.append(modalWindowClose, modalWindowContent);

        //Теперь записываем в блок элемент модального окна:
        modalWindowBlock.append(modalWindow)

        //Добавляем элемент модального окна в верстку:
        body.prepend(modalWindowBlock);


        //На крестик вешаем обработчик события. По нажатию на него модальное окно будет закрываться:
        modalWindowClose.addEventListener('click', () => {
            modalWindowBlock.style.display = "none";

        });

        //Также вешаем обработчик события закрытия модального окна на блок (фон):
        modalWindowBlock.addEventListener("click", (e) => {
            if(e.target === modalWindowBlock) {
                modalWindowBlock.style.display = "none";
            }            
            
        });

        return {
            modalWindowBlock,
            modalWindow,
            modalWindowContent,
            modalWindowClose
        }
    }

    // // //Функция создания или изменения карточки клиента (строка в таблице).
    // // //Данная функция создает строку и добавляет ее в таблицу
    // function createCardClient(clientObj) {
    //     console.log(clientObj); //Проверка!!!

    //     //Создаем HTML-элемент строки и задаем ему класс:
    //     const tr = document.createElement('tr');
    //     tr.classList.add('table__tr');

    //     //Систематизируем данные студента из объекта,
    //     //присваиваем переменным и записываем в соответствующие колонки:
    //     const clientId = clientObj.id;
    //     const fullName = `${clientObj.surname} ${clientObj.name} ${clientObj.lastname}`;
    //     const dateCreation = `${todayDate.getDate()}.${todayDate.getMonth() + 1}.${todayDate.getFullYear()}  ${todayDate.getHours()}:${todayDate.getMinutes()}`
    //     const dateChange = `${todayDate.getDate()}.${todayDate.getMonth() + 1}.${todayDate.getFullYear()}  ${todayDate.getHours()}:${todayDate.getMinutes()}`

    //     //Формируем табличную строку с данными клиента (полученными с сервера)
    //     let cardClient = `
    //     <td class="table__td">${clientId}</td>
    //     <td class="table__td">${fullName}</td>
    //     <td class="table__td">${dateCreation}</td>
    //     <td class="table__td">${dateChange}</td>
    //     <td class="table__td">${contacts}</td>
    //     `;

    // }

    // //Функция заполнения таблицы. Функция принимает массив с объектами клиентов (карточками), перебирает этот массив и на каждой
    // //итерации (для каждого объекта) вызывает, выше созданную, функцию создания карточки клиента.
    // function renderClientsTable(clientsArray) {
    //     console.log(clientsList); //Проверка!!!
    //     //Перед каждым использованием данной функции очищаем переменную, чтобы избежать копирования данных:
    //     tbody.innerHTML = '';
    //     //Для прохождения по массиву используем метод forEach и для каждого клиента вызываем функцию создания:
    //     studentsArray.forEach(client => {
    //         createCardClient(client);
    //     })

    // }

    //Функция создания формы для добавления нового клиента.
    function createFormClient() {
        //Вызываем функцию создания модального окна
        const modalWindow = createModalWindow();

        //Создаем элемент form и присваиваем ему классы
        const formAddClient = document.createElement('form');
        formAddClient.classList.add('form-client');

        //Создаем заголовок формы, присваиваем ему классы и добавляем текст
        let formTitle = document.createElement('h2');
        formTitle.classList.add('form-client__title');
        formTitle.textContent = 'Новый клиент';

        //Создаем поля ввода данных клиента (ненумерованным списком)
        const formItems = document.createElement('ul');
        formItems.classList.add('form-client__items', 'list-reset');

        //Фамилия
        const formItemLastname = document.createElement('li');
        formItemLastname.classList.add('form-client__item', 'flex');
        const formLabelLastname = document.createElement('label');
        formLabelLastname.classList.add('form-client__label');
        formLabelLastname.setAttribute('for', 'form-client__lastname')
        const formInputLastname = document.createElement('input');
        formInputLastname.classList.add('form-client__input');
        formInputLastname.placeholder = 'Фамилия*';
        formInputLastname.id = 'form-client__lastname';
        formItemLastname.append(formLabelLastname, formInputLastname);

        //Имя
        const formItemName = document.createElement('li');
        formItemName.classList.add('form-client__item', 'flex');
        const formLabelName = document.createElement('label');
        formLabelName.classList.add('form-client__label');
        formLabelName.setAttribute('for', 'form-client__name')   
        const formInputName = document.createElement('input');
        formInputName.classList.add('form-client__input');
        formInputName.placeholder = 'Имя*';
        formInputName.id = 'form-client__name';
        formItemName.append(formLabelName, formInputName);

        //Отчество
        const formItemSurname = document.createElement('li');
        formItemSurname.classList.add('form-client__item', 'flex');
        const formLabelSurname = document.createElement('label');
        formLabelSurname.classList.add('form-client__label');
        formLabelSurname.setAttribute('for', 'form-client__surname');
        const formInputSurname = document.createElement('input');
        formInputSurname.classList.add('form-client__input');
        formInputSurname.placeholder = 'Отчество';
        formInputSurname.id = 'form-client__surname';
        formItemSurname.append(formLabelSurname, formInputSurname);

        //Добавляем созданные li в список
        formItems.append(formItemLastname, formItemName, formItemSurname);

        //Создаем кнопку добавления клиента
        const buttonСreationClient = document.createElement('button');
        buttonСreationClient.classList.add('form-client__btn');
        buttonСreationClient.textContent = 'Добавить клиента';

        //Добавляем созданные элементы в форму
        formAddClient.append(formTitle, formItems);

        




        //Добавляем форму в блок модального окна
        modalWindow.modalWindowContent.append(formAddClient, buttonСreationClient);
        
        
    }

    //Вешаем на кнопку "Добавить клиента" обработчик события. По клику будет появляться модальное окно
    //с формой добавления (изменения, удаления) клиента.
    buttonCreatingClient.addEventListener('click', () => {
        //По клику запускаем функцию создания модального окна:
        createFormClient();   
        
    })

}) ();
