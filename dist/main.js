var Component = (function (exports) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _readOnlyError(name) {
    throw new Error("\"" + name + "\" is read-only");
  }

  var Alert =
  /*#__PURE__*/
  function () {
    function Alert(options) {
      _classCallCheck(this, Alert);

      this.handleClick = this.handleClick.bind(this);
      this.init(options);
    }

    _createClass(Alert, [{
      key: "init",
      value: function init(options) {
        var _this = this;

        document.getElementById(options.id).closest('[aria-labelledby]').querySelector('[data-alert-close]').addEventListener('click', function () {
          _this.handleClick(options.id);
        }, false);
      }
    }, {
      key: "handleClick",
      value: function handleClick(id) {
        var dismissButton = event.target.closest('[data-alert-close]'); // If the target wasn't the dismiss button bail.

        if (!dismissButton) return;
        this.dismissAlert(id);
      }
    }, {
      key: "dismissAlert",
      value: function dismissAlert(id, callback) {
        var alert = document.querySelector('[aria-labelledby="' + id + '"]');

        if (!alert) {
          alert = (_readOnlyError("alert"), document.getElementById(id));
        }

        if (!alert) {
          throw new Error('Could not find an alert with the id of ' + id + ' to dismiss.');
        }

        alert.remove();

        if (callback && typeof callback === 'function') {
          callback();
        }
      }
    }]);

    return Alert;
  }();

  exports.Alert = Alert;

  return exports;

}({}));
