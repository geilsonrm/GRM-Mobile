
class Mobile {

    constructor(theme) {
        this.theme = theme || 'b';
        this.lastElements = [];
    }

    setLastElement(element, name) {
        name = name ? name : 'default';
        this.lastElements[name] = element;
        return null;
    }

    getLastElement(name) {
        return this.lastElements[name];
    }

    finalizy(component, p) {
        // remove atributos undefined
        component = removeUndefined(component);
        console.info(component)
        // converte string em seletor jQuery
        component = $(component)
        // insere element no destino informado por p.append
        p.append.append(component);
        this.setLastElement(component);        
        return component;
    }

    // lastElement() {
    //     const countElements = document.querySelectorAll('[data-role='+ 'page' +']').length;
    //     return document.querySelectorAll('[data-role='+ 'page' +']')[countElements-1];
    // }

    page(p = {}) {
        p.append = p.append ? p.append : $('body');
        p.id = p.id ? p.id : createID('page');        
        var component =
        `
        <div data-role="page" id=${p.id} class=${p._class} data-theme=${p.theme || 'c'} data-control-title=${p.title} >
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
        p.id = p.id ? p.id : createID('header');        
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

    footer(p = {}) {
        p.append = p.append ? p.append : this.getLastElement('page');
        p.id = p.id ? p.id : createID('footer');        
        var component =
        `
        <div data-role="footer" id=${p.id} class=${p._class} data-theme=${p.theme || this.theme} data-position="fixed" >
            <h1>${p.heading || '&nbsp;'}</h1>
        </div>
        `
        component = removeUndefined(component);
        component = $(component)
        p.append.append(component);
        return this.setLastElement(component, 'header');
    }


    button(p = {}) {
        p.append = p.append ? p.append : this.getLastElement('page').find('div[data-role=content]');
        p.id = p.id ? p.id : createID('button');        
        p.reverse = p.reverse ? '"reverse"' : undefined;
        p.newWindow = p.newWindow ? '"_blank"' : undefined;
        p.rel = p.rel ? '"back"' : undefined;
        p.href = p.href ? "#" + p.href : '"#"';
        if(!p.text && !p.icon) {
            p.text = 'Button'
            p.icon = 'star'
        }
        var component =
        `        
        <a data-role="button" id=${p.id} class=${p._class} data-theme=${p.theme || this.theme} 
        target=${p.newWindow} data-inline=${p.line} data-direction=${p.reverse} data-rel=${p.rel} 
        data-icon=${p.icon} data-iconpos=${p.iconpos} data-transition=${p.transition} href=${p.href}>${p.text || '&nbsp;'}</a>
        
        `
        return this.finalizy(component, p);
        
    }

    input(p = {}) {
        p.append = p.append ? p.append : this.getLastElement('page').find('div[data-role=content]');
        p.id = p.id ? p.id : createID('textinput');
        p.type = p.type ? p.type : 'text';
        var component =
        `
        <div data-role="fieldcontain" data-controltype="textinput" class=${p._class}>
            ${p.title ? `<label for=${p.id}>${p.title}</label>`: ''}
            <input name=${p.name} id=${p.id} placeholder=${p.placeholder} value=${p.value} type=${p.type}>
        </div>
        `
        return this.finalizy(component, p);
    }

    area(p = {}) {
        p.append = p.append ? p.append : this.getLastElement('page').find('div[data-role=content]');
        p.id = p.id ? p.id : createID('textarea');
        var component =
        `
        <div data-role="fieldcontain" data-controltype="textarea" class=${p._class}>
            ${p.title ? `<label for=${p.id}>${p.title}</label>`: ''}
            <textarea name=${p.name} id=${p.id} placeholder=${p.placeholder} type=${p.type}>${p.value}</textarea>
        </div>
        `
        return this.finalizy(component, p);
    }

    heading(p = {}) {
        p.append = p.append ? p.append : this.getLastElement('page').find('div[data-role=content]');
        p.id = p.id ? p.id : createID('heading');
        p.size = p.size ? p.size : 1;
        var component =
        `
        <h${p.size} id=${p.id} class=${p._class}>${p.text}</h${p.size}>
        `
        return this.finalizy(component, p);
    }

    link(p = {}) {
        p.append = p.append ? p.append : this.getLastElement('page').find('div[data-role=content]');
        p.id = p.id ? p.id : createID('link');        
        p.newWindow = p.newWindow ? '"_blank"' : undefined;
        p.text = p.text ? p.text : 'Link';
        p.href = p.href ? "#" + p.href : '"#"';
        var component =
        `
        <a id=${p.id} class=${p._class} target=${p.newWindow} data-transition=${p.transition} href=${p.href}>${p.text}</a>
        `
        return this.finalizy(component, p);
    }


}

const p = {
    placeholder: 'nome',
    value: 'Geilson',
    type: 'password',
    title: 'obs'
}

const mobile = new Mobile()

mobile.page()
mobile.header()
mobile.footer({heading:'rodapé'})
mobile.button()
mobile.input({title:'Label'})
mobile.area({title:'Label'})
mobile.heading({text:'NODE.JS'})
mobile.link({href:'page2'})

mobile.page()
mobile.header()













var aux = {};

function createID(nameElement) {
    var countA = document.querySelectorAll('[data-role='+ nameElement +']').length;
    var countB = document.querySelectorAll('[data-controltype='+ nameElement +']').length;
    var count = countA || countB;
    return nameElement.concat(count + 1)
}

function finalizy(component, p) {
    // remove atributos undefined
    component = removeUndefined(component);
    console.info(component)
    // converte string em seletor jQuery
    component = $(component)
    // insere element no destino informado por p.append
    p.append.append(component);
    return component;
}

function removeUndefined(p) {
    p = p.replace('id=undefined', '');
    p = p.replace('class=undefined', '');
    p = p.replace('target=undefined', '');
    p = p.replace('data-rel=undefined', '');
    p = p.replace('data-inline=undefined', '');
    p = p.replace('data-direction=undefined', '');
    p = p.replace('data-transition=undefined', '');
    p = p.replace('placeholder=undefined', '');
    p = p.replace('value=undefined', 'value=""');
    p = p.replace('name=undefined', 'name=""');
    p = p.replace('data-icon=undefined', '');
    p = p.replace('data-iconpos=undefined', '');
    p = p.replace('>undefined<', '><');
    return p
}


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