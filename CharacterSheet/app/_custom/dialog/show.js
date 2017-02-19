define(function (require) {
    var _i = {
        app: require('durandal/app'),
        deferred: require('_custom/deferred'),
        $: require('jquery')
    };

    function ShowCls() { }
    ShowCls.prototype.showDialog = function (dialogModule, dialogData, returnFullPromise, context) {
        /// <summary>
        /// Loads given module using Durandal (system.acquire) and the activates dialog passing
        /// dialogData to activate function of dialog. A promise is returned that will only
        /// resolve when the dialog was successfully closed and promise will reject when the dialog
        /// was canceled. If you desire the original promise behavior of Durandal app.showDialog
        /// use the optional returnFullPromise argument.
        /// </summary>
        /// <param name="dialogModule" type="String">Name of dialog module, will be loaded by Durandal (system.acquire).</param>
        /// <param name="dialogData" type="Object">Object to pass to activate function of dialog instance.</param>
        /// <param name="returnFullPromise" type="Boolean" optional="true">If true (default is false), the promise from Durandal app.showDialog will be returned as-is.</param>
        /// <param name="context" type="String" optional="true">specify the dialog context to use (default is 'default')</param>
        /// <returns type="$.Deferred"></returns>
        context = context || 'default';
        var promise = _i.app.showDialog(dialogModule, dialogData, context);
        if (returnFullPromise === true) {
            return promise;
        }
        var dfd = _i.deferred.create();
        promise.then(function (data) {
            if (data && data.accepted) {
                dfd.resolve(data);
                return;
            }
            if (!data || data.canceled) {
                dfd.reject({ failureType: 'canceled', data: data });
            }
        }, function (data) {
            dfd.reject({ failureType: 'error', data: data });
        });
        return dfd.promise();
    };
    ShowCls.prototype.confirm = function (okKey, contentKey, confirmButtonDelay, titleKey, okIcon) {
        var self = this;
        confirmButtonDelay = (confirmButtonDelay === undefined || confirmButtonDelay === null) ? 3000 : confirmButtonDelay;
        var okKeyValue = okKey || 'Ok';
        var okIconValue = okIcon || 'Ok';
        var titleKeyValue = titleKey || 'Confirm';
        return self.showDialog('_custom/dialog/confirmdialog', {
            data: { contentKey: contentKey, confirmButtonDelay: confirmButtonDelay },
            titleKey: titleKeyValue,
            okKey: okKeyValue,
            okIcon: okIconValue,
            cancelKey: 'Cancel'
        });
    };
    ShowCls.prototype.confirmDelete = function (okKey, modalClassName, contentCount, totalContentCount, deleteButtonDelay, titleKey, confirmDeleteCountMsgKey, confirmDeleteMsgKey) {
        /// <summary>
        /// Displays delete confirmation dialog and returns JQuery Deferred (see showDialog).
        /// Can customize text of 'Ok' button with okKey argument.
        /// </summary>
        /// <param name="okKey" type="String" optional="true">
        /// Localization key to use for 'Ok' button text. Default key is 'OK'.
        /// </param>
        /// <returns type="$.Deferred"></returns>
        var self = this;
        deleteButtonDelay = (deleteButtonDelay === undefined || deleteButtonDelay === null || deleteButtonDelay === false) ? 3000 : deleteButtonDelay;
        var okKeyValue = okKey || 'Ok';
        var titleKeyValue = titleKey || 'DeleteContent';
        var confirmDeleteCountMsgKeyValue = confirmDeleteCountMsgKey || 'ConfirmDeleteCountMsgKey';
        var confirmDeleteMsgKeyValue = confirmDeleteMsgKey || 'ConfirmDeleteMsgKey';
        return self.showDialog('_custom/dialog/confirmdeletedialog', {
            data: {
                contentCount: contentCount,
                allText: (contentCount === totalContentCount) ? ' (' + _i.localizer.localize('All') + ')' : '',
                deleteButtonDelay: deleteButtonDelay,
                confirmDeleteMsgKey: confirmDeleteMsgKeyValue,
                confirmDeleteCountMsgKey: confirmDeleteCountMsgKeyValue
            },
            titleKey: titleKeyValue,
            okKey: okKeyValue,
            cancelKey: 'Cancel',
            okIcon: 'delete',
            modalClassName: modalClassName || 'small'
        });
    };
    return new ShowCls();
});
