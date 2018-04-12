import React, { Component } from 'react';
import PropTypes from 'prop-types'

export default class XEditor extends Component {

    componentDidMount() {
        this.ready()

    }
    static propTypes = {
        content: PropTypes.string,
        onEditorValueChange: PropTypes.func,
        onPublish:PropTypes.func
    }
    ready() {
        var ctx = this;		
        let e = this.refs['markDown_editor'];
        var mditor = this.mditor = window.Mditor.fromTextarea(e);
        mditor.on('ready',()=>{
            mditor.height = '500px';
            mditor.split = true;
            var helpBtn = mditor.toolbar.getItem("help");	//帮助按钮点击
            helpBtn.handler = function () {
                return ;
            };
            console.log(ctx.props.content)
            mditor.value = ctx.props.content;
            var isMac = function () { return /macintosh|mac os x/i.test(navigator.userAgent); }();

            // 居中
            mditor.toolbar.items.splice(6,0,
                {
                    name: 'align-center',
                    icon: 'align-center',
                    handler: function () {
                        mditor.editor.wrapSelectText('<p style="text-align:center">', '</p>');
                    },
                    title: '居中',
                    key: ''
                }
            );
                   
            mditor.toolbar.items.splice(14,0,
                {
                    name: 'file-image-o',
                    icon: 'file-image-o',
                    handler: function () {
                        var accept = {
                            image: 'image/png, image/gif, image/jpg, image/jpeg',
                        };
                        var $file = window.document.createElement('input')
                            $file.setAttribute('type','file')
                            $file.setAttribute('accept',accept.image)
                            $file.click();
                            $file.onchange = function(){
                                var file = this.files[0];
                                var name = file.name || 'screenshot.png';
                                ctx.props.uploadImg(file,function(url){
                                    ctx.mditor.editor.insertBeforeText('![' + name + '](' + url + ")\n");
                                });
                            }
                    },
                    title: '上传本地图片',
                    key: '',
                }
            );
            mditor.toolbar.items.splice(15,0,
                {
                    name: 'file-video',
                    icon: 'file-video-o',
                    handler: function () {
                        mditor.editor.wrapSelectText('<video style="text-align:center" width="100%" height="100%" autoplay="autoplay" src="','" controls="true"></video>');
                    },
                    title: '视频',
                    key: '',
                }
            );
            mditor.toolbar.items.splice(16,0,
                {
                    name: 'music',
                    icon: 'music',
                    handler: function () {
                        mditor.editor.wrapSelectText('<audio  autoplay="autoplay" src="','" controls="true"></audio>');
                    },
                    title: '音乐',
                    key: '',
                }
            );
                        
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
                name: 'publish',
                icon: 'paper-plane',
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
                // console.log('paste', event.clipboardData);
                var data = event.clipboardData;
                if (typeof data !== 'object') {
                    return;
                }
                [...data.items].forEach(function(item, index){
                     if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
                        var blob = item.getAsFile();
                        ctx.props.uploadImg(blob,function(url){
                            ctx.mditor.editor.insertBeforeText('![](' + url + ")\n");
                        });
                    }
                })
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

