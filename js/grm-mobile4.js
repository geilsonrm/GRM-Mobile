String.prototype.replaceAll = function (searchStr, replaceStr) {
    var str = this;
    // escape regexp special characters in search string
    searchStr = searchStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return str.replace(new RegExp(searchStr, 'gi'), replaceStr);
};

Array.prototype.exist = function (value) {
    return this.indexOf(value) >= 0
}

class Mobile {

    constructor(p = {}) {
        this.theme = "";
        this.lastElements = [];
        this.itens = [];
        this.appends = [];
        this.append;
        this.component = {};
    }

    addAppend(component, nameComponent) {
        this.appends[nameComponent] = component;
    }

    append(nameComponent) {
        this.append = this.appends[nameComponent]
    }

    newComponent(p) {
        this.component = {};
        this.component.attr = p;
        this.component.default = [];
    }

    setNameComponent() {
        // gets the text between whitespace for second part of stacktrace
        const pathMethod = (new Error()).stack.match(/at (\S+)/g)[1].slice(3);
        this.component.name = pathMethod.split('.')[1]
    }

    isDemo() {
        this.component.demo = Object.keys(this.component.attr)[0] == undefined;
    }

    // deletar em breve
    isDefault(attr) { 
        return this.component.default.indexOf(attr) >= 0;
    }

    createPropriesIfForNull(arr) {
        const id = createID(this.component.name);
        // this.setPropertyToDemo(p, nameComponent, index);

        if(arr.exist('id'))             this.component.attr.id          || id;
        if(arr.exist('href'))           this.component.attr.newWindow   || '#';
        if(arr.exist('type'))           this.component.attr.type        || 'text';       
        if(arr.exist('size'))           this.component.attr.size        || 1;    
        if(arr.exist('theme'))          this.component.attr.theme       || this.theme;
        if(arr.exist('native'))         this.component.attr.native      || false; 
        if(arr.exist('reverse'))        this.component.attr.reverse     || '#';
        if(arr.exist('newWindow'))      this.component.attr.newWindow   || '_blank';
        if(arr.exist('transition'))     this.component.attr.transition  || 'flow'; 
        if(arr.exist('trackTheme'))     this.component.attr.trackTheme  || this.theme;
        if(arr.exist('placeholder'))    this.component.attr.placeholder || 'Digite aqui'; 
        if(arr.exist('orientation'))    this.component.attr.orientation || 'vertical'; 

        // if(['Page'].indexOf(nameComponent) >= 0) {
        //     p.append = p.append ? p.append : $('body');
        // } else if( ['Header','Footer', 'Panel'].indexOf(nameComponent) >= 0) {
        //     p.append = p.append ? p.append : this.getLastElement('page');
        // } else {
        //     p.append = p.append ? p.append : this.getLastElement('page').find('div[data-role=content]');
        // }
        // var itens = this.itens;
        // if(['Nav Bar', 'List View', 'Collapsible', 'Select Menu', 'Radio Buttons', 'Check Boxes'].indexOf(nameComponent) >= 0 && this.itens.length <= 0) {
        //     this.addItem([{},{},{}])
        //     if(nameComponent == 'List View') itens.unshift({divider:true, text:nameComponent});
        // } 

        // return p;
    }



    
    setPropertyToDemo(p, nameComponent, index) {
        const pIsUndefined = Object.keys(p)[0] == undefined;
        if (pIsUndefined) {
            p.title = nameComponent;
            p.heading = nameComponent;
            p.text = nameComponent;
            p.icon = 'star';
            p.trackTheme = 'b';
            p.highlight = 'true';
            p.native = 'false';
            p.name = createID(nameComponent);
            p.bubble = Math.floor((Math.random() * 200) + 1);
            p.theme = nameComponent == 'item' ? 'c' : this.theme;
            p.text = nameComponent == 'item' ? `${nameComponent} ${index + 1}` : nameComponent;
            // var itens = this.itens;
            // if(['List View', 'Collapsible', 'Select Menu', 'Radio Buttons', 'Check Boxes'].indexOf(nameComponent) >= 0
            //    && this.itens.length <= 0) {
            //     this.addItem([{},{},{}])
            //     if(nameComponent == 'List View') itens.unshift({divider:true, text:nameComponent});
            // } 
        }
        return p;
    }

