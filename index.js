document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('newItem');
    const addButton = document.getElementById('addButton');
    const clearButton = document.getElementById('clearList');
    const checkoutButton = document.getElementById('checkoutButton');
    const listContainer = document.getElementById('shoppingList');

    let itemsArray = JSON.parse(localStorage.getItem('items')) || [];

    // Function to render the list
    function renderList() {
        listContainer.innerHTML = '';
        itemsArray.forEach((item, index) => {
            const listItem = document.createElement('li');
            const itemText = document.createElement('span');
            itemText.textContent = item.name;
            if (item.purchased) {
                itemText.classList.add('purchased');
            }
            listItem.appendChild(itemText);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit');
            editButton.addEventListener('click', () => editItem(index));
            listItem.appendChild(editButton);

            itemText.addEventListener('click', () => markPurchased(index));
            listItem.appendChild(itemText);
            listContainer.appendChild(listItem);
        });
    }

    // Function to add an item
    function addItem() {
        const itemName = itemInput.value.trim();
        if (itemName && !itemsArray.some(item => item.name.toLowerCase() === itemName.toLowerCase())) {
            itemsArray.push({ name: itemName, purchased: false });
            itemInput.value = '';
            updateLocalStorage();
            renderList();
        } else {
            alert('Item is already in the list!');
        }
    }

    // Function to edit an item
    function editItem(index) {
        const newItemName = prompt('Edit item:', itemsArray[index].name);
        if (newItemName !== null && newItemName.trim() !== '' && !itemsArray.some(item => item.name.toLowerCase() === newItemName.toLowerCase())) {
            itemsArray[index].name = newItemName.trim();
            updateLocalStorage();
            renderList();
        } else if (newItemName.trim() === '' || newItemName === null) {
            alert('Item name cannot be empty!');
        } else {
            alert('Item is already in the list!');
        }
    }

    // Function to mark an item as purchased
    function markPurchased(index) {
        itemsArray[index].purchased = !itemsArray[index].purchased;
        updateLocalStorage();
        renderList();
    }

    // Function to clear the list
    function clearList() {
        itemsArray = [];
        updateLocalStorage();
        renderList();
    }

    // Function to handle checkout
    function proceedToCheckout() {
        alert('Proceeding to checkout with the following items:\n' + itemsArray.map(item => item.name).join('\n'));
    }

    // Function to update local storage
    function updateLocalStorage() {
        localStorage.setItem('items', JSON.stringify(itemsArray));
    }

    // Event listeners
    addButton.addEventListener('click', addItem);
    clearButton.addEventListener('click', clearList);
    checkoutButton.addEventListener('click', proceedToCheckout);

    // Initial render
    renderList();
});
