


class Mobile {

    constructor(theme) {
        this.theme = theme || 'b';
        this.lastElements = [];
    }

    isDemo(p, nameComponent) {
        const pIsUndefined = Object.keys(p)[0] == undefined;
        if(pIsUndefined) {
            p.title = nameComponent;
            p.heading = nameComponent;
            p.text = nameComponent;
            p.icon = 'star';
        } 
        return p;
    }

    propertyIsNullOrDemo(p, nameComponent, arrayPropertys = []) {
        // checa se o componente é demo
        // caso seja será atribuído valores de exemplo  
        this.isDemo(p, nameComponent);
        // checa atributos que receberão valor default
        // caso seja nulo será atribuído valor 
        if(arrayPropertys.indexOf('id') >= 0) 
            // tudo minúsculo e remover espaços da string id
            // let id = createID(nameComponent.toLocaleLowerCase().replace(/\s/g, "") );
            p.id = p.id ? p.id : createID(nameComponent);
        if(arrayPropertys.indexOf('id') >= 0) 

        if(arrayPropertys.indexOf('id') >= 0) 
        
        return p;
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
        // console.info(component)
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
        this.propertyIsNullOrDemo(p, 'page', ['segunda','text'])
        p.append = p.append ? p.append : $('body');
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
        this.propertyIsNullOrDemo(p, 'Header', ['id']);
        p.append = p.append ? p.append : this.getLastElement('page');
        // p.id = p.id ? p.id : createID('header');        
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
        this.propertyIsNullOrDemo(p, 'Footer', ['id']);       
        p.append = p.append ? p.append : this.getLastElement('page');
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
        this.propertyIsNullOrDemo(p, 'Button', ['id']);       
        p.append = p.append ? p.append : this.getLastElement('page').find('div[data-role=content]');
        p.theme = p.theme ? p.theme : this.theme;        
        p.reverse = p.reverse ? '"reverse"' : undefined;
        p.newWindow = p.newWindow ? '"_blank"' : undefined;
        p.rel = p.rel ? '"back"' : undefined;
        p.href = p.href ? "#" + p.href : '"#"';
        var component =
        `        
        <a data-role="button" id=${p.id} class=${p._class} data-theme=${p.theme} 
        target=${p.newWindow} data-inline=${p.line} data-direction=${p.reverse} data-rel=${p.rel} 
        data-icon=${p.icon} data-iconpos=${p.iconpos} data-transition=${p.transition} href=${p.href}>${p.text || '&nbsp;'}</a>
        
        `
        return this.finalizy(component, p);
        
    }

    input(p = {}) {
        this.propertyIsNullOrDemo(p, 'Text input', ['id']);              
        p.append = p.append ? p.append : this.getLastElement('page').find('div[data-role=content]');
        p.type = p.type ? p.type : 'text';
        var component =
        `
        <div data-role="fieldcontain" data-controltype="textinput" class=${p._class}>
            ${p.title ? `<label for=${p.id}>${p.title}</label>`: ''}
            <input name=${p.name} id=${p.id} placeholder=${p.placeholder} value=${p.value} type=${p.type}>
        `
        return this.finalizy(component, p);
    }

    area(p = {}) {
        this.propertyIsNullOrDemo(p, 'Text area', ['id']);
        p.append = p.append ? p.append : this.getLastElement('page').find('div[data-role=content]');
        var component =
        `
        <div data-role="fieldcontain" data-controltype="textarea" class=${p._class}>
            ${p.title ? `<label for=${p.id}>${p.title}</label>`: ''}
            <textarea name=${p.name} id=${p.id} placeholder=${p.placeholder} type=${p.type}>${p.value}</textarea>
        `
        return this.finalizy(component, p);
    }

    heading(p = {}) {
        this.propertyIsNullOrDemo(p, 'Heading', ['id']);
        p.append = p.append ? p.append : this.getLastElement('page').find('div[data-role=content]');
        p.size = p.size ? p.size : 1;
        var component =
        `
        <h${p.size} id=${p.id} class=${p._class}>${p.text}</h${p.size}>
        `
        return this.finalizy(component, p);
    }

    link(p = {}) {
        this.propertyIsNullOrDemo(p, 'Link', ['id']);   
        p.append = p.append ? p.append : this.getLastElement('page').find('div[data-role=content]');
        p.newWindow = p.newWindow ? '"_blank"' : undefined;
        p.text = p.text ? p.text : 'Link';
        p.href = p.href ? "#" + p.href : '"#"';
        var component =
        `
        <a id=${p.id} class=${p._class} target=${p.newWindow} data-transition=${p.transition} href=${p.href}>${p.text}</a>
        `
        return this.finalizy(component, p);
    }