    propertiesWhenNull(p, nameComponent, arrayPropertys = [], index) {
        // p.itens = ''
        // checa se o componente é demo
        // caso seja será atribuído valores de exemplo  
        this.setPropertyToDemo(p, nameComponent, index);

        // checa atributos que receberão valor default
        // caso seja nulo será atribuído valor 
        if (nameComponent == 'Button')
            if (this.isDefault('id')) this.component.id || createID(nameComponent);

        if (arrayPropertys.indexOf('id') >= 0)
            p.id = p.id ? p.id : createID(nameComponent);

        if (arrayPropertys.indexOf('theme') >= 0)
            p.theme = p.theme ? p.theme : this.theme;

        // if(arrayPropertys.indexOf('inset') >= 0) 
        //     p.inset = p.inset || true;      

        if (arrayPropertys.indexOf('trackTheme') >= 0)
            p.trackTheme = p.trackTheme ? p.trackTheme : this.theme;

        if (arrayPropertys.indexOf('reverse') >= 0)
            p.reverse = p.reverse ? '"reverse"' : undefined;

        if (arrayPropertys.indexOf('newWindow') >= 0)
            p.newWindow = p.newWindow ? '"_blank"' : undefined;

        if (arrayPropertys.indexOf('rel') >= 0)
            p.rel = p.rel ? '"back"' : undefined;

        if (arrayPropertys.indexOf('href') >= 0)
            p.href = p.href ? "#" + p.href : '"#"';

        if (arrayPropertys.indexOf('type') >= 0)
            p.type = p.type ? p.type : 'text';

        if (arrayPropertys.indexOf('size') >= 0)
            p.size = p.size ? p.size : 1;

        if (arrayPropertys.indexOf('placeholder') >= 0)
            p.placeholder = p.placeholder ? p.placeholder : "Digite aqui";

        if (arrayPropertys.indexOf('transition') >= 0)
            p.transition = p.transition ? p.transition : "flow";

        if (arrayPropertys.indexOf('orientation') >= 0)
            p.orientation = p.orientation ? p.orientation : "vertical";

        if (arrayPropertys.indexOf('native') >= 0)
            p.native = p.native ? p.native : "false";

        // define append do componente
        if (['Page'].indexOf(nameComponent) >= 0) {
            p.append = p.append ? p.append : $('body');
        } else if (['Header', 'Footer', 'Panel'].indexOf(nameComponent) >= 0) {
            p.append = p.append ? p.append : this.getLastElement('page');
        } else {
            p.append = p.append ? p.append : this.getLastElement('page').find('div[data-role=content]');
        }
        var itens = this.itens;
        if (['Nav Bar', 'List View', 'Collapsible', 'Select Menu', 'Radio Buttons', 'Check Boxes'].indexOf(nameComponent) >= 0 && this.itens.length <= 0) {
            this.addItem([{}, {}, {}])
            if (nameComponent == 'List View') itens.unshift({ divider: true, text: nameComponent });
        }

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
        // concatena itens ao componente
        component = component.replace('{ITENS}', p.itens)
        // remove atributos undefined
        component = removeUndefined(component);
        // console.info(component)
        // converte string em seletor jQuery
        component = $(component)
        // insere element no destino informado por p.append
        // console.info(`Component: ${p} | ID: ${p.id}`)
        p.append.append(component);
        this.setLastElement(component);
        this.itens = [];
        return component;
    }

    // lastElement() {
    //     const countElements = document.querySelectorAll('[data-role='+ 'page' +']').length;
    //     return document.querySelectorAll('[data-role='+ 'page' +']')[countElements-1];
    // }

    page(p = {}) {
        this.theme = p.theme ? p.theme : 'b';
        this.propertiesWhenNull(p, 'Page', ['id', 'theme']);
        var component =
            `
        <div data-role="page" id=${p.id} class=${p._class} data-control-title=${p.title} data-theme=${p.theme} >
            <div data-role="content">
   
        `
        component = removeUndefined(component);
        component = $(component)
        p.append.append(component);
        return this.setLastElement(component, 'page');
    }

    header(p = {}) {
        this.propertiesWhenNull(p, 'Header', ['id', 'theme']);
        var component =
            `
        <div data-role="header" id=${p.id} class=${p._class} data-theme=${p.theme || this.theme} >
            <h1>${p.text || '&nbsp;'}</h1>
            <a href="#info" data-rel="popup" class="ui-btn ui-btn-icon-notext ui-icon-info ui-btn-b ui-corner-all ui-btn-right"></a>
        </div>
        `
        component = removeUndefined(component);
        component = $(component)
        p.append.prepend(component);
        return this.setLastElement(component, 'header');
    }

