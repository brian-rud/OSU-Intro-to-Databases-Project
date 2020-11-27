document.addEventListener('DOMContentLoaded', (e) => {
    /* Prepare form buttons */
    prepareItemEditButtons();
    prepareCancelItemEditButtons();
    prepareConfirmItemEditButtons();

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

function prepareItemEditButtons() {
    const itemEditButtons = document.getElementsByClassName('item_edit');

    for (let i in itemEditButtons) {
        if (itemEditButtons.hasOwnProperty(i)) {
            itemEditButtons[i].addEventListener('click', (e) => {
                e.preventDefault();

                toggleEdit(e.target);
            });
        }
    }
}

function prepareCancelItemEditButtons() {
    const cancelItemEditButtons = document.getElementsByClassName('cancel_item_edit');

    for (let i in cancelItemEditButtons) {
        if (cancelItemEditButtons.hasOwnProperty(i)) {
            cancelItemEditButtons[i].addEventListener('click', (e) => {
                e.preventDefault();

                toggleEdit(e.target);
            });
        }
    }
}

function prepareConfirmItemEditButtons() {
    const confirmItemEditButtons = document.getElementsByClassName('confirm_item_edit');

    for (let i in confirmItemEditButtons) {
        if (confirmItemEditButtons.hasOwnProperty(i)) {
            confirmItemEditButtons[i].addEventListener('click', e => {
                e.preventDefault();

                const form = confirmItemEditButtons[i].parentNode.parentNode;
                const url = 'http://localhost:8998' + new URL(form.action).pathname;
                const data = new URLSearchParams();

                for (const elem of form.elements) {
                    data.append(elem.name, elem.value);
                }

                fetch(url, {
                    method: 'PUT',
                    redirect: 'follow',
                    body: data
                }).then(response => {
                    console.log(response.status);
                    if (response.status >= 200 && response.status < 400) {
                        // TODO: Confirm message
                        form.oldValue = form.value;
                        toggleEdit(e.target);
                    } else {
                        // TODO: Make error message nicer
                        toggleEdit(e.target);
                        alert('Error updating');
                    }
                });
            });
        }
    }
}

function prepareDeleteItemButtons() {
    const deleteItemButtons = document.getElementsByClassName('delete_item');

    for (let i in deleteItemButtons) {
        if (deleteItemButtons.hasOwnProperty(i)) {
            // TODO: Send value (item id) from hidden input to server with DELETE request
        }
    }
}

function toggleEdit(node) {
    /* Accepts a node which must be nested within a form */
    let form = node;
    try {
        while (form.tagName !== 'FORM') {
            form = form.parentNode;
        }
    }
    catch {
        console.log('no parent form');
        return;
    }

    /* Toggle all buttons display between block and none */
    const buttons = {
        edit: form.getElementsByClassName('item_edit')[0],
        confirm: form.getElementsByClassName('confirm_item_edit')[0],
        cancel: form.getElementsByClassName('cancel_item_edit')[0],
        delete: form.getElementsByClassName('delete_item')[0]
    }

    for (let i in buttons) {
        if (buttons.hasOwnProperty(i)) {
            const display = window.getComputedStyle(buttons[i]).display;
            buttons[i].style.display = display === 'block' ? 'none' : 'block';
        }
    }

    /* Toggle whether the input is editable */
    const input = form.getElementsByClassName('editable_input')[0];
    input.disabled = !input.disabled;

    /* Revert value if edit cancelled; otherwise save old value */
    if (input.disabled === true) {
        input.value = input.oldValue;
        delete input.oldValue;
    } else {
        input.oldValue = input.value;
    }
}