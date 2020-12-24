function getStyle(element, property) {
    return (getComputedStyle(element, null).getPropertyValue(property));
}

chrome.storage.sync.get(["selected_cursor_id"], function (items) {
    current_cursor_id = items.selected_cursor_id;
    if (typeof current_cursor_id !== 'undefined') {
        document.body.addEventListener("mouseover", function (e) {
                var pointer = getStyle(e.target, "cursor");
                if (pointer == "pointer") {
                    e.target.classList.add("cursorsHover");
                }
            }
        );
    }
});
