function ck(Obj,w,h) {
    var a1 = document.getElementById("a1");
    if (a1 == undefined || a1 == null) {
        document.write("<div id=\"a1\"></div>");
    }
    var flashvars = {
        f: '', //��Ƶ��ַ
        a: '', //����ʱ�Ĳ�����ֻ�е�s>0��ʱ����Ч
        s: '0', //���÷�ʽ��0=��ͨ������f=��Ƶ��ַ����1=��ַ��ʽ,2=xml��ʽ��3=swf��ʽ(s>0ʱf=��ַ�����a����ɶԵ�ַ����װ)
        c: '0', //�Ƿ��ȡ�ı�����,0���ǣ�1��
        x: '', //����xml���·����Ϊ�յĻ���ʹ��ckplayer.js������
        i: '', //��ʼͼƬ��ַ
        d: '', //��ͣʱ���ŵĹ�棬swf/ͼƬ,��������߸�����ͼƬҪ�����ӵ�ַ��û�е�ʱ�����վ���
        u: '', //��ͣʱ�����ͼƬ�Ļ����Ӹ����ӵ�ַ
        l: '', //ǰ�ù�棬swf/ͼƬ/��Ƶ����������߸�����ͼƬ����ƵҪ�����ӵ�ַ
        r: '', //ǰ�ù������ӵ�ַ����������߸�����û�е�����
        t: '', //��Ƶ��ʼǰ����swf/ͼƬʱ��ʱ�䣬��������߸���
        y: '', //������ʹ����ַ��ʽ���ù���ַʱʹ�ã�ǰ����Ҫ����l��ֵΪ��
        z: '', //�����棬ֻ�ܷ�һ����swf��ʽ
        e: '2', //��Ƶ������Ķ�����0�ǵ���js������1��ѭ�����ţ�2����ͣ���ţ�3�ǵ�����Ƶ�Ƽ��б�Ĳ����4�������Ƶ��������js���ܺ�1���
        v: '80', //Ĭ��������0-100֮��
        p: '0', //��ƵĬ��0����ͣ��1�ǲ���
        h: '4', //����http��Ƶ��ʱ���ú����϶�������=0��ʹ�������϶���=1��ʹ�ð��ؼ�֡��=2�ǰ�ʱ��㣬=3���Զ��жϰ�ʲô(�����Ƶ��ʽ��.mp4�Ͱ��ؼ�֡��.flv�Ͱ��ؼ�ʱ��)��=4Ҳ���Զ��ж�(ֻҪ�����ַ�mp4�Ͱ�mp4����ֻҪ�����ַ�flv�Ͱ�flv��)
        q: '', //��Ƶ���϶�ʱ�ο�������Ĭ����start
        m: '0', //Ĭ���Ƿ���õ�����Ű�ť���ټ�����Ƶ��0���ǣ�1��,���ó�1ʱ��Ҫ��ǰ�ù��
        g: '', //��Ƶֱ��g�뿪ʼ����
        j: '', //��Ƶ��ǰj�����
        k: '', //��ʾ��ʱ�䣬�� 30|60��꾭��������30�룬60�����ʾnָ������Ӧ������
        n: '', //��ʾ�����֣���k���ʹ�ã��� ��ʾ��1|��ʾ��2
        b: '0x000', //�������ı���ɫ����������õĻ���Ĭ��͸��
        w: '', //ָ�������Լ����õ��ı��ļ�,��ָ����Ĭ�ϵ��úͲ�����ͬ����txt�ļ�
        //���ò����������в����б����
        //����Ϊ�Զ���Ĳ��������������ڲ�������õ�
        my_url: 'ckhtm'//��ҳ���ַ
        //�����Զ��岥������������
    };
    if (Obj) {
        for (var k in Obj) {
            flashvars[k] = Obj[k];
        }
    }
    var params = { bgcolor: '#000000', allowFullScreen: true, allowScriptAccess: 'always' };
    var attributes = { id: 'ckplayer_a1', name: 'ckplayer_a1' };
    swfobject.embedSWF('/ckplayer/ckplayer.swf', 'a1', w, h, '9.0.0', '/ckplayer/expressInstall.swf', flashvars, params, attributes);
    swfobject.getObjectById('ckplayer_a1').ckplayer_whxy(w, h, 0, 0);
}

function playerstop() {
    //ֻ�е�������Ƶ������ʱ����e=0��4ʱ����Ч��
    alert('�������');
}
function aboutstr(str, f) {//�鿴str�ַ����Ƿ���f
    var about = false;
    var strarray = new Array();
    var farray = new Array();
    farray = f.split(",");
    if (str) {
        for (var i = 0; i < farray.length; i++) {
            strarray = str.split(farray[i]);
            if (strarray.length > 1) {
                about = true;
                break;
            }
        }
    }
    return about;
}