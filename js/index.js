const URL = 'overall_balance_get';

const overallBalance = document.querySelector('#overall-balance');
const errorMessage = document.querySelector('#error-message');
const createOperationForm = document.querySelector('#create-operation');
const editOperationForm = document.querySelector('#edit-operation');
const deleteOperationForm = document.querySelector('#delete-operation');

const renderOverallBalance = (value) => {
    const showError = () => {
        alert("Произошла ошибка при получении данных с сервера (невалидное значение)");
        errorMessage.innerText = 'Ошибка: невалидное значение';
        console.error(`error: invalid data`);
    }

    const showValue = () => {
        errorMessage.innerText = '';
        overallBalance.innerText = Number(value.toFixed(2)).toLocaleString();
    }

    typeof value === 'number' ? showValue() : showError();
}

const fetchGet = async (path) => {
    try {
        const response = await fetch(`https://standfin-1e3cd-default-rtdb.firebaseio.com/${path}.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json();
        renderOverallBalance(result.overall_balance)
    } catch (error) {
        console.error(`error: ${error.message}`);
        alert("Произошла ошибка при получении данных с сервера");
    }

}

const fetchPatch = async (path) => {
    const MAX_VALUE = 99999;
    const value = Math.random() * MAX_VALUE;

    try {
        const response = await fetch(`https://standfin-1e3cd-default-rtdb.firebaseio.com/${path}.json`, {
            method: 'PATCH',
            body: JSON.stringify({
                overall_balance: value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.error(`error: ${error.message}`);
        alert("Произошла ошибка при отправке данных на сервер");
    }
}

window.addEventListener('load', () => {
    fetchGet(URL)
})

const updateOverallBalance = () => {
    fetchPatch(URL)
        .then(() => fetchGet(URL))
}

createOperationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    updateOverallBalance();
})

editOperationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    updateOverallBalance();
})

deleteOperationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    updateOverallBalance();
})