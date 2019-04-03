//const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const keys = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    BOTTOM: 40
};

class UIControls {

    // Costruttore
    constructor( object, domElement ) {

        this._object = object;

        this._domElement = (domElement !== undefined) ? domElement : document;

        // Set to false to disable this control
        this._enabled = true;
    }


    /*
     *  Public methods
     */
    // Setters & Getters
    get enabled() {
        return this._enabled;
    }

    set enabled(value) {
        this._enabled = value;
    }
    get domElement() {
        return this._domElement;
    }

    set domElement(value) {
        this._domElement = value;
    }
    get object() {
        return this._object;
    }

    set object(value) {
        this._object = value;
    }
    get keys() {
        return this._keys;
    }

    set keys(value) {
        this._keys = value;
    }
}



// KEYBOARD CONTROLS
function keyboardControls( event ) {

    switch( event === 'keydown') {

        case keys.UP:
            // finchè il tasto Up è premuto,
            // decrementare la componente z
            alert('ciao');
            camera.position.set(0,0,0);
            needsUpdate = true;
            break;

        case keys.BOTTOM:
            // do something
            needsUpdate = true;
            break;

        case keys.LEFT:
            // do something
            needsUpdate = true;
            break;

        case keys.RIGHT:

            needsUpdate = true;
            break;
    }
}

// Add event listener to the window
window.addEventListener( 'keydown', keyboardControls('keydown', ), false );

function needsUpdate() {
    var needsUpdate = false;
    if ( !needsUpdate ) {
        // prevent the browser from scrolling on cursor keys
        event.preventDefault();
        this.update();
    }
    return needsUpdate;
}