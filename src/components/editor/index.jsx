import React, { Component } from 'react';


export default class XEditor extends Component {

    componentDidMount() {
        this.ready()
    }

    ready() {
        var ctx = this;		
        let e = this.refs['markDown_editor'];
        var mditor = this.mditor = window.Mditor.fromTextarea(e);
        mditor.on('ready',()=>{
            mditor.height = '500px';
            mditor.split = false;
            var helpBtn = mditor.toolbar.getItem("help");	//帮助按钮点击
            helpBtn.handler = function () {
                return ;
            };
            console.log(ctx.props.content)
            mditor.value = ctx.props.content;
            var isMac = function() { return /macintosh|mac os x/i.test(navigator.userAgent); }();
            mditor.toolbar.items.splice(0,0,{
                name: 'mail-reply',
                icon: 'mail-reply',
                handler: function () {
                    mditor.editor.undo();
                },
                title: '撤销',
                key: 'ctrl+z'
            },{
                name: 'mail-forward',
                icon: 'mail-forward',
                handler: function () {
                    mditor.editor.redo();
                },
                title: '恢复',
                key: isMac ? 'command+shift+z' : 'ctrl+y',
            });
            mditor.toolbar.items.push({
                name: 'home',
                icon: 'home',
                handler: function () {
                    ctx.props.onPublish() //发布
                },
                control: true,
                title: '发布',
                key: ''
            })
            mditor.on('changed', function(){
                  ctx.props.onEditorValueChange(mditor.value)
            });
            mditor.editor.on('drop',function(event){
                console.log('drop',event);
            });
            mditor.editor.on('paste',function(event){
                console.log('paste',event.clipboardData.types);
            });
            mditor.on('head-dblclick', function () {	//双击头部
                mditor.fullscreen = !mditor.fullscreen;
            });
        });

    }
    getEditorValue() {
        return this.mditor.editor.value
    }
	render() {
        return (
            <textarea name="content" id="markDown_editor" ref="markDown_editor"/>
		);
	}
}
