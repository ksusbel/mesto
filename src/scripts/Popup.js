export class Popup {
    #popup;    

    constructor(popupSelector) {     
      this.#popup = document.querySelector(popupSelector);
    }
  
    open() {
        this.#popup.classList.add("popup_opened");
        document.addEventListener("keydown", this.#handleEscClose);
    }
  
    close() {
        this.#popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this.#handleEscClose);
    }
  
    #handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            const openedPopup = document.querySelector(".popup_opened");
            close(openedPopup);
        }
    }
  
    setEventListeners() {
      this.#popup.addEventListener('mousedown', (evt) => {    
        if (evt.target.classList.contains("popup__overflow")) {
            this.close();
        }
        if (evt.target.classList.contains("popup__close")) {
            this.close();
        }       
      });
    }

  }



 