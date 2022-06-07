'use strict';

exports.__esModule = true;

var _pluginHost = require('./reporter/plugin-host');

var _pluginHost2 = _interopRequireDefault(_pluginHost);

var _formattableAdapter = require('./errors/test-run/formattable-adapter');

var _formattableAdapter2 = _interopRequireDefault(_formattableAdapter);

var _testRun = require('./errors/test-run');

var testRunErrors = _interopRequireWildcard(_testRun);

var _testRun2 = require('./test-run');

var _testRun3 = _interopRequireDefault(_testRun2);

var _type = require('./test-run/commands/type');

var _type2 = _interopRequireDefault(_type);

var _assignable = require('./utils/assignable');

var _assignable2 = _interopRequireDefault(_assignable);

var _getTestList = require('./compiler/test-file/formats/es-next/get-test-list');

var _getTestList2 = require('./compiler/test-file/formats/typescript/get-test-list');

var _getTestList3 = require('./compiler/test-file/formats/coffeescript/get-test-list');

var _initializers = require('./test-run/commands/validations/initializers');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    getTestList: _getTestList.getTestList,
    getTypeScriptTestList: _getTestList2.getTypeScriptTestList,
    getCoffeeScriptTestList: _getTestList3.getCoffeeScriptTestList,
    getTestListFromCode: _getTestList.getTestListFromCode,
    getTypeScriptTestListFromCode: _getTestList2.getTypeScriptTestListFromCode,
    getCoffeeScriptTestListFromCode: _getTestList3.getCoffeeScriptTestListFromCode,
    TestRunErrorFormattableAdapter: _formattableAdapter2.default,
    TestRun: _testRun3.default,
    testRunErrors,
    COMMAND_TYPE: _type2.default,
    Assignable: _assignable2.default,
    initSelector: _initializers.initSelector,

    buildReporterPlugin(pluginFactory, outStream) {
        var plugin = pluginFactory();

        return new _pluginHost2.default(plugin, outStream);
    }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lbWJlZGRpbmctdXRpbHMuanMiXSwibmFtZXMiOlsidGVzdFJ1bkVycm9ycyIsImdldFRlc3RMaXN0IiwiZ2V0VHlwZVNjcmlwdFRlc3RMaXN0IiwiZ2V0Q29mZmVlU2NyaXB0VGVzdExpc3QiLCJnZXRUZXN0TGlzdEZyb21Db2RlIiwiZ2V0VHlwZVNjcmlwdFRlc3RMaXN0RnJvbUNvZGUiLCJnZXRDb2ZmZWVTY3JpcHRUZXN0TGlzdEZyb21Db2RlIiwiVGVzdFJ1bkVycm9yRm9ybWF0dGFibGVBZGFwdGVyIiwiVGVzdFJ1biIsIkNPTU1BTkRfVFlQRSIsIkFzc2lnbmFibGUiLCJpbml0U2VsZWN0b3IiLCJidWlsZFJlcG9ydGVyUGx1Z2luIiwicGx1Z2luRmFjdG9yeSIsIm91dFN0cmVhbSIsInBsdWdpbiIsIlJlcG9ydGVyUGx1Z2luSG9zdCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7SUFBWUEsYTs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O2tCQUVlO0FBQ1hDLHlDQURXO0FBRVhDLDhEQUZXO0FBR1hDLGtFQUhXO0FBSVhDLHlEQUpXO0FBS1hDLDhFQUxXO0FBTVhDLGtGQU5XO0FBT1hDLGdFQVBXO0FBUVhDLDhCQVJXO0FBU1hSLGlCQVRXO0FBVVhTLGdDQVZXO0FBV1hDLG9DQVhXO0FBWVhDLDRDQVpXOztBQWNYQyx3QkFBcUJDLGFBQXJCLEVBQW9DQyxTQUFwQyxFQUErQztBQUMzQyxZQUFJQyxTQUFTRixlQUFiOztBQUVBLGVBQU8sSUFBSUcsb0JBQUosQ0FBdUJELE1BQXZCLEVBQStCRCxTQUEvQixDQUFQO0FBQ0g7QUFsQlUsQyIsImZpbGUiOiJlbWJlZGRpbmctdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVwb3J0ZXJQbHVnaW5Ib3N0IGZyb20gJy4vcmVwb3J0ZXIvcGx1Z2luLWhvc3QnO1xuaW1wb3J0IFRlc3RSdW5FcnJvckZvcm1hdHRhYmxlQWRhcHRlciBmcm9tICcuL2Vycm9ycy90ZXN0LXJ1bi9mb3JtYXR0YWJsZS1hZGFwdGVyJztcbmltcG9ydCAqIGFzIHRlc3RSdW5FcnJvcnMgZnJvbSAnLi9lcnJvcnMvdGVzdC1ydW4nO1xuaW1wb3J0IFRlc3RSdW4gZnJvbSAnLi90ZXN0LXJ1bic7XG5pbXBvcnQgQ09NTUFORF9UWVBFIGZyb20gJy4vdGVzdC1ydW4vY29tbWFuZHMvdHlwZSc7XG5pbXBvcnQgQXNzaWduYWJsZSBmcm9tICcuL3V0aWxzL2Fzc2lnbmFibGUnO1xuaW1wb3J0IHsgZ2V0VGVzdExpc3QsIGdldFRlc3RMaXN0RnJvbUNvZGUgfSBmcm9tICcuL2NvbXBpbGVyL3Rlc3QtZmlsZS9mb3JtYXRzL2VzLW5leHQvZ2V0LXRlc3QtbGlzdCc7XG5pbXBvcnQgeyBnZXRUeXBlU2NyaXB0VGVzdExpc3QsIGdldFR5cGVTY3JpcHRUZXN0TGlzdEZyb21Db2RlIH0gZnJvbSAnLi9jb21waWxlci90ZXN0LWZpbGUvZm9ybWF0cy90eXBlc2NyaXB0L2dldC10ZXN0LWxpc3QnO1xuaW1wb3J0IHsgZ2V0Q29mZmVlU2NyaXB0VGVzdExpc3QsIGdldENvZmZlZVNjcmlwdFRlc3RMaXN0RnJvbUNvZGUgfSBmcm9tICcuL2NvbXBpbGVyL3Rlc3QtZmlsZS9mb3JtYXRzL2NvZmZlZXNjcmlwdC9nZXQtdGVzdC1saXN0JztcbmltcG9ydCB7IGluaXRTZWxlY3RvciB9IGZyb20gJy4vdGVzdC1ydW4vY29tbWFuZHMvdmFsaWRhdGlvbnMvaW5pdGlhbGl6ZXJzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGdldFRlc3RMaXN0LFxuICAgIGdldFR5cGVTY3JpcHRUZXN0TGlzdCxcbiAgICBnZXRDb2ZmZWVTY3JpcHRUZXN0TGlzdCxcbiAgICBnZXRUZXN0TGlzdEZyb21Db2RlLFxuICAgIGdldFR5cGVTY3JpcHRUZXN0TGlzdEZyb21Db2RlLFxuICAgIGdldENvZmZlZVNjcmlwdFRlc3RMaXN0RnJvbUNvZGUsXG4gICAgVGVzdFJ1bkVycm9yRm9ybWF0dGFibGVBZGFwdGVyLFxuICAgIFRlc3RSdW4sXG4gICAgdGVzdFJ1bkVycm9ycyxcbiAgICBDT01NQU5EX1RZUEUsXG4gICAgQXNzaWduYWJsZSxcbiAgICBpbml0U2VsZWN0b3IsXG5cbiAgICBidWlsZFJlcG9ydGVyUGx1Z2luIChwbHVnaW5GYWN0b3J5LCBvdXRTdHJlYW0pIHtcbiAgICAgICAgdmFyIHBsdWdpbiA9IHBsdWdpbkZhY3RvcnkoKTtcblxuICAgICAgICByZXR1cm4gbmV3IFJlcG9ydGVyUGx1Z2luSG9zdChwbHVnaW4sIG91dFN0cmVhbSk7XG4gICAgfVxufTtcbiJdfQ==
