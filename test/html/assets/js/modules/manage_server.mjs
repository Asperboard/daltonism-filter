/*
** EPITECH PROJECT, 2024
** area-rattrapage
** File description:
** update_server.mjs
*/

console.log("js/manage_server initialising");
// Module in charge of managing the communications between the server and the client

async function register(username, email, password) {
    console.log("register called");
    console.log("username:", username);
    console.log("email:", email);
    console.log("password:", password);
    // let response = await window.querier.post("/register", { username, email, password });
    alert("Il s'agit d'un site de démonstration, votre compte n'existera que localement sur votre ordinateur. Vous pouvez utiliser l'adresse e-mail et le mot de passe de votre choix.");
    let response = { "ok": true, "resp": { "id": 1, "token": "Not a token", "username": username } };
    console.log("response:", response);
    console.log(`(register, before response) JSON response: ${JSON.stringify(response)}`);
    if (response.ok) {
        const user_id = response.resp.id;
        const user_token = response.resp.token;
        const user_username = response.resp.username;
        console.log(`user_id: ${user_id}, user_token: ${user_token}, user_username: ${user_username}`);
        if (user_id && user_token && user_username) {
            window.cookie_manager.create(window.constants.user_id_cookie_name, user_id);
            window.cookie_manager.create(window.constants.user_token_cookie_name, user_token);
            window.cookie_manager.create(window.constants.user_username_cookie_name, user_username);
            response.success = true;
            response.ok = true;
            return response;
        } else {
            response.success = false;
            response.ok = false;
        }
    } else {
        response.success = false;
        response.ok = false;
    }
    console.log("response:", response);
    console.log(`JSON response: ${JSON.stringify(response)}`);
    console.log("register finished");
    return response;
};

async function login(email, password) {
    console.log("login called");
    console.log("email:", email);
    console.log("password:", password);
    // let response = await window.querier.post(`${window.constants.user_login_endpoint}`, { email, password });
    alert("Il s'agit d'un site de démonstration, votre compte n'existera que localement sur votre ordinateur. Vous pouvez utiliser l'adresse e-mail et le mot de passe de votre choix.");
    let response = { "ok": true, "resp": { "id": 1, "token": "Not a token", "username": email.split("@")[0] } };
    console.log("response:", response);
    console.log(`JSON response: ${JSON.stringify(response)}`);
    console.log("login finished");
    if (response.ok) {
        const user_id = response.resp.id;
        const user_token = response.resp.token;
        const user_username = response.resp.username;
        console.log(`user_id: ${user_id}, user_token: ${user_token}, user_username: ${user_username}`);
        if (user_token && user_id && user_username) {
            window.cookie_manager.create(window.constants.user_id_cookie_name, user_id);
            window.cookie_manager.create(window.constants.user_token_cookie_name, user_token);
            window.cookie_manager.create(window.constants.user_username_cookie_name, user_username);
            response.success = true;
            response.ok = true;
            return response;
        } else {
            response.success = false;
        }
    } else {
        response.success = false;
        response.ok = false;
    }
    console.log("response:", response);
    console.log("login finished");
    return response;
};

async function register_professional(username, email, password) {
    console.log("register called");
    console.log("username:", username);
    console.log("email:", email);
    console.log("password:", password);
    alert("Il s'agit d'un site de démonstration, votre compte n'existera que localement sur votre ordinateur. Vous pouvez utiliser l'adresse e-mail et le mot de passe de votre choix.");
    // let response = await window.querier.post("/register", { username, email, password });
    let response = { "ok": true, "resp": { "id": 1, "token": "Not a token", "username": username } };
    console.log("response:", response);
    console.log(`(register, before response) JSON response: ${JSON.stringify(response)}`);
    if (response.ok) {
        const user_id = response.resp.id;
        const user_token = response.resp.token;
        const user_username = response.resp.username;
        console.log(`user_id: ${user_id}, user_token: ${user_token}, user_username: ${user_username}`);
        if (user_id && user_token && user_username) {
            window.cookie_manager.create(window.constants.user_id_cookie_name, user_id);
            window.cookie_manager.create(window.constants.user_token_cookie_name, user_token);
            window.cookie_manager.create(window.constants.user_username_cookie_name, user_username);
            response.success = true;
            response.ok = true;
            return response;
        } else {
            response.success = false;
            response.ok = false;
        }
    } else {
        response.success = false;
        response.ok = false;
    }
    console.log("response:", response);
    console.log(`JSON response: ${JSON.stringify(response)}`);
    console.log("register finished");
    return response;
};

