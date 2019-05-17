const modalController = (modalName, buttonClass, buttonClose) => {
   const toggleModal = () => {
      if (modalName) modalName.classList.toggle('show-modal');
    };
    
    for (let index = 0; index < buttonClass.length; index++) {
      buttonClass[index].addEventListener('click', toggleModal);
    }
    if (buttonClose) buttonClose.addEventListener('click', toggleModal);
}

/*
*============================================
*           Edit My Adert modal script
*============================================
*/
const closeButton = document.querySelector('.close-button');

const editAdvertModal = document.querySelector('.editAdvertModal');
const  clickAdverts = document.querySelectorAll('.edit');

modalController(editAdvertModal, clickAdverts, closeButton);

/*
*============================================
*            Order modal script
*============================================
*/

const orderModal = document.querySelector('.orderModal');
const clickedOrder = document.querySelectorAll('.order');

modalController(orderModal, clickedOrder, closeButton);