    footer(p = {}) {
        this.propertiesWhenNull(p, 'Footer', ['id', 'theme']);
        var component =
            `
        <div data-role="footer" id=${p.id} class=${p._class} data-theme=${p.theme || this.theme} data-position="fixed" >
            <h1>${p.text || '&nbsp;'}</h1>
        </div>
        `
        component = removeUndefined(component);
        component = $(component)
        p.append.append(component);
        return this.setLastElement(component, 'header');
    }



    button(p = {}) {
        this.newComponent(p)
        this.setNameComponent()
        this.isDemo()
        this.createPropriesIfForNull(['id', 'theme', 'reverse', 'newWindow', 'rel', 'transition', 'href'])
        this.propertiesWhenNull(p, 'Button', ['id', 'theme', 'reverse', 'newWindow', 'rel', 'transition', 'href']);
        var component =
            `        
        <a data-role="button" id=${p.id} class=${p._class} data-theme=${p.theme} 
        target=${p.newWindow} data-inline=${p.line} data-direction=${p.reverse} data-rel=${p.rel} 
        data-icon=${p.icon} data-iconpos=${p.iconpos} data-transition=${p.transition} href=${p.href}>${p.text || '&nbsp;'}</a>
        
        `
        return this.finalizy(component, p);
    }

    textinput(p = {}) {
        this.propertiesWhenNull(p, 'Text Input', ['id', 'theme', 'type', 'placeholder']);
        var component =
            `
        <div data-role="fieldcontain" data-controltype="textinput" class=${p._class}>
            ${p.title ? `<label for=${p.id}>${p.title}</label>` : ''}
            <input name=${p.name} id=${p.id} placeholder=${p.placeholder} value=${p.value} type=${p.type}>
        `
        return this.finalizy(component, p);
    }

    textarea(p = {}) {
        this.propertiesWhenNull(p, 'Text Area', ['id', 'theme', 'placeholder']);
        var component =
            `
        <div data-role="fieldcontain" data-controltype="textarea" class=${p._class}>
            ${p.title ? `<label for=${p.id}>${p.title}</label>` : ''}
            <textarea name=${p.name} id=${p.id} placeholder=${p.placeholder} type=${p.type}>${p.value}</textarea>
        `
        return this.finalizy(component, p);
    }

    heading(p = {}) {
        this.propertiesWhenNull(p, 'Heading', ['id', 'theme', 'size']);
        var component =
            `
        <h${p.size} id=${p.id} class=${p._class}>${p.text}</h${p.size}>
        `
        return this.finalizy(component, p);
    }

    link(p = {}) {
        this.propertiesWhenNull(p, 'Link', ['id', 'theme', 'newWindow', 'href']);
        var component =
            `
        <a id=${p.id} class=${p._class} target=${p.newWindow} data-transition=${p.transition} href=${p.href}>${p.text || Link}</a>
        `
        return this.finalizy(component, p);
    }

    slider(p = {}) {
        this.propertiesWhenNull(p, 'Slider', ['id', 'theme', 'trackTheme']);
        var component =
            `
        <div data-role="fieldcontain" data-controltype="slider" class=${p._class}>
            ${p.title ? `<label for=${p.id}>${p.title}</label>` : ''}
            <input id=${p.id} type="range" name=${p.name} value=${p.value || 50} min=${p.valueMin || 0} max=${p.valueMax || 100}
            data-highlight=${p.highlight} data-mini=${p.mini} data-theme=${p.theme} data-track-theme=${p.trackTheme}>
        `
        return this.finalizy(component, p);
    }

    toggleSwitch(p = {}) {
        this.propertiesWhenNull(p, 'Toggle Switch', ['id', 'theme',]);
        var component =
            `
        <div data-role="fieldcontain" data-controltype="toggleswitch" class=${p._class} >
            ${p.title ? `<label for=${p.id}>${p.title}</label>` : ''}
            <select name=${p.name || p.id} id=${p.id} data-theme=${p.theme} data-role="slider" data-mini=${p.mini}>
                <option value="off">${p.textOff || "off"}</option>
                <option value="on">${p.textOn || "on"}</option>
        `
        return this.finalizy(component, p);
    }

    addItem(p = {}) {

        if (!Array.isArray(p)) {
            this.itens.push(p);
        } else {
            p.forEach(item => this.itens.push(item))
        }
        return this.itens;
    }

