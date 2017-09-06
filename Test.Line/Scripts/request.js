var request = request || (function () {
    var request = {
        
        e_ResponseMessageType: { //Enum
            Success: 0,
            Warning: 1,
            Error: 2,
            Notice: 3
        },

        ajax: function (settings) {
            settings = settings || {};
            settings.isShownLoader = settings.isShownLoader || true;

            if (settings.isShownLoader)
                this.showLoader();
            
            if (typeof settings.error !== "function") {
                settings.error = this.defaultErrorCallback;
            }

            var ajaxSettings = {
                url: settings.url,
                data: settings.data,
                success: function (response) {
                    request.hasExecuted(response, settings.success);
                    if (settings.isShownLoader)
                        request.hideLoader();
                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    settings.error(xmlHttpRequest, textStatus, errorThrown);
                    if (settings.isShownLoader)
                        request.hideLoader();
                }
            };
            if (settings.type) ajaxSettings.type = settings.type;
            if (settings.async) ajaxSettings.async = settings.async;
            if (settings.contentType) ajaxSettings.contentType = settings.contentType; 
            if (settings.dataType) ajaxSettings.dataType = settings.dataType;
            if (settings.crossDomain) ajaxSettings.crossDomain = settings.crossDomain;
            //debugger;
            //ajaxSettings.traditional = true;

            $.ajax(ajaxSettings);
        },
        
        hasExecuted: function(response, successCallback) {
            response = response || {};
            
            if (response.RedidrectUrl) {
                window.location = response.RedidrectUrl;
                return;
            }
            else if (response.IsReload) {
                window.location.reload();
                return;
            }
            else if (response.IsAjaxLoad) {
                this.page(response.Url, response.Params, response.Container);
            }
            else if (response.IsAjaxLoadPartial) {
                this.page(response.Url, response.Params, response.Container, true);
            }
            else if (response.PopupShow) {
                Popup.show(
                    {
                        dataUrl: response.url,
                        width:response.width,
                        height: response.height
                });
            }
            else if (response.Message) {
                switch (response.Type) {
                    case this.e_ResponseMessageType.Error: this.showMessage(response.Message, 'error', false); break;
                    case this.e_ResponseMessageType.Success: this.showMessage(response.Message, 'success', false); break;
                    case this.e_ResponseMessageType.Warning: this.showMessage(response.Message, 'warning', false); break;
                    case this.e_ResponseMessageType.Notice: this.showMessage(response.Message, 'notice', false); break;
                }
            }

            var isErrror = false;
            if (response.PopupShow && response.url.indexOf("ApplicationError") > 0) {
                isErrror = true;
            }

            if (!isErrror) {
                if (typeof successCallback === "function") {
                    successCallback(response);
                }
            }
        },

        defaultErrorCallback: function (xmlHttpRequest, textStatus, errorThrown) {
            if (xmlHttpRequest.responseText) {
                var response = JSON.parse(xmlHttpRequest.responseText);
                window.location = response.RedidrectUrl;
            }
            //alert(textStatus + '\n' + errorThrown);
            //console.log(textStatus + '\n' + errorThrown);
        },

        showMessage: function (message, type, isSticky) {
            $().toastmessage('showToast', {
                text: message,
                type: type,
                position: 'middle-center',
                sticky: isSticky
            });
        },
         
        get: function (url, data, settings, successCallback, errorCallback) {
            if (typeof settings === 'function') {
                successCallback = settings;
                settings = undefined;
            }
            
            settings = settings || {};
            settings.url = url;
            settings.data = data;
            settings.success = successCallback;
            settings.error = errorCallback;
            
            this.ajax(settings);
        },
        
        post: function (url, data, settings, successCallback, errorCallback) {
            if (typeof settings === 'function') {
                successCallback = settings;
                settings = undefined;
            }

            
            
            settings = settings || {};
            settings.url = url;
            settings.data = data;
            settings.success = successCallback;
            settings.error = errorCallback;
            
            if (settings.complex === true) {
                settings.data = JSON.stringify(data);
                settings.contentType = 'application/json; charset=utf-8';
            }
            // Distinction
            settings.type = "POST";

            this.ajax(settings);
        },
        
        jsonp: function (url, data, settings, successCallback, errorCallback) {
            if (typeof settings === 'function') {
                successCallback = settings;
                settings = undefined;
            }

            settings = settings || {};
            settings.url = url;
            settings.data = data;
            settings.success = successCallback;
            settings.error = errorCallback;
            
            // Distinction
            settings.dataType = 'jsonp';
            settings.crossDomain = true;

            this.ajax(settings);
        },
        
        page: function (url, data, container, isSeparateElement, successCallback, errorCallback) {
            if (typeof isSeparateElement === 'function') {
                successCallback = isSeparateElement;
                isSeparateElement = undefined;
            }

            this.get(url, data, function (response) {
                if (typeof container === 'string') {
                    
                    isSeparateElement = isSeparateElement || false;
                    if (isSeparateElement)
                        response = $(response).find("#" + container).html();
                    container = $("#" + container);
                    
                //} else if (container instanceof HTMLElement) {
                //} else if (container instanceof jQuery) {
                //} else {
                //    return;
                    
                }
                container.html(response);

                if (typeof successCallback === 'function')
                    successCallback(response);
            });
        },

        location: function (url, isShownLoader) {
            if (isShownLoader == undefined)
                isShownLoader = true;

            if (isShownLoader)
                this.showLoader();

            window.location = url;
        },

        file: function (url) {
            window.location.href = url;
        },

        showLoader: function() {
            if (this.loader)
                this.loader.show();
        },

        hideLoader: function () {
            if (this.loader)
                this.loader.hide();
        }

    };

    return request;
})();