String.prototype.replaceAll = function (searchStr, replaceStr) {
    var str = this;
    // escape regexp special characters in search string
    searchStr = searchStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return str.replace(new RegExp(searchStr, 'gi'), replaceStr);
};

String.prototype.insert = function (index, string) {
    if (index > 0)
      return this.substring(0, index) + string + this.substring(index, this.length);
    else
      return string + this;
};

String.prototype.reverse = function(){
    return this.split("").reverse().join("");
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

Array.prototype.exist = function (value) {
    return this.indexOf(value) >= 0
}

class Console {
    constructor(nameComponent, id, tip) {
        this.nameComponent = nameComponent;
        this.id = id;
        this.tip = tip;
    }
}
class Mobile {
    constructor(p = {}) {
        this.theme = p.theme || "b";
        this.html = "";
        this.pageId = "";
        this.itens = [];
        this.component = {};
        this.arrInfo = [];
        this.appendId = "";
    }
// 
    setInfo(nameComponent, id, tip) {
        const console = new Console(
            this.component.name,
            this.component.attr.id,
            this.component.attr.title || this.component.attr.text || this.component.attr.name
        )
        this.arrInfo.push(console)
    }

    info() {
        console.table(this.arrInfo)
    }

    addAppend(component, nameComponent) {
        this.appends[nameComponent] = component;
    }

    // append(nameComponent) {
    //     this.append = this.appends[nameComponent]
    // }

    newComponent(p) {
        this.html = "";
        this.component.attr = p;
    }

    setNameComponent() {
        // gets the text between whitespace for second part of stacktrace
        const pathMethod = (new Error()).stack.match(/at (\S+)/g)[1].slice(3);
        this.component.name = pathMethod.split('.')[1]
    }

    createID() {
        // nameElement = nameElement.toLocaleLowerCase();
        // nameElement = nameElement.replace(/\s/g, ""); // remove todos os espaços
        var countA = document.querySelectorAll('[data-role=' + this.component.name + ']').length;
        var countB = document.querySelectorAll('[data-controltype=' + this.component.name + ']').length;
        var count = countA || countB;
        const id = this.component.name.concat(count + 1);
        return id;
    }

    removePropriesIfUndefined() {
        this.html = this.html.replaceAll('id="undefined"', '');
        this.html = this.html.replaceAll('class="undefined"', '');
        this.html = this.html.replaceAll('name="undefined"', 'name=""');
        this.html = this.html.replaceAll('target="undefined"', '');
        this.html = this.html.replaceAll('value="undefined"', 'value=""');
        this.html = this.html.replaceAll('placeholder="undefined"', '');
        this.html = this.html.replaceAll('href="undefined"', '');
        this.html = this.html.replaceAll('data-rel="undefined"', '');
        this.html = this.html.replaceAll('data-inline="undefined"', '');
        this.html = this.html.replaceAll('data-direction="undefined"', '');
        this.html = this.html.replaceAll('data-transition="undefined"', '');
        this.html = this.html.replaceAll('data-icon="undefined"', '');
        this.html = this.html.replaceAll('data-iconpos="undefined"', '');
        this.html = this.html.replaceAll('data-mini="undefined"', '');
        this.html = this.html.replaceAll('data-inset="undefined"', '');
        this.html = this.html.replaceAll('data-track-theme="undefined"', '');
        this.html = this.html.replaceAll('>undefined<', '><');
    }

    isDemo() {
        this.component.demo = Object.keys(this.component.attr)[0] == undefined;
    }

    setPageId() {
        this.pageId = this.component.attr.id;
    }

    renderPage() {
        // console.info(this.component.name)
        // if (document.readyState === "complete")
        //     jQuery(`#${this.pageId}`).trigger('pagecreate');
    }

    renderPage2() {
        // console.info(this.component.name)
        if (document.readyState === "complete")
            jQuery(`#${this.pageId}`).trigger('pagecreate');
    }

    setAppendId(id) {
        console.log('--->', id||this.pageId);
        this.appendId = id||this.pageId;
    }

    appendHtml() {
        const destin = $(`#${this.appendId}`);
        // nome do componente
        if (['page'].indexOf(this.component.name) >= 0) {
            $('body').append(this.html)

        } else if (['header', 'panel'].indexOf(this.component.name) >= 0) {
            destin.prepend(this.html)

        } else if (['footer'].indexOf(this.component.name) >= 0) {
            destin.append(this.html)
            
        } else {
            // nome do destino
            if(this.appendId.indexOf('header') >= 0 )
                destin.append(this.html)
            if(this.appendId.indexOf('footer') >= 0 )
                destin.append(this.html)
            if(this.appendId.indexOf('page') >= 0 )
                destin.find('div[data-role=content]').append(this.html)
        }
        this.setInfo()
    }

    createPropriesIfDemo() {
        const id = this.createID();
        if (this.component.demo) {
            this.component.attr.title = this.component.name.capitalize();
            this.component.attr.heading = this.component.name.capitalize();
            this.component.attr.text = this.component.name.capitalize();
            this.component.attr.icon = 'star';
            this.component.attr.highlight = 'true';
           if(this.component.name == 'header')
            this.component.attr.text += ` - ${this.pageId.capitalize().insert(this.pageId.length-1,' 0')}`
        }
    }

    createPropriesIfNull(arr) {
        const p = this.component.attr;
        const id = this.createID();
        // this.setPropertyToDemo(p, nameComponent, index);

        if (!p.id && arr.exist('id')) p.id = id;
        if (!p.href && arr.exist('href')) p.href = '#';
        if (!p.type && arr.exist('type')) p.type = 'text';
        if (!p.theme && arr.exist('theme')) p.theme = this.theme;
        if (!p.reverse && arr.exist('reverse')) p.reverse = '#';
        // if (!p.newWindow && arr.exist('newWindow')) p.newWindow = '_blank';
        if (!p.transition && arr.exist('transition')) p.transition = 'flow';
        if (!p.placeholder && arr.exist('placeholder')) p.placeholder = 'Digite aqui';
    }


    page(p = {}) {
        this.newComponent(p)
        this.setNameComponent()
        this.isDemo()
        this.createPropriesIfNull(['id', 'theme', 'reverse', 'newWindow', 'rel', 'transition', 'href'])
        var p = this.component.attr;
        this.html += `
    <div placeholder="${p.placeholder}" data-role="page" id="${p.id}" class="${p.class}" data-control-title="${p.title || p.id}" data-theme="${p.theme}" >
    <div data-role="content">`
        this.removePropriesIfUndefined()
        this.setPageId()
        this.setAppendId()
        this.appendHtml();
        return this.component.attr.id
    }

    header(p = {}) {
        this.newComponent(p)
        this.setNameComponent()
        this.isDemo()
        this.createPropriesIfDemo()
        this.createPropriesIfNull(['id', 'theme'])
        var p = this.component.attr;
        this.html += `
    <div data-role="header" id="${p.id}" class="${p.class}" data-theme="${p.theme || this.theme}" >
        <h1>${p.text || '&nbsp;'}</h1>
        <a href="#info" data-rel="popup" class="ui-btn ui-btn-icon-notext ui-icon-info ui-btn-b ui-corner-all ui-btn-right"></a>
     </div>`
        this.removePropriesIfUndefined()
        this.appendHtml();
        this.renderPage();    
        return this.component.attr.id
    }

    footer(p = {}) {
        this.newComponent(p)
        this.setNameComponent()
        this.isDemo()
        this.createPropriesIfDemo()
        this.createPropriesIfNull(['id', 'theme'])
        var p = this.component.attr;
        this.html += `
    <div data-role="footer" id="${p.id}" class="${p.class}" data-theme="${p.theme || this.theme}" data-position="fixed" >
        <h1>${p.text || '&nbsp;'}</h1>
     </div>`
        this.removePropriesIfUndefined()
        this.appendHtml();
        this.renderPage();    
        return this.component.attr.id
    }

    button(p = {}) {
        this.newComponent(p)
        this.setNameComponent()
        this.isDemo()
        this.createPropriesIfDemo()
        this.createPropriesIfNull(['id', 'theme', 'reverse', 'newWindow', 'rel', 'transition', 'href'])
        var p = this.component.attr;
        this.html += `
    <a data-role="button" id="${p.id}" class="${p.class}" data-theme="${p.theme}" target="${p.newWindow}"
      data-inline="${p.line}" data-direction="${p.reverse}" data-rel="${p.rel}" data-icon="${p.icon}" 
      data-iconpos="${p.iconpos}" data-transition="${p.transition}" href="${p.href}">${p.text || '&nbsp;'}
     </a>`
        this.removePropriesIfUndefined()
        this.appendHtml();
        this.renderPage();    
        return this.component.attr.id
    }

    textInput(p = {}) {
        this.newComponent(p)
        this.setNameComponent()
        this.isDemo()
        this.createPropriesIfDemo()
        this.createPropriesIfNull(['id', 'theme', 'type', 'placeholder'])
        var p = this.component.attr;
        this.html += `
    <div data-role="fieldcontain" data-controltype="textinput" class="${p.class}">
        ${p.title ? `<label for="${p.id}">${p.title}</label>` : ''}
        <input name="${p.name}" id="${p.id}" placeholder="${p.placeholder}" value="${p.value}" type="${p.type}">`
        this.removePropriesIfUndefined()
        this.appendHtml();
        this.renderPage();    
        return this.component.attr.id
    }

    heading(p = {}) {
        this.newComponent(p)
        this.setNameComponent()
        this.isDemo()
        this.createPropriesIfDemo()
        this.createPropriesIfNull(['id', 'theme', 'text'])
        var p = this.component.attr;
        this.html += `
    <h${p.size || 1} id="${p.id}" class="${p.class}">${p.text}</h${p.size || 1}>`
        this.removePropriesIfUndefined()
        this.appendHtml();
        this.renderPage();    
        return this.component.attr.id
    }

    youTube(p = {}) {
        this.newComponent(p)
        this.setNameComponent()
        this.isDemo()
        this.createPropriesIfDemo()
        this.createPropriesIfNull(['id', 'theme'])
        var p = this.component.attr;
        this.html += `
    <iframe align="middle" data-controltype="youtube" id="${p.id}" type="text/html" width="${p.width || "100%"}"
      height="${p.height || "216px"}" src="https://www.youtube.com/embed/${p.code || "C0DPdy98e4c"}" frameborder="0"
      class="${p.class}">
    </iframe>`
        this.removePropriesIfUndefined()
        this.appendHtml();
        this.renderPage();    
        return this.component.attr.id
    }

    vimeo(p = {}) {
        this.newComponent(p)
        this.setNameComponent()
        this.isDemo()
        this.createPropriesIfDemo()
        this.createPropriesIfNull(['id', 'theme'])
        var p = this.component.attr;
        this.html += `
    <iframe align="middle" data-controltype="vimeo" id="${p.id}" type="text/html" width="${p.width || "100%"}"
      height="${p.height || "216px"}" src="https://player.vimeo.com/video/${p.code || "219747427"}" frameborder="0"
      class="${p.class}">
    </iframe>`
        this.removePropriesIfUndefined()
        this.appendHtml();
        this.renderPage();    
        return this.component.attr.id
    }

    image(p = {}) {
        this.newComponent(p)
        this.setNameComponent()
        this.isDemo()
        this.createPropriesIfDemo()
        this.createPropriesIfNull(['id', 'theme'])
        var p = this.component.attr;
        this.html += `
    <a href="${p.href || "#"}" data-controltype="image" target="${p.newWindow}" id="${p.id}" class="${p.class}" >
        <div style="width: 288px; height: 200px; position: 'relative'; background-color: #fbfbfb; border: 1px solid #b8b8b8;">
            <img src=${p.src || "https://codiqa.com/static/images/v2/image.png"} alt="image"}
             style="position: absolute; top: 50%; left: 50%; margin-left: -16px; margin-top: -18px">
        </div>
    </a>`
        this.removePropriesIfUndefined()
        this.appendHtml();
        this.renderPage();    
        return this.component.attr.id
    }

    link(p = {}) {
        this.newComponent(p)
        this.setNameComponent()
        this.isDemo()
        this.createPropriesIfDemo()
        this.createPropriesIfNull(['id', 'theme', 'newWindow', 'href'])
        var p = this.component.attr;
        this.html += `
    <a id="${p.id}" class="${p.class}" target="${p.newWindow}" data-transition="${p.transition}" 
     href="${p.href}">${p.text || Link}</a>`
        this.removePropriesIfUndefined()
        this.appendHtml();
        this.renderPage();    
        return this.component.attr.id
    }

    slider(p = {}) {
        this.newComponent(p)
        this.setNameComponent()
        this.isDemo()
        this.createPropriesIfDemo()
        this.createPropriesIfNull(['id', 'theme'])
        var p = this.component.attr;
        this.html += `
    <div data-role="fieldcontain" data-controltype="slider" class="${p.class}">
        ${p.title ? `<label for="${p.id}">${p.title}</label>` : ''}
        <input id="${p.id}" type="range" name="${p.name}" value="${p.value || 50}" min="${p.valueMin || 0}" 
         max="${p.valueMax || 100}" data-highlight="${p.highlight}" data-mini="${p.mini}" data-theme="${p.theme}"
         data-track-theme="${p.trackTheme || this.theme}">`
        this.removePropriesIfUndefined()
        this.appendHtml();
        this.renderPage();    
        return this.component.attr.id
    }

    toggleSwitch(p = {}) {
        this.newComponent(p)
        this.setNameComponent()
        this.isDemo()
        this.createPropriesIfDemo()
        this.createPropriesIfNull(['id', 'theme'])
        var p = this.component.attr;
        this.html += `
    <div data-role="fieldcontain" data-controltype="toggleswitch" class="${p.class}" >
        ${p.title ? `<label for="${p.id}">${p.title}</label>` : ''}
        <select name="${p.name || p.id}" id="${p.id}" data-theme="${p.theme}" data-role="slider" data-mini="${p.mini}">
            <option value="off">${p.textOff || "off"}</option>
            <option value="on">${p.textOn || "on"}</option>`
        this.removePropriesIfUndefined()
        this.appendHtml();
        this.renderPage();    
        return this.component.attr.id
    }

    addItem(p = {}) {
        if (!Array.isArray(p)) {
            this.itens.push(p);
        } else {
            p.forEach(item => this.itens.push(item))
        }
        return this.itens;
    }

    addItensIfItensNull() {
        if (this.itens.length <= 0) this.addItem([{}, {}, {}])
    }

    clearItens() {
        this.itens = [];
    }

    checkBoxes(p = {}) {
        this.newComponent(p)
        this.setNameComponent()
        this.isDemo()
        this.createPropriesIfDemo()
        this.createPropriesIfNull(['id', 'theme'])
        this.addItensIfItensNull()
        var p = this.component.attr;
        this.html += `
    <div id="${p.id}" data-role="fieldcontain" data-controltype="checkboxes">
        <fieldset data-role="controlgroup" data-type="${p.orientation || 'vertical'}" data-mini="${p.mini}">
        ${p.title ? `<legend>${p.title}</legend>` : ''}`

        this.itens.forEach((item, index) => {
            index++
            this.html += `
        <input  id="${p.id}-item${index}" name="${item.name || "Item " + index}" data-theme="${item.theme || this.theme}" 
         type="checkbox">
        <label for="${p.id}-item${index}">${item.text || "Item " + index}</label>`
        })
        this.clearItens();
        this.removePropriesIfUndefined();
        this.appendHtml();
        this.renderPage();    
        return this.component.attr.id
    }

    radioButtons(p = {}) {
        this.newComponent(p)
        this.setNameComponent()
        this.isDemo()
        this.createPropriesIfDemo()
        this.createPropriesIfNull(['id', 'theme'])
        this.addItensIfItensNull()
        var p = this.component.attr;
        this.html += `
    <div id="${p.id}" data-role="fieldcontain" data-controltype="radiobuttons">
        <fieldset data-role="controlgroup" data-type="${p.orientation || 'vertical'}" data-mini="${p.mini}">
        ${p.title ? `<legend>${p.title}</legend>` : ''}`

        this.itens.forEach((item, index) => {
            index++
            this.html += `
        <input  id="${p.id}-item${index}" name="${p.id}" data-theme="${item.theme || this.theme}" type="radio">
        <label for="${p.id}-item${index}">${item.text || "Item " + index}</label>`
        })
        this.clearItens();
        this.removePropriesIfUndefined()
        this.appendHtml();
        this.renderPage();    
        return this.component.attr.id
    }

    selectMenu(p = {}) {
        this.newComponent(p)
        this.setNameComponent()
        this.isDemo()
        this.createPropriesIfDemo()
        this.createPropriesIfNull(['id', 'theme'])
        this.addItensIfItensNull()
        var p = this.component.attr;
        this.html += `
    <div data-role="fieldcontain" data-controltype="selectmenu" class="${p.class}">
        ${p.title ? `<label for="${p.id}" >${p.title}</label>` : ''}  
        <select id="${p.id}" data-native-menu="${p.native || false}" name="${p.name}" 
         data-theme="${p.theme}" data-mini="${p.mini}">`

        this.itens.forEach((item, index) => {
            index++
            this.html += `
        <option value="${p.value || index}">${item.text || "Item " + index}</option>`
        })
        this.clearItens();
        this.removePropriesIfUndefined()
        this.appendHtml();
        this.renderPage();    
        return this.component.attr.id
    }

    collapsible(p = {}) {
        this.newComponent(p)
        this.setNameComponent()
        this.isDemo()
        this.createPropriesIfDemo()
        this.createPropriesIfNull(['id', 'theme'])
        this.addItensIfItensNull()
        var p = this.component.attr;
        this.html += `
    <div id="${p.id}" data-role="collapsible-set" data-theme="${p.theme}" 
      data-content-theme="${p.themeContent || this.theme}" class="${p.class}">`

        this.itens.forEach((item, index) => {
            index++
            this.html += `
        <div id="${p.id}-item${index}" data-role="collapsible" data-collapsed="${item.collapsed || true}">
            <h3>${item.text || "Item " + index}</h3>
        </div>`
        })
        this.clearItens();
        this.removePropriesIfUndefined()
        this.appendHtml();
        this.renderPage();    
        return this.component.attr.id
    }

    listView(p = {}) {
        this.newComponent(p)
        this.setNameComponent()
        this.isDemo()
        this.createPropriesIfDemo()
        this.createPropriesIfNull(['id', 'theme'])
        this.addItensIfItensNull()
        var p = this.component.attr;
        this.html += `
    <ul id="${p.id}" data-role="listview" data-divider-theme="${p.themeDivider || this.theme}" 
      data-inset="${(!!p.inset) || true}" class="${p.class}">`

        this.itens.forEach((item, index) => {
            if (this.component.demo) item.bubble = Math.floor((Math.random() * 200) + 1);
            index++
            this.html += `
        <li data-theme="${item.theme || this.theme}">
            ${ !item.readOnly ? `<a href="${item.href || "#"}" data-transition="${item.transition}">` : ''}
                ${item.text || "Item " + index}
                ${item.bubble ? `<span class="ui-li-count">${item.bubble}</span>` : ''}
            ${ !item.readOnly ? '</a>' : ''}
        </li>`
        })
        this.clearItens();
        this.removePropriesIfUndefined()
        this.appendHtml();
        this.renderPage();    
        return this.component.attr.id
    }

    panel(p = {}) {
        this.newComponent(p)
        this.setNameComponent()
        this.isDemo()
        this.createPropriesIfDemo()
        this.createPropriesIfNull(['id', 'theme'])
        this.addItensIfItensNull()
        var p = this.component.attr;
        this.html += `
    <div data-role="panel" id="panel1" data-position="left" data-display="reveal" data-theme="a">
        <ul data-role="listview" data-divider-theme="h" data-inset="false">
            <li data-role="list-divider" role="heading">Divider</li>
            <li data-theme="a"><a href="" data-transition="slide">Button</a></li>
        </ul>
    </div>`

        this.itens.forEach((item, index) => {
            if (this.component.demo) item.bubble = Math.floor((Math.random() * 200) + 1);
            index++
            this.html +=
                ` `
        })
        this.clearItens();
        this.removePropriesIfUndefined()
        this.appendHtml();
        this.renderPage();    
        return this.component.attr.id
    }

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