    navbar(p = {}) {
        this.propertiesWhenNull(p, 'Nav Bar', ['id', 'theme', 'orientation']);
        p.name = p.name ? p.name : p.id;
        var component =
            `
        <div id=${p.id} data-role="navbar" data-iconpos=${p.iconpos} class=${p._class}>
            <ul>
                {ITENS}
            </ul>
        </div>
        `
        p.itens = '';
        this.itens.forEach((item, index) => {
            this.propertiesWhenNull(item, 'item', [], index);
            item.theme = item.theme || p.theme || 'c';
            var item =
                `
            <li>
                <a href=${item.href} data-transition=${item.transition} data-theme=${item.theme} data-icon=${item.icon}>
                    ${item.text}
                </a>
            </li>
            `
            p.itens = p.itens.concat(item)
        })
        return this.finalizy(component, p);
    }

    checkboxes(p = {}) {
        this.propertiesWhenNull(p, 'Check Boxes', ['id', 'theme', 'orientation']);
        p.name = p.name ? p.name : p.id;
        var component =
            `
        <div id=${p.id} data-role="fieldcontain" data-controltype="checkboxes">
            <fieldset data-role="controlgroup" data-type=${p.orientation} data-mini=${p.mini}>
            ${p.title ? `<legend>${p.title}</legend>` : ''}
                {ITENS}
        `
        p.itens = '';
        this.itens.forEach((item, index) => {
            this.propertiesWhenNull(item, 'item', [], index);
            item.theme = item.theme || p.theme || 'c';
            var item =
                `
            <input  id="${p.id}-item${index + 1}" name=${item.name} data-theme=${item.theme} type="checkbox">
            <label for="${p.id}-item${index + 1}">${item.text}</label>
            `
            p.itens = p.itens.concat(item)
        })
        return this.finalizy(component, p);
    }

    radiobuttons(p = {}) {
        this.propertiesWhenNull(p, 'Radio Buttons', ['id', 'theme', 'orientation']);
        p.name = p.name ? p.name : p.id;
        var component =
            `
        <div id=${p.id} data-role="fieldcontain" data-controltype="radiobuttons">
            <fieldset data-role="controlgroup" data-type=${p.orientation} data-mini=${p.mini}>
            ${p.title ? `<legend>${p.title}</legend>` : ''}            
                {ITENS}
        `
        p.itens = '';
        this.itens.forEach((item, index) => {
            this.propertiesWhenNull(item, 'item', [], index);
            item.theme = item.theme || p.theme || 'c';
            var item =
                `
            <input  id="${p.id}-item${index + 1}" name=${p.id} data-theme=${item.theme} type="radio">
            <label for="${p.id}-item${index + 1}">${item.text}</label>
            `
            p.itens = p.itens.concat(item)
        })
        return this.finalizy(component, p);
    }

    selectMenu(p = {}) {
        this.propertiesWhenNull(p, 'Select Menu', ['id', 'theme']);
        p.name = p.name ? p.name : p.id;
        var component =
            `
        <div data-role="fieldcontain" data-controltype="selectmenu" class=${p._class}>
            ${p.title ? `<label for=${p.id} >${p.title}</label>` : ''}  
            <select id=${p.id} data-native-menu=${p.native} name=${p.name} data-theme=${p.theme} data-mini=${p.mini}>
                {ITENS}
        `
        p.itens = '';
        this.itens.forEach((item, index) => {
            this.propertiesWhenNull(item, 'item', [], index);
            var item =
                `
            <option value="${p.value || index}">${item.text}</option>
            `
            p.itens = p.itens.concat(item)
        })
        return this.finalizy(component, p);
    }

    collapsible(p = {}) {
        this.propertiesWhenNull(p, 'Collapsible', ['id', 'theme']);
        p.name = p.name ? p.name : p.id;
        var component =
            `
        <div id=${p.id} data-role="collapsible-set" data-theme=${p.theme} data-content-theme=${p.themeContent || 'b'} class=${p._class}>
            {ITENS}
        `
        p.itens = '';
        this.itens.forEach((item, index) => {
            this.propertiesWhenNull(item, 'item', [], index);
            var item =
                `
            <div id="${p.id}-item${index + 1}" data-role="collapsible" data-collapsed=${item.collapsed || true}>
                <h3>${item.text}</h3>
            </div>
            `
            p.itens = p.itens.concat(item)
        })
        return this.finalizy(component, p);
    }