async function login_professional(email, password) {
    console.log("login called");
    console.log("email:", email);
    console.log("password:", password);
    // let response = await window.querier.post(`${window.constants.user_login_endpoint}`, { email, password });
    let response = { "ok": true, "resp": { "id": 1, "token": "Not a token", "username": email.split("@")[0] } };
    console.log("response:", response);
    console.log(`JSON response: ${JSON.stringify(response)}`);
    console.log("login finished");
    if (response.ok) {
        const user_id = response.resp.id;
        const user_token = response.resp.token;
        const user_username = response.resp.username;
        console.log(`user_id: ${user_id}, user_token: ${user_token}, user_username: ${user_username}`);
        if (user_token && user_id && user_username) {
            window.cookie_manager.create(window.constants.user_id_cookie_name, user_id);
            window.cookie_manager.create(window.constants.user_token_cookie_name, user_token);
            window.cookie_manager.create(window.constants.user_username_cookie_name, user_username);
            response.success = true;
            response.ok = true;
            return response;
        } else {
            response.success = false;
        }
    } else {
        response.success = false;
        response.ok = false;
    }
    console.log("response:", response);
    console.log("login finished");
    return response;
};

async function provideMissingSsoInfo(username, password) {
    const token = window.cookie_manager.read(window.constants.user_token_cookie_name);
    if (!token) {
        console.log("provideMissingSsoInfo failed user is not logged in!");
        return { "status": 401, "data": null };
    }
    // const response = await window.querier.post(window.constants.provide_missing_sso_info_endpoint, { username, password }, token);
    const response = { "status": 200, "ok": true, "data": { "username": username, "password": password } };
    return response;
}

async function getAvailableWidgets() {
    const token = window.cookie_manager.read(window.constants.user_token_cookie_name);
    // const widgets = await window.querier.get(window.constants.widget_name_list_endpoint, {}, token);
    const widgets = { "status": 200, "ok": true, "resp": ["émotions", "opérations"] };
    console.log(`Available widgets ${JSON.stringify(widgets)}`);
    return widgets;
};

async function getUserWidgets() {
    console.log("getUserWidgets called");
    const token = window.cookie_manager.read(window.constants.user_token_cookie_name);
    // const userWidgets = await window.querier.get(window.constants.widget_get_user_widgets_endpoint, {}, token);
    const userWidgets = { "status": 200, "ok": true, "resp": [{ "widget_name": "émotions", "widget_index": 0, "widget_position": 0 }, { "widget_name": "opérations", "widget_index": 1, "widget_position": 1 }] };
    console.log("userWidgets:", JSON.stringify(userWidgets));
    console.log("getUserWidgets finished");
    return userWidgets;
};

async function getWidgetContent(widgetName) {
    console.log("manage_server.getWidgetContent called");
    const token = window.cookie_manager.read(window.constants.user_token_cookie_name);
    // const widgets = await window.querier.get(`${window.constants.widget_get_widget_content}/${widgetName}`, {}, token);
    const widgets = {
        "status": 200, "ok": true, "resp": {
            "name": "émotions", "widget_content": `<iframe src="https://quizlet.com/1010623229/match/embed?i=14kifi&x=1jj1" height="500" width="100%" style="border:0"></iframe>`
        }
    };
    console.log("widgets:", JSON.stringify(widgets));
    console.log("Looking for widget");
    if (widgets.status !== 200) {
        if (widgets.status === 404) {
            return { "status": 404, "data": widgets.resp };
        } else {
            return { "status": 404, "data": null };
        }
    }
    const resp = widgets.resp;
    console.log("manage_server.getWidgetContent finished");
    return { "status": 200, "data": resp };
};

