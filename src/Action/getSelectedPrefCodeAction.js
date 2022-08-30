const getSelectedPrefCodeAction = (list_selected) => {
    return {
        type: "getSelectedPrefCodeAction",
        payload: list_selected
    }
}
const getSelectedPrefNameAction = (list_selected) => {
    return {
        type: "getSelectedPrefNameAction",
        payload: list_selected
    }
}

export { getSelectedPrefCodeAction, getSelectedPrefNameAction }