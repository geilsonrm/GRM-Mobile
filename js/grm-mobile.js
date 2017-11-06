
function percorreJSON(obj) {
    for (key in obj) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof obj[key] !== 'object')
            console.log("Chave: " + key + " - Valor: " + obj[key]);
        else
            // Caso tenha json dentro de json
            obj[key].forEach(function (item) {
                for (key2 in item) {
                    console.log("Chave: " + key2 + " - Valor: " + item[key2]);
                }
            });
    }
    return obj
}

function removeUndefined(p) {
    p = p.replace('id=undefined', '');
    p = p.replace('class=undefined', '');
    return p
}

class Mobile {

    constructor(theme) {
        this.theme = theme || 'b';
        this.lastElements = [];
    }

    setLastElement(element, name) {
        name = name ? name : 'default';
        this.lastElements[name] = element;
        return element;
    }

    getLastElement(name) {
        return this.lastElements[name];
    }

    setElementSelected(element) {
        this.lastElementCreaded = element;
        return element;
    }

    getElementSelected(element) {
        return this.lastElementCreaded;
    }

    // lastElement() {
    //     const countElements = document.querySelectorAll('[data-role='+ 'page' +']').length;
    //     return document.querySelectorAll('[data-role='+ 'page' +']')[countElements-1];
    // }

    page(p = {}) {
        p.append = p.append ? p.append : $('body');
        var component =
        `
        <div data-role="page" id=${p.id} class=${p._class} data-theme=${p.theme || this.theme} data-control-title=${p.title} >
            <div data-role="content" style="padding: px"></div>
        </div>
        `
        component = removeUndefined(component);
        component = $(component)
        p.append.append(component);
        return this.setLastElement(component, 'page');
    }

    header(p = {}) {
        p.append = p.append ? p.append : this.getLastElement('page');
        var component =
        `
        <div data-role="header" id=${p.id} class=${p._class} data-theme=${p.theme || this.theme} >
            <h1>${p.heading || '&nbsp;'}</h1>
            <a href="#info" data-rel="popup" class="ui-btn ui-btn-icon-notext ui-icon-info ui-btn-b ui-corner-all ui-btn-right"></a>
        </div>
        `
        component = removeUndefined(component);
        component = $(component)
        p.append.prepend(component);
        return this.setLastElement(component, 'header');
    }


}

const p = {
    id: 'page',
    theme: 'b',
    title: 'MIRANDOLA'
}

const mobile = new Mobile()

const page = mobile.page()

const header = mobile.header()