    listview(p = {}) {
        this.propertiesWhenNull(p, 'List View', ['id', 'theme', 'inset']);
        p.name = p.name ? p.name : p.id;
        var component =
            `
        <ul id=${p.id} data-role="listview" data-divider-theme=${p.themeDivider || 'b'} data-inset=${(!!p.inset) || true} class=${p._class}>            
            {ITENS}
        `
        p.itens = '';
        this.itens.forEach((item, index) => {
            if (!item.divider) {
                this.propertiesWhenNull(item, 'item', ['id', 'href', 'transition', 'bubble'], index);
                item.theme = item.theme || 'c';
                var item =
                    `
                <li data-theme=${item.theme}>
                    ${ !item.readOnly ? `<a href=${item.href} data-transition=${item.transition}>` : ''}
                        ${item.text}
                        ${item.bubble ? `<span class="ui-li-count">${item.bubble}</span>` : ''}
                    ${ !item.readOnly ? '</a>' : ''}
                </li>
                `
            } else {
                var item =
                    `
                <li data-role="list-divider" role="heading">
                    ${item.text || '&nbsp;'}
                    ${item.bubble ? `<span class="ui-li-count">${item.bubble}</span>` : ''}
                `
            }
            p.itens += item

        })

        return this.finalizy(component, p);
    }



    panel(p = {}) {
        this.propertiesWhenNull(p, 'Panel', ['id', 'theme', 'inset']);
        p.name = p.name ? p.name : p.id;
        var component =
            `

        <div data-role="panel" id="aabb" data-position="left" data-display="reveal" data-theme="a">
            <ul data-role="listview" data-divider-theme="h" data-inset="false">
                <li data-role="list-divider" role="heading">Divider</li>
                <li data-theme="a"><a href="" data-transition="slide">Button</a></li>
            </ul>
        </div>
        `
        p.itens = '';
        this.itens.forEach((item, index) => {
            if (!item.divider) {
                this.propertiesWhenNull(item, 'item', ['id', 'href', 'transition', 'bubble'], index);
                item.theme = item.theme || 'c';
                var item =
                    `    <div data-role="panel" id="aabb" data-position="left" data-display="reveal"
    data-theme="a">
        <ul data-role="listview" data-divider-theme="h" data-inset="false">
            <li data-role="list-divider" role="heading">
                Divider
            </li>
            <li data-theme="a">
                <a href="" data-transition="slide">
                    Button
                </a>
            </li>
        </ul>
    </div>
                `
            } else {
                var item =
                    `
                <li data-role="list-divider" role="heading">
                    ${item.text || '&nbsp;'}
                    ${item.bubble ? `<span class="ui-li-count">${item.bubble}</span>` : ''}
                `
            }
            p.itens += item

        })
        component = removeUndefined(component);
        component = $(component)
        p.append.prepend(component);
        return this.setLastElement(component, 'header');
        // return this.finalizy(component, p);
    }


}




class Append {

    constructor(append) {
        this.append = append;
    }

    page() {
        return this.append
    }
}






// var mobile = new Mobile('e')

// mobile.page({theme:'d'})
// mobile.header()
// mobile.footer()
// mobile.button()
// mobile.textinput()
// mobile.textarea()
// mobile.heading()
// mobile.link()
// mobile.toggleSwitch()
// mobile.slider()
// mobile.checkboxes()
// mobile.button({transition:'flow', text:'Mirandola', icon:'gear', iconpos:'right', href:'page3'})



// mobile.page({theme:'c'})
// mobile.header()
// mobile.button({text:'Voltar', rel:true})
// mobile.heading({text:'Page 2'})
















var aux = {};

function createID(nameElement) {
    nameElement = nameElement.toLocaleLowerCase();
    nameElement = nameElement.replace(/\s/g, ""); // remove todos os espaços
    var countA = document.querySelectorAll('[data-role=' + nameElement + ']').length;
    var countB = document.querySelectorAll('[data-controltype=' + nameElement + ']').length;
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


    p = p.replaceAll('id=undefined', '');
    p = p.replaceAll('class=undefined', '');
    p = p.replaceAll('target=undefined', '');
    p = p.replaceAll('data-rel=undefined', '');
    p = p.replaceAll('data-inline=undefined', '');
    p = p.replaceAll('data-direction=undefined', '');
    p = p.replaceAll('data-transition=undefined', '');
    p = p.replaceAll('data-highlight=undefined', '');
    p = p.replaceAll('placeholder=undefined', '');
    p = p.replaceAll('value=undefined', 'value=""');
    p = p.replaceAll('name=undefined', 'name=""');
    p = p.replaceAll('data-icon=undefined', '');
    p = p.replaceAll('data-iconpos=undefined', '');
    p = p.replaceAll('data-native-menu=undefined', '');
    p = p.replaceAll('data-mini=undefined', '');
    p = p.replaceAll('data-inset=undefined', '');
    p = p.replaceAll('>undefined<', '><');
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