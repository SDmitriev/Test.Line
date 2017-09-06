var lineView = lineView || (function () {
    var view = {
        url: null,
        color: null,
        element: null,
        canvas: null,
        context: null,
        dragokFirst : false,
        dragokSecond: false,
        EndPoint:null
    };
    // Constructor.
    function lineView(ctor) {
        ctor = ctor || {};

        this.init(ctor);
        view.canvas.onmousedown = this.myDown;
        view.canvas.onmouseup = this.myUp;
    }

    lineView.prototype.init = function (params) {
        view.url = params.url;
        view.color = params.color;
        view.element = params.element;
        view.StartPoint = params.StartPoint;
        view.EndPoint = params.EndPoint;
        view.canvas = document.getElementById("canvas");
        view.context = view.canvas.getContext('2d');
    };

    lineView.prototype.initValidate = function () {
        view.element.form.validate({
            onkeyup: false,
            onfocusout: false,
            rules: {
                StartPointX: {
                    required: true,
                    digits:true
                },
                StartPointY: {
                    required: true,
                    digits: true
                },
                EndPointX: {
                    required: true,
                    digits: true
                },
                EndPointY: {
                    required: true,
                    digits: true
                }
            },
            messages: {

                StartPointX: {
                    required: "The first point X is required",
                    digits: "The first point X is invalid"
                },

                StartPointY: {
                    required: "The first point Y is required",
                    digits: "The first point Y is invalid"
                },

                EndPointY: {
                    required: "The end point Y is required",
                    digits: "The end point Y is invalid"
                },

                EndPointX: {
                    required: "The end point X is required",
                    digits: "The end point X is invalid"
                },
            },
            errorPlacement: function (error, element) {
                alert($(error).html());
            }
        });
    };
    
    lineView.prototype.draw = function (model) {
        console.log(model);
        this.clear();
        view.context.strokeStyle = model.Color;
        view.context.beginPath();
        view.context.moveTo(model.StartPoint.X, model.StartPoint.Y);
        view.context.lineTo(model.EndPoint.X, model.EndPoint.Y);
        view.context.stroke();
        view.context.beginPath();
        view.context.strokeStyle = "#ffffff";
        view.context.arc(model.StartPoint.X, model.StartPoint.Y, 5, 0, 2 * Math.PI);
        view.context.fillStyle = "#ffffff";
        view.context.fill();
        view.context.stroke();
        view.context.beginPath();
        view.context.strokeStyle = "#ffffff";
        view.context.arc(model.EndPoint.X, model.EndPoint.Y, 5, 0, 2 * Math.PI);
        view.context.fillStyle = "#ffffff";
        view.context.fill();
        view.context.stroke();
    };

    lineView.prototype.clear = function (model) {
        var canvas = document.getElementById("canvas");
        context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    lineView.prototype.update = function (model) {
        if (view.element.form.valid()) {
                view.StartPoint = {
                    X: $("input[name = 'StartPointX']").val(),
                    Y: $("input[name = 'StartPointY']").val(),
                };
                view.EndPoint = {
                    X: $("input[name = 'EndPointX']").val(),
                    Y: $("input[name = 'EndPointY']").val(),
                };
                this.draw({
                    StartPoint: view.StartPoint,
                    EndPoint: view.EndPoint,
                    Color: view.color
                });
        }
    };

    lineView.prototype.save = function () {
        if (view.element.form.valid()) {
            request.post(view.url.updateUrl, JSON.stringify({
                StartPoint: view.StartPoint,
                EndPoint: view.EndPoint,
                Color: view.color
            }), { contentType: 'application/json; charset=utf-8' });
        }
    };

    lineView.prototype.myMove = function myMove(e) {
        var rect = view.canvas.getBoundingClientRect();
        var localX = Math.round(e.pageX - rect.x);
        var localY = Math.round(e.pageY - rect.y);
        if (view.dragokFirst) {
            $("input[name = 'StartPointX']").val(localX);
            $("input[name = 'StartPointY']").val(localY);
            view.StartPoint = {
                X: localX,
                Y: localY
            };
            lv.draw({
                StartPoint: view.StartPoint,
                EndPoint: view.EndPoint,
                Color: view.color
            });
        }
        if (view.dragokSecond) {
            $("input[name = 'EndPointX']").val(localX);
            $("input[name = 'EndPointY']").val(localY);
            view.EndPoint = {
                X: localX,
                Y: localY
            };
            lv.draw({
                StartPoint: view.StartPoint,
                EndPoint: view.EndPoint,
                Color: view.color
            });
        }
    }

    lineView.prototype.myDown = function (e) {
        var rect = view.canvas.getBoundingClientRect();
        var localX = Math.round(e.pageX - rect.x);
        var localY = Math.round(e.pageY - rect.y);
        

        if (25 >= Math.sqrt(Math.pow(view.StartPoint.X - localX, 2) + Math.pow(view.StartPoint.Y - localY, 2))) {
            view.dragokFirst = true;
            view.canvas.onmousemove = lv.myMove;
            view.StartPoint = {
                X: localX,
                Y: localY,
            };
            lv.draw({
                StartPoint: view.StartPoint,
                EndPoint: view.EndPoint,
                Color: view.color
            });
        }

        if (25 >= Math.sqrt(Math.pow(view.EndPoint.X - localX, 2) + Math.pow(view.EndPoint.Y - localY, 2))) {
            view.dragokSecond = true;
            view.canvas.onmousemove = lv.myMove;
            view.EndPoint = {
                X: localX,
                Y: localY,
            };
            lv.draw({
                StartPoint: view.StartPoint,
                EndPoint: view.EndPoint,
                Color: view.color
            });
        }
    }

    lineView.prototype.myUp = function () {
        view.dragokFirst = false;
        view.dragokSecond = false;
        view.canvas.onmousemove = null;
    }
    
    return lineView;
})();