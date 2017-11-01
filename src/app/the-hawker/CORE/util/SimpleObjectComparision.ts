export class SimpleObjectComparision {
    public static compareObject(object1: Object, object2: Object): boolean {
        let isSameObject: boolean = true;
        Object.keys(object1).forEach(function (key, index) {
            // key: the name of the object key
            // index: the ordinal position of the key within the object 
            if(object1[key] !== object2[key]) {
                isSameObject = false;
            }
        });
        Object.keys(object2).forEach(function (key, index) {
            // key: the name of the object key
            // index: the ordinal position of the key within the object 
            if(object1[key] !== object2[key]) {
                isSameObject = false;
            }
        });
        return isSameObject;
    }
}