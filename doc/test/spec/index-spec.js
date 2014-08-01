KISSY.add(function (S, Node,Demo) {
    var $ = Node.all;
    describe('kprogress', function () {
        it('Instantiation of components',function(){
            var demo = new Demo();
            expect(S.isObject(demo)).toBe(true);
        })
    });

},{requires:['node','kg/kprogress/2.0.0/']});