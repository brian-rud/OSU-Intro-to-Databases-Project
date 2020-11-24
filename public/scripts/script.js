document.addEventListener('DOMContentLoaded', (e) => {
    const itemEditButtons = document.getElementsByClassName('item_edit');
    const cancelItemEditButtons = document.getElementsByClassName('cancel_item_edit');
    const confirmItemEditButtons = document.getElementsByClassName('confirm_item_edit');
    const deleteItemButtons = document.getElementsByClassName('delete_item');
    const addItemButtons = document.getElementsByClassName('add_item');

    prepareItemEditButtons(itemEditButtons);
    prepareCancelItemEditButtons(cancelItemEditButtons);
    prepareConfirmItemEditButtons(confirmItemEditButtons);
    setupFilter();
});

function setupFilter() {
    const filterBox = document.getElementById('filter_box');
    const editableInputs = document.getElementsByClassName('editable_input');

    // Update visible items based on filter text
    filterBox.addEventListener('input', e => {
        const filterText = e.target.value;

        for (let i in editableInputs) {
            if (editableInputs.hasOwnProperty(i)) {
                // Toggle hidden as appropriate for filtering
                editableInputs[i].parentNode.hidden = !editableInputs[i].value.toLowerCase().includes(filterText.toLowerCase());
            }
        }
    });
}

function prepareItemEditButtons(itemEditButtons) {
    for (let i in itemEditButtons) {
        if (itemEditButtons.hasOwnProperty(i)) {
            itemEditButtons[i].addEventListener('click', (e) => {
                e.preventDefault();

                const itemEditButton = e.target;
                const confirmEditButton = e.target.nextElementSibling;
                const cancelEditButton = e.target.parentNode.nextElementSibling.children[0];
                const deleteItemButton = e.target.parentNode.nextElementSibling.children[1];
                const textNode = e.target.parentNode.parentNode.children[1];

                // Update visible buttons
                itemEditButton.style.display = 'none';
                confirmEditButton.style.display = 'block';
                cancelEditButton.style.display = 'block';
                deleteItemButton.style.display = 'none';

                // Make input editable and save previous value
                textNode.disabled = false;
                textNode.oldValue = textNode.value;
            });
        }
    }
}

function prepareCancelItemEditButtons(cancelItemEditButtons) {
    for (let i in cancelItemEditButtons) {
        if (cancelItemEditButtons.hasOwnProperty(i)) {
            cancelItemEditButtons[i].addEventListener('click', (e) => {
                e.preventDefault();

                const itemEditButton = e.target.parentNode.previousElementSibling.children[0];
                const confirmEditButton = e.target.parentNode.previousElementSibling.children[1];
                const cancelEditButton = e.target;
                const deleteItemButton = e.target.nextElementSibling;
                const textNode = e.target.parentNode.parentNode.children[1];

                // Update visible buttons
                itemEditButton.style.display = 'block';
                confirmEditButton.style.display = 'none';
                cancelEditButton.style.display = 'none';
                deleteItemButton.style.display = 'block';

                // Revert value and make input un-editable
                textNode.disabled = true;
                textNode.value = textNode.oldValue;
                delete textNode.oldValue;
            });
        }
    }
}

function prepareConfirmItemEditButtons(confirmItemEditButtons) {
    for (let i in confirmItemEditButtons) {
        if (confirmItemEditButtons.hasOwnProperty(i)) {
            // TODO: Send value (item id) from hidden input and value (item name)
            //       from text input to server with PUT request.
            confirmItemEditButtons[i].addEventListener('click', e => {
                const form = confirmItemEditButtons[i].parentNode.parentNode;

                form.method = 'PUT';
                form.submit();
            });
        }
    }
}

function prepareDeleteItemButtons(deleteItemButtons) {
    for (let i in deleteItemButtons) {
        if (deleteItemButtons.hasOwnProperty(i)) {
            // TODO: Send value (item id) from hidden input to server with DELETE request
        }
    }
}

function prepareAddItemButtons(addItemButtons) {
    for (let i in addItemButtons) {
        if (addItemButtons.hasOwnProperty(i)) {
            // TODO: Send value (item naem) from input to server with POST request
        }
    }
}