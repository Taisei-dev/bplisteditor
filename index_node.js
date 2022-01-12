const parser=require('bplist-parser');
const bplist=require('bplist-creator');

function toBuffer(ab) {
    var buf = Buffer.alloc(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}
function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}

var load=document.querySelector('input#load');
load.onchange=()=>{
    filename=load.files[0].name;
    fileReader=new FileReader();
    fileReader.onload=()=>{
        editor.set(parser.parseBuffer(toBuffer(fileReader.result)));
    }
    fileReader.readAsArrayBuffer(load.files[0]);
};

var save=document.querySelector('button#save');
save.onclick=()=>{
    const url=URL.createObjectURL(new Blob([toArrayBuffer(bplist(editor.get()))]));
    const link=document.createElement('a');
    link.href=url;
    link.download=filename;
    link.click();
    link.remove();
    setTimeout(()=>{URL.revokeObjectURL(url)},1e4);
};