/*
** EPITECH PROJECT, 2024
** area-rattrapage
** File description:
** widget_manager.mjs
*/

console.log("js/widget_manager initialising");

async function widgetsToJson(widgets) {
    console.log("widgetsToJson called");
    let widgetData = [];

    widgets.forEach(widget => {
        const indexInput = widget.querySelector(".widget_header_index_position");
        const index = indexInput ? parseInt(indexInput.value, 10) : null;

        const nameSpan = widget.querySelector(".widget_footer #widget_name");
        const name = nameSpan ? nameSpan.textContent.trim() : "";

        const contentSection = widget.querySelector(".widget_body");
        const content = contentSection ? contentSection.innerHTML.trim() : "";

        widgetData.push({ index, name, content });
    });

    console.log("widgetsToJson finished");
    return widgetData;
}

async function getWidgetIndex(widgetBodyID) {
    console.log("getWidgetIndex called");
    const widgetBody = document.getElementById(widgetBodyID);
    const widgetsPresent = widgetBody.children.length;
    console.log("widgetsPresent:", widgetsPresent);
    console.log("getWidgetIndex finished");
    return widgetsPresent;
}

async function createWidgetField(widgetItem, widgetIndex) {
    console.log("createWidgetField called");
    if (widgetItem == null) {
        console.log("widgetItem is null");
        console.log("createWidgetField finished");
        return "";
    };
    const widgetName = widgetItem.name;//.trimStart();
    const widgetId = `${widgetName}_${widgetIndex}`;
    const widgetContent = widgetItem.html;
    const internalWidgetId = widgetItem.db_index;
    console.log(`widgetItem: '${JSON.stringify(widgetItem)}'`);
    console.log(`widgetIndex: '${widgetIndex}'`);
    console.log(`widgetId: '${widgetId}'`);
    console.log(`widgetName: '${widgetName}'`);
    console.log(`internalWidgetId: '${internalWidgetId}'`);
    console.log(`widgetContent: '${JSON.stringify(widgetContent)}'`);
    let widgetCode = ``;
    widgetCode += `<article id="${widgetId}" class="widget" data-internal-id="${internalWidgetId}" data-name="${widgetName}">`;
    widgetCode += `<section class="widget_header">`;
    widgetCode += `<aside class="widget_header_index_position_box">`;
    widgetCode += `<p>Position:</p>`;
    // widgetCode += `<input type="number" class="widget_header_index_position" min="0" value="${widgetIndex}" onchange="updateWidgetLocation(this);">`;
    widgetCode += `<p>${widgetIndex}</p>`;
    widgetCode += `</aside>`;
    widgetCode += `<aside>`;
    widgetCode += `<button class="button_desing" type="button" onclick="window.widget_manager.removeWidget('${widgetId}', '${widgetName}', '${internalWidgetId}');">`;
    widgetCode += `<i class="far fa-trash-alt"></i>`;
    widgetCode += `</button>`;
    widgetCode += `</aside>`;
    widgetCode += `</section>`;
    widgetCode += `<section class="widget_content_type">`;
    // widgetCode += `<select class="widget_dropdown">`;
    // widgetCode += await window.update_server.getWidgetContent();
    // widgetCode += `</select>`;
    widgetCode += `<button class="button_desing" type="button" onclick="updateWidgetContent(this, ${internalWidgetId});">Apply</button>`;
    widgetCode += `</section>`;
    widgetCode += `<section class="widget_body">`;
    widgetCode += `<div>${widgetContent}</div>`;
    widgetCode += `</section>`;
    widgetCode += `<section class="widget_footer">`;
    widgetCode += `<p class="widget_name_footer">Name: `;
    widgetCode += `<span>${widgetName}</span>`;
    widgetCode += `</p>`;
    widgetCode += `</section>`;
    widgetCode += `</article>`;
    console.log("widgetCode:", widgetCode);
    console.log("createWidgetField finished");
    return widgetCode;
}

async function getWidgetContent(widgetName) {
    console.log("getWidgetContent called");
    const response = await window.update_server.getWidgetContent(widgetName);
    if (response.status === 200) {
        console.log("getWidgetContent finished");
        return response.data;
    }
    console.log("getWidgetContent finished");
    return response;
}

async function addWidget(widgetBodyID, dropdownID) {
    console.log("addWidget called");
    const dropdown = document.getElementById(dropdownID);
    if (dropdown.value === "option_default") {
        alert("Please select an option from the dropdown");
        console.log("addWidget finished");
        return;
    }
    const widgetBody = document.getElementById(widgetBodyID);
    const widgetContent = await window.widget_manager.getWidgetContent(dropdown.value);
    console.log(`addWidget: Received content: ${JSON.stringify(widgetContent)}`);
    if ("status" in widgetContent && widgetContent.status !== 200) {
        let msg = "";
        if (widgetContent.data !== null) {
            msg = `Failed to fetch the widget: ${widgetContent.data}`;
        } else {
            msg = "Failed to fetch the widget";
        }
        alert(msg);
        console.log(msg);
        return;
    }
    const widgetIndex = widgetContent.db_index || await window.widget_manager.getWidgetIndex(widgetBodyID);
    console.log("widgetContent:", widgetContent);
    await window.update_server.addWidgetToUser(widgetContent.widget_id, null);
    const widgetField = await window.widget_manager.createWidgetField(widgetContent, widgetIndex);

    console.log("widgetBody:", widgetBody);
    console.log("widgetField:", widgetField);


    if (widgetBody && widgetField) {
        if (widgetBody.innerHTML === "<p>No widgets to display. To add a widget please choose a widget from the dropdown then click the 'Add widget' button</p>") {
            widgetBody.innerHTML = "";
        }
        widgetBody.innerHTML += widgetField;
    }
    dropdown.value = "option_default";
    console.log("addWidget finished");
}

async function removeWidget(ID, name, widgetId) {
    console.log("removeWidget called");
    document.getElementById(ID).remove();
    await window.update_server.removeUserWidget(name, widgetId);
    const widgets = document.getElementById("widgets_body");
    widgets.innerHTML = "";
    await injectWidgets(widgets);
    console.log("removeWidget finished");
}

async function updateWidget(ID) { }

async function updateWidgetLocation(ID, element) {
    console.log("updateWidgetLocation called");
    console.log("ID:", ID);
    console.log("updateWidgetLocation finished");
}

const widget_manager = {
    addWidget,
    removeWidget,
    updateWidget,
    widgetsToJson,
    getWidgetIndex,
    getWidgetContent,
    createWidgetField,
    updateWidgetLocation
}

export { widget_manager };

window.widget_manager = widget_manager;

console.log("js/widget_manager initialised");
