/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);
		
		// set the default horizontal & vertical speed (accel vector)
		this.body.setVelocity(3, 15);
		
		// set the display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		
		// ensure the player is updated even when outside of the viewport
		this.alwaysUpdate = true;
		
		// define a basic walking animation (using all frames)
		
		this.renderable.addAnimation("walk", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
		this.renderable.addAnimation("walk-up", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
		this.renderable.addAnimation("walk-left", [9, 10, 11, 12, 13, 14, 15, 16, 17]);
		this.renderable.addAnimation("walk-right", [27, 28, 29, 30, 31, 32, 33, 34, 35]);
		this.renderable.addAnimation("walk-down", [18, 19, 20, 21, 22, 23, 24, 25, 26]);
		this.renderable.addAnimation("stand-left", [9]);
		this.renderable.addAnimation("stand-right", [27]);
		this.renderable.addAnimation("stand-up", [0]);
		this.renderable.addAnimation("stand-down", [18]);
				// define a standing animation (using the first frame)
		this.renderable.addAnimation("stand", [0]);
		//set the standing animation as default
		this.renderable.setCurrentAnimation("stand");
    },

    /**
     * update the entity
     */
    update : function (dt) {
	
	//this.body.vel.y=0;
	var moved=false;
	
	
	 if (me.input.isKeyPressed('left')) {
            // flip the sprite on horizontal axis
            this.renderable.flipX(false);
            // update the entity velocity
             this.body.vel.x -= this.body.accel.x * me.timer.tick;
            // change to the walking animation
			            if (!this.renderable.isCurrentAnimation("walk-left")) {
                this.renderable.setCurrentAnimation("walk-left");
            }
			var grid_size = 32;
			this.body.vel.x = 0;
			this.body.vel.y = 0;
			this.body.pos.x -= grid_size;
					//var x_pos = this.body.pos.x;
			//this.body.pos.x = Math.floor(x_pos % grid_size) * grid_size - grid_size;

			moved = true;
			
		} else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            this.renderable.flipX(false);
            // update the entity velocity
             this.body.vel.x += this.body.accel.x * me.timer.tick;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk-right")) {
                this.renderable.setCurrentAnimation("walk-right");
            } 
			var grid_size = 32;
			this.body.vel.x = 0;
			this.body.vel.y = 0;
			this.body.pos.x += grid_size;
			moved = true;
		} else if (me.input.isKeyPressed('up')) {
            // unflip the sprite
            this.renderable.flipX(false);
            // update the entity velocity
             this.body.vel.x += this.body.accel.x * me.timer.tick;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk-up")) {
                this.renderable.setCurrentAnimation("walk-up");
            }
			var grid_size = 32;
			this.body.vel.x = 0;
			this.body.vel.y = 0;
			this.body.pos.y -= grid_size;
			moved = true;
		 
        }
		else if (me.input.isKeyPressed('down')) {
            // unflip the sprite
            this.renderable.flipX(false);
            // update the entity velocity
             this.body.vel.x += this.body.accel.x * me.timer.tick;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk-down")) {
                this.renderable.setCurrentAnimation("walk-down");
            }
			var grid_size = 32;
			this.body.vel.x = 0;
			this.body.vel.y = 0;
			this.body.pos.y += grid_size;
			moved = true;
		 
        }
		else {
            this.body.vel.x = 0;
            // change to the standing animation
            this.renderable.setCurrentAnimation("stand");
        }
     
        if (me.input.isKeyPressed('jump')) {
            // make sure we are not already jumping or falling
            if (!this.body.jumping && !this.body.falling) {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                // set the jumping flag
                this.body.jumping = true;
            }
 
        }

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0 || moved);
    },

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        // Make all other objects solid
        return true;
    }
});