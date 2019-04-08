/**
 * @author Alek6 / https://aleksejpetricig.wordpress.com/
 * @author Alek6 / https://github.com/Alek6
 */
class UIControls {
    /*
     *  Constructor.
     *
     *  This special method initialize the UIControls class.
     *
     *  @param camera: the Perspective camera on the scene
     *  @param domElement: this represents the DOM Element if the Element is undefined,
     *                     otherwise it gets the html body element
     */
    constructor( camera, domElement ) {

        const PI_2 = Math.PI / 2,
              ROTATION_SPEED = 0.002;

        this.domElement = (domElement !== undefined) ? domElement : document.body;
        this.isFreezed = false;

        var eyes = new THREE.Object3D; // pitch
        eyes.add( camera );

        var head = new THREE.Object3D(); // yaw
        head.position.y = 10;
        head.add( eyes );

        // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        /*
         *  This method apply the pitch and yaw rotation movements to the camera (eyes).
         *
         *  @param mouseEvent: the event of mouseX or mouseY movement
         */
        function onMouseMove( mouseEvent ) {
            if( this.isFreezed === false ) return;
            /*
             *  Vars that take the mouseX and mouseY movement events from different browsers (Browser Compatibility):
             *  MicrosoftEdge 13, Mozilla (Firefox) 41, Chrome 37 $ Safari No support
             */
            var movementX = mouseEvent.movementX || mouseEvent.mozMovementX || mouseEvent.webkitMovementX || 0;
            var movementY = mouseEvent.movementY || mouseEvent.mozMovementY || mouseEvent.webkitMovementY || 0;

            head.rotation.y -= movementX * ROTATION_SPEED; // yaw
            eyes.rotation.x -= movementY * ROTATION_SPEED; // pitch

            var lookUp = -PI_2;
            var lookDown = Math.min( PI_2, eyes.rotation.x );

            eyes.rotation.x = Math.max( lookUp, lookDown ); // pitch-up & pitch-down
        }

        /*
         *  This method allows to dispatch the 'click' MouseEvent, (synchronously) invoking the affected EventListeners
         *  in the appropriate order.
         *  It allows to alternate the cursor's lock, activating the movement events of the scene with the pointerLockElement (mouse, hiding the cursor).
         *  Pressing 'ESC' reverses the procedure.
         */
        function onPointerlockChange() {
            if( document.pointerLockElement === uiControls.domElement ) {
                uiControls.dispatchEvent( this.freeze );
                uiControls.isFreezed = true;
            } else {
                uiControls.dispatchEvent( this.unfreeze );
                uiControls.isFreezed = false;
            }
        }

        // This method occurs when there's an error with this class loading.
        function onPointerlockError() {
            console.error( '[ERROR] controls/UIControls: Unable to use UIControls API.' );
        }

        var onClick = () => {
            console.log("Click: true");
            var menu = document.getElementById('sceneFreezer');
            menu.parentNode.removeChild(menu);
        };

        /* Method to show Menu again
        var onDblClick = () => {
            var menu = document.createTextNode("<div id=\"sceneFreezer\">\n" +
                "            <!-- Display initial instructions menu -->\n" +
                "\t\t\t<div id=\"instructionsMenu\">\n" +
                "                <span id=\"title\">Click to PLAY</span>\n" +
                "                <br/>\n" +
                "                (UP/W, LEFT/A, RIGHT/D, DOWN/S) = Move <br/>\n" +
                "                (SPACEBAR) = Levitation <br/>\n" +
                "                (MOUSE) = Look around <br/>\n" +
                "                (DoubleCLick) = Exit\n" +
                "            </div>\n" +
                "\t\t</div>");
            var parent = document.body;
            var child = parent.createElement("div");
            child.appendChild(menu);
            parent.appendChild(child);
        };*/

        // This method adds EventListeners to the mouse and the pointer (cursor).
        this.unfreeze = () => {
            document.addEventListener( 'mousemove', onMouseMove, false );
            document.addEventListener( 'pointerlockchange', onPointerlockChange, false );
            document.addEventListener( 'pointerlockerror', onPointerlockError, false );
            document.addEventListener( 'click', onClick, false);
        };

        // This method removes EventListeners to the mouse and the pointer (cursor).
        this.freeze = () => {
            document.removeEventListener( 'mousemove', onMouseMove, false );
            document.removeEventListener( 'pointerlockchange', onPointerlockChange, false );
            document.removeEventListener( 'pointerlockerror', onPointerlockError, false );
        };

        this.dispose = () => { this.freeze(); };

        this.getObject = () => { return head; };

        this.getDirection = function () {
            var direction = new THREE.Vector3(0, 0, -1);
            var rotation = new THREE.Euler(0, 0, 0, 'YXZ');

            return ( v ) => {
                rotation.set(eyes.rotation.x, head.rotation.y, 0);
                v.copy(direction).applyEuler(rotation);
                return v;
            };
        }();

        // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        // KEYBOARD EVENTS
        /*
        *  This method listen for a keyboard event and sets to 'true' the movement variables,
        *  that the movement in the scene can be done.
        *
        *  @param event: the keyboard event from the user.
        */
        var onKeyDown = ( event ) => {
            switch ( event.key ) {
                // UP
                case 'ArrowUp':
                case 'W':
                case 'w':
                    moveForward = true;
                    if( event.key === 'ArrowUp' ) {
                        console.log("- ArrowUP: true");
                    } else if( event.key === 'W' || event.key === 'w' ) {
                        console.log("- W: true");
                    }
                    break;
                // LEFT
                case 'ArrowLeft':
                case 'A':
                case 'a':
                    moveLeft = true;
                    if( event.key === 'ArrowLeft' ) {
                        console.log("- ArrowLeft: true");
                    } else if( event.key === 'A' || event.key === 'a' ) {
                        console.log("- A: true");
                    }
                    break;
                // DOWN
                case 'ArrowDown':
                case 'S':
                case 's':
                    moveBackward = true;
                    if( event.key === 'ArrowDown' ) {
                        console.log("- ArrowDown: true");
                    } else if( event.key === 'S' || event.key === 's' ) {
                        console.log("- S: true");
                    }
                    break;
                // RIGHT
                case 'ArrowRight':
                case 'D':
                case 'd':
                    moveRight = true;
                    if( event.key === 'ArrowRight' ) {
                        console.log("- ArrowRight: true");
                    } else if( event.key === 'D' || event.key === 'd' ) {
                        console.log("- D: true");
                    }
                    break;
                // SPACE == FLY
                case ' ':
                    canFly = true;
                    if ( canFly ) {
                        if( event.key === ' ' ) {
                            console.log("- Spacebar: " + canFly + ", want to FLY!");
                        }
                    }
                    break;
                case 'Escape':
                    exit = true;
                    if( event.key === 'Escape' ) {
                        uiControls.freeze();
                        //document.addChilNode
                        console.log("- ESC: " + exit);
                    }
                    break;
            }
        };

        /*
        *  This method listen for a keyboard event and sets to 'false' the movement variables,
        *  when the user finish to press on a keyboard's key.
        *
        *  @param event: the keyboard event from the user.
        */
        var onKeyUp = ( event ) => {
            switch ( event.key ) {
                // UP
                case 'ArrowUp':
                case 'W':
                case 'w':
                    moveForward = false;
                    break;
                // LEFT
                case 'ArrowLeft':
                case 'A':
                case 'a':
                    moveLeft = false;
                    break;
                // DOWN
                case 'ArrowDown':
                case 'S':
                case 's':
                    moveBackward = false;
                    break;
                // RIGHT
                case 'ArrowRight':
                case 'D':
                case 'd':
                    moveRight = false;
                    break;
                // SPACE == FLY
                case ' ':
                    canFly = false;
                    break;
                case 'Escape':
                    exit = false;
                    break;
            }
        };

        // Addition of the EventListeners of the keyboard events
        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);

    }; // _constructor

} // _UIControls