async function addWidgetToUser(widgetType, widgetOption = null) {
    console.log("addWidgetToUser called");
    const token = window.cookie_manager.read(window.constants.user_token_cookie_name);
    let option = "";
    if (widgetOption !== null) {
        option = `/${widgetOption}`;
    }
    // const resp = await window.querier.post(`${window.constants.add_user_widget_endpoint}/${widgetType}${option}`, {}, token);
    const resp = "Not sent";
    console.log("resp = ", resp);
    console.log(`JSON resp = ${JSON.stringify(resp)}`);
    console.log("addWidgetToUser finished");
}

async function updateUserWidgets(widgetIndex, widgetType, widgetPosition = null) {
    console.log("updateUserWidgets called");
    const token = window.cookie_manager.read(window.constants.user_token_cookie_name);
    let position = {};
    if (widgetPosition) {
        position = { "location": widgetPosition };
    }
    // const response = await window.querier.patch(`${window.constants.widget_update_user_widget_endpoint}/${widgetIndex}/${widgetType}`, position, token);
    const response = { 'status': 200, "ok": true, 'resp': { "widget_name": "émotions", "widget_index": 0, "widget_position": 0 } };
    console.log("response:", response);
    console.log("updateUserWidgets finished");
    return response;
};

async function removeUserWidget(name, widgetId) {
    console.log("removeUserWidgets called");
    const token = window.cookie_manager.read(window.constants.user_token_cookie_name);
    // await window.querier.deleteQuery(`${window.constants.add_user_widget_endpoint}/${widgetId}`, {}, token);
    console.log("removeUserWidgets finished");
};

async function logUserOut() {
    console.log("logUserOut called");
    const token = window.cookie_manager.read(window.constants.user_token_cookie_name);
    if (!token) {
        return true;
    }
    // const response = await window.querier.deleteQuery(window.constants.logout_page, {}, token);
    const response = { "status": 200, "ok": true };
    if (response.status === 200) {
        console.log("logUserOut finished");
        return true;
    }
    return false;
};

async function updateRefresh(refreshValue) {
    console.log("updateRefresh called");
    console.log("refreshValue:", refreshValue);
    const token = window.cookie_manager.read(window.constants.user_token_cookie_name);
    // const response = await window.querier.post(`${window.constants.user_refresh_wigets_endpoint}/${refreshValue}`, {}, token);
    const response = { "status": 200, "ok": true };
    console.log("response:", response);
    console.log("updateRefresh finished");
}

async function getRefresh() {
    console.log("getRefresh called");
    const token = window.cookie_manager.read(window.constants.user_token_cookie_name);
    // const response = await window.querier.get(window.constants.user_refresh_wigets_endpoint, {}, token);
    const response = { "status": 200, "ok": true, "resp": 100, "data": 100 };
    console.log("JSON response:", JSON.stringify(response));
    console.log("response:", response);
    console.log("getRefresh finished");
    if (response.status !== 200) {
        console.log("Failed to get refresh value");
        return null;
    }
    console.log("getRefresh finished with response", response.resp);
    return response.resp;
}


const update_server = {
    login,
    register,
    getRefresh,
    logUserOut,
    updateRefresh,
    getUserWidgets,
    removeUserWidget,
    addWidgetToUser,
    getWidgetContent,
    updateUserWidgets,
    login_professional,
    getAvailableWidgets,
    register_professional,
    provideMissingSsoInfo,
}

export { update_server };

window.update_server = update_server;

console.log("js/manage_server initialised");
