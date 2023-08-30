const oppoStatus = [
    {
        "K_OPPO_STATUS": 1,
        "STATUS": "1. Initial Contact",
        "SUCCESS": 0
    },
    {
        "K_OPPO_STATUS": 2,
        "STATUS": "2. Demonstration",
        "SUCCESS": 25
    },
    {
        "K_OPPO_STATUS": 3,
        "STATUS": "3. Proposal",
        "SUCCESS": 50
    },
    {
        "K_OPPO_STATUS": 4,
        "STATUS": "4. Negotiation",
        "SUCCESS": 75
    },
    {
        "K_OPPO_STATUS": 5,
        "STATUS": "5. Order",
        "SUCCESS": 100
    }
];

const FormComponent = class {

    #defaultOptions = {
        selectElement: 'select',
        inputElement: 'input',
        output: '.output'
    };


    /**
     * @param {HTMLFormElement} formSelector 
     */
    constructor(formSelector, statusData, options = {}) {

        this.form = document.querySelector(formSelector);
        this.statusData = statusData;
        this.options = { ...this.#defaultOptions, ...options };
        this.selectElement = this.form.querySelector(this.options.selectElement);
        this.inputElement = this.form.querySelector(this.options.inputElement);
        this.output = document.querySelector(this.options.output);

    }
    start() {
        // Start modifying the form elements here!
        // You are allowed to add extra methods, properties or change the constructor of this class
        this.onPageLoadFillSelectElement();
        this.onSelectValueChangeHandler();
        this.onFormSubmitHandler();
    }

    onPageLoadFillSelectElement() {
        let html = '';
        for (const statusElement of this.statusData) {
            const { K_OPPO_STATUS: kOppoStatus, STATUS: status } = statusElement;
            html += `
                <option value="${kOppoStatus}">${status}</option>
            `;
        }
        this.selectElement.innerHTML = html;
        this.inputElement.value = this.statusData[0].SUCCESS;
    }

    onSelectValueChangeHandler() {
        this.selectElement.addEventListener('change', () => {
            const selectedIndex = this.selectElement.selectedIndex;
            this.inputElement.value = this.statusData[selectedIndex].SUCCESS;
        })
    }

    onFormSubmitHandler() {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            let statusIndex = +this.selectElement.selectedIndex + 1;
            let successValue = +this.inputElement.value;

            this.output.innerHTML = JSON.stringify({ status: statusIndex, success: successValue });
        })
    }
}

const fc = new FormComponent('form', oppoStatus);
fc.start();