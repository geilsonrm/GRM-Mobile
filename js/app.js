var mobile = new Mobile()

// Pagina 1
mobile.page()
mobile.header()
mobile.footer()

mobile.heading()
mobile.panel()
mobile.button({text:'page2', href:'#panel1'})
mobile.button({text:'page2', href:'#page2'})

// Pagina 2
mobile.page()
mobile.header()
mobile.footer()
mobile.setAppendId('header2')
mobile.textInput({appendTo:'header2'})
// mobile.heading()
// mobile.button({})

// mobile.setAppend('button1')

// mobile.toggleSwitch({})
// mobile.slider({})
// mobile.button({text:'Salvar'})
// mobile.textInput({title:'Aluno'})
// mobile.heading({})

// mobile.listView({})
// mobile.panel({})
// mobile.collapsible({})
// mobile.selectMenu({})
// mobile.radioButtons({})
// mobile.checkBoxes({})
// mobile.link({})