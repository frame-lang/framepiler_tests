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