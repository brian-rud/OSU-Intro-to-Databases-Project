document.addEventListener('DOMContentLoaded', (e) => {
    /* Prepare form buttons */
    console.log("hi")
    prepareItemEditButtons();
    prepareCancelItemEditButtons();
    prepareConfirmItemEditButtons();
    prepareDeleteItemButtons();
    prepareAddIngredientButton();

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
            console.log("preparededit: ", i)

            itemEditButtons[i].addEventListener('click', (e) => {
                e.preventDefault();
                toggleEdit(e.currentTarget);
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

                const form = getParentForm(confirmItemEditButtons[i]);
                console.log("preoareCOnfirmEditForm: ", form)
                const url = 'http://localhost:8998' + new URL(form.action).pathname;
                const data = new URLSearchParams();

                for (const elem of form.elements) {
                    data.append(elem.name, elem.value);
                }

                fetch(url, {
                    method: 'PUT',
                    body: data
                }).then(response => {
                    if (response.status >= 200 && response.status < 400) {
                        // TODO: Confirm message
                        const input = form.getElementsByClassName('editable_input')[0];
                        input.oldValue = input.value;
                        toggleEdit(e.target);
                        location.reload();
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
            deleteItemButtons[i].addEventListener('click', e => {
                e.preventDefault();

                const form = getParentForm(deleteItemButtons[i]);
                console.log("form", form)
                const url = 'http://localhost:8998' + new URL(form.action).pathname;
                console.log(url)
                const data = new URLSearchParams();

                for (const elem of form.elements) {
                    data.append(elem.name, elem.value);
                }

                fetch(url, {
                    method: 'DELETE',
                    body: data
                }).then(response => {
                    if (response.status >= 200 && response.status < 400) {
                        // TODO: Confirm message
                        const listItem = form.parentNode;
                        listItem.remove();
                    } else {
                        // TODO: Make error message nicer
                        alert('Error deleting');
                    }
                });
            });
        }
    }
}

function prepareAddIngredientButton() {
    const addIngredientButton = document.getElementById('addIngredientButton');
    console.log(addIngredientButton)
    if (addIngredientButton) {
        addIngredientButton.addEventListener('click', e => {
            
            e.preventDefault();

            const form = getParentForm(addIngredientButton);
            const url = 'http://localhost:8998' + new URL(form.action).pathname;
            console.log(url)
            const data = new URLSearchParams();
            console.log("data: ", data)
            for (const elem of form.elements) {
                data.append(elem.name, elem.value);
            }

            fetch(url, {
                method: 'POST',
                body: data
            }).then(response => {
                if (response.status >= 200 && response.status < 400) {
                    location.reload()
                        
                } else {
                    // TODO: Make error message nicer
                    alert('Error updating');
                }
            });
        });
    }
}

function toggleEdit(node) {
    /* Accepts a node which must be nested within a form */
    const form = getParentForm(node);
    console.log("form: ", form.id)
    
    if(form.id.includes("recipeAttributesForm")){
        recipeToggleEdit(node);
        return
    }

    if(form.id.includes("recipeIngredientForm")){
        recipeIngredientsToggleEdit(node);
        return
    }
    /* Error handling */
    if (form === null) {
        console.log('No parent form');
        return;
    }
    console.log("form children", form.childNodes)
    /* Toggle all buttons display between block and none */
    const buttons = {
        edit: form.getElementsByClassName('item_edit')[0],
        confirm: form.getElementsByClassName('confirm_item_edit')[0],
        cancel: form.getElementsByClassName('cancel_item_edit')[0],
        delete: form.getElementsByClassName('delete_item')[0]
    }
    console.log("buttons: ", buttons)

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

function recipeToggleEdit(node) {
    /* Accepts a node which must be nested within a form */
    const form = getParentForm(node);

    /* Error handling */
    if (form === null) {
        console.log('No parent form');
        return;
    }
    console.log(node.parentNode.childNodes)
    /* Toggle all buttons display between block and none */
    const buttons = {
        edit: node.parentNode.childNodes[3],
        confirm: node.parentNode.childNodes[5],
        cancel: node.parentNode.childNodes[7],
        delete: node.parentNode.childNodes[9]
    }

    for (let i in buttons) {
        if (buttons.hasOwnProperty(i)) {
            const display = window.getComputedStyle(buttons[i]).display;
            buttons[i].style.display = display === 'block' ? 'none' : 'block';
        }
    }

    /* Toggle whether the input is editable */
    const input = node.parentNode.childNodes[1];
    input.disabled = !input.disabled;

    /* Revert value if edit cancelled; otherwise save old value */
    if (input.disabled === true) {
        input.value = input.oldValue;
        delete input.oldValue;
    } else {
        input.oldValue = input.value;
    }
} 

function recipeIngredientsToggleEdit(node){
    /* Accepts a node which must be nested within a form */
    const form = getParentForm(node);

    var formSerial = form.id.slice(20);
    console.log(formSerial)
    /* Error handling */
    if (form === null) {
        console.log('No parent form');
        return;
    }
  
    /* Toggle all buttons display between block and none */
    const buttons = {
        edit: document.getElementById('modifyRecipeIngredientButton' + formSerial),
        confirm: document.getElementById('confirmRecipeIngredientButton' + formSerial),
        cancel: document.getElementById('cancelRecipeIngredientButton' + formSerial),
        delete: document.getElementById('deleteRecipeIngredientButton' + formSerial)
    }
    console.log("buttons", buttons)
    for (let i in buttons) {
        if (buttons.hasOwnProperty(i)) {
            const display = window.getComputedStyle(buttons[i]).display;
            buttons[i].style.display = display === 'block' ? 'none' : 'block';
        }
    }

    /* Toggle whether the input is editable */
    const input = node.parentNode.childNodes[1];
    input.disabled = !input.disabled;

    /* Revert value if edit cancelled; otherwise save old value */
    if (input.disabled === true) {
        input.value = input.oldValue;
        delete input.oldValue;
    } else {
        input.oldValue = input.value;
    }
} 

function getParentForm(node) {
    try {
        console.log("nodeid: ", node.id)
        // getParentForm for recipe_ingredients on the individualRecipe view
        if(node.id.includes("deleteRecipeIngredientButton") || node.id.includes("modifyRecipeIngredientButton") 
            ||node.id.includes("cancelRecipeIngredientButton") || node.id.includes("confirmRecipeIngredientButton")){
            
            var formSerial;
            if(node.id.includes("confirm")){
                formSerial = node.id.slice(29);
            }
            else formSerial = node.id.slice(28);
           
            node = document.getElementById("recipeIngredientForm" + formSerial);
            return(node)
        }
        else if(node.id === "addIngredientButton"){
            return(document.getElementById('addRecipeIngredientForm'));
        }
        while (node.tagName !== 'FORM') {
            node = node.parentNode;
            
        }

    }
    catch {
        node = null;
    }

    return node;
}