function prepareAddIngredientButton() {
    const confirmItemEditButton = document.getElementById('addIngredientButton');

    if (confirmItemEditButton.hasOwnProperty(i)) {
        confirmItemEditButton[i].addEventListener('click', e => {
            e.preventDefault();

            const form = getParentForm(confirmItemEditButtons[i]);
            const url = 'http://localhost:8998' + new URL(form.action).pathname;
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
                    // TODO: Confirm message
                        
                } else {
                    // TODO: Make error message nicer
                    toggleEdit(e.target);
                    alert('Error updating');
                }
            });
        });
    }
}