    // toggleSwitch(p = {}) {
    //     p.append = p.append ? p.append : this.getLastElement('page').find('div[data-role=content]');
    //     p.id = p.id ? p.id : createID('toggleswitch');        
    //     p.name = p.name ? p.name : p.id;        
    //     p.theme = p.theme ? p.theme : this.theme;
    //     p.textOff = p.textOff ? p.textOff : 'off';
    //     p.textOn = p.textOn ? p.textOn : 'on';
    //     var component =
    //     `
    //     <div data-role="fieldcontain" data-controltype="toggleswitch" class=${p._class} >
    //         ${p.title ? `<label for=${p.id}>${p.title}</label>`: ''}
    //         <select name=${p.name} id=${p.id} data-theme=${p.theme} data-role="slider" data-mini=${p.mini}>
    //             <option value="off">${p.textOff}</option>
    //             <option value="on">${p.textOn}</option>
    //         </select>
    //     </div>
    // `
    //     return this.finalizy(component, p);
    // }

    slider(p = {}) {
        this.propertyIsNullOrDemo(p, 'Slider', ['id']);
        p.append = p.append ? p.append : this.getLastElement('page').find('div[data-role=content]');       
        p.theme = p.theme ? p.theme : this.theme;
        p.value = p.value ? p.value : 50;
        p.valueMin = p.valueMin ? p.valueMin : 0;
        p.valueMax = p.valueMax ? p.valueMax : 100;
        var component =
        `
        <div data-role="fieldcontain" data-controltype="slider" class=${p._class}>
            ${p.title ? `<label for=${p.id}>${p.title}</label>`: ''}
            <input id=${p.id} type="range" name=${p.name} value=${p.value} min=${p.valueMin} max=${p.valueMax} data-highlight=${p.highlight}
            data-mini=${p.mini} data-theme=${p.theme} data-track-theme=${p.trackTheme}>
    `
        return this.finalizy(component, p);
    }

    toggleSwitch(p = {}) {
        this.propertyIsNullOrDemo(p, 'Toggle Switch', ['id']);
        p.append = p.append ? p.append : this.getLastElement('page').find('div[data-role=content]');     
        p.name = p.name ? p.name : p.id;        
        p.theme = p.theme ? p.theme : this.theme;
        p.textOff = p.textOff ? p.textOff : 'off';
        p.textOn = p.textOn ? p.textOn : 'on';
        var component =
        `
        <div data-role="fieldcontain" data-controltype="toggleswitch" class=${p._class} >
            ${p.title ? `<label for=${p.id}>${p.title}</label>`: ''}
            <select name=${p.name} id=${p.id} data-theme=${p.theme} data-role="slider" data-mini=${p.mini}>
                <option value="off">${p.textOff}</option>
                <option value="on">${p.textOn}</option>
    `
        return this.finalizy(component, p);
    }

    checkboxes(p = {}) {
        this.propertyIsNullOrDemo(p, 'Checkboxes', ['id']);
        p.append = p.append ? p.append : this.getLastElement('page').find('div[data-role=content]');     
        p.name = p.name ? p.name : p.id;        
        p.theme = p.theme ? p.theme : this.theme;

        var component =
        `
        <div id=${p.id} data-role="fieldcontain" data-controltype="checkboxes">
            <fieldset data-role="controlgroup" data-type="vertical" data-mini="true">
            ${p.title ? `<legend>${p.title}</legend>`: ''}
                {ITENS}
        `
        var itens = "";
        [1,2].forEach( (item,index)=> {
            var item = 
            `
            <input id="checkbox${index+1}" name="NAME" data-theme="b" type="checkbox">
            <label for="checkbox${index+1}">TEXT</label>
            `
            itens = itens.concat(item)
        })
        
        component = component.replace('{ITENS}', itens)
        return this.finalizy(component, p);
    }


}

const p = {
    placeholder: 'nome',
    value: 'Geilson',
    type: 'password',
    title: 'obs'
}

const mobile = new Mobile('b')

mobile.page()
mobile.header()
mobile.footer()
mobile.button()
mobile.input()
mobile.area()
mobile.heading()
mobile.link()
mobile.toggleSwitch()
mobile.slider()
mobile.checkboxes()







 








var aux = {};

function createID(nameElement) {
    nameElement = nameElement.toLocaleLowerCase();
    nameElement = nameElement.replace(/\s/g, ""); // remove todos os espaços
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
    p = p.replace('data-mini=undefined', '');
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