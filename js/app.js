var mobile = new Mobile()

// Pagina 1
mobile.page({theme:'e'})
mobile.header()
mobile.footer()
mobile.panel()
mobile.button({appendId:'header1', icon:'bars', href:'#panel1'})
mobile.button({appendId:'header1', text:'Page 2', href:'#page2'})
mobile.heading()

mobile.addItem({diviser:true, text:'FAbricante', theme:'h'})
mobile.addItem({text:'um', theme:'h'})
mobile.addItem({text:'dois', theme:'h'})
mobile.listView({appendId:'panel1', themeDivider:'h'})

mobile.collapsible()
mobile.textInput({appendId:'collapsible1-item1', theme:'e'})
// Pagina 2
// mobile.page()
// // mobile.header()
// mobile.footer()
// mobile.textInput()
// mobile.checkBoxes()
// mobile.button({text:'page2', href:'#panel1'})
// mobile.setAppendId('header1')
// mobile.button({appendId:'header1', text:'Menu', icon:'bars', href:'#panel1'})
// mobile.button({text:'OI', appendId:'header1'})

// Pagina 2
mobile.page()
mobile.header()
mobile.button({appendId:'header2', icon:'back', backHistoric:true, reverse:true})
mobile.footer()
mobile.textInput({appendTo:'header2'})
mobile.heading()
mobile.button()

// mobile.setAppend('button1')

// mobile.toggleSwitch()
// mobile.slider()
// mobile.button({text:'Salvar'})
// mobile.textInput({title:'Aluno'})
// mobile.heading()

// mobile.listView()
// mobile.panel()
// mobile.collapsible()
// mobile.selectMenu()
// mobile.radioButtons()
// mobile.checkBoxes()
// mobile.link()
