// emitted from framec_v0.4.3
// get include files at https://github.com/frame-lang/frame-ancillary-files

let HistoryBasic = function () {
    
    let that = {};
    that.constructor = HistoryBasic;
    
    //===================== Interface Block ===================//
    
    that.start = function () {
        let e = FrameEvent(">>",null);
        _state_(e);
    }
    
    that.switchState = function () {
        let e = FrameEvent("switchState",null);
        _state_(e);
    }
    
    that.gotoDeadEnd = function () {
        let e = FrameEvent("gotoDeadEnd",null);
        _state_(e);
    }
    
    that.back = function () {
        let e = FrameEvent("back",null);
        _state_(e);
    }
    
    //===================== Machine Block ===================//  //  Rust Playground
	  //  https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=4de397332dda2d16f57a70339967e53a
	  //  v0.4.1 syntax
	
    
    let _sStart_ = function (e) {
        if (e._message == ">>") {
            _transition_(_sS0_);
            return;
        }
    }
    
    let _sS0_ = function (e) {
        if (e._message == ">") {
            that.print_do("Enter $S0");
            return;
        }
        else if (e._message == "switchState") {
            // Switch\nState
            _transition_(_sS1_);
            return;
        }
        else if (e._message == "gotoDeadEnd") {
            _stateStack_push_(_state_);
            // Goto\nDead End
            _transition_(_sDeadEnd_);
            return;
        }
    }
    
    let _sS1_ = function (e) {
        if (e._message == ">") {
            that.print_do("Enter $S1");
            return;
        }
        else if (e._message == "switchState") {
            // Switch\nState
            _transition_(_sS0_);
            return;
        }
        else if (e._message == "gotoDeadEnd") {
            _stateStack_push_(_state_);
            // Goto\nDead End
            _transition_(_sDeadEnd_);
            return;
        }
    }
    
    let _sDeadEnd_ = function (e) {
        if (e._message == ">") {
            that.print_do("Enter $DeadEnd");
            return;
        }
        else if (e._message == "back") {
            // Go Back
            let state = _stateStack_pop_();
            _transition_(state);
            return;
        }
    }
    
    //===================== Actions Block ===================//
    
    that.print_do = function (msg) { throw new Error('Action not implemented.'); }
    
    //=============== Machinery and Mechanisms ==============//
    
    let _state_ = _sStart_;
    
    let _transition_ = function(newState) {
        let exitEvent = FrameEvent("<",null);
        _state_(exitEvent);
        _state_ = newState;
        let enterEvent = FrameEvent(">",null);
        _state_(enterEvent);
    }
    
    let _stateStack_ = [];
    
    let  _stateStack_push_ = function (stateData) {
        _stateStack_.push(stateData);
    }
    
    let _stateStack_pop_ = function() {
        return _stateStack_.pop();
    }
    
    return that; 
};

/********************
let HistoryBasicController = function () {
	let that = HistoryBasic.call(this);
	that.print_do = function (msg) {}
	return that;
};
********************/

const FrameEvent = function(message, parameters) {
    const that = {};
    that._message = message;
    that._parameters = parameters;
    that._return = null;
    return that;
};

let HistoryBasicController = function () {
	let that = HistoryBasic.call(this);
	that.print_do = function (msg) {
        console.log(msg);
    }
	return that;
};


const main = () => {
    const app = HistoryBasicController();
    app.start();
    app.gotoDeadEnd();
    app.back();

    app.switchState();
    app.gotoDeadEnd();
    app.back();
}

main();