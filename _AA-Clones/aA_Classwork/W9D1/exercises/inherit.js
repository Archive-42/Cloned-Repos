class Surrogate {
    Surrogate.prototype = SuperClass.prototype;
    Subclass.prototype = new Surrogate();
    Subclass.prototype.constructor = Subclass;
}

Function.prototype.inherits = function(ParentClass, ChildClass) {
    function Surrogate() {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass; 
}

module.exports = inherits;

Object.create()