import { observable, decorate, runInAction, action, computed } from "mobx";

class AddFlower {
    tooltip = {
        backgroundColor: "white",
        top: "0px",
        left: "0px",
        display: "none"
    }

    isThereURL = false;
    isThereFile = false;

    errorText = '';

    colorPickers = [
        {
            color: "#000000",
            hidePlus: false
        },

        this.defaultColorPickerValues(),

        this.defaultColorPickerValues()

    ]

    lastColorPicker = 0;
    totalColorPickers = 3;

    imageInput = {
        file: {
            isThere: false,
            required: true
        },
        
        url: {
            isThere: false,
            required: false
        }
    }

    defaultColorPickerValues() {
        return {
            color: "#000000",
            visibility: 'collapse',
            hideMinus: true,
            name: undefined
        }
    }

    setColorPicker(color) {
        this.colorPickers[this.lastColorPicker].color = color;
    }

    addColorPicker = () => {
        this.lastColorPicker = this.lastColorPicker + 1;
        if (this.lastColorPicker + 1 === this.totalColorPickers) {
            this.colorPickers[0].hidePlus = true;
            this.colorPickers[1].hideMinus = true;
        }
        this.colorPickers[this.lastColorPicker].visibility = 'visible';
        this.colorPickers[this.lastColorPicker].name = 'color';
        this.colorPickers[this.lastColorPicker].hideMinus = false;
    }

    deleteColorPicker = () => {
        this.colorPickers[this.lastColorPicker] = this.defaultColorPickerValues();
        if (this.lastColorPicker + 1 == this.totalColorPickers) {
            this.colorPickers[this.lastColorPicker - 1].hideMinus = false;
        }
        this.colorPickers[0].hidePlus = false;
        this.lastColorPicker = this.lastColorPicker - 1;
    }
}

decorate(AddFlower, {
    isThereFile: observable,
    isThereURL: observable,
    errorText: observable,
    imageInput: observable,
    colorPickers: observable,
    setColorPicker: action,
    addColorPicker: action,
    deleteColorPicker: action,
});

export default new AddFlower();