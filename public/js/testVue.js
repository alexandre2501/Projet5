/*Vue.component('test-component', {
    template: '<div class="test"><p>Je suis rouge</p></div>',
})

Vue.component('test2-component', {
    template: '<div class="test2">Je suis là</div>'
})*/

/*Vue.component('sidebar', {
    props: ['message'],
    template: '<div id="sidebar"></div>',
})*/

var sidebar = {
    props: ['message', 'id', 'menus'],
    data(){
        return{
            idSidebar: this.id,
            messageSidebar: this.message,
            menusSidebar: this.menus,
        }
    },
    template: '<div v-bind:id="idSidebar">{{messageSidebar}}' +
                '<button v-on:click="click">CLICK</button>' +
                '<ul id="menus">' +
                    '<li v-for="menu in menusSidebar" v-bind:id="menu.id">{{menu.text}}</li>' +
                '</ul>' +
            '</div>',
    methods:{
        click(){
            if(this.idSidebar === 'sidebar'){
                this.idSidebar = 'test2';
                this.messageSidebar = 'clicked';
            }
            else if(this.idSidebar === 'test2'){
                this.idSidebar = 'sidebar';
                this.messageSidebar = 'test';
            }
            console.log(this.id)
            console.log(this.idSidebar)
            //this.sidebar.template = '<div>OK</div>';
        }
    }
}

var login = {
    props: [],
    template:
        '<div id="login-popup">' +
            '<form>' +
                '<div class="form-group">' +
                    '<label for="pseudo-input"></label>' +
                    '<input type="text" id="pseudo-input" name="pseudo-input">' +
                    '<label for="pseudo-input"></label>' +
                    '<input type="text" id="pseudo-input" name="pseudo-input">' +
                '</div>' +
            '</form>' +
        '</div>',

}

var test = new Vue({
    el: '#test',
    data: {
        message: 'test',
        id: 'sidebar',
        menus: [
            {id: 'menu1', text: 'menu1'},
            {id: 'menu2', text: 'menu2'},
            {id: 'menu3', text: 'menu3'},
        ],
    },
    methods:{
        /*click(){
            if(this.id === 'sidebar'){
                this.id = 'test2';
                this.message = 'clicked';
            }
            else if(this.id === 'test2'){
                this.id = 'sidebar';
                this.message = 'test';
            }

            //this.sidebar.template = '<div>OK</div>';
        }*/
    },
    components:{
        sidebar: sidebar,
        login: login,
